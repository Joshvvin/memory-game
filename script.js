const gameContainer = document.getElementById("game");
// console.log(gameContainer);
const COLORS = [];
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

const levels = [0,0,0];
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
  let ind_width = Math.floor(100/(size/last_div)) - 1;
  // console.log(ind_width, last_div, size);
  let ind_height = Math.floor(100/(last_div)) - 2;
  const low_size = Math.min(last_div, size/last_div);
  const max_size = Math.max(last_div, size/last_div);

  // console.log(low_size, max_size);
  ind_width = Math.floor(100/(low_size)) - 1;
  ind_height = Math.floor(100/(max_size)) - 1;
  
  // // if(low_size <= 3 || max_size <= 3){
    
  // // }
  // // if(low_size <= 3){
  // //   ind_width = Math.floor(100/low_size) -5;
  // // }
  // console.log(ind_width, ind_height);
  // if(screen.width < 700 && screen.width > 350){
  //   // console.log('width less than 700px');
    // console.log(low_size, max_size);
  //   // console.log(low_size, max_size);
  //   // console.log('width less than 700px');
  //  // console.log(ind_width, ind_height);
  // }
  

  // for(let ind = 0; ind < 2; ind++){
    // })
    // console.log('inside create');
    for (let color in colorArray) {
      // create a new div
      //  console.log(colorArray[color]);
      const newDiv = document.createElement("div");
      newDiv.setAttribute('id', `${index_count}`)
      newDiv.classList.add(colorArray[color]);
      newDiv.style.backgroundColor = 'white';
      // newDiv.style.backgroundImage = 'url("./firewatch-video-games-landscape-artwork-wallpaper-preview.jpg")'; 
      newDiv.style.backgroundSize = '100% 100%';
      newDiv.style.borderRadius = '10px';
      // if(low_size == 2){
      //   newDiv.style.width = '18%';
      //   newDiv.style.height = '20%';
      // }
      // else{
        // newDiv.style.width = `${ind_width}%`;
        
        // newDiv.style.height = `${ind_height}%`;
      // }
      // newDiv.style.border = "1px solid black";
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
      // console.log(gameContainer);
      index_count++;
    }
  // }
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
// localStorage.setItem('easy_score', 100);
// localStorage.setItem('medium_score', 100);
// localStorage.setItem('hard_score', 100);

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log(event.target)
  currentCard = event.target;
  // console.log('inside handlecardclick function of click event');
  // console.log(prevCard, currentCard);
  const score_var = document.querySelector('.score_var');
  // score_var.textContent = score;
  if(currentCard.style.backgroundColor == 'white'){
    currentCard.style.backgroundColor = currentCard.getAttribute('class'); 
    count++;
    if(count == 2){
      score++;
      score_var.textContent = score;
      count = 0;
      const prevColor = prevCard.getAttribute('class');
      const currColor = currentCard.getAttribute('class');      
      // console.log(currId, prevId);px
      if(currColor == prevColor ){
        currentCard.removeEventListener('click', handleCardClick);
        prevCard.removeEventListener('click', handleCardClick);
        c += 2;
        if(c >= gameContainer.children.length){
          const score_cont = document.querySelector('.score_var');
          const bestscore_cont = document.querySelector('.bestscore');
          console.log(localStorage.getItem('easy_score'), localStorage.getItem('medium_score'), localStorage.getItem('hard_score'));
          const score = parseInt(score_cont.textContent);
          let bestscore = parseInt(bestscore_cont.textContent);
          let locstore = parseInt(localStorage.getItem('easy_score'));
          console.log(levels);
          if(levels[1] == 1){
            locstore = parseInt(localStorage.getItem('medium_score'));
            if(score < locstore){
              // console.log('inside score < locstore');
              bestscore = score;
              bestscore_cont.textContent = bestscore;
              localStorage.setItem('medium_score', score);
            }
          }
          else if(levels[2] == 1){
            locstore = parseInt(localStorage.getItem('hard_score'));
            if(score < locstore){
              // console.log('inside score < locstore');
              bestscore = score;
              bestscore_cont.textContent = bestscore;
              localStorage.setItem('hard_score', score);
            }
          }
          else{
            if(score < locstore){
              // console.log('inside score < locstore');
              bestscore = score;
              bestscore_cont.textContent = bestscore;
              localStorage.setItem('easy_score', score);
            }
          }
          console.log(localStorage.getItem('easy_score'), localStorage.getItem('medium_score'), localStorage.getItem('hard_score'));
          // console.log(score, bestscore, locstore);
          
          // console.log('outside if');
          const restart = document.querySelector('.restart');
          restart.style.display = 'flex';   
          // console.log(score, bestscore.textContent, localStorage.getItem('score'));
        }
      }
      else{         
        for(const card of gameContainer.children){
          // if(card.getAttribute('id') != currentCard.getAttribute('id') && card.getAttribute('id') != prevCard.getAttribute('id')){
            card.removeEventListener('click', handleCardClick);
        }
        setTimeout(()=>{
          currentCard.style.backgroundColor = 'white';
          prevCard.style.backgroundColor = 'white';
          for(const card of gameContainer.children){
            // console.log(card.getAttribute('class'), card.style.backgroundColor);
            if(card.getAttribute('class') != card.style.backgroundColor.split(' ').join('')){
              card.addEventListener('click', handleCardClick);
            }
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

let randomNumber = 6;
const diff_cont = document.querySelector('.difficulty_container');
const start = document.querySelector('.start');
const game_cont = document.querySelector('.game_container');
function startgame(){
  // randomNumber = Math.floor(Math.random()*7 + 5);
  // console.log(randomNumber*2);
  // console.log(randomNumber);
  // if(randomNumber%6 != 0){
  //   randomNumber += (6-randomNumber%6)/2;
  // }
  // console.log((randomNumber*2)%6);  
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
    COLORS.push(color);
  }
  let shuffledColors = shuffle(COLORS);
  // console.log(shuffledColors);
  createDivsForColors(shuffledColors, randomNumber*2);
  const display_button = document.querySelector('.display_button_container');
  const header = document.querySelector('.header_container');
  header.style.display = 'none';
  // const score_cont
  diff_cont.style.display = 'none';
  display_button.style.display = 'none';
  game_cont.style.display = 'flex';
  const score_cont = document.querySelector('.score_container_container');
  score_cont.style.display = 'flex';
  const bestsc = document.querySelector('.bestscore');
  if(levels[0] == 1){
    if(localStorage.getItem('easy_score') != 100){
      bestsc.textContent = localStorage.getItem('easy_score');
    }
    else{
      bestsc.textContent = 0;
    }
  }
  else if(levels[1] == 1){
    if(localStorage.getItem('medium_score') != 100){
      bestsc.textContent = localStorage.getItem('medium_score');
    }
    else{
      bestsc.textContent = 0;
    }
  }
  else{
    if(localStorage.getItem('hard_score') != 100){
      bestsc.textContent = localStorage.getItem('hard_score');
    }
    else{
      bestsc.textContent = 0;
    }
  }
  // const diff = document.querySelector('.diff');
  // diff.style.display = 'none';
  const instructions = document.querySelector('.instructions_container');
  instructions.style.display = 'none';
  score_cont.style.justifyContent = 'center';
  const container = document.querySelector('.container');
  container.style.alignItems = 'start';
  container.style.justifyContent = 'center';
  // container.style.rowGap = '20px';
}
start.addEventListener('click', startgame);

const restart_game = document.querySelector('.restart_game')
const restart = document.querySelector('.restart');
function restartgame(){
  restart.style.display = 'none';
  gameContainer.style.display = 'flex';
  score = 0;
  c = 0;
  const score_cont = document.querySelector('.score_var');
  score_cont.textContent = score;
  for(const card of gameContainer.children){
    card.style.backgroundColor = 'white';
    card.addEventListener('click', handleCardClick);
  }
}
restart_game.addEventListener('click', restartgame);
const diff = document.querySelector('.diff');
const difficulty = document.getElementById('diff');
const difff = document.querySelector('.difficulty');
function setdifficulty(){
  diff.style.display = 'flex';
  difff.style.display = 'none';
}
difficulty.addEventListener('click', setdifficulty);

const easy = document.getElementById('easy');
function seteasy(){
  diff.style.display = 'none';
  difff.style.display = 'flex';
  for(const level in levels){
    if(level == 0){
      levels[level] = 1;
    }
    else{
      levels[level] = 0;
    }
  }
  randomNumber = 6;
  // console.log(levels);
}
easy.addEventListener('click', seteasy);

const medium = document.getElementById('medium');
function setmedium(){
  diff.style.display = 'none';
  difff.style.display = 'flex';
  for(const level in levels){
    if(level == 1){
      levels[level] = 1;
    }
    else{
      levels[level] = 0;
    }
  }
  randomNumber = 9;
  // console.log(levels);

}
medium.addEventListener('click', setmedium);

const hard = document.getElementById('hard');
function sethard(){
  diff.style.display = 'none';
  difff.style.display = 'flex';
  for(const level in levels){
    if(level == 2){
      levels[level] = 1;
    }
    else{
      levels[level] = 0;
    }
  }
  randomNumber = 12;
  // console.log(levels);

}
hard.addEventListener('click', sethard);