import Ball from '../models/ball';
import { createXAxis } from '../models/axis-x';
import { createYAxis } from '../models/axis-y';

export default class {
    constructor() {
        this.ball = null;
        this.axisX = null;
        this.axisY = null;
    }

    initialize() {
        this.ball = new Ball(3);
        this.ball.x = 30;
        this.ball.y = 20;

        // this.axisX = new AxisX(-50, 50, 0, 10, -5);
        this.axisX = createXAxis(200, 20);
        this.axisY = createYAxis(160, 16);
    }

    draw(ctx, transform) {
        this.ball.draw(ctx, transform);
        this.axisX.draw(ctx, transform);
        this.axisY.draw(ctx, transform);
    }

    update(dt, mouse, transform) {
        // if (mouse.isButtonClicked(0)) {
        //     this.ball.x *= -1;
        //     console.log('(', this.ball.x, ', ', this.ball.y, ')');
        // }
        // if (mouse.isButtonClicked(1)) {
        //     this.ball.y *= -1;
        //     console.log('(', this.ball.x, ', ', this.ball.y, ')');
        // }
    }
}
