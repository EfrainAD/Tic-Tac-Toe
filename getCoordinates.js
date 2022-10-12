
// get  Coordinates row and column for game.
// returns  return [row, column] 
export default (coordinate) => {
     //split the coordinate into there x and y componits.
     coordinate = coordinate.replace(/[^\d:]/g, '') //Took out the abc's by only keeping digits and ':'
     coordinate = coordinate.replace(':', '')       // took out only the first : so ParseInt would work
     const row = parseInt(coordinate, 10) 
     coordinate = coordinate.split(':').pop()       //Now that this nicly blocked ParseInt, remove it for the next number set.
     const column = parseInt(coordinate, 10)

     return [row, column]
}