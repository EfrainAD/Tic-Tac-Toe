import {playByAi} from './ai.js';
import getCoordinates from './getCoordinates.js';
import {WinnerCheck} from './WinnerCheck.js'
// Default values in the game.
const WINCONDITION = 4
const ROWS = 6
const COLUMNS = 7
const ROWSLIMIT = 10
const COLUMNSLIMIT = 10
// Game Control (Control Pannel) Fields
const columnField = document.querySelector('#columns')
const winConditionField = document.querySelector('#win-condition')
const rowField = document.querySelector('#rows')
const playerAiField = document.querySelector('#play-ai')
const playerAioption1Input = document.querySelector('#ai-player-one')
const playerAioption2Input = document.querySelector('#ai-player-two')
// Game Control (Control Pannel) Data
let playerOnesWinCount = 0 // Tracks the number of times Player won the game.
let playerTwosWinCount = 0
let playerTiedCount = 0
// Game Board Tag and Data
const gameBoard = document.querySelector('.game-board')
let rows = ROWS
let columns = COLUMNS
// Game info
const winnerCheck = new WinnerCheck(gameBoard)
let turnCounter = 0 //To know when game is tied.
let winCondition = WINCONDITION
let playerOnesSymble = 'X'
let playerTwosSymble = 'O'
// let playerAI = null
let playerAI = playerTwosSymble
let whosTurn = playerOnesSymble 

const testLog = () => {
    const name = document.querySelector('.Tic-Tac-Toe-Boxs')
    console.log(name.offsetWidth)
}
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
const setupTheMessageBoard = () => {
    const messageBoard = document.querySelector('#Message-Board')
    messageBoard.innerHTML = `It's ${playerOnesSymble} player's turn`
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
const fadeOut = (msg) => {
    setTimeout(() => {
        msg.classList.toggle('fadeOut')
    }, 3000)
    setTimeout(() => {
        msg.classList.toggle('fadeOut')
        msg.style.display = 'none'
    }, 5000)
}
const getErrorMsg = (str) => {
    switch (str) {
        case 'winCondition':
            return 'The win condition can not be 1 OR be larger then the rows or columns. The default has been set.'
            break;
        case 'rows':
        case 'columns':
            return 'The rows or columns are limited to 10, The default has been set.'
        default:
            return 'Something was unput incorrectly'
            break;
    }
}
const errorMessage = (err) => {
    const msg = document.querySelector('.error-message-container')
    const msgText = document.querySelector('.error-message')

    msg.style.display = 'block'
    msgText.innerHTML = getErrorMsg(err)
    fadeOut(msg)
}
//Reset the whole game over
const gameReset = () => {
    whosTurn = playerOnesSymble
    turnCounter = 0
    updateMessageBoard('whosTurn')
    // change varibles based the the field inputs
    if (rowField.value > 10) {
        rows = ROWSLIMIT
        rowField.value = ROWSLIMIT
        errorMessage('rows')
    } else rows = rowField.value
    if (columnField.value > 10) {
        columns = COLUMNSLIMIT
        columnField.value = COLUMNSLIMIT
        errorMessage('columns')
    } else columns = columnField.value
    if (playerAiField.checked) {
        if (playerAioption1Input.checked)
            playerAI = playerOnesSymble
        else 
        playerAI = playerTwosSymble
    }
    else playerAI = null
    const minWinCondition = parseInt(columns > rows ? columns : rows)
    if ( winConditionField.value === '1' ||
         winConditionField.value > minWinCondition || 
         winConditionField.value > minWinCondition ) {
            winCondition = minWinCondition
            winConditionField.value = minWinCondition
            errorMessage('winCondition')
    }
    else
        winCondition = winConditionField.value
    // Remove the gameboard and remake it.
    createGameBoard()
    if(whosTurn === playerAI)
        aiToMove()
    testLog()
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
const randomTime = () => {
    return Math.floor(Math.random() * 1000) + 1000
}
//////////HOME FUNCTION //Actions to take when a tic tac toe but has been clicked/picked
const boxClicked = (e) => {
    placeMove(e.target.id)
}
const aiToMove =  () => {
    setTimeout(() => {
        placeMove(playByAi(whosTurn, getOpponentPlaySimble(whosTurn), winCondition, rows, columns))
    }, randomTime());
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
    gameBoard.innerHTML = ''
    //Every spot on the board will have a id name `Row:${row}-Column:${column}`
    //Then we add an eventEventListener to each spot.
    for (let row = 1; row <= rows; row++) {
        const tr = document.createElement('div')
        tr.className = 'row'
        for (let column = 1; column <= columns; column++) {
            const button = document.createElement('button')
            button.className = 'Tic-Tac-Toe-Boxs'
            button.id = `Row:${row}-Column:${column}`
            tr.appendChild(button)
            button.addEventListener('click', boxClicked)
        }
        gameBoard.appendChild(tr)
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
        aiToMove()
    }
}
//addEventListener to the reset game button
document.querySelector('#game-reset').addEventListener('click', gameReset)
playerAiField.addEventListener('click', () => {
    const aiSettings = document.querySelector('.ai-setting-players')
    aiSettings.classList.toggle('display-none')
    aiSettings.classList.toggle('display')
})

//Game starts Here. If AI is first player, The AI needs move before user does anything.
createGameBoard()
setupTheMessageBoard()
setupTheScoreBoard()
setupTheGameControls()
if (playerAI === playerOnesSymble)
    aiToMove()
// test
testLog()