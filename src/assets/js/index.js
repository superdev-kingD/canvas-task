import '../css/styles.less';

class Geometry {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        width = 0,
        height = 0,
        color = 0,
        velocityX = 0,
        velocityY = 0,
        gravity = 0,
        randomGeometry = 0.5
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.gravity = gravity;
        this.randomGeometry = randomGeometry;
    }

    update(dt) {
        this.velocityY += this.gravity * dt;
        this.position.x += this.velocityX * dt;
        this.position.y += this.velocityY * dt;
    }

    render() {
        ctx.fillStyle = this.color;
        if (this.randomGeometry < 0.5) {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.height, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        ctx.font = '400 20px Roboto';
        ctx.fillStyle = 'red';
        ctx.fillText(`${geometryFigures.length}`, 10, 25);
    }
}

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const randomColor = () => {
    return `rgb(${Math.round(Math.random()) * 255}, 
                ${Math.round(Math.random()) * 255}, 
                ${Math.round(Math.random()) * 255})`;
}

let oldTime = 0;
const canvasWidth = 512;
const canvasHeight = 512;
const geometryFigures = new Array;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvasWidth * devicePixelRatio;
canvas.height = canvasHeight * devicePixelRatio;
canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

let gravity = document.getElementById('gravity-control');
let gravityValue = gravity.value;
gravity.addEventListener('change', e => gravityValue = e.target.value);

requestAnimationFrame(animate);

function animate(ts) {
    ts /= 1000;
    const dt = ts - oldTime;
    oldTime = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i <= geometryFigures.length - 1; i++) {
        let e = geometryFigures[i];
        e.gravity = gravityValue;
        e.update(dt);

        if (e.position.y + e.height >= canvas.height) {
            e.velocityX = (Math.random() * 2 - 1) * 150;
            e.velocityY = Math.random() * -300 - 20;
        }

        // circle left border out of bounds bounce back fix
        if (e.randomGeometry < 0.5) {
            if (e.position.x - e.width < 0) {
                e.velocityX *= -1;
            } else if (e.position.x + e.width >= canvas.width) {
                e.velocityX *= -1;
            }
            if (e.position.y - e.height < 0) {
                e.velocityY *= -1;
            }
        } else {
            if (e.position.x < 0) {
                e.velocityX *= -1;
            } else if (e.position.x + e.width >= canvas.width) {
                e.velocityX *= -1;
            }
            if (e.position.y < 0) {
                e.velocityY *= -1;
            }
        }

        

        e.render(ctx);
    }

    requestAnimationFrame(animate);
}


canvas.addEventListener('click', e => {
    const randRadius = getRandomArbitrary(10, 30);
    let positionX = e.offsetX;
    let positionY = e.offsetY;

    // click canvas border object create out of bounds fix
    if (positionY - randRadius < 0) {
        positionY = randRadius + 1;
    } else if (positionY + randRadius / 2 > canvas.height) {
        positionY = canvas.height - randRadius + 1;
    }

    if (positionX - randRadius < 0) {
        positionX = randRadius + 1;
    } else if (positionX + randRadius / 2 > canvas.width) {
        positionX = canvas.width - randRadius + 1;
    }


    const figure = new Geometry({
        position: {
            x: positionX,
            y: positionY
        },
        width: randRadius,
        height: randRadius,
        color: randomColor(),
        velocityX: getRandomArbitrary(-200, 200),
        velocityY: getRandomArbitrary(-200, 200),
        gravity: gravityValue,
        randomGeometry: Math.random()
    })

    geometryFigures.push(figure);
})