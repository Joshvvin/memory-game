const gameContainer = document.getElementById("game");
// console.log(gameContainer);
const COLORS = [
  // "red",
  // "blue",
  // "green",
  // "orange",
  // "purple"
  // "red",
  // "blue",
  // "green",
  // "orange",
  // "purple",
  // 'rgb(0,0,0)',
  // 'red',
  // 'blue'
  // 'red'
];
// console.log(COLORS);
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


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
// console.log(gameContainer);
function createDivsForColors(colorArray, size) {
  // console.log(colorArray, randomNumber);
  let index_count = 0;
  let last_div = 1;
  for(let ind = 2; ind < size/2; ind ++){
    if(size%ind == 0){
      last_div = ind;
    }
  }
  // console.log(size, last_div, size/last_div);
  let ind_width = Math.floor(100/(size/last_div)) - 1;
  // console.log(ind_width, last_div, size);
  let ind_height = Math.floor(100/(last_div)) - 2;
  if(screen.width < 700 && screen.width > 500){
    console.log('width less than 700px');
    const low_size = Math.min(last_div, size/last_div);
    const max_size = Math.max(last_div, size/last_div);
    console.log(low_size, max_size);
    // console.log('width less than 700px');
    ind_width = Math.floor(100/(low_size)) - 1;
    ind_height = Math.floor(100/(max_size)) - 1;
    console.log(ind_width, ind_height);
  }
  

  for(let ind = 0; ind < 2; ind++){
    // })
    for (let color in colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
      newDiv.setAttribute('id', `${index_count}`)
      newDiv.classList.add(colorArray[color]);
      newDiv.style.backgroundColor = 'white'; 
      newDiv.style.borderRadius = '10px';
     
      newDiv.style.width = `${ind_width}%`;
      
      newDiv.style.height = `${ind_height}%`;
      // newDiv.style.border = "1px solid black";
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
      // console.log(gameContainer);
      index_count++;
    }
  }
}
// console.log(gameContainer);
// for(const colors of gameContainer.children){

// }
// let shuffledColors = shuffle(COLORS);

//   // console.log(shuffledColors);
//   createDivsForColors(shuffledColors);
// TODO: Implement this function!
let c = 0;
let count = 0;
let prevCard = 'null';
let currentCard = 'null';
let score = 0;
localStorage.setItem('score', 100);
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log(event.target)
  currentCard = event.target;
  // console.log('inside handlecardclick function of click event');
  // console.log(prevCard, currentCard);
  const score_var = document.querySelector('.score_var');
  // score_var.textContent = score;
  if(currentCard.style.backgroundColor == 'white'){
    // console.log('inside if block of click event');
    // currentCard.style.backgroundColor = 'red';
    // currentCard.style.backgroundColor = 'blue';
    currentCard.style.backgroundColor = currentCard.getAttribute('class'); 
    currentCard.removeEventListener('click', handleCardClick);
    // currentCard.classList.append('rotate');
    // const currId = currentCard.getAttribute('id');
    // console.log('event')  
    // const prevId = prevCard.getAttribute('id');
    // console.log(count);
    // if((prevCard == 'null') || (prevCard != 'null' && prevCard != currentCard)){
      count++;
      // }
      // console.log(localStorage.getItem('score'));
      
      // const sc = localStorage.getItem('score');
      // console.log(sc);
      if(count == 2){
        score++;
        score_var.textContent = score;
        count = 0;
        // console.log('inside if', count, prevCard, currentCard);
        // console.log(prevCard, currentCard);
        
        // const prevId = prevCard.getAttribute('id');
        const prevColor = prevCard.getAttribute('class');
        const currColor = currentCard.getAttribute('class');      
        // console.log(currId, prevId);
        if( currColor == prevColor ){
          prevCard.removeEventListener('click', handleCardClick);
          c+=2;
          // let c = 0;
          // for(const card of gameContainer.children){
          //   // console.log(card.getAttribute('class'), card.style.backgroundColor);
          //   if(card.getAttribute('class') == card.style.backgroundColor){
          //     c++;
          //   }
          // }
          // console.log(c);
          if(c == gameContainer.children.length){
            const score_cont = document.querySelector('.score_var');
            const bestscore_cont = document.querySelector('.bestscore');
            // console.log(score.textContent, bestscore.textContent, localStorage.getItem('score'));
            const score = parseInt(score_cont.textContent);
            let bestscore = parseInt(bestscore_cont.textContent);
            const locstore = parseInt(localStorage.getItem('score'));
            console.log(score, bestscore, locstore);
            if(score < locstore){
              // console.log('inside score < locstore');
              bestscore = score;
              bestscore_cont.textContent = bestscore;
              localStorage.setItem('score', score);
            }
            // console.log('outside if');
            const restart = document.querySelector('.restart');
            restart.style.display = 'flex';   
            // console.log(score, bestscore.textContent, localStorage.getItem('score'));
          }
        }
        else{         
          for(const card of gameContainer.children){
            if(card.getAttribute('id') != currentCard.getAttribute('id') && card.getAttribute('id') != prevCard.getAttribute('id')){
              card.removeEventListener('click', handleCardClick);
            }
          }
          setTimeout(()=>{
            currentCard.style.backgroundColor = 'white';
            prevCard.style.backgroundColor = 'white';
            for(const card of gameContainer.children){
              // if(card.getAttribute('id') != currentCard.getAttribute('id') && card.getAttribute('id') != prevCard.getAttribute('id')){
                card.addEventListener('click', handleCardClick);
              // }
            }
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

let randomNumber = 10;
const start = document.querySelector('.start');
function startgame(){
  randomNumber = Math.floor(Math.random()*5 + 5);
  // console.log(randomNumber*2);
  for(let ind = 0; ind < randomNumber; ind++){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    // console.log(r,g,b);
    const color = `rgb(${r},${g},${b})`;
    // console.log(color);
    // console.log(color);
    // console.log(rgb(r,g,b));
    COLORS.push(color);
  }
  let shuffledColors = shuffle(COLORS);
  // console.log(shuffledColors);
  createDivsForColors(shuffledColors, randomNumber*2);
  
  const display_button = document.querySelector('.display_button');
  display_button.style.display = 'none';
  gameContainer.style.display = 'flex';
  const score_container = document.querySelector('.score_container');
  score_container.style.display = 'flex';
  const container = document.querySelector('.container');
  // container.style.justifyContent = 'space-between';
}
start.addEventListener('click', startgame);

const restart_game = document.querySelector('.restart_game')
const restart = document.querySelector('.restart');
function restartgame(){
  restart.style.display = 'none';
  gameContainer.style.display = 'flex';
  score = 0;
  let shuffledColors = shuffle(COLORS);
  // console.log(shuffledColors);
  createDivsForColors(shuffledColors, randomNumber*2);
  const score_cont = document.querySelector('.score_var');
  score_cont.textContent = score;
  for(const card of gameContainer.children){
    card.style.backgroundColor = 'white';
    card.addEventListener('click', handleCardClick);
  }
}
restart_game.addEventListener('click', restartgame);