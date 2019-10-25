import { vec2 } from 'gl-matrix';

class AxisX {
    constructor(left, right, y, divisionsCnt, startCntFrom) {
        this._startPosition = vec2.fromValues(left, y);
        this._endPosition = vec2.fromValues(right, y);
        this._divisionsCnt = divisionsCnt;
        this._startCntFrom = startCntFrom;

        // a color name or by using rgb/rgba/hex values
        this._color = "#0000ff";
        this._lineWidth = 1;
    }

    get color() { return this._color; }
    set color(value) { this._color = value; }
    get lineWidth() { return this._lineWidth; }
    set lineWidth(value) { this._lineWidth = value; }

    draw(ctx, transform) {
        const MARK_SIZE = 10;
        let screenStartPosition = transform.getScreenCoord(this._startPosition);
        let screenEndPosition = transform.getScreenCoord(this._endPosition);
        let delta = Math.abs(screenStartPosition[0] - screenEndPosition[0]) / this._divisionsCnt;

        ctx.save();
            ctx.lineWidth = this.lineWidth + 1;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            
            ctx.beginPath();
            ctx.moveTo(screenStartPosition[0], screenStartPosition[1]);
            ctx.lineTo(screenEndPosition[0], screenEndPosition[1]);
            ctx.stroke();

            ctx.lineWidth = this.lineWidth;
            ctx.font = 'italic 18px Arial';
            ctx.textAlign = 'center';
            ctx. textBaseline = 'top';
            
            let startCnt = this._startCntFrom;
            for(let i = 0; i <= this._divisionsCnt; i += 1) {
                ctx.moveTo(screenStartPosition[0] + i * delta, screenStartPosition[1] - MARK_SIZE);
                ctx.lineTo(screenStartPosition[0] + i * delta, screenStartPosition[1] + MARK_SIZE);

                ctx.fillText(startCnt.toString(), screenStartPosition[0] + i * delta, screenStartPosition[1] + MARK_SIZE);
                startCnt += 1;
            }
            ctx.closePath();
            
            ctx.stroke();
        ctx.restore();
    }
}

function createXAxis(width, divisionsCnt) {
    let halfWidth = width / 2;
    return new AxisX(-halfWidth, halfWidth, 0, divisionsCnt, -divisionsCnt / 2);
}

export { AxisX, createXAxis };
