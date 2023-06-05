const gameboard = (() => {
    const board = []
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i][j] = '0';
        }
    }
})();
const display_gameboard = (()=> {
    let container = document.querySelector('.gameboard-container');
    for(let i = 0; i < 3; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < 3; j++){
            let cell = document.createElement('button');
            cell.classList.add('square');
            cell.textContent = '0'
            cell.setAttribute('data-row', i)
            cell.setAttribute('data-col', j)
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
})();

const Player =(name,marker) =>{
    return{name,marker};
}



