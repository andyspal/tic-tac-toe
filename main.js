const gameboard = (() => {
    const board = []
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i][j] = null;
        }
    }
    return board;
})();


const display_gameboard = (()=> {
    let container = document.querySelector('.gameboard-container');
    for(let i = 0; i < 3; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < 3; j++){
            let cell = document.createElement('button');
            
            cell.classList.add('cell');
            cell.textContent = '0'

            cell.setAttribute('data-row', i)
            cell.setAttribute('data-col', j)

            cell.addEventListener('click', () =>{
                let row = parseInt(cell.dataset.row);   
                let col = parseInt(cell.dataset.col);
                if(gameboard[row][col] === null && player1.turn === true){
                    gameboard[row][col] = player1.marker;
                    cell.textContent = gameboard[row][col];
                    player1.turn = false;
                    player2.turn = true
                }
                else{
                    gameboard[row][col] = player2.marker;
                    cell.textContent = gameboard[row][col];
                    player2.turn = false;
                    player1.turn = true;
                }
            })
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
})();

const Player =(name,marker,turn) =>{
    return{name,marker, turn};
}
player1 = Player('Andy', 'X', true);
player2 = Player('Cami', 'O', false);


