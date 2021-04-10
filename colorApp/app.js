const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
const popup = document.querySelector(".copy-container")
const locks = document.querySelectorAll(".lock")
let initialColors;



currentHexes.forEach(hex => {
    hex.addEventListener("click", () => {
        copyToClipBoard(hex);
    })
})


locks.forEach((button, index) => {
  button.addEventListener("click", e => {
    lockLayer(e, index);
  });
});

//Generates a random hex code color number
function generateHex(){
    const letters = "0123456789ABCDEF"
    let hash = "#"
    for (let i=0; i<6; i++ ){
        hash+=letters[Math.floor(Math.random()* 15)];
    }
    return hash;
}

function randomColors(){
    initialColors=[];

    colorDivs.forEach((div) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        if (div.classList.contains("locked")){
            initialColors.push(hexText.innerText)
            return;
        } else {
            initialColors.push(chroma(randomColor).hex());
        }

        div.style.backgroundColor = randomColor;
        hexText.innerText= randomColor;

        checkTextContrast(randomColor, hexText);
        

    })
}

//Checks the contrast of the text and the color and changes it if the contrast is bad
function checkTextContrast(color,text){
    const luminance = chroma(color).luminance();
    if (luminance > 0.5){
        text.style.color="black";
        // lock.style.color="back";

    } else{
        text.style.color="white";
        // lock.style.background="white";
    }
}

//Copies the hex code color and makes a popup
function copyToClipBoard(hex){
    const el = document.createElement("textarea");
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    const popupBox = popup.children[0];
    popupBox.classList.add("active");
    popup.classList.add("active");
}

randomColors()
generateBtn.addEventListener("click",randomColors);
popup.addEventListener("transitionend", () => {
    const popupBox= popup.children[0];
    popupBox.classList.remove("active");
    popup.classList.remove("active");
})



//toggles the lock to unlock 

function lockLayer(e, index) {
  const lockSVG = e.target.children[0];
  const activeBg = colorDivs[index];
  activeBg.classList.toggle("locked");

  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<i class="fas fa-lock"></i>';
  } else {
    e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
  }
}