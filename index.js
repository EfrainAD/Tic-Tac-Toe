import {playByAi} from './ai.js';
import getCoordinates from './getCoordinates.js';
import {WinnerCheck} from './WinnerCheck.js'
// Game Control (Control Pannel) Fields
const columnField = document.querySelector('#columns')
const winConditionField = document.querySelector('#win-condition')
const rowField = document.querySelector('#rows')
// Game Control (Control Pannel) Data
let playerOnesWinCount = 0 // Tracks the number of times Player won the game.
let playerTwosWinCount = 0
let playerTiedCount = 0
// Game Board Tag and Data
const gameBoard = document.querySelector('table')
let rows = 5
let columns = 5
// Game info
const winnerCheck = new WinnerCheck(gameBoard)
let turnCounter = 0 //To know when game is tied.
let winCondition = 3
let playerOnesSymble = 'X'
let playerTwosSymble = 'O'
let playerAI = playerTwosSymble
let whosTurn = playerOnesSymble 

const getOpponentPlaySimble = (playersSymble) => {
    if (playersSymble === playerOnesSymble)
        return playerTwosSymble
    else
        return playerOnesSymble
}            
const isTiedGame = () => {
    if (turnCounter === (document.querySelectorAll('.Tic-Tac-Toe-Boxs').length)) {
        return true
    }
    return false
}
const tiedGame = () => {
    updateMessageBoard('tied')
    playerTiedCount++
    updateScoreBoard()
}
//This is here becuase there are three ways a the game ends, win, lose, tie. 
const wonGame = () => {
    updateMessageBoard('winner')
    updatePlayersWinCount()
    updateScoreBoard()
}
const setupTheScoreBoard = () => {
        document.querySelector('#player-one-win-count').innerText = `${playerOnesSymble} Won ${playerOnesWinCount} times`
    
        document.querySelector('#player-two-win-count').innerText = `${playerTwosSymble} Won ${playerTwosWinCount} times`

        document.querySelector('#player-tied-count').innerText = `The game was tied ${playerTiedCount} times`
}
const setupTheGameControls = () => {
    winConditionField.value = winCondition
    rowField.value = rows
    columnField.value = columns
}
const updateScoreBoard = () => {
    if (whosTurn === playerOnesSymble) {
        document.querySelector('#player-one-win-count').innerText = `${playerOnesSymble} Won ${playerOnesWinCount} times`
    } else {
        document.querySelector('#player-two-win-count').innerText = `${playerTwosSymble} Won ${playerTwosWinCount} times`
    }
    document.querySelector('#player-tied-count').innerText = `The game was tied ${playerTiedCount} times`
}
const updatePlayersWinCount = () => {
    if (whosTurn === playerOnesSymble)
        playerOnesWinCount++
    else
        playerTwosWinCount++
}
//Reset the whole game over
const gameReset = () => {
    whosTurn = playerOnesSymble
    turnCounter = 0
    updateMessageBoard('whosTurn')
    // change varibles based the the field inputs
    rows = rowField.value
    columns = columnField.value
    if ( winConditionField.value === '1') {
        winCondition = 3
        winConditionField.value = 3
    }
    else
        winCondition = winConditionField.value
    // Remove the gameboard and remake it.
    createGameBoard()
    if(whosTurn === playerAI)
        aiToMove()

} 
const placeMove = (id) => {
    const [row, column] = getCoordinates(id)
    // const hi = `#Row\\:${4}-Column\\:${4}`
    // const selectedBox = document.querySelector(hi)
    const selectedBox = document.querySelector(`#Row\\:${row}-Column\\:${column}`)
    // placeMove(selectedBox)
    selectedBox.innerText = whosTurn    //Mark the box with X or O
    selectedBox.disabled = true         //Disable the box just clicked on, so it can't be used.
    turnCounter++                       //Updats the turnCounter so the game end if there is a tie.
    if (winnerCheck.check(selectedBox.id, whosTurn, winCondition)) {
        wonGame()
        disableGameBoard()
    }
    else if (isTiedGame()) {
        tiedGame()
        disableGameBoard()
    } else {
        toggleTurn()
    }
}
//////////HOME FUNCTION //Actions to take when a tic tac toe but has been clicked/picked
const boxClicked = (e) => {
    placeMove(e.target.id)
}
const aiToMove =  () => {
    placeMove(playByAi(whosTurn, getOpponentPlaySimble(whosTurn), winCondition, rows, columns))
}
const updateMessageBoard = (mgs) => {
    const messageBoard = document.querySelector('#Message-Board')
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
    // Remove the old board if there is one.
    if (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    //Every spot on the board will have a id name `Row:${row}-Column:${column}`
    //Then we add an eventEventListener to each spot.
    for (let row = 1; row <= rows; row++) {
        const tr = gameBoard.insertRow()
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
const toggleWhosTurn = () => {
    if (whosTurn === playerOnesSymble) 
            whosTurn = playerTwosSymble
    else
        whosTurn = playerOnesSymble
}
const toggleTurn = () => {
    toggleWhosTurn()
    updateMessageBoard('whosTurn')
    if (playerAI === whosTurn) {
        placeMove(playByAi(whosTurn, getOpponentPlaySimble(whosTurn), winCondition, rows, columns))
    }
}

//addEventListener to the reset game button
document.querySelector('#game-reset').addEventListener('click', gameReset)

//Game starts Here. If AI is first player, The AI needs move before user does anything.
createGameBoard()
setupTheScoreBoard()
setupTheGameControls()
if (playerAI === playerOnesSymble)
    aiToMove()