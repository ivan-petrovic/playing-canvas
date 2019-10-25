import { vec2 } from 'gl-matrix';

export default class {
    constructor() {
        this._startPosition = vec2.fromValues(-50, 0);
        this._endPosition = vec2.fromValues(50, 0);
        this._n = 20;

        this._color = "#0000ff";
        this._lineWidth = 1;
    }

    get startPosition() { return this._startPosition; }
    set startPosition(value) { this._startPosition = value; }

    get endPosition() { return this._endPosition; }
    set endPosition(value) { this._endPosition = value; }

    get color() { return this._color; }
    get lineWidth() { return this._lineWidth; }

    draw(ctx, transform) {
        let screenStartPosition = transform.getScreenCoord(this._startPosition);
        let screenEndPosition = transform.getScreenCoord(this._endPosition);
        let delta = transform.getScreenSize(Math.abs((this._startPosition[0] - this.endPosition[0])) / this._n);

        ctx.save();
            ctx.lineWidth = this.lineWidth + 1;
            ctx.strokeStyle = this.color;
            
            ctx.beginPath();
            ctx.moveTo(screenStartPosition[0], screenStartPosition[1]);
            ctx.lineTo(screenEndPosition[0], screenEndPosition[1]);
            ctx.stroke();

            ctx.lineWidth = this.lineWidth;
            ctx.font = 'italic 18px Arial';
            ctx.textAlign = 'center';
            ctx. textBaseline = 'top';
            ctx.fillStyle = this.color;  // a color name or by using rgb/rgba/hex values
            
            let start = - this._n / 2;
            for(let i = 0; i <= this._n; i += 1) {
                ctx.moveTo(screenStartPosition[0] + i * delta, screenStartPosition[1] - 10);
                ctx.lineTo(screenStartPosition[0] + i * delta, screenStartPosition[1] + 10);
                // set the text
                if (start != 0) {
                    ctx.fillText(start.toString(), screenStartPosition[0] + i * delta, screenStartPosition[1] + 10); // text and position
                }
                
                start += 1;
            }
            ctx.closePath();
            
            ctx.stroke();
        ctx.restore();
    }
}
