import {saveData} from './data/saveData.js';
import {loadData} from './data/loadData.js';
import {updateBoard} from './data/loadBoard.js';
import {saveCurrentPlayer} from './data/saveCurrentPlayer.js';
import {loadCurrentPlayer} from './data/loadCurrentPlayer.js';

loadData().then((options)=>{
  renderLogic(options);
  updateBoard(options);
})

async function renderLogic(currentOptions){
  let loadedPlayer = await loadCurrentPlayer();
  let currentPlayer = loadedPlayer.playerMove;
  let options = currentOptions;
  console.log(options);

  const gridElement = document.querySelectorAll('.grid-element');
  const restartBtn = document.querySelector('.restartBtn');
  const statusText = document.querySelector('.statusText');
  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  
  let running = false;

  initializeGame(); 

  function initializeGame(){
    //clicking cell calls cellClicked()
    gridElement.forEach(gridElement => gridElement.addEventListener('click',cellClicked)); 
    //show current player
    statusText.textContent = `${currentPlayer}' turn`;
    restartBtn.addEventListener('click',restartGame);
    running = true;

  };

  //this function is used to get index of a clicked element
  function cellClicked(){ 
    const cellIndex = this.getAttribute('cellIndex'); //value of this = <div ... cellIndex="i"> < .../div>
    if (options[cellIndex] != "" ){                   
      return;
    }
    updateCell(this,cellIndex);  // pass this and cellIndex to updateCell to change innerHTML
  };

  async function updateCell(cell,index){  
    options[index] = currentPlayer;  // stores currentPlayer in options Array with index of clicked cell
    cell.innerHTML = currentPlayer;  // prints currentPlayer on the screen ('this' element wich was clicked)
    checkWinner();
    try {
      await saveData(options); //backend - save data
      if(running){           // if game is still running change player
        changePlayer();
        await saveCurrentPlayer(currentPlayer);
        // console.log(currentPlayer);
      }
    } catch (error) {
      console.error('Failed to update data:', error);
    }
    
  };

  //function that change player each time its called, switches between X and O
  function changePlayer(){
    if(currentPlayer !== "O"){
      currentPlayer = "O";
    }
    else currentPlayer = "X";
    statusText.textContent = `${currentPlayer}' turn`;
  };

  // checkWinner fucntion is being called everytime cellUpdate is running
  function checkWinner(){
    let roundWon = false;
    for(let i = 0; i<winningCondition.length; i++){   //iterate trough all winningCondition
      const condition = winningCondition[i]; // i=1 condition = [3,4,5];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];
      if (cellA == "" || cellB == "" || cellC ==""){    //skip if any cell is empty
        continue;
      }
      if (cellA == cellB && cellB == cellC ){           //if all cells are same break loop;
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusText.textContent = `${currentPlayer} wins!`;
      stopGame();
    } else if (Object.values(options).every(cell => cell !== "")) {
      statusText.textContent = "DRAW";
      stopGame();
    }
  };

  async function restartGame(){             //sets evertythign to default
    initializeGame();
    options = {
      0: "", 1: "", 2: "",
      3: "", 4: "", 5: "",
      6: "", 7: "", 8: ""
    };
    await saveData(options);
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}' turn`;
    gridElement.forEach(gridElement => gridElement.innerHTML = "");
  };

  function stopGame(){        // removes eventlisteners 
    gridElement.forEach(gridElement => gridElement.removeEventListener('click',cellClicked));
    running = false;
  };
}