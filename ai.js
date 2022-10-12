// import getCoordinates from './getCoordinates.js'
export default (rows, columns) => {
     let move = null
     
     while (!move) {
          const moveRow = Math.floor(Math.random() * rows + 1)
          const moveColumn = Math.floor(Math.random() * columns + 1)
          const buttonId = `Row:${row}-Column:${column}`
          if (document.getElementById(buttonId).innerText === '')
               return buttonId
     }
}