import { vec2 } from 'gl-matrix';

export default class {
    constructor(radius) {
        this._radius = radius;

        this._position = vec2.fromValues(0, 0);
        this._rotation = 0;
        this._scale = vec2.fromValues(1, 1);

        this._color = "#ff0000";
        this._lineWidth = 1;
    }

    get radius() { return this._radius; }
    
    get x() { return this._position[0]; }
    get y() { return this._position[1]; }
    get rotation() { return this._rotation; }
    get scaleX() { return this._scale[0]; }
    get scaleY() { return this._scale[1]; }
    
    get color() { return this._color; }
    get lineWidth() { return this._lineWidth; }

    set radius(newRadius) { this._radius = newRadius; }
    
    set x(newX) { this._position[0] = newX; }
    set y(newY) { this._position[1] = newY; }

    draw(ctx, transform) {
        let screenPosition = transform.getScreenCoord(this._position);
        let screenRadius = transform.getScreenSize(this.radius);

        ctx.save();
            ctx.translate(screenPosition[0], screenPosition[1]);
            // ctx.rotate(this.rotation);
            // ctx.scale(this.scaleX, this.scaleY);
            
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.color;
            
            ctx.beginPath();
            // x, y, radius, start_angle, end_angle, anti-clockwise
            ctx.arc(0, 0, screenRadius, 0, (Math.PI * 2), true);
            ctx.closePath();
            
            ctx.fill();
            if (this.lineWidth > 0) ctx.stroke();
        ctx.restore();
    }
}
