// import getCoordinates from './getCoordinates.js'
import {WinnerCheck} from './WinnerCheck.js'
export default (rows, columns) => {
     let move = null
     
     const table = document.querySelector('table')
     const vTable = document.createElement('table')
     vTable.innerHTML = table.innerHTML;
     const winnerCheck = new WinnerCheck(vTable)
     // winnerCheck buttonsCoordinate, whosTurn, winCondition

     // console.log(document.querySelector('.'))
     while (!move) {
          const row = Math.floor(Math.random() * rows + 1)
          const column = Math.floor(Math.random() * columns + 1)
          const buttonId = `Row:${row}-Column:${column}`
          if (document.querySelector(`#Row\\:${row}-Column\\:${column}`).innerText === ''){
               // console.log('thischeck is', winnerCheck.check(buttonId, 'X', 2))
               // if (winnerCheck.check(buttonId, 'O', 2)) {
               //      table.innerHTML = ('<h1>winner</h1>')
               // }
               return buttonId
          }
     }
}