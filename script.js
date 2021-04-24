const inputs = document.querySelectorAll('.filters input');
const doc = document.querySelector('html');
const btn_reset = document.querySelector('.btn-reset');
const btn_full = document.querySelector('.fullscreen');
const btn_next = document.querySelector('.btn-next');
const img = document.querySelector('img');
let parent;
let output;

let time = new Date();
time = time.getHours();

function loadImg(){
    let partOfDay = '';
    if( time>=0 && time <= 5){
        partOfDay += 'night';
    }
    if( time >= 6 && time <= 11){
        partOfDay += 'morning';
    }
    if( time >=12 && time <= 17){
        partOfDay += 'day';
    }
    if( time >= 18 && time <= 23){
        partOfDay += 'evening';
    }
    return partOfDay;
}

img.src = "assets/images/"+`${loadImg()}`+"/01.jpg";

btn_next.addEventListener('click',(e)=>{
    let current = img.src.split('/');
    current = current.pop().split('.');
    current = +current[0];

    current +=1;
    if (current >=1 && current <=9 ){
        current = "" + "0" + current;
    } else if(current > 9 && current<=20) {
        current = current.toString();
    } else{
        current = "" + "01";
    }
    img.src = "assets/images/"+`${loadImg()}`+"/" + `${current}`+".jpg";

});

btn_full.addEventListener('click', (e) => {
    if (e.target.classList.contains('openfullscreen')) {
        e.target.classList.remove('openfullscreen');
        document.body.requestFullscreen();
    } else {
        e.target.classList.add('openfullscreen');
        document.exitFullscreen();
    }
});

btn_reset.addEventListener('click', (e) => {
    inputs.forEach(input => {
        parent = input.parentElement;
        output = parent.lastElementChild;
        switch (input.name) {
            case 'blur':
                input.value = 0;
                break;
            case 'invert':
                input.value = 0;
                break;
            case 'sepia':
                input.value = 0;
                break;
            case 'saturate':
                input.value = 100;
                break;
            case 'hue':
                input.value = 0;
                break;
            default:
                break;
        }
        changeFilter(input);
        output.value = input.value;
    });
});

inputs.forEach(input => {
    input.addEventListener('click', (e, parent) => {
        parent = e.target.parentElement;
        output = parent.lastElementChild;
        output.value = e.target.value;
        changeFilter(e.target);
    });
});

inputs.forEach(input => {
    input.addEventListener('mousedown', () => {
        input.onmousemove = function(e, parent){
            parent = e.target.parentElement;
            output = parent.lastElementChild;
            output.value = e.target.value;
            changeFilter(e.target);
        };
    });
});

inputs.forEach(input => {
    input.addEventListener('mouseup', (e) => {
        input.onmousemove = null;
    });
});




function changeFilter(element) {
    let name = element.name;
    let val = element.value + element.dataset.sizing;
    switch (name) {
        case 'blur':
            doc.style.setProperty("--blur", val);
            break;
        case 'invert':
            doc.style.setProperty("--invert", val);
            break;
        case 'sepia':
            doc.style.setProperty("--sepia", val);
            break;
        case 'saturate':
            doc.style.setProperty("--saturate", val);
            break;
        case 'hue':
            doc.style.setProperty("--hue", val);
            break;
        default:
            break;
    }
}