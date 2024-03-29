import getCoordinates from './getCoordinates.js'
export class WinnerCheck {
    constructor (table) {
            this.table = table
    }
    checkWinHorizontally = (buttonsCoordinates, whosTurn, winCondition) => {
        let leftCount = 0 
        // countss the player's move to the left of the button that was placed.
        let rightCount = 0 
        // countss the player's move to the right of the button that was placed.
        const [row, column] = getCoordinates(buttonsCoordinates)
    
        // loop that moves lelt as long as innerText is === whosTurn, 
        // And for everone one add 1 to leftCounter
    
        // setting up the starting values for the column index and colrdinate element
        let columnIndex = column
        let coordinateElement = this.table.querySelector(`#Row\\:${row}-Column\\:${--columnIndex}`)
        
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                leftCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${row}-Column\\:${--columnIndex}`)
        }
    
        // loop that moves right as long as innerText is === whosTurn, 
        // And for every one that match add 1 to rightCounter
        
        // Resetting column index and colrdinate element back to there starting values
        columnIndex = column
        coordinateElement = this.table.querySelector(`#Row\\:${row}-Column\\:${++columnIndex}`)
    
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                rightCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${row}-Column\\:${++columnIndex}`)
        }
        //Then we we add them up. leftCounter and rightCounter + 1 for the one the player just put down.
        // Return true if counter is = or larger then winCondition 
        if ((leftCount + 1 + rightCount) >= winCondition) {
            return true
        }
        else return false
    }
    checkWinVertically = (buttonsCoordinates, whosTurn, winCondition) => {
        let upwordsCount = 0 
        let downwordsCount = 0 
        const [row, column] = getCoordinates(buttonsCoordinates)
    
        // loop that moves lelt as long as innerText is === whosTurn, 
        // And for everone one add 1 to leftCounter
    
        // setting up the starting values for the column index and colrdinate element
        let rowIndex = row
        let coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${column}`)
        
        // Counts player's moves above where the player just played.
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                upwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${column}`)
        }
    
        // loop that moves that are below as long as innerText is === whosTurn, 
        // And for every one that match add 1 to downwordsCounter
        
        // Resetting rows index and colrdinate element back to there starting values
        rowIndex = row
        coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${column}`)
    
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                downwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${column}`)
        }
        //Then we we add them up. leftCounter and rightCounter + 1 for the one the player just put down.
        // Return true if counter is = or larger then winCondition 
        if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
            return true
        }
        else return false
    }
    checkwinDiagonallyToTheLeft = (buttonsCoordinate, whosTurn, winCondition) => {
        // We are going to count left first then right.
        let upwordsCount = 0 
        let downwordsCount = 0 
        const [row, column] = getCoordinates(buttonsCoordinate)
    
        // loop through moves as long as innerText is === whosTurn, 
        // And for everone one add 1 to the appropriate Counter
    
        // setting up the starting values for the column index and colrdinate element
        let rowIndex = row
        let columnIndex = column
        let coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${--columnIndex}`)
        
        // Counts player's moves above/left where the player just played.
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                upwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${--columnIndex}`)
        }
    
        // reset the starting values for the loop.
        rowIndex = row
        columnIndex = column
        coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${++columnIndex}`)
        
        // Counts player's moves lower/right where the player just played.
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                downwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${++columnIndex}`)
        }
    
        //Then we we add them up + 1 (for the one the player just put down).
        if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
            return true
        }
        return false
    }
    checkwinDiagonallyToTheRight = (buttonsCoordinate, whosTurn, winCondition) => {
        // We are going to count left first then right.
        let upwordsCount = 0 
        let downwordsCount = 0 
        const [row, column] = getCoordinates(buttonsCoordinate)
    
        // loop through moves as long as innerText is === whosTurn, 
        // And for everone one add 1 to the appropriate Counter
    
        // setting up the starting values for the column index and colrdinate element
        let rowIndex = row
        let columnIndex = column
        let coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${++columnIndex}`)
        
        // Counts player's moves above/left where the player just played.
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                upwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${--rowIndex}-Column\\:${++columnIndex}`)
        }
    
        // reset the starting values for the loop.
        rowIndex = row
        columnIndex = column
        coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${--columnIndex}`)
        
        // Counts player's moves lower/right where the player just played.
        while (coordinateElement) {
            if (coordinateElement.innerText === whosTurn)
                downwordsCount++
            else
                break
            coordinateElement = this.table.querySelector(`#Row\\:${++rowIndex}-Column\\:${--columnIndex}`)
        }
    
        //Then we we add them up + 1 (for the one the player just put down).
        if ((upwordsCount + 1 + downwordsCount) >= winCondition) {
            return true
        }
        return false
    }
    checkwinDiagonally = (buttonsCoordinate, whosTurn, winCondition) => {
        // check win diagonally to the right and if not a win do so for the other side. return false if no win.
        return this.checkwinDiagonallyToTheLeft(buttonsCoordinate, whosTurn, winCondition) || this.checkwinDiagonallyToTheRight(buttonsCoordinate, whosTurn, winCondition)
    }
    check = (buttonsCoordinate, whosTurn, winCondition) => {
        if (this.checkWinHorizontally(buttonsCoordinate, whosTurn, winCondition))
            return true
        else if (this.checkWinVertically(buttonsCoordinate, whosTurn, winCondition))
            return true
        else if (this.checkwinDiagonally(buttonsCoordinate, whosTurn, winCondition))
            return true
    }
}