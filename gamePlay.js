function terminal(board) {
    let xCount = 0, xMajorDiagonalCount = 0, xMinorDiagonalCount = 0;
    let oCount = 0, oMajorDiagonalCount = 0, oMinorDiagonalCount = 0;
    for (let i = 0; i < board.length; i++) {
        let xRowCount = 0, xColumnCount = 0, oRowCount = 0, oColumnCount = 0;
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == 'X') {
                xCount++;
                xRowCount++;
            }
            else if (board[i][j] == 'O') {
                oCount++;
                oRowCount++;
            }
            if (board[j][i] == 'X') {
                xColumnCount++;
            }
            else if (board[j][i] == 'O') {
                oColumnCount++;
            }
        }
        if (board[i][i] == 'X')
            xMajorDiagonalCount++;
        else if (board[i][i] == 'O')
            oMajorDiagonalCount++;
        if (board[i][board.length - i - 1] == 'X')
            xMinorDiagonalCount++;
        else if (board[i][board.length - i - 1] == 'O')
            oMinorDiagonalCount++;
        if (xRowCount == n || xColumnCount == n || oRowCount == n || oColumnCount == n)
            return true;
    }
    if (xMajorDiagonalCount == n || xMinorDiagonalCount == n || oMajorDiagonalCount == n || oMinorDiagonalCount == n || xCount + oCount == board.length * board.length)
        return true;
    return false;
}

function value(board) {
    let xCount = 0, xMajorDiagonalCount = 0, xMinorDiagonalCount = 0;
    let oCount = 0, oMajorDiagonalCount = 0, oMinorDiagonalCount = 0;
    for (let i = 0; i < board.length; i++) {
        let xRowCount = 0, xColumnCount = 0, oRowCount = 0, oColumnCount = 0;
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == 'X') {
                xCount++;
                xRowCount++;
            }
            else if (board[i][j] == 'O') {
                oCount++;
                oRowCount++;
            }
            if (board[j][i] == 'X') {
                xColumnCount++;
            }
            else if (board[j][i] == 'O') {
                oColumnCount++;
            }
        }
        if (board[i][i] == 'X')
            xMajorDiagonalCount++;
        else if (board[i][i] == 'O')
            oMajorDiagonalCount++;
        if (board[i][board.length - i - 1] == 'X')
            xMinorDiagonalCount++;
        else if (board[i][board.length - i - 1] == 'O')
            oMinorDiagonalCount++;
        if (xRowCount == n || xColumnCount == n)
            return 1;
        else if (oRowCount == n || oColumnCount == n)
            return -1;
    }
    if (xMajorDiagonalCount == n || xMinorDiagonalCount == n)
        return 1;
    else if (oMajorDiagonalCount == n || oMinorDiagonalCount == n)
        return -1;
    return 0;
}

function actions(board) {
    let acts = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] != 'X' && board[i][j] != 'O')
                acts.push([i, j]);
        }
    }
    return acts;
}

function result(board, action, turn) {
    let bd = [];
    for (let i = 0; i < board.length; i++)
        bd.push(board[i].slice());
    if (turn)
        bd[action[0]][action[1]] = 'X';
    else
        bd[action[0]][action[1]] = 'O';
    return bd;
}

function minimax(board, turn) {
    if (terminal(board))
        return value(board);
    let acts = actions(board);
    let val = null;
    if (turn) {
        val = -Infinity;
        for (let i = 0; i < acts.length; i++) {
            let nextMinimax = minimax(result(board, acts[i], turn), !turn);
            val = Math.max(val, nextMinimax);
            if (val == 1)
                break;
        }
    }
    else {
        val = Infinity;
        for (let i = 0; i < acts.length; i++) {
            let nextMinimax = minimax(result(board, acts[i], turn), !turn);
            val = Math.min(val, nextMinimax);
            if (val == -1)
                break;
        }
    }
    return val;
}

