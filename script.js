eruda.init();

let canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
let ctx = canvas.getContext('2d');

let loaded = false;

document.getElementById('inp').onchange = function(e) {
  let img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};
function draw() {
  ctx.imageSmoothingEnabled = false;
  canvas.height = innerWidth * this.height / this.width;
  ctx.drawImage(this, 0,0, innerWidth, innerWidth * this.height / this.width);
  loaded = true;
}

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
let ftop = 0;
let range = 255;
window.onclick = e => {
  if(loaded) {
    loaded = false;
    ctx.font = "16px Courier New";
    for(let y = 0; y < canvas.height; y+= 16) {
      for(let x = 0;x < innerWidth; x+= 10) {
        let imgData = ctx.getImageData(x+10, y+5, 1, 1).data;
        ctx.fillStyle = "white";
        
        let brightness = parseInt((imgData[0] + imgData[1] + imgData[2]) / 3);
        if(brightness > ftop) {
          ftop = brightness;
        }
        let letter = "";

        let rand;
        
        if(brightness <= range/3) {
          rand = Math.floor(Math.random() * 4);
          switch(rand) {
            case 0:
              letter = "1";
              break;
            case 1:
              letter = "l";
              break;
            case 2:
              letter = "!";
              break;
            case 3:
              letter = "|";
              break;
          }
        }else if(brightness > range/3 && brightness <= range/3*2) {
          rand = Math.floor(Math.random() * 4);
          switch(rand) {
            case 0:
              letter = "C"
              break;
            case 1:
              letter = "F";
              break;
            case 2:
              letter = "G";
              break;
            case 3:
              letter = "E";
              break;
          }
        }else {
          rand = Math.floor(Math.random() * 2);
          switch(rand) {
            case 0:
              letter = "W";
              break;
            case 1:
              letter = "M";
              break;
          }
        }
        
        /*let textnode = document.createTextNode(letter);
        node.appendChild(textnode);
        node.style.position = "absolute";
        node.style.left = x+"px";
        node.style.top = y + "px";
        node.style.background = "black";
        node.style.color = `rgb(${imgData[0]},${imgData[1]},${imgData[2]})`;
        document.querySelector(".ms").appendChild(node);*/
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 10, 16);
        if(imgData[0] === 47 && imgData[1] === 79 && imgData[2] === 79) {
        }else {
          //ctx.fillStyle = "white";
          ctx.fillStyle = `rgb(${imgData[0]},${imgData[1]},${imgData[2]})`;
          ctx.fillText(letter, x, y);
        }
        //console.log(imgData);
      }
    }
    console.log(ftop);
    download();
    /*let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imgData.data;
    let node = document.createElement("span");
    let textnode = document.createTextNode("W");
    node.appendChild(textnode);
    node.style.position = "absolute";
    node.style.left = 0;
    node.style.top = 16*int + "px";
    int++;
    //node.style.background = `rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`;
    document.querySelector(".ms").appendChild(node);
    
    /*for (var i = 0; i < pixels.length; i += 80) {

      let brightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

      //pixels[i] = lightness;
      //pixels[i + 1] = lightness;
      //pixels[i + 2] = lightness;

      let letter;

      if(brightness <= 85) {
        letter = "!";
      }else if(brightness > 85 && brightness <= 170) {
        letter = "C";
      }else {
        letter = "W";
      }
      console.log(brightness);

      let node = document.createElement("span");
      let textnode = document.createTextNode(letter);
      node.appendChild(textnode);
      node.style.background = `rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`;
      document.querySelector(".ms").appendChild(node);
    }*/
  }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function download() {
  let link = document.createElement('a');
  link.download = 'file.png';
  link.href = document.getElementById('canvas').toDataURL();
  link.click();
}
