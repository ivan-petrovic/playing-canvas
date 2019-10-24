import { vec2 } from 'gl-matrix';

export default class {
    constructor() {
        this.position = vec2.fromValues(0, 0);
        // console.log('ctor position: ' + this.position[0] + ',' + this.position[1])
    }

    setPosition(pos) {
        // console.log('called setPosition');
        this.position = pos;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position[0],this.position[1]);
        ctx.rotate(2*Math.sin((new Date)/800));
        // ctx.translate(this.position[0],this.position[1]);
        ctx.beginPath();
        ctx.moveTo(0,-20);
        ctx.lineTo(10,20);
        ctx.lineTo(0,10);
        // ctx.lineTo(0,10);
        ctx.lineTo(-10,20);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update(dt, mouse) {
        let mousePosition = mouse.getPosition();
        let shipPosition = vec2.clone(this.position);
        // console.log(shipPosition);
        if (mouse.isButtonClicked(0)) { console.log('position: ' + shipPosition[0] + ',' + shipPosition[1]);}
        if (mouse.isButtonClicked(0)) { console.log('mousePosition: ' + mousePosition[0] + ',' + mousePosition[1]);}
        let easing = 0.05;
        
        let v = vec2.sub(vec2.create(), mousePosition, shipPosition);
        if (mouse.isButtonClicked(0)) { console.log('v: ' + v[0] + ',' + v[1]);}
        vec2.scale(v, v, easing);
        if (mouse.isButtonClicked(0)) { console.log('v: ' + v[0] + ',' + v[1]);}
        // var vx = (mouse.x - ball.x) * easing,
        // vy = (mouse.y - ball.y) * easing;

        vec2.add(this.position, shipPosition, v);
        if (mouse.isButtonClicked(0)) { console.log('position: ' + this.position[0] + ',' + this.position[1]);}
        // ball.x += vx;
        // ball.y += vy;
    }
}
