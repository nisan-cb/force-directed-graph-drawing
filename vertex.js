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
        if (this.f.x === 0)
            this.v.x = 0;
        else
            this.v.x += this.f.x * 1;

        if (this.f.y === 0)
            this.v.y = 0;
        else
            this.v.y += this.f.y * 1;
    }
    calcNewPosition() {
        // 0.5*a*t*t
        const t = 0.01
        this.calcVelocity();
        this.x += 0.5 * this.f.x * t;
        this.y += 0.5 * this.f.y * t;
    }
}