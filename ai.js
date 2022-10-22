// import getCoordinates from './getCoordinates.js'
import {WinnerCheck} from './WinnerCheck.js'

const setUpGameBoard = () => {
     const table = document.querySelector('table')
     const vTable = document.createElement('table')
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