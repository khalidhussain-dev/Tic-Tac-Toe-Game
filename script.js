let boxes = document.querySelectorAll(".box_button");
let reset_game = document.querySelector("#reset_btn");
let start_game = document.querySelector("#Start_btn");
let msgcontainer = document.querySelector(".msg_container");
let win_msg = document.querySelector("#win_msg");

// Variable for Draw match check
let count = 0;
let turnO = true; // turn for playerX and playerO.

// All Win Patterns
const winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//  Boxes action listener/event listener in a loop
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.innerText = "O";
      box.style.color = "green";
    } else {
      // Player O
      box.innerText = "X";
      box.style.color = "blue";
    }
    turnO = !turnO;
    box.disabled = true;
    count++;

    checkwinner();
    if (count == 9) {
      drawGame();
    }
  });
});

// Checking for winner
function checkwinner() {
  winpatterns.forEach((pattern) => {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );

    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    // Checking all positions are filled and are of same sign or player
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  });
}

// Winner show Method
const showWinner = (winner) => {
  win_msg.innerText = `Congratulations, Winner is ${winner}`;
  if (!turnO) win_msg.style.color = "green";
  else win_msg.style.color = "blue";

  msgcontainer.classList.remove("hide");
  disableBoxes();
  count = 0;
};
// Disable boxes to non-clickable and fix state
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Reset Game Methods
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
  count = 0;
};
// Enable boxes to clickable and set to initial state
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Reset ot Restart Action Listener

start_game.addEventListener("click", resetGame);
reset_game.addEventListener("click", resetGame);

// Draw Game Method
const drawGame = () => {
  win_msg.innerText = "Game is a Draw!";
  win_msg.style.color = "white";
  msgcontainer.classList.remove("hide");
  disableBoxes();
};
