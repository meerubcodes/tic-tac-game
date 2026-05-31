let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector(".reset-btn")
let startBtn = document.querySelectorAll(".start-btn")
let drawstartBtn = document.querySelector(".drawstart-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector(".msg")
let drawmsgContainer = document.querySelector(".drawmsg-container")
let drawmsg = document.querySelector(".draw-msg");
let turnO = true;
let count = 0;
const winPatterns = [
    [0 , 1 , 2 ] ,
    [0 , 3 , 6 ] ,
    [0 , 4 , 8 ] ,
    [1 , 4 , 7 ] ,
    [2 , 5 , 8] ,
    [2 , 4 , 6 ] ,
    [3 , 4 , 5 ] ,
    [6 , 7 , 8 ] ,
];
const resetGame = ()=>{
    turnO = true;
    count=0;
    enabledbutton();
    msgContainer.classList.add("hide")
    drawmsgContainer.classList.add("hide");
}

boxes.forEach((box) => {
   box.addEventListener("click", ()=>{
    if(turnO){
        box.innerText = "O"
        box.style.color = "yellow"
        turnO = false;
        box.disabled = true;
    }else{
     box.innerText = "X"
     box.style.color = "orangered";
     turnO = true;
      box.disabled = true;
    }
    count++;
    checkWinner();
   })
});
let winnerFound = false;
const checkWinner = ()=>{
    for (pattern of winPatterns){
        // console.log(pattern[0] , pattern[1] , pattern[2]);
        // console.log(boxes[pattern[0]].innerText , boxes[pattern[1]].innerText , boxes[pattern[2]].innerText);  //for understamding
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val ==  pos2Val  && pos2Val == pos3Val){
                console.log("winner" , pos1Val)
                winnerFound = true;
                showWinner(pos1Val);
                disabledbutton();
                break;
            }else{
                winnerFound = false;
   }
    }
        }
        if (!winnerFound && count === 9) {
        showDraw();
        disabledbutton();
    }
};

    

const showWinner = (winner)=>{
     msg.innerText = `Congratulation the winner is ${winner}`;
     msgContainer.classList.remove("hide");
}
const showDraw = ()=>{
    drawmsg.innerText = "Oops match is draw"
   drawmsgContainer.classList.remove("hide");
}
const disabledbutton = ()=>{
    for (let box of boxes){
        box.disabled = true;
    }
}
const enabledbutton = ()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
resetBtn.addEventListener("click" , resetGame);
startBtn.forEach((btn) => {
    btn.addEventListener("click", resetGame);
});
