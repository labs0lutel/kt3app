const upload = document.getElementById('upload');
const imageCanvas = document.getElementById('imageCanvas');
const imgCtx = imageCanvas.getContext('2d');
let img = new Image();
let isDrawing = false;
let currentColor = '#000000';
let currentLineWidth = 2;

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            imgCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        }
    }
    reader.readAsDataURL(file);
});

imageCanvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    imgCtx.beginPath();
    imgCtx.moveTo(event.offsetX, event.offsetY);
});

imageCanvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        imgCtx.strokeStyle = currentColor;
        imgCtx.lineWidth = currentLineWidth;
        imgCtx.lineTo(event.offsetX, event.offsetY);
        imgCtx.stroke();
    }
});

imageCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
    imgCtx.closePath();
});

imageCanvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', (event) => {
    imgCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
    applyFilter(event.target.value);
});

function applyFilter(filter) {
    let imageData = imgCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    let data = imageData.data;
    switch (filter) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
            break;
        case 'invert':
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];   
                data[i + 1] = 255 - data[i + 1]; 
                data[i + 2] = 255 - data[i + 2]; 
            }
            break;
    }
    imgCtx.putImageData(imageData, 0, 0);
}

const colorPicker = document.getElementById('color');
colorPicker.addEventListener('input', (event) => {
    currentColor = event.target.value;
});

const lineWidthInput = document.getElementById('lineWidth');
lineWidthInput.addEventListener('input', (event) => {
    currentLineWidth = event.target.value;
});

    
const saveImageButton = document.getElementById('saveImage');
saveImageButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = imageCanvas.toDataURL();
    link.click();
});