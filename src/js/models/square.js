import { vec2 } from 'gl-matrix';

export default class {
    constructor() {
        this.position = vec2.fromValues(0, 0);
        this.size = vec2.fromValues(1, 1);
        this.color = 'blue';
    }

    setPosition(pos) {
        this.position = pos;
    }

    setSize(size) {
        this.size = size;
    }

    setColor(color) {
        this.color = color;
    }

    draw(ctx, transform) {
        let halfSizeX = transform.getScreenCoord(this.size[0] / 2);
        let halfSizeY = transform.getScreenCoord(this.size[1] / 2);
        
        let left = transform.getScreenCoord(this.position[0] - halfSizeX);
        let right = transform.getScreenCoord(this.position[0] + halfSizeX);
        let top = transform.getScreenCoord(this.position[1] - halfSizeY);
        let bottom = transform.getScreenCoord(this.position[1] + halfSizeY);

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.position[0],this.position[1]);
        // ctx.rotate(2*Math.sin((new Date)/800));
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(right,top);
        ctx.lineTo(right,bottom);
        ctx.lineTo(left,bottom);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
