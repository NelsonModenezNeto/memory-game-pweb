const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let roots = [];

class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [{ x, y }];
        this.life = 0;
        this.maxLife = Math.random() * 150 + 150;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 1.5 + 0.5;
        this.width = Math.random() * 2 + 0.5;
    }

    update() {
        this.life++;
        this.angle += (Math.random() - 0.5) * 0.2;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.history.push({ x: this.x, y: this.y });

        if (this.history.length > 60) this.history.shift();

        return this.life < this.maxLife;
    }

    draw(ctx) {
        const gradient = ctx.createLinearGradient(
            this.history[0].x, this.history[0].y,
            this.x, this.y
        );
        gradient.addColorStop(0, `hsla(${this.life * 2}, 100%, 70%, 0.8)`);
        gradient.addColorStop(1, `hsla(${this.life * 2 + 60}, 100%, 50%, 0.2)`);

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width + Math.sin(this.life * 0.1) * 0.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = gradient;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
}


function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (roots.length < 100 && Math.random() < 0.3) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        roots.push(new Root(x, y));
    }

    roots = roots.filter(root => {
        if (root.update()) {
            root.draw(ctx);
            return true;
        }
        return false;
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
