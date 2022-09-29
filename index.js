let whosTurn = 'X' //X player starts the game //Be toggled from X and Y
let turnCounter = 0; //To know
// Controls how many rows and columns the game has
const rows = 5 
const columns = 8
const winCondition = 3

const newGetCoordinates = (coordinate) => {
    //split the coordinate into there x and y componits.
    p(coordinate)
    coordinate = coordinate.replace(/[^\d:]/g, '') //Took out the abc's by only keeping digits and ':'
    coordinate = coordinate.replace(':', '')       // took out only the first : so ParseInt would work
    const row = parseInt(coordinate, 10) 
    coordinate = coordinate.split(':').pop()       //Now that this nicly blocked ParseInt, remove it for the next number set.
    const column = parseInt(coordinate, 10)

    return [row, column]
}

const getCoordinates = (coordinate) => {
    //split the coordinate into there x and y componits.
    coordinate = coordinate.replace(/[^\d:]/g, '') //Took out the abc's by only keeping digits and ':'
    coordinate = coordinate.replace(':', '')       // took out only the first : so ParseInt would work
    const x = parseInt(coordinate, 10) 
    coordinate = coordinate.split(':').pop()       //Now that this nicly blocked ParseInt, remove it for the next number set.
    const y = parseInt(coordinate, 10)
    
    const buttonsCoordinates = { //The coordinates need ot find out if there 3 in a row
        //horizontal set
        rightBlock: `Row:${x}-Column:${y+1}`,
        rightPlusBlock: `Row:${x}-Column:${y+2}`,
        leftBlock: `Row:${x}-Column:${y-1}`,
        leftPlusBlock: `Row:${x}-Column:${y-2}`,

        //vertical set
        upBlock: `Row:${x-1}-Column:${y}`,
        upPlusBlock: `Row:${x-2}-Column:${y}`,
        downBlock: `Row:${x+1}-Column:${y}`,
        downPlusBlock: `Row:${x+2}-Column:${y}`,

        //diagnal to the right set
        diagonalRightUpBlock: `Row:${x-1}-Column:${y+1}`,
        diagonalRightUpPlusBlock: `Row:${x-2}-Column:${y+2}`,
        diagonalLeftDownBlock: `Row:${x+1}-Column:${y-1}`,
        diagonalLeftDownPlusBlock: `Row:${x+2}-Column:${y-2}`,
        //diagnal to the left sets=
        diagonalLeftUpBlock: `Row:${x-1}-Column:${y-1}`,
        diagonalLeftUpPlusBlock: `Row:${x-2}-Column:${y-2}`,
        diagonalRightDownBlock: `Row:${x+1}-Column:${y+1}`,
        diagonalRightDownPlusBlock: `Row:${x+2}-Column:${y+2}`
    };
    return buttonsCoordinates
}
const checkWinHorizontally = (buttonsCoordinates) => {
    let leftCount = 0 
    // countss the x or o to the left of the button that was clicked.
    let rightCount = 0 
    // countss the x or o to the right of the button that was clicked.
    const [row, column] = newGetCoordinates(buttonsCoordinates)

    // loop that moves lelt as long as innerText is === whosTurn, 
    // And for everone one add 1 to leftCounter

    // setting up the starting values for the column index and colrdinate element
    let columnIndex = column
    let rowIndex = row
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
        p(rightCount)
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
    // const buttonsCoordinates = getCoordinates(buttonsCoordinate)
    //p(`coordinate above: ${document.getElementById(buttonsCoordinates.upBlock).innerText}`)
    if (document.getElementById(buttonsCoordinates.upBlock)){ //check if there is a top button
        //p(`There is a block above this one`)
        if ((document.getElementById(buttonsCoordinates.upBlock)).innerText === whosTurn) {
            //p('This is an '+whosTurn+' above me.')
            //if right block is a hit there is only two case to give a win.
            if (document.getElementById(buttonsCoordinates.upPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.upPlusBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the up up of me.')
                    wonGame()
                    return true
                }
            }
            if (document.getElementById(buttonsCoordinates.downBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.downBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the down of me.')
                    wonGame()
                    return true
                }
            }
        } 
    }   
    if (document.getElementById(buttonsCoordinates.downBlock)){ //check if there is a left button
        //p('LLLLLLeft '+whosTurn+' to the down of me. ' )
        if ((document.getElementById(buttonsCoordinates.downBlock)).innerText === whosTurn) {
            //p('LLLLLLeft '+whosTurn+' to the left of me. ' )
            //if the left block is a hit there is only one case to give a win. (The other one already been checked above)
            if (document.getElementById(buttonsCoordinates.downPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.downPlusBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the donw donw  of me.')
                    wonGame()
                    return true
                }
            }
        }
    }
}
const checkwinDiagonally = (buttonsCoordinates) => {
    //right Diagonal 
    if (document.getElementById(buttonsCoordinates.diagonalRightUpBlock)){ //check if there is a right button
        // p('This is REAL '+whosTurn+' to the right of me.')
        
        if ((document.getElementById(buttonsCoordinates.diagonalRightUpBlock)).innerText === whosTurn) {
            //p('This is an '+whosTurn+' to the right of me.')
            //if right block is a hit there is only two case to give a win.
            if (document.getElementById(buttonsCoordinates.diagonalRightUpPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.diagonalRightUpPlusBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the right right of me.')
                    wonGame()
                    return true
                }
            }
            if (document.getElementById(buttonsCoordinates.diagonalLeftDownBlock)) { //check if it exist
                //p('Yyyyyyyyyy')
                if ((document.getElementById(buttonsCoordinates.diagonalLeftDownBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the right right of me.')
                    wonGame()
                    return true
                }
            }
        } 
    }
    if (document.getElementById(buttonsCoordinates.diagonalLeftDownBlock)){ //check if there is a left button
        //p('LLLLLLeft '+whosTurn+' to the down of me. ' )
        if ((document.getElementById(buttonsCoordinates.diagonalLeftDownBlock)).innerText === whosTurn) {
            //p('LLLLLLeft '+whosTurn+' to the left of me. ' )
            //if the left block is a hit there is only one case to give a win. (The other one already been checked above)
            if (document.getElementById(buttonsCoordinates.diagonalLeftDownPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.diagonalLeftDownPlusBlock)).innerText === whosTurn) {
                    //p('This is an '+whosTurn+' to the donw donw  of me.')
                    wonGame()
                    return true
                }
            }
        }
    }
    // left diagnal
    if (document.getElementById(buttonsCoordinates.diagonalLeftUpBlock)){ //check if there is a right button
        if ((document.getElementById(buttonsCoordinates.diagonalLeftUpBlock)).innerText === whosTurn) {
            if (document.getElementById(buttonsCoordinates.diagonalLeftUpPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.diagonalLeftUpPlusBlock)).innerText === whosTurn) {
                    wonGame()
                    return true
                }
            }
            p(buttonsCoordinates.diagonalRightDownBlock)
            if (document.getElementById(buttonsCoordinates.diagonalRightDownBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.diagonalRightDownBlock)).innerText === whosTurn) {
                    wonGame()
                    return true
                }
            }
        } 
    }
    if (document.getElementById(buttonsCoordinates.diagonalRightDownBlock)){ //check if there is a left button
        if ((document.getElementById(buttonsCoordinates.diagonalRightDownBlock)).innerText === whosTurn) {
            if (document.getElementById(buttonsCoordinates.diagonalRightDownPlusBlock)) { //check if it exist
                if ((document.getElementById(buttonsCoordinates.diagonalRightDownPlusBlock)).innerText === whosTurn) {
                    wonGame()
                    return true
                }
            }
        }
    }
}
const ifWonGame = (buttonsCoordinate) => {
    const buttonsCoordinates = getCoordinates(buttonsCoordinate)
    
    if (checkWinHorizontally(buttonsCoordinate))
        return true
    else if (checkWinVertically(buttonsCoordinates))
        return true
    else if (checkwinDiagonally(buttonsCoordinates))
        return true
}
//function check if tie game.                 
const ifTiedGame = () => {
    if (turnCounter === (document.querySelectorAll('.Tic-Tac-Toe-Boxs').length)) {
        document.getElementById('Message-Board').innerText = 'This game is a tie!'
        return true
    }
    return false
}
//This is here becuase there are more then one play a palyer can win. 
const wonGame = () => {
    document.getElementById('Message-Board').innerText = `${whosTurn} player Won!`
}       
//Reset the whole game over
const gameReset = () => {
    window.location.reload()   
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
        document.getElementById('Message-Board').innerText = `It's ${whosTurn} players turn`    //update display whos turn is next
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

//Make table ${rows} 
//Make table ${column} each  `${n}colunm` in each row with for loop inside rows loop.
//put a button in each column with class name `Row:${row}-Column:${column}` 
//and add an eventEventListener to it.

const table = document.querySelector('table')
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

//addEventListener to all the x/o boxs in the game. 
// for (let row = 1; row <= 3; row++) {
//     for (let column = 1; column <= 3; column++)
//         document.getElementById(`Row:${row}-Column:${column}`).addEventListener('click', boxClicked)
// }
//addEventListener to the reset game button
document.getElementById('game-reset').addEventListener('click',gameReset)

function p (str) {(console.log(str))}