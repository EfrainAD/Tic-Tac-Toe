// import getCoordinates from './getCoordinates.js'
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
     console.log('One Move')
     // vTable.querySelectorAll('button').forEach(button => {
     //      console.log(button.innerHTML)
     // });
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               // console.log('we checking out a move!', aMove)
               if (aMove.innerHTML === ''){
                    // console.log('it empty!')
                    if (winnerCheck.check(aMove.id, 'O', 3)) {
                         console.log("It's a winning move!")
                         console.log(`listOfWinningMoves: ${listOfWinningMoves} amove.id: ${aMove.id}`)
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
const oppOneMoveWin = (vTable, rows, columns) => {
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               if (aMove.innerHTML === ''){
                    if (winnerCheck.check(aMove.id, 'X', 3))
                         return aMove.id
               }
          }
     }
}
const TwoMovesWin = (vTable, rows, columns) => {
     // vTable.querySelectorAll('button').forEach(button => {
     //      console.log(button.innerHTML)
     // });
     for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
               const aMove = vTable.querySelector(`#Row\\:${row}-Column\\:${column}`)
               
               console.log('We looking to play this Vmove', aMove)
               
               if (aMove.innerHTML === ''){
                   aMove.innerHTML = 'O'
                   
                    //     console.log('check table', vTable.querySelector(`#Row\\:${row}-Column\\:${column}`).innerHTML) 
                    //     console.log('we played it!')

                   while (true) {
                        let returnedMove = oneMoveWin(vTable, rows, columns)
                        
                    //     console.log('Can we get a winning move? \n Whats return move say?')
                        console.log(returnedMove)
                        
                        if (returnedMove) {
                         console.log('win move', returnedMove) 
                         // console.log('is this the only one?')
                         console.log(listOfWinningMoves.forEach( move => {
                              console.log(`${move} == ${returnedMove}`)
                               }))
                             if (!listOfWinningMoves.includes(returnedMove))
                               {
                                   listOfWinningMoves.push(returnedMove)
                                  
                                   console.log('added?', listOfWinningMoves)
                                   // console.log('theWinningMove:', theWinningMove)
                                   // console.log('theWinningMove.rating:', theWinningMove.rating)
                                   // console.log('theList.length:', listOfWinningMoves.length)
                                   
                                   if (theWinningMove.rating < listOfWinningMoves.length){
                                        console.log('updating theWinningMove')

                                        theWinningMove.move = aMove.id
                                        theWinningMove.rating = listOfWinningMoves.length
                                        
                                        console.log('update = ', theWinningMove)
                                  }
                             }
                        } else {
                              listOfWinningMoves = []
                              break
                         }
                   }
                   aMove.innerHTML = ''
               }
               // listOfWinningMoves = []

               console.log('BEFORE cleaning at the end of vmove theWinningMove ojb is', theWinningMove)

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
export const playByAi = (rows, columns) => {
     cleanUp()
     const vTable = setUpGameBoard()
     let move = null
     move = oneMoveWin(vTable, rows, columns)
     console.log(("--------------------------".repeat(5)))
     console.log(`oneMoveWin returned ${move}`)
     if (move) {
          return move
     }
     move = oppOneMoveWin(vTable, rows, columns)
     console.log(`oppOneMoveWin returned ${move}`)
     if (move) {
          return move
     }
     move = TwoMovesWin(vTable, rows, columns)
     console.log(`TwoMovesWin returned ${move}`)
     if (move) {
          return move
     }
     console.log('Found nothing, going random')
     return moveRandom(rows, columns)
}