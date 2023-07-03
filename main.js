
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

const cWidth = canvas.scrollWidth
const cHeight = canvas.scrollHeight

var gameOver = false

class Player {
    constructor() {
        this.x = 150
        this.y = cHeight - 50
        this.w = 50
        this.h = 50
    }
    render() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

class Rintangan {
    constructor() {
        this.x = cWidth - 50
        this.y = cHeight - 100
        this.w = 50
        this.h = 100
    }
    render() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    update() {
        if (this.x + this.w < 0) {
            this.x = cWidth
        }
        this.x -= 10
    }
}
const Dino = new Player()
const Block = new Rintangan()

const Block2 = new Rintangan()
Block2.x -= 500

function collision() {
    if (
        (Dino.x < Block.x + Block.w &&
            Dino.x + Dino.w > Block.x &&
            Dino.y < Block.y + Block.h &&
            Dino.y + Dino.h > Block.y) ||

        (Dino.x < Block2.x + Block2.w &&
            Dino.x + Dino.w > Block2.x &&
            Dino.y < Block2.y + Block2.h &&
            Dino.y + Dino.h > Block2.y)

    ) {
        gameOver = true;
    } else {
        addScore()
    }
}

function addScore() {
    if (
        ((Block.x + Block.w) == Dino.x) ||
        ((Block2.x + Block2.w) == Dino.x)
    ) {
        document.getElementById('score').innerText = parseInt(document.getElementById('score').innerText) + 1
    }
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) {
        Dino.y -= 50

        setTimeout(() => {
            Dino.y += 50
        }, 600)
    }
})


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collision();
    Dino.render();
    Block.update();
    Block.render();

    Block2.update();
    Block2.render();

    const animation = requestAnimationFrame(animate);
    if (gameOver) {
        alert('Game Over')
        return cancelAnimationFrame(animation);
    }
}

animate();