import Asteroid from '../models/asteroid'
// import Ship from '../models/ship'
import Square from '../models/square';
// import Arrow from '../models/arrow';
import Arrow from '../models/ball';
import WorldToScreen from '../transform/world_to_screen';
import { vec2 } from 'gl-matrix';

const NUMBER_OF_ASTEROIDS = 100;

export default class {
    constructor() {
        this.asteroids = [];
        this.ship = null;
        this.sqare1 = null;
        this.sqare2 = null;
        this.sqare3 = null;
        this.transform = new WorldToScreen;
    }

    initialize() {
        this._initializeAsteroids();
        // this.ship = new Ship;
        this.ship = new Arrow(50);
        
        this.sqare1 = new Square;
        this.sqare1.setPosition(vec2.fromValues(15,0));
        // this.sqare1.setSize(vec2.fromValues(20,40));

        this.sqare2 = new Square;
        this.sqare2.setPosition(vec2.fromValues(95,0));
        this.sqare2.setColor('red');
        this.sqare2.setSize(vec2.fromValues(5,5));

        this.sqare3 = new Square;
        this.sqare3.setPosition(vec2.fromValues(0,30));
        this.sqare3.setColor('green');
        this.sqare3.setSize(vec2.fromValues(2,4));
    }

    draw(ctx) {
        this._drawAsteroids(ctx);    
        this.ship.draw(ctx);
        this.sqare1.draw(ctx, this.transform);
        this.sqare2.draw(ctx, this.transform);
        this.sqare3.draw(ctx, this.transform);
    }

    update(dt, mouse) {
        if (mouse.isButtonClicked(0)) {
            let unit = this.transform.getUnitsPer100Pixels();
            console.log('current unit ' + unit);
            unit += 1;
            if (unit > 15) { unit = 5; }
            console.log('new unit ' + unit);
            this.transform.setUnitsPer100Pixels(unit);
            console.log('square2: ' + this.sqare2.position[0]);
            console.log('square2 screen: ' + this.transform.getScreenCoord(this.sqare2.position[0]));
            console.log('square2 size: ' + this.transform.getScreenCoord(this.sqare2.size[0]));
        }
        this.ship.update(dt, mouse);
        this._moveAsteroids(dt);
    }

    _initializeAsteroids() {
        for (var i = 0; i < NUMBER_OF_ASTEROIDS; i += 1) {
            this.asteroids.push(new Asteroid);
        }
    }

    _drawAsteroids(ctx) {
        for (let i = 0, len = this.asteroids.length; i < len; i += 1) {
            this.asteroids[i].draw(ctx);
        }
    }
    
    _moveAsteroids(dt) {
        for (let i = 0, len = this.asteroids.length; i < len; i += 1) {
            this.asteroids[i].update(dt);
        }
    }
}
