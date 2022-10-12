export class WinnerCheck {
     constructor (winCondition) {
          this.winCondition = winCondition
     }
     checkWinHorizontally = (buttonsCoordinates, whosTurn) => {
          let leftCount = 0 
          // countss the x or o to the left of the button that was clicked.
          let rightCount = 0 
          // countss the x or o to the right of the button that was clicked.
          const [row, column] = this.getCoordinates(buttonsCoordinates)
      
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
          if ((leftCount + 1 + rightCount) >= this.winCondition) {
              return true
          }
          else return false
      }
     checkWinVertically = (buttonsCoordinates, whosTurn) => {
         let upwordsCount = 0 
         let downwordsCount = 0 
         const [row, column] = this.getCoordinates(buttonsCoordinates)
     
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
         if ((upwordsCount + 1 + downwordsCount) >= this.winCondition) {
             return true
         }
         else return false
     }
     checkwinDiagonallyToTheLeft = (buttonsCoordinate, whosTurn) => {
         // We are going to count left first then right.
         let upwordsCount = 0 
         let downwordsCount = 0 
         const [row, column] = this.getCoordinates(buttonsCoordinate)
     
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
         if ((upwordsCount + 1 + downwordsCount) >= this.winCondition) {
             return true
         }
         return false
     }
     checkwinDiagonallyToTheRight = (buttonsCoordinate, whosTurn) => {
         // We are going to count left first then right.
         let upwordsCount = 0 
         let downwordsCount = 0 
         const [row, column] = this.getCoordinates(buttonsCoordinate)
     
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
         if ((upwordsCount + 1 + downwordsCount) >= this.winCondition) {
             return true
         }
         return false
     }
     checkwinDiagonally = (buttonsCoordinate, whosTurn) => {
         // check win diagonally to the right and if not a win do so for the other side. return false if no win.
         return this.checkwinDiagonallyToTheLeft(buttonsCoordinate, whosTurn) || this.checkwinDiagonallyToTheRight(buttonsCoordinate, whosTurn)
     }
     getCoordinates = (coordinate) => {
          //split the coordinate into there x and y componits.
          coordinate = coordinate.replace(/[^\d:]/g, '') //Took out the abc's by only keeping digits and ':'
          coordinate = coordinate.replace(':', '')       // took out only the first : so ParseInt would work
          const row = parseInt(coordinate, 10) 
          coordinate = coordinate.split(':').pop()       //Now that this nicly blocked ParseInt, remove it for the next number set.
          const column = parseInt(coordinate, 10)
      
          return [row, column]
      }
     check = (buttonsCoordinate, whosTurn) => {
          if (this.checkWinHorizontally(buttonsCoordinate, whosTurn))
              return true
          else if (this.checkWinVertically(buttonsCoordinate, whosTurn))
              return true
          else if (this.checkwinDiagonally(buttonsCoordinate, whosTurn))
              return true
     }

}