const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ichigoX = 50;
let grimjowX = 300;
let attacking = false;
let animationSpeed = 2;

document.getElementById('speed').addEventListener('input', (event) => {
    animationSpeed = event.target.value;
    document.getElementById('speedValue').innerText = animationSpeed;
});

function drawIchigo(x, y) {
    ctx.fillStyle = "orange"; 
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, true); 
    ctx.fill();

    ctx.fillStyle = "white"; 
    ctx.fillRect(x - 10, y + 15, 20, 30); 

    ctx.fillStyle = "black"; 
    ctx.fillRect(x + 10, y + 20, 30, 5); 
}

function drawGrimjow(x, y) {
    ctx.fillStyle = "lightblue";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, true); 
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillRect(x - 10, y + 15, 20, 30); 

    ctx.fillStyle = "gray"; 
    ctx.fillRect(x - 30, y + 20, 30, 5); 
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawIchigo(ichigoX, 150);
    drawGrimjow(grimjowX, 150);

    if (ichigoX < grimjowX - 30) {
        ichigoX += animationSpeed / 5;
    } else {
        attacking = true; 
    }

    if (attacking) {
        ctx.fillStyle = "red";
        ctx.fillRect(ichigoX + 10, 140, 30, 5);
        setTimeout(() => {
            attacking = false; 
        }, 200);
    }

    if (attacking && grimjowX > 50) {
        grimjowX -= 1; 
    }

    if (ichigoX > canvas.width) {
        ichigoX = 50;
        grimjowX = 300;
        attacking = false;
    }

    requestAnimationFrame(animate);
}
animate();