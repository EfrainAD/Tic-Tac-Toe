import {WinnerCheck} from './WinnerCheck.js'
const vTable = document.createElement('table')
const winnerCheck = new WinnerCheck(vTable)
let winCondition = null
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
     return vTable
}
const getRandomCoordinates = (rowsRange, columnsRange) => {
     const row = Math.floor(Math.random() * rowsRange + 1)
     const column = Math.floor(Math.random() * columnsRange + 1)
     return [row, column]
} 
export const moveRandom = (rows, columns) => {
     const vTable = setUpGameBoard()

     while (true) {
          const [row , column] = getRandomCoordinates(rows, columns)
          if (vTable.querySelector(`#Row\\:${row}-Column\\:${column}`).innerText === '') {
               return `Row:${row}-Column:${column}`
          }
     }
}
const oneMoveWin = (vTable, whosTurn, rows, columns) => {
     // console.log('One Move')
     // vTable.querySelectorAll('button').forEach(button => {
     //      console.log(button.innerHTML)
     // });
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               // console.log('we checking out a move!', aMove)
               if (aMove.innerHTML === ''){
                    // console.log('it empty!')
                    if (winnerCheck.check(aMove.id, whosTurn, winCondition)) {
                         // console.log("It's a winning move!")
                         // console.log(`listOfWinningMoves: ${listOfWinningMoves} amove.id: ${aMove.id}`)
                         // console.log('what this if say?',listOfWinningMoves.includes(move => move == aMove.id))
                         // console.log('oneMoveWin')

                         if (!listOfWinningMoves.includes(aMove.id)) {
                              // console.log('yessssss')
                              return aMove.id
                         }
                    }
               }
          }
     }
     return null
}
const TwoMovesWin = (vTable, whosTurn, rows, columns) => {
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               
               if (aMove.innerHTML === ''){
                   aMove.innerHTML = whosTurn

                   while (true) {
                        let returnedMove = oneMoveWin(vTable, whosTurn, rows, columns)
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
              if (theWinningMove.winnerRating > 3)
                    console.log('at the end of vmove theWinningMove ojb is', theWinningMove)
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
export const playByAi = (aiTurn, oppTurn, winConditionPassed, rows, columns) => {
     // console.log(("--------------------------".repeat(5)))
     cleanUp()
     winCondition = winConditionPassed
     const vTable = setUpGameBoard()
     let move = null

     move = oneMoveWin(vTable, aiTurn, rows, columns)
     // console.log(`oneMoveWin returned ${move}`)
     if (move) {
          return move
     }
     move = oneMoveWin(vTable, oppTurn, rows, columns)
     console.log(`oppOneMoveWin returned ${move}`)
     if (move) {
          return move
     }
     move = TwoMovesWin(vTable, aiTurn, rows, columns)
     if (move) {
          return move
     }
     cleanUp()
     move = TwoMovesWin(vTable, oppTurn, rows, columns)
     if (move) {
          console.log('call')
          return move
     }
     
     return moveRandom(rows, columns)
}