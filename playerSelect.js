let buttons = document.getElementsByClassName('button');
buttons[0].addEventListener("click",()=>{
    sessionStorage.setItem("playerX","Player");
    sessionStorage.setItem("playerO","Computer");
});

buttons[1].addEventListener("click",()=>{
    sessionStorage.setItem("playerX","Player 1");
    sessionStorage.setItem("playerO","Player 2");
});

buttons[2].addEventListener("click",()=>{
    sessionStorage.setItem("playerX","Computer");
    sessionStorage.setItem("playerO","Player");
});