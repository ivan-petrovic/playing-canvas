export default class {
    constructor() {
        this.size = Math.random() * 30 + 10;
        this.x = Math.random() * 2000 - 1000;
        this.y = Math.random() * 2000 - 1000;
        this.vx = Math.random() * 50 - 25;
        this.vy = Math.random() * 50 - 25;
        this.angle = Math.random() * 90;
        this.speed = Math.random() * 70 + 20;
        this.dir = Math.round(Math.random())*2 - 1;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - this.size, this.y - this.size);
        ctx.rotate(this.angle);
        ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
        ctx.restore();
    }

    update(dt) {
        this.angle += this.speed * dt * Math.PI / 180 * this.dir;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx += Math.random() * 6 - 3;
        this.vy += Math.random() * 6 - 3;
    }
}
