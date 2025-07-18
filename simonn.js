let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","blue","green"];

let started=false;//abhi game start ni hua ahi
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    console.log("key pressed");
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
   else {
        levelUp();
    }
   
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
} 

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){
   // console.log("curr level:",level);
   //let idx=level-1;
   if(userSeq[idx]==gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
       setTimeout( levelUp,1000);
    }
   }else{
    h2.innerHTML=`Game Over! your score was <b>${level}<b/> <br/>Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
   }
}
function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}