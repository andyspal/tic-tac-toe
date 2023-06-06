const game = (() => {
  const Player = (name, marker, turn) => {
    return { name, marker, turn };
  };

  let player1 = Player("Player 1", "X", true);
  let player2 = Player("Player 2", "O", false);

  const gameboard = (() => {
    const size = 3;
    const board = [];

    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }

    return {
      getBoard: () => board,
    };
  })();

  const board = gameboard.getBoard();

  const display_gameboard = (() => {
    let container = document.querySelector(".gameboard-container");
    for (let i = 0; i < 3; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement("button");

        cell.classList.add("cell");
        cell.textContent = "";
        cell.style.color = "transparent";

        cell.setAttribute("data-row", i);
        cell.setAttribute("data-col", j);

        cell.addEventListener("click", () => {
          if(!clickEnabled){
            return;
          }
          let row = parseInt(cell.dataset.row);
          let col = parseInt(cell.dataset.col);
          if (board[row][col] === null) {
            if (player1.turn === true) {
              board[row][col] = player1.marker;
              cell.textContent = board[row][col];
              cell.style.color = "rgb(255, 202, 103)";
              player1.turn = false;
              player2.turn = true;

            } else if (player2.turn === true) {
              board[row][col] = player2.marker;
              cell.textContent = board[row][col];
              cell.style.color = "rgb(235, 112, 228)";
              player2.turn = false;
              player1.turn = true;

            }
          }
          let winner_marker = checkWin();
          if (winner_marker === null) {
            checkTie();
          } else {
            let winner = selectWinner(winner_marker);
            console.log(winner);
          }
        });
        row.appendChild(cell);
      }
      container.appendChild(row);
    }
  })();
  const checkWin = () => {
    const winConditions = [
      // Win Conditions (rows, columns y diagonals)
      // 00 01 02
      // 10 11 12
      // 20 21 22

      // if 00 10 20 player wins

      // if 01 11 21 player wins

      // if 02 12 22 player wins

      // if 00 01 02 player wins

      // if 10 11 12 player wins

      // if 20 21 22 player wins

      // if 00 11 22 player wins

      // if 02 11 20 player wins

      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const condition of winConditions) {
      let [a, b, c] = condition;
      let [rowA, colA] = a;
      let [rowB, colB] = b;
      let [rowC, colC] = c;

      if (
        board[rowA][colA] &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] == board[rowC][colC]
      ) {
        let winner_marker = board[rowA][colA];
        return winner_marker;
      }
    }
    return null;
  };
  const checkTie = () => {
    //for every row in the board and for every cell in the row check if the cell is not null. return true if all are not null
    const isTie = board.every((row) => row.every((cell) => cell !== null));
    if (isTie) {
      console.log("Is tie");
      announceTie();
      resetGame();
    }
  };
  let clickEnabled = true;
  const resetGame = () => {
    clickEnabled = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = null;
      }
    }
    const cells = document.querySelectorAll(".cell");
    setTimeout(() => {
      cells.forEach((cell) => {
        cell.textContent = "";
      });
      delayFunction();
    }, 3000);
  };
  const selectWinner = (winner_marker) => {
    if (player1.marker === winner_marker) {
      announceWinner(player1);
      return player1;
    } else {
      announceWinner(player2);
      return player2;
    }
  };
  const result = document.querySelector(".result");
  let players_div = document.querySelector(".players");
  const announceWinner = (player) => {
    result.classList.toggle("hide");
    result.textContent = `${player.name} wins!`;
    players_div.appendChild(result);
    resetGame();
    setTimeout(() => {
      result.classList.toggle("hide");
    }, 3000);
  };
  const announceTie = () => {
    result.classList.toggle("hide");
    result.textContent = "It's a tie!";
    players_div.appendChild(result);
    resetGame(); 
    setTimeout(() => {
      result.classList.toggle("hide");
    }, 3000);
  };

  const delayFunction = () => {
    clickEnabled = true;
  };


})();
