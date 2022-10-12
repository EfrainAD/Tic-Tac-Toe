import {AI} from './Ai.js';
import {WinnerCheck} from './WinnerCheck.js'
let whosTurn = 'X' //X player starts the game //Be toggled from X and Y
let turnCounter = 0; //To know
let XsWinCount = 0 // Tracks the number of times Player won the game.
let YsWinCount = 0
// Controls how many rows and columns the game has
let rows = 5 
let columns = 5
const winnerCheck = new WinnerCheck(3)

//function check if tie game.                 
const ifTiedGame = () => {
    if (turnCounter === (document.querySelectorAll('.Tic-Tac-Toe-Boxs').length)) {
        return true
    }
    return false
}
const tiedGame = () => {
    updateMessageBoard('tied')
}
//This is here becuase there are more then one play a player can win. 
const wonGame = () => {
    updateMessageBoard('winner')
    updatePlayersWinCount()
    updateScoreBoard()
}
const updateScoreBoard = () => {
    if (whosTurn === 'X') {
        document.querySelector('#x-win-count').innerText = `X Won ${XsWinCount} times`
    } else {
        document.querySelector('#y-win-count').innerText = `Y Won ${YsWinCount} times`
    }
}
const updatePlayersWinCount = () => {
    if (whosTurn === 'X')
        XsWinCount++
    else
        YsWinCount++
}
//Reset the whole game over
const gameReset = () => {
    whosTurn = 'X'
    turnCounter = 0
    updateMessageBoard('whosTurn')
    // change varibles based the the field inputs
    rows = rowField.value
    columns = columnField.value
    if ( winConditionField.value === '1') {
        winnerCheck.winCondition = 3
        winConditionField.value = 3
    }
    else
        winnerCheck.winCondition = winConditionField.value
    // Remove the gameboard and remake it.
    createGameBoard()
    // window.location.reload()
} 
//////////HOME FUNCTION //Actions to take when a tic tac toe but has been clicked/picked
const boxClicked = (e) => {
    const selectedBox = document.getElementById(e.target.id)
    selectedBox.innerText = whosTurn    //Mark the box with X or O
    selectedBox.disabled = true         //Disable the box just clicked on, so it can't be used.
    turnCounter++                       //Updats the turnCounter so the game end if there is a tie.
    
    //if there is a winner or the game tied. 
    if (winnerCheck.check(selectedBox.id, whosTurn)) {
        wonGame()
        disableGameBoard()
    }
    else if (ifTiedGame()) {
        tiedGame()
        disableGameBoard()
    } else {
        toggleTurn()    //updates whos turn tracker to whos turn is next
        updateMessageBoard('whosTurn')
    }
}
const updateMessageBoard = (mgs) => {
    const messageBoard = document.getElementById('Message-Board')
    //update display to whos turn it is next
    if (mgs === 'whosTurn') 
        messageBoard.innerText = `It's ${whosTurn} players turn`
    else if (mgs === 'winner')
        messageBoard.innerText = `${whosTurn} player Won!`
    else if (mgs === 'tied')
        messageBoard.innerText = 'This game is a tie!'
    else 
        messageBoard.innerText = mgs


}
const createGameBoard = () => {
    const table = document.querySelector('table')
    // Remove the old board if there is one.
    if (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    //Every spot on the board will have a id name `Row:${row}-Column:${column}`
    //Then we add an eventEventListener to each spot.
    // table.style.backgroundColor = 'green'
    for (let row = 1; row <= rows; row++) {
        const tr = table.insertRow()
        for (let column = 1; column <= columns; column++) {
            const td = tr.insertCell()
            const button = document.createElement('button')
            button.className = 'Tic-Tac-Toe-Boxs'
            button.id = `Row:${row}-Column:${column}`
            td.appendChild(button)
            tr.appendChild(td)
            button.addEventListener('click', boxClicked)
        }
    }
}
const disableGameBoard = () => {
    const buttons = document.querySelectorAll('.Tic-Tac-Toe-Boxs')
    for (let i = 0; i < buttons.length; i++) 
        buttons[i].disabled = true
}
const toggleTurn = () => {
    if (whosTurn === 'X') 
        whosTurn = 'O'
    else
        whosTurn = 'X'
}

//create the game board
createGameBoard()

//addEventListener to the reset game button
document.getElementById('game-reset').addEventListener('click',gameReset)
//add value to win condition field, and eventListener
const winConditionField = document.querySelector('#win-condition')
const rowField = document.querySelector('#rows')
const columnField = document.querySelector('#columns')
winConditionField.value = winnerCheck.winCondition
rowField.value = rows
columnField.value = columns

function p (str) {(console.log(str))}