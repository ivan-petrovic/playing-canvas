import { vec2 } from 'gl-matrix';

export default class {
    constructor() {
        this._unitsPer100Pixels = 10;
        this._width = 640;
        this._height = 480;
        this._halfWidth = 320;
        this._halfHeight = 240;
        this._drag = false;
        this._previousPosition = null;
        this._center = vec2.create();
    }

    get unitsPer100Pixels() {
        return this._unitsPer100Pixels;
    }

    set unitsPer100Pixels(units) {
        this._unitsPer100Pixels = units;
    }

    // print() {
    //     console.log('this._unitsPer100Pixels ', this._unitsPer100Pixels);
    //     console.log('this._width ', this._width);
    //     console.log('this._height ', this._height);
    //     console.log('this._halfWidth ', this._halfWidth);
    //     console.log('this._halfHeight ', this._halfHeight);
    // }

    getScreenSize(worldSize) {
        return worldSize * 100 / this._unitsPer100Pixels;
    }

    // getScreenX(worldCoordX) {
    //     return worldCoordX * 100 / this._unitsPer100Pixels;
    // }

    // getScreenY(worldCoordY) {
    //     return - worldCoordY * 100 / this._unitsPer100Pixels;
    // }

    getScreenCoord(worldCoord) {
        let screenX = worldCoord[0] * 100 / this._unitsPer100Pixels;
        let screenY = - worldCoord[1] * 100 / this._unitsPer100Pixels;
        return vec2.fromValues(screenX + this._center[0], screenY + this._center[1]);
    }

    setCanvasDimensions(w, h) {
        this._width = w;
        this._height = h;
        this._halfWidth = w / 2;
        this._halfHeight = h / 2;
        this._center = vec2.fromValues(this._halfWidth, this._halfHeight);
    }

    update(dt, mouse) {
        let mouseScreenPosition = mouse.getPosition();

        if (mouse.isButtonPressed(0)) {
            if(!this._drag) {
                // console.log('drag mode');
                this._previousPosition = mouseScreenPosition;
                this._drag = true;
            } else {
                let displacement = vec2.sub(vec2.create(), mouseScreenPosition, this._previousPosition);
                vec2.add(this._center, this._center, displacement);
                this._previousPosition = mouseScreenPosition;
            }
        } else {
            if(this._drag) { this._drag = false; }
        }
    }

}