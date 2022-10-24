// import getCoordinates from './getCoordinates.js'
import {WinnerCheck} from './WinnerCheck.js'
const vTable = document.createElement('table')
const winnerCheck = new WinnerCheck(vTable)

const setUpGameBoard = () => {
     const table = document.querySelector('table')
     // const vTable = document.createElement('table')
     vTable.innerHTML = table.innerHTML;
     return vTable
}
const getRandomCoordinates = (rowsRange, columnsRange) => {
     const row = Math.floor(Math.random() * rowsRange + 1)
     const column = Math.floor(Math.random() * columnsRange + 1)
     return [row, column]
} 
// winnerCheck buttonsCoordinate, whosTurn, winCondition
// const winnerCheck = new WinnerCheck(vTable)
export const moveRandom = (rows, columns) => {
     const vTable = setUpGameBoard()

     while (true) {
          const [row , column] = getRandomCoordinates(rows, columns)
          if (vTable.querySelector(`#Row\\:${row}-Column\\:${column}`).innerText === '') {
               return `Row:${row}-Column:${column}`
          }
     }
}
const oneMoveWin = (vTable, rows, columns) => {
     let row = 0
     let column = 0
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               // console.log(aMove)
               // console.log(vTable)
               if (aMove.innerHTML === ''){
                    if (winnerCheck.check(aMove.id, 'O', 3))
                         return aMove.id
               }
          }
     }
     return moveRandom(rows, columns)
}
export const playByAi = (rows, columns) => {
     const vTable = setUpGameBoard()
     let move = null
     move = oneMoveWin(vTable, rows, columns)
     if (move) {
          return move
     }
}