// import getCoordinates from './getCoordinates.js'
export default (rows, columns) => {
     let move = null
     while (!move) {
          const row = Math.floor(Math.random() * rows + 1)
          const column = Math.floor(Math.random() * columns + 1)
          const buttonId = `Row:${row}-Column:${column}`
          console.log(buttonId)
          if (document.getElementById(buttonId).innerText === '')
               return buttonId
     }
}