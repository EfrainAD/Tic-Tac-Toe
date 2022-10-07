let whosTurn = 'X' //X player starts the game //Be toggled from X and Y
let turnCounter = 0; //To know
// Controls how many rows and columns the game has
let rows = 5 
let columns = 8
let winCondition = 3

const getCoordinates = (coordinate) => {
    //split the coordinate into there x and y componits.
    coordinate = coordinate.replace(/[^\d:]/g, '') //Took out the abc's by only keeping digits and ':'
    coordinate = coordinate.replace(':', '')       // took out only the first : so ParseInt would work
    const row = parseInt(coordinate, 10) 
    coordinate = coordinate.split(':').pop()       //Now that this nicly blocked ParseInt, remove it for the next number set.
    const column = parseInt(coordinate, 10)

    return [row, column]
}
const checkWinHorizontally = (buttonsCoordinates) => {
    let leftCount = 0 
    // countss the x or o to the left of the button that was clicked.
    let rightCount = 0 
    // countss the x or o to the right of the button that was clicked.
    const [row, column] = getCoordinates(buttonsCoordinates)

    // loop that moves lelt as long as innerText is === whosTurn, 
    // And for everone one add 1 to leftCounter

    // setting up the starting values for the column index and colrdinate element
    let columnIndex = column
    let coordinateElement = document.getElementById(`Row:${row}-Column:${--columnIndex}`)
    
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            leftCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${row}-Column:${--columnIndex}`)
    }

    // loop that moves right as long as innerText is === whosTurn, 
    // And for every one that match add 1 to rightCounter
    
    // Resetting column index and colrdinate element back to there starting values
    columnIndex = column
    coordinateElement = document.getElementById(`Row:${row}-Column:${++columnIndex}`)

    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            rightCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${row}-Column:${++columnIndex}`)
    }
    //Then we we add them up. leftCounter and rightCounter + 1 for the one the player just put down.
    // Return true if counter is = or larger then winCondition 
    if ((leftCount + 1 + rightCount) >= winCondition) {
        wonGame()
        return true
    }
    else return false
}
const checkWinVertically = (buttonsCoordinates) => {
    let upwordsCount = 0 
    let downwordsCount = 0 
    const [row, column] = getCoordinates(buttonsCoordinates)

    // loop that moves lelt as long as innerText is === whosTurn, 
    // And for everone one add 1 to leftCounter

    // setting up the starting values for the column index and colrdinate element
    let rowIndex = row
    let coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${column}`)
    
    // Counts players x/o above where the player just played.
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            upwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${column}`)
    }

    // loop that moves that are below as long as innerText is === whosTurn, 
    // And for every one that match add 1 to downwordsCounter
    
    // Resetting rows index and colrdinate element back to there starting values
    rowIndex = row
    coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${column}`)

    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            downwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${column}`)
    }
    //Then we we add them up. leftCounter and rightCounter + 1 for the one the player just put down.
    // Return true if counter is = or larger then winCondition 
    if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
        wonGame()
        return true
    }
    else return false
}
const checkwinDiagonallyToTheLeft = (buttonsCoordinate) => {
    // We are going to count left first then right.
    let upwordsCount = 0 
    let downwordsCount = 0 
    const [row, column] = getCoordinates(buttonsCoordinate)

    // loop through moves as long as innerText is === whosTurn, 
    // And for everone one add 1 to the appropriate Counter

    // setting up the starting values for the column index and colrdinate element
    let rowIndex = row
    let columnIndex = column
    let coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${--columnIndex}`)
    
    // Counts players x/o above/left where the player just played.
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            upwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${--columnIndex}`)
    }

    // reset the starting values for the loop.
    rowIndex = row
    columnIndex = column
    coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${++columnIndex}`)
    
    // Counts players x/o lower/right where the player just played.
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            downwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${++columnIndex}`)
    }

    //Then we we add them up + 1 (for the one the player just put down).
    if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
        wonGame()
        return true
    }
    return false
}
const checkwinDiagonallyToTheRight = (buttonsCoordinate) => {
    // We are going to count left first then right.
    let upwordsCount = 0 
    let downwordsCount = 0 
    const [row, column] = getCoordinates(buttonsCoordinate)

    // loop through moves as long as innerText is === whosTurn, 
    // And for everone one add 1 to the appropriate Counter

    // setting up the starting values for the column index and colrdinate element
    let rowIndex = row
    let columnIndex = column
    let coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${++columnIndex}`)
    
    // Counts players x/o above/left where the player just played.
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            upwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${--rowIndex}-Column:${++columnIndex}`)
    }

    // reset the starting values for the loop.
    rowIndex = row
    columnIndex = column
    coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${--columnIndex}`)
    
    // Counts players x/o lower/right where the player just played.
    while (coordinateElement) {
        if (coordinateElement.innerText === whosTurn)
            downwordsCount++
        else
            break
        coordinateElement = document.getElementById(`Row:${++rowIndex}-Column:${--columnIndex}`)
    }

    //Then we we add them up + 1 (for the one the player just put down).
    if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
        wonGame()
        return true
    }
    return false
}
const checkwinDiagonally = (buttonsCoordinate) => {
    // check win diagonally to the right and if not a win do so for the other side. return false if no win.
    return checkwinDiagonallyToTheLeft(buttonsCoordinate) || checkwinDiagonallyToTheRight(buttonsCoordinate)
}
const ifWonGame = (buttonsCoordinate) => {
    const buttonsCoordinates = getCoordinates(buttonsCoordinate)
    
    if (checkWinHorizontally(buttonsCoordinate))
        return true
    else if (checkWinVertically(buttonsCoordinate))
        return true
    else if (checkwinDiagonally(buttonsCoordinate))
        return true
}
//function check if tie game.                 
const ifTiedGame = () => {
    if (turnCounter === (document.querySelectorAll('.Tic-Tac-Toe-Boxs').length)) {
        updateMessageBoard('tied')
        return true
    }
    return false
}
//This is here becuase there are more then one play a player can win. 
const wonGame = () => {
    updateMessageBoard('winner')
}       
//Reset the whole game over
const gameReset = () => {
    whosTurn = 'X'
    turnCounter = 0
    updateMessageBoard('whosTurn')
    // change varibles based the the field inputs
    rows = rowField.value
    columns = columnField.value
    if ( winConditionField.value === 1) {
        winCondition = 3
    }
    else
        winCondition = winConditionField.value
    // Remove the gameboard and remake it.
    createGameBoard()
    // window.location.reload()
} 
//////////HOME FUNCTION //Actions to take when a tic tac toe but has been clicked/picked
const boxClicked = (e) => {
    selectedBox = document.getElementById(e.target.id)
    selectedBox.innerText = whosTurn    //Mark the box with X or O
    selectedBox.disabled = true         //Disable the box just clicked on, so it can't be used.
    turnCounter++                       //Updats the turnCounter so the game end if there is a tie.
    
    //if there is a winner or the game tied. 
    if (ifWonGame(selectedBox.id) || ifTiedGame()) {    //(Note: itWonGame func go first.)
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
    buttons = document.querySelectorAll('.Tic-Tac-Toe-Boxs')
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
winConditionField.value = winCondition
rowField.value = rows
columnField.value = columns

function p (str) {(console.log(str))}