const canvas = document.getElementById('maskCanvas');
const ctx = canvas.getContext('2d');
let pixels = [];
let removedPixels = [];
const gridSize = 6;
let disappearing = true;

function initializePixels() {
    pixels = [];
    removedPixels = [];
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            pixels.push({ x, y });
        }
    }
    pixels = pixels.sort(() => Math.random() - 0.5);
}

function updateMask() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (disappearing) {
        for (let i = 0; i < 50 && pixels.length > 0; i++) {
            removedPixels.push(pixels.pop());
        }
        if (pixels.length === 0) {
            setTimeout(() => disappearing = false, 500);
        }
    } else {
        for (let i = 0; i < 50 && removedPixels.length > 0; i++) {
            pixels.push(removedPixels.pop());
        }
        if (removedPixels.length === 0) {
            setTimeout(() => disappearing = true, 500);
        }
    }
    
    pixels.forEach(pixel => {
        ctx.clearRect(pixel.x, pixel.y, gridSize, gridSize);
    });
    
    document.querySelector('.title').style.maskImage = `url(${canvas.toDataURL()})`;
    document.querySelector('.title').style.webkitMaskImage = `url(${canvas.toDataURL()})`;
}

initializePixels();
setInterval(updateMask, 1000 / 50);
