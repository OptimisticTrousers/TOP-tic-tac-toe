const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', '', ''];

    const points = document.querySelectorAll('div.box');

    const addElementToBoardList = (mark, index) => {

        boardList[index] = mark;
    }

    const getNodeList = () => {
        return points;
    }

    const getElementAtIndex = index => {
        return boardList[index];
    }

    return {addElementToBoardList, getNodeList, getElementAtIndex};
}();


const displayController = function(){

    const render = () => {

        gameBoard.getNodeList().forEach((point,index) => point.addEventListener('click', (event) => {

            event.target.innerText = gameBoard.getElementAtIndex(index);
        }))
    }

    return {render};
}();

const Player = (name) => {

    let playerTurn = true;

    const setPlayerTurn = (turn) => {
        playerTurn = turn;
    }
    const getPlayerTurn = () =>{
        return playerTurn;
    }

    return {name, setPlayerTurn, getPlayerTurn};
}

const Human = (name) => {

    const prototype = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    let mark = "";

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    const setMark = value =>{
        mark = value;
    }

    buttonX.addEventListener('click', () => setMark("X"));

    buttonO.addEventListener('click', () => setMark("O"));

    const addMarks = () =>{

        gameBoard.getNodeList().forEach((point, index) => point.addEventListener('click', () => {

            if(gameBoard.getElementAtIndex(index) == "" && prototype.getPlayerTurn() == true){

                gameBoard.addElementToBoardList(mark, index);
                prototype.setPlayerTurn(false)
            }
        }))
    }

    return Object.assign({}, prototype, {addMarks});
}

const Computer = (name) => {

    const prototype = Player(name);

    return Object.assign({}, prototype);
}

const human = Human('Bob');

human.setPlayerTurn(true);

console.log(human.getPlayerTurn());

const computer = Computer("Computer");

human.addMarks();

displayController.render();
