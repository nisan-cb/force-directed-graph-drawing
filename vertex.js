export default class Vertex {
    constructor(x, y, ctx, radius = 10, color = 'yellow') {
        this.x = x;
        this.y = y;
        this.v = { x: 0, y: 0 };
        this.f = { x: 0, y: 0 };
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    calcVelocity() {
        this.v.x += this.f.x * 1;;
        this.v.y += this.f.y * 1;;
    }
    calcNewPosition() {
        // 0.5*a*t*t
        const t = 1
        this.calcVelocity();
        this.x += this.v.x * t + 0.5 * this.f.x * t;
        this.y += this.v.y * t + 0.5 * this.f.y * t;
    }
}