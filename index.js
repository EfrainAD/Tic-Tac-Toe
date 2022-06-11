let whosTurn = 'X' //X player starts the game //Be toggled from X and Y
let turnCounter = 0; //To know
//function check if win
    // if row ( if o/x Row number = 3)
    // if col (if o/x column = 3)
    // if diagnal            let hit = 1 
    //  check Dia right       ++ (chick) > -2-2 if hit=3
    //                        +2+2 -3-3
    //                        about but flip the signs. 
    //  if git === 3 run function Win                                  
//function check if tie (Note: check win func go first.)
    // if number or turn has reached it's end.
//funcion win 
       // disable buttons something lick document.querySelector('#button').disabled = true;
//function Game Resect 
    //window.location.reload() //Will test see how it goes.
    //                          See if this will reset any JS values.
    //                          if not reset them.
//


//Actions to take when a tic tac toe but has been clicked/picked
const boxClicked = (e) => {
    //change box to x/o
    selectedBox = document.getElementById(e.target.id)
    selectedBox.innerText = whosTurn
    //disable the button.
    selectedBox.disabled = true;
    //update the turn counter
    turnCounter++
    //if there is a winner or tie

    
    //updates whos turn to whos turn is next
    document.getElementById('Message-Board').innerText = `It's ${whosTurn} players turn`
    //update display whos turn is next     //this line unders needs be changed.
    
    Temps remove
    //document.getElementById('Message-Board').innerText = `You clicked ${e.target.id}`
}

// // And eventLes to everything
//addEventListener to all the x/o boxs in the game. 
for (let row = 1; row <= 3; row++) {
    for (let column = 1; column <= 3; column++)
        document.getElementById(`Row:${row}-Column:${column}`).addEventListener('click', boxClicked)
}
document.getElementById('game-reset').addEventListener('click',emptyPlaceHolder)


function emptyPlaceHolder (e) {
    boxClicked(e)
}