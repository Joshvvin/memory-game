const gameContainer = document.getElementById("game");
// console.log(gameContainer);
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
// console.log(shuffledColors);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color in colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    // const newDiv_inner = document.createElement('div');
    // const newDiv_front = document.createElement('div');
    // const newDiv_back = document.createElement('div');

    newDiv.setAttribute('id', `${color}`)
    newDiv.classList.add(colorArray[color]);
    newDiv.style.backgroundColor = 'white'; 
    newDiv.style.borderRadius = '10px';
    // newDiv.style.border = "1px solid black";
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// console.log(gameContainer);
// for(const colors of gameContainer.children){

// }
// TODO: Implement this function!
let count = 0;
let prevCard = 'null';
let currentCard = 'null';
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log(event.target)
  currentCard = event.target;
  // console.log('inside handlecardclick function of click event');
  // console.log(prevCard, currentCard);
  if(currentCard.style.backgroundColor == 'white'){
    // console.log('inside if block of click event');
    // currentCard.style.backgroundColor = 'red';
    // currentCard.style.backgroundColor = 'blue';
    currentCard.style.backgroundColor = currentCard.getAttribute('class'); 
    // currentCard.classList.append('rotate');
    // const currId = currentCard.getAttribute('id');
    // console.log('event')  
    // const prevId = prevCard.getAttribute('id');
    // console.log(count);
    // if((prevCard == 'null') || (prevCard != 'null' && prevCard != currentCard)){
      count++;
    // }
      if(count == 2){
        count = 0;
        // console.log('inside if', count, prevCard, currentCard);
        // console.log(prevCard, currentCard);
        // const prevId = prevCard.getAttribute('id');
        const prevColor = prevCard.getAttribute('class');
        const currColor = currentCard.getAttribute('class');      
        // console.log(currId, prevId);
        if( currColor == prevColor ){
          prevCard.removeEventListener('click', handleCardClick);
          currentCard.removeEventListener('click', handleCardClick);
        }
        else{
          setTimeout(()=>{
            currentCard.style.backgroundColor = 'white';
            prevCard.style.backgroundColor = 'white';
          },1000);          
        }
      }
      else{
        // console.log('inside else', count, prevCard, currentCard);
        prevCard = currentCard;
        currentCard = 'null';
      } 
    // }
    // console.log(count);
  }
  else{
    currentCard.style.backgroundColor = 'white';
    if(prevCard == currentCard){
      prevCard = 'null';
    }
    currentCard = 'null';
    count = 0;
  }
  
  // console.log("you clicked",count, 'times');
}

// // when the DOM loads
createDivsForColors(shuffledColors);