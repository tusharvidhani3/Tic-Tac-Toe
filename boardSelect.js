let layouts = [3, 5, 7, 9, 11];
let i = 0;
document.getElementById('arrowLeft').addEventListener('click', () => {
    i--;
    document.getElementById('arrowRight').style.visibility = "visible";
    if (i == 0)
        document.getElementById('arrowLeft').style.visibility = "hidden";
    n = layouts[i];
    setLayout();
});

document.getElementById('arrowRight').addEventListener('click', () => {
    i++;
    document.getElementById('arrowLeft').style.visibility = "visible";
    if (i == layouts.length-1)
        document.getElementById('arrowRight').style.visibility = "hidden";
    n=layouts[i];
    setLayout();
});

document.querySelector('.start').addEventListener('click', () => {
    sessionStorage.setItem("layout", n);
});

let n = layouts[i];
setLayout();
document.getElementById('arrowLeft').style.visibility="hidden";
function setLayout() {
    document.querySelector('.board').innerHTML="";
    document.querySelector('.board').style.gridTemplateRows = (' ' + (50.0 / n).toString() + 'vmin').repeat(n);
    document.querySelector('.board').style.gridTemplateColumns = (' ' + (50.0 / n).toString() + 'vmin').repeat(n);
    for (let i = 0; i < n * n; i++) {
        let item = document.createElement('div');
        let itemImg = document.createElement('img');
        itemImg.setAttribute('src', '');
        item.appendChild(itemImg);
        document.querySelector('.board').appendChild(item);
        item.className = 'item';
    }
    document.querySelector('.label').innerText = `${n} x ${n}`;
}