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
const playerOnesSymbleField = document.querySelector('#player-1-symble')
const playerTwosSymbleField = document.querySelector('#player-2-symble')
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
// let playerOnesSymble = 'X'
// let playerTwosSymble = 'O'
let playerOnesSymble = '🐶'
let playerTwosSymble = '🦊'
let playerAI = playerTwosSymble
let whosTurn = playerOnesSymble 
const playerSymbleOptions = [
    'X',
    'O',
    '🙈',
    '🙉',
    '🙊',
    '🐵',
    '🐶',
    '🐺',
    '🦊',
    '😸',
    '🦁',
    '🐯',
    '🐴',
    '🐮',
    '🐷',
    '🐭',
    '🐰',
    '🐹',
    '🐻',
    '🐻‍❄️',
    '🐨',
    '🐼',
    '🦥',
    '🐔',
    '🐣',
    '🐸',
    '🐲',
]

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
    messageBoard.innerHTML = `It's <span class="player">${playerOnesSymble}</span> player's turn`
}
const setupTheScoreBoard = () => {
    updateScoreBoard()
}
const selectPlayersDefultSymble = () => {
    const defaultPlayerOneIndex = playerSymbleOptions.indexOf(playerOnesSymble)
    const defaultPlayerTwoIndex = playerSymbleOptions.indexOf(playerTwosSymble)
    playerOnesSymbleField[defaultPlayerOneIndex].selected = 'selected'
    playerTwosSymbleField[defaultPlayerTwoIndex].selected = 'selected'
}
const importPlayerSymbleOtionsHTMLselect = () => {
    let playerOptions = ''
    playerSymbleOptions.forEach(option => {
        playerOptions += `<option value="${option}">${option}</option>`
    })
    playerOnesSymbleField.innerHTML = playerOptions
    playerTwosSymbleField.innerHTML = playerOptions
}
const setupTheGameControls = () => {
    winConditionField.value = winCondition
    rowField.value = rows
    columnField.value = columns
    importPlayerSymbleOtionsHTMLselect()
    selectPlayersDefultSymble()
}
const getWinStamentInHTML = (playersSymble, playersWinCount) => {
    if (playersWinCount !== 1) {
        return `<span class="player">${playersSymble}</span> Won ${playersWinCount} times`
    } else {
        return `<span class="player">${playersSymble}</span> Won ${playersWinCount} time`
    }
}
const getTiedStamentInHTML = () => {
    if (playerTiedCount !== 1) {
        return `The game was tied ${playerTiedCount} times`
    } else {
        return `The game was tied ${playerTiedCount} time`
    }
}
const updateScoreBoard = () => {
    const playerOneScore = document.querySelector('#player-one-win-count')
    const playerTwoScore = document.querySelector('#player-two-win-count')
    const playersTieds =  document.querySelector('#player-tied-count')

    playerOneScore.innerHTML = getWinStamentInHTML(playerOnesSymble, playerOnesWinCount)

   playerTwoScore.innerHTML = getWinStamentInHTML(playerTwosSymble, playerTwosWinCount)

   playersTieds.innerText = getTiedStamentInHTML()
}
const updatePlayersWinCount = () => {
    if (whosTurn === playerOnesSymble)
        playerOnesWinCount++
    else
        playerTwosWinCount++
}
const fadeInAndOut = (msg, stack) => {
    setTimeout(() => {
        msg.style.display = 'none'
    }, 5000)
    // Importent Note: This is needed because if the display to block happens to fast, the animation will not take effect.
    setTimeout(() => {
        stack.pop()
        if (stack.length !== 0)
            errorMessage(stack[stack.length-1], stack)
    }, 5100)
}
const getErrorMsg = (str) => {
    switch (str) {
        case 'winCondition':
            return 'The win condition can not be 1 <br> OR <br /> be larger then the rows or columns. It\'s been set by max number allowed.'
        case 'rows': 
            return 'The rows are limited to 10<br /> So it has been set to 10.'
        case 'columns':
            return 'The columns are limited to 10<br /> So it has been set to 10.'
        default:
            return 'Something was unput incorrectly'
    }
}
const errorMessage = (err, stack) => {
    const msg = document.querySelector('.error-message-container')
    const msgText = document.querySelector('.error-message')
    
    msgText.innerHTML = getErrorMsg(err)
    msg.style.display = 'block'
    fadeInAndOut(msg, stack)
}
const offLoadMsgStack = async (stack) => {
    stack = stack.reverse()
    errorMessage(stack[stack.length-1], stack)
}
const importRows = (msgStack) => {
    if (rowField.value > 10) {
        rows = ROWSLIMIT
        rowField.value = ROWSLIMIT
        msgStack.push('rows')
    } 
    else 
        rows = parseInt(rowField.value)
}
const importColumns = (msgStack) => {
    if (columnField.value > 10) {
        columns = COLUMNSLIMIT
        columnField.value = COLUMNSLIMIT
        msgStack.push('columns')
    } 
    else 
        columns = parseInt(columnField.value)
}
const importPlayersSymbles = () => {
    playerOnesSymble = playerOnesSymbleField.value
    playerTwosSymble = playerTwosSymbleField.value
    whosTurn = playerOnesSymble
}
const importAiChoices = () => {
    if (playerAiField.checked) {
        if (playerAioption1Input.checked)
            playerAI = playerOnesSymble
        else 
        playerAI = playerTwosSymble
    }
    else playerAI = null
}
const importWinCondition = (msgStack) => {
    const minWinCondition = parseInt(columns > rows ? columns : rows)
    if ( winConditionField.value === '1' ||
         winConditionField.value > minWinCondition || 
         winConditionField.value > minWinCondition ) {
            winCondition = minWinCondition
            winConditionField.value = minWinCondition
            msgStack.push('winCondition')
    }
    else
        winCondition = parseInt(winConditionField.value)
}
const gameReset = () => {
    const msgStack = []
    turnCounter = 0
    // import users choices
    importRows(msgStack)
    importColumns(msgStack)
    importPlayersSymbles()
    importAiChoices()
    importWinCondition(msgStack)

    if (msgStack.length !== 0)
        offLoadMsgStack(msgStack)
    
    // Remove the gameboard and remake it.
    updateMessageBoard('whosTurn')
    updateScoreBoard()
    createGameBoard()
    if(whosTurn === playerAI)
        aiToMove()
} 
const placeMove = (id) => {
    const [row, column] = getCoordinates(id)
    const selectedBox = document.querySelector(`#Row\\:${row}-Column\\:${column}`)
    // Mark the box
    selectedBox.innerText = whosTurn
    // Disable the box just clicked on, so it can't be used.
    selectedBox.removeEventListener('click', boxClicked)
    // Updats the turnCounter so the game end if there is a tie.
    turnCounter++
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
    if (whosTurn !== playerAI) {
        placeMove(e.target.id)
    }
}
const aiToMove =  () => {
    // Added delay to make bot feel more human.
    setTimeout(() => {
        placeMove(playByAi(whosTurn, getOpponentPlaySimble(whosTurn), winCondition, rows, columns))
    }, randomTime());
}
const updateMessageBoard = (mgs) => {
    const messageBoard = document.querySelector('#Message-Board')
    //update display to whos turn it is next
    if (mgs === 'whosTurn') 
        messageBoard.innerHTML = `It's <span class="player">${whosTurn}</span> player's turn`
    else if (mgs === 'winner')
        messageBoard.innerHTML = `<span class="player">${whosTurn}</span> player Won!`
    else if (mgs === 'tied')
        messageBoard.innerText = 'This game is a tie!'
    else 
        messageBoard.innerText = mgs
}
const drawTheBoardLines = () => {
    const ticTacToeBox = document.querySelectorAll('.Tic-Tac-Toe-Boxs')

    ticTacToeBox.forEach(box => {
        const [row, column] = getCoordinates(box.id)
        if (row === 1){
            box.style.borderTop = 'none'}
        else if (row === rows){
            box.style.borderBottom = 'none'}
        if (column === 1)
            box.style.borderLeft = 'none'
        else if (column === columns)
            box.style.borderRight = 'none'
    })
}
const createGameBoard = () => {
    gameBoard.innerHTML = ''
    // Create each 'button in there propoer rows
    for (let row = 1; row <= rows; row++) {
        const tr = document.createElement('div')
        tr.className = 'row'
        for (let column = 1; column <= columns; column++) {
            const button = document.createElement('div')
            button.className = 'Tic-Tac-Toe-Boxs'
            button.id = `Row:${row}-Column:${column}`
            tr.appendChild(button)
            button.addEventListener('click', boxClicked)
        }
        gameBoard.appendChild(tr)
    }
    drawTheBoardLines()
}
const disableGameBoard = () => {
    const buttons = document.querySelectorAll('.Tic-Tac-Toe-Boxs')
    buttons.forEach(button => 
        button.removeEventListener('click', boxClicked))
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
const setBoardToTicTacToe = () => {
    rowField.value = 3
    columnField.value = 3
    winConditionField.value = 3
    gameReset()
}
const setBoardToConnect4 = () => {
    rowField.value = 6
    columnField.value = 7
    winConditionField.value = 4
    gameReset()
}
const handleAiMenuAnimation = () => {
    const aiSettings = document.querySelector('.ai-setting-players')
    aiSettings.classList.toggle('display-none')
    aiSettings.classList.toggle('display')
}
//addEventListener to the reset game button
document.querySelector('#game-reset').addEventListener('click', gameReset)
document.querySelector('#game-mode-3').addEventListener('click', setBoardToTicTacToe)
document.querySelector('#game-mode-4').addEventListener('click', setBoardToConnect4)
document.querySelectorAll('.player-symble-otions').forEach(selecter => selecter.addEventListener('change', gameReset))
document.querySelectorAll('input').forEach(selecter => selecter.addEventListener('change', gameReset))
playerAiField.addEventListener('click', handleAiMenuAnimation)
document.querySelector('.how-to-play-link').addEventListener('click', () => {
    const container = document.querySelector('.how-to-play-container')
    // show modal with animation
    container.classList.add('fadeIn')
    // close modal with animation
    container.addEventListener('click', () => {
        container.classList.add('fadeOut')
        // Clean up
        setTimeout(() => {
            container.classList.remove('fadeIn')
            container.classList.remove('fadeOut')
        }, 1000);
    })
})

//Game starts Here. If AI is first player, The AI needs move before user does anything.
createGameBoard()
setupTheMessageBoard()
setupTheScoreBoard()
setupTheGameControls()
if (playerAI === playerOnesSymble)
    aiToMove()