let n = sessionStorage.getItem('layout');
let playerX = sessionStorage.getItem('playerX'), playerO = sessionStorage.getItem('playerO');
let state = document.querySelector('.state');
document.querySelector('.board').style.gridTemplateRows = (' ' + (70.0 / n).toString() + 'vmin').repeat(n);
document.querySelector('.board').style.gridTemplateColumns = (' ' + (70.0 / n).toString() + 'vmin').repeat(n);
for (let i = 0; i < n * n; i++) {
    let item = document.createElement('div');
    let itemImg = document.createElement('img');
    itemImg.setAttribute('src', '');
    item.appendChild(itemImg);
    document.querySelector('.board').appendChild(item);
    item.className = 'item';
    item.setAttribute('data-row', Number.parseInt(i / n));
    item.setAttribute('data-col', Number.parseInt(i % n));
}
let currBoard = [];
let items = document.getElementsByClassName('item');
let elementBoard = [];
let gridRow = [];
let i = 0;
let currTurn = true;
state.innerText = `${playerX}'s turn`
let isClickListenerRemoved = [];
while (i < items.length) {
    let currentItem = items[i];
    currentItem.addEventListener('click', onClick);
    gridRow[i % n] = items[i];
    i++;
    if (i % n == 0) {
        elementBoard[i / n - 1] = gridRow;
        gridRow = [];
        currBoard[i / n - 1] = [];
    }
}
let computerSymbol = `${playerX == 'Computer' ? 'X' : 'O'}`;
if (playerX == 'Computer') {
    computer(currBoard);
}

let isExecuting = false;
async function onClick() {
    if (this.querySelector('img').getAttribute('src') != "" || isExecuting) {
        console.log("onClick is already Executing ");
        return;
    }
    isExecuting = true;
    let row = this.getAttribute('data-row'), col = this.getAttribute('data-col');
    if (currTurn) {
        this.querySelector('img').setAttribute('src', 'assets/images/x.svg');
        currBoard[row][col] = 'X';
    }
    else {
        this.querySelector('img').setAttribute('src', 'assets/images/o.svg');
        currBoard[row][col] = 'O';
    }
    this.style.backgroundColor = 'greenyellow';
    this.removeEventListener('click', onClick);
    currTurn = !currTurn;
    state.innerText = `${currTurn ? playerX : playerO}'s turn`;
    if (terminal(currBoard)) {
        if (value(currBoard) == 1)
            state.innerText = `${playerX} Won`;
        else if (value(currBoard) == -1)
            state.innerText = `${playerO} Won`;
        else
            state.innerText = 'Match Draw';
        removeAllClick();
        document.querySelector('.restart').style.visibility = 'visible';
        document.querySelector('.restart').addEventListener('click', () => {
            location.reload();
        });
    }
    else if (playerX == "Computer" || playerO == "Computer") {
        console.log('Computer Turn');
        await computer(currBoard);
    }
    isExecuting = false;
}

function removeAllClick() {
    for (let i = 0; i < items.length; i++) {
        let currentItem = items[i];
        if (currentItem.querySelector('img').getAttribute('src') == "") {
            currentItem.style.backgroundColor = 'greenyellow';
            currentItem.removeEventListener('click', onClick);
        }
    }
}

function computer(board) {
    return new Promise((resolve => {
        let acts = actions(board);
        let minValue = null;
        let minAction = [];
        if (playerX == "Computer") {
            minValue = -Infinity;
            for (let i = 0; i < acts.length; i++) {
                let currMinimax = minimax(result(board, acts[i], currTurn), !currTurn);
                if (currMinimax > minValue) {
                    minValue = currMinimax;
                    minAction = acts[i];
                    if (minValue == 1)
                        break;
                }
            }
        }
        else {
            minValue = Infinity;
            for (let i = 0; i < acts.length; i++) {
                let currMinimax = minimax(result(board, acts[i], currTurn), !currTurn);
                if (currMinimax < minValue) {
                    minValue = currMinimax;
                    minAction = acts[i];
                    if (minValue == -1)
                        break;
                }
            }
        }
        currBoard[minAction[0]][minAction[1]] = computerSymbol;
        let ele = elementBoard[minAction[0]][minAction[1]];
        setTimeout(() => {
            ele.querySelector('img').setAttribute('src', `assets/images/${computerSymbol.toLowerCase()}.svg`);
            ele.style.backgroundColor = 'greenyellow';
            currTurn = !currTurn;
            state.innerText = `${currTurn ? playerX : playerO}'s turn`;
            ele.removeEventListener('click', onClick);
            if (terminal(currBoard)) {
                if (value(currBoard) == 1)
                    state.innerText = `${playerX} Won`;
                else if (value(currBoard) == -1)
                    state.innerText = `${playerO} Won`;
                else
                    state.innerText = 'Match Draw';
                removeAllClick();
                document.querySelector('.restart').style.visibility = 'visible';
                document.querySelector('.restart').addEventListener('click', () => {
                    location.reload();
                });
            }
            resolve();
        }, 500);
    }));
}