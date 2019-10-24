import Ball from '../models/ball';
import Axis from '../models/axis';

export default class {
    constructor() {
        this.ball = null;
        this.axisX = null;
    }

    initialize() {
        this.ball = new Ball(3);
        this.ball.x = 30;
        this.ball.y = 20;

        this.axisX = new Axis;
    }

    draw(ctx, transform) {
        this.ball.draw(ctx, transform);
        this.axisX.draw(ctx, transform);
    }

    update(dt, mouse, transform) {
        if (mouse.isButtonClicked(0)) {
            this.ball.x *= -1;
            console.log('(', this.ball.x, ', ', this.ball.y, ')');
        }
        if (mouse.isButtonClicked(1)) {
            this.ball.y *= -1;
            console.log('(', this.ball.x, ', ', this.ball.y, ')');
        }
    }
}
