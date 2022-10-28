import {WinnerCheck} from './WinnerCheck.js'
const vTable = document.createElement('table')
const winnerCheck = new WinnerCheck(vTable)
let listOfWinningMoves = []
let theWinningMove = {
     move: '',
     rating: 0,
     winner: '',
     winnerRating: 0
}

const setUpGameBoard = () => {
     const table = document.querySelector('table')
     vTable.innerHTML = table.innerHTML;
}
const getRandomCoordinates = (rowsRange, columnsRange) => {
     const row = Math.floor(Math.random() * rowsRange + 1)
     const column = Math.floor(Math.random() * columnsRange + 1)
     return [row, column]
} 
const moveRandom = (rows, columns) => {
     while (true) {
          const [row , column] = getRandomCoordinates(rows, columns)
          if (vTable.querySelector(`#Row\\:${row}-Column\\:${column}`).innerText === '') {
               return `Row:${row}-Column:${column}`
          }
     }
}
const oneMoveWin = (whosTurn, winCondition, rows, columns) => {
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               
               if ( aMove.innerHTML === '' && 
                    winnerCheck.check(aMove.id, whosTurn, winCondition) &&
                    !listOfWinningMoves.includes(aMove.id)
                    ) {
                         return aMove.id
                    }
          }
     }
     return null
}
const TwoMovesWin = (whosTurn, winCondition, rows, columns) => {
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               
               if (aMove.innerHTML === '') {
                   aMove.innerHTML = whosTurn

                   while (true) {
                        let returnedMove = oneMoveWin(whosTurn, winCondition, rows, columns)

                        if (returnedMove) {
                             if (!listOfWinningMoves.includes(returnedMove))
                               {
                                   listOfWinningMoves.push(returnedMove)
                                   
                                   if (theWinningMove.rating < listOfWinningMoves.length){
                                        theWinningMove.move = aMove.id
                                        theWinningMove.rating = listOfWinningMoves.length
                                  }
                             }
                        } else {
                              listOfWinningMoves = []
                              break
                         }
                   }
                   aMove.innerHTML = ''
               }

               if (theWinningMove.rating > 1) {
                    if (theWinningMove.rating > theWinningMove.winnerRating) {
                         theWinningMove.winner = theWinningMove.move
                         theWinningMove.winnerRating = theWinningMove.rating
                         theWinningMove.move = ''
                         theWinningMove.rating = 0      
                    }
              } else {
                   theWinningMove = {
                        move: '',
                        rating: 0, 
                        winner: theWinningMove.winner,
                        winnerRating: theWinningMove.winnerRating
                   }
              }
          }
     }
     return theWinningMove.winner
}
const cleanUp = () => {
     listOfWinningMoves = []
     theWinningMove = 
     {
          move: '',
          rating: 0,
          winner: '',
          winnerRating: 0
     }
}
export const playByAi = (aiTurn, oppTurn, winCondition, rows, columns) => {
     cleanUp()
     setUpGameBoard()
     let move = null

     move = oneMoveWin(aiTurn, winCondition, rows, columns)
     if (move) {
          return move
     }
     move = oneMoveWin(oppTurn, winCondition, rows, columns)
     if (move) {
          console.log(`I don't want you to play there.`)
          return move
     }
     move = TwoMovesWin(aiTurn, winCondition, rows, columns)
     if (move) {
          console.log('I win in two moves!')
          return move
     }
     cleanUp()
     move = TwoMovesWin(oppTurn, winCondition, rows, columns)
     if (move) {
          console.log('I stopped you from playing a move that would let you win in two moves.')
          return move
     }
     console.log('I just played a random move.')
     return moveRandom(rows, columns)
}