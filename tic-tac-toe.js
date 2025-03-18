let allBoxes=document.querySelectorAll(".box");
let rst=document.querySelector("#reset");

let player1=true,foundWinner=false,draw=false;
let player1Name,player2Name;
let marker="";


let div=document.querySelector("div");//This selects the first <div> in the document
let msg=document.querySelector("#msg");
let resetGame=document.querySelector("#reset");
let newGame=document.querySelector("#new");
let drawDiv=document.querySelector(".draw.hideDraw");//This is our target
let pl1msg=document.querySelector(".pl1.pl1hide");
let pl2msg=document.querySelector(".pl2.pl2hide");

const initializeAllBoxes=()=>{
    for(let box of allBoxes){
        box.innerText="";
    }
}


const enableAllBoxes=()=>{
    for(let box of allBoxes)
    {
        box.disabled=false;
    }
}

const start=()=>{
    initializeAllBoxes();
    player1=true,foundWinner=false;
    marker="";
    enableAllBoxes();
    div.classList.add("hide");
    drawDiv.classList.add("hideDraw");
    pl1msg.classList.add("pl1hide");
    pl2msg.classList.add("pl2hide");

    //Use setTimeout to delay the alerts and prompts
    setTimeout(() => {
        alert("Welcome To Tic-Tac-Toe Game");
        alert("For playing this game, we need players' names");
        player1Name = prompt("Enter Player1 Name:");
        player2Name = prompt("Enter Player2 Name:");
    },10);//10ms delay
}

start();
const player1Mark="X",player2Mark="O";


console.log(player1Name);
console.log(player2Name);

for(let box of allBoxes)
{
    box.addEventListener("click",()=>{
        if(player1)
        {
            pl1msg.classList.remove("pl1hide");
            pl2msg.classList.add("pl2hide");
            box.innerText=player1Mark;
            box.classList.add("red");
            player1=false;
        }
        else{
            pl2msg.classList.remove("pl2hide");
            pl1msg.classList.add("pl1hide");
            box.innerText=player2Mark;
            box.classList.remove("red");
            player1=true;
        }
        marker=box.innerText;
        box.disabled=true;
        foundWinner=checkwinner(marker);
        if(foundWinner){
            disableAllBoxes();
            resetGame.disabled=true;
            div.classList.remove("hide");
            if(marker==="X"){
                msg.innerText=`You have won the game ${player1Name}`;
            }
            else msg.innerText=`You have won the game ${player2Name}`;
        }
        else
        {
            draw=true;
            draw=checkforDraw();
            console.log(box.innerText);
            if(draw)
            {
                drawDiv.classList.remove("hideDraw");
            }
        }
    });
    
}

const disableAllBoxes=()=>{
    for(let box of allBoxes)
    {
        box.disabled=true;
    }
}





winningPattern=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

const checkwinner=(marker)=>{
    for(let pattern of winningPattern)
    {
        if(allBoxes[pattern[0]].innerText===marker && allBoxes[pattern[1]].innerText===marker && allBoxes[pattern[2]].innerText===marker)
        {
            foundWinner=true;
            break;
        }
        
    }
    return foundWinner;
}

const checkforDraw=()=>{
    for(let box of allBoxes)
    {
        if(box.innerText==="")
        {
            draw=false;
            break;
        }
    }
    return draw;
}


resetGame.addEventListener("click",()=>{
    //div.classList.add("hide");
    start();
})

newGame.addEventListener("click",()=>{
    resetGame.disabled=false;
    //div.classList.add("hide");
    start();
})