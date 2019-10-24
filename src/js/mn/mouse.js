import { vec2 } from 'gl-matrix';

const NUMBER_OF_MOUSE_BUTTONS = 3;

export default class {
    constructor(canvasElement) {
        this.MouseButton = {
            Left: 0,
            Middle: 1,
            Right: 2
        };

        this.canvasElement = canvasElement;
        this.buttonPreviousState = [];
        this.buttonPressed = [];
        this.buttonClicked = [];
        this.mouse = {x: -1, y: -1, inverseY: -1 /*, event: null*/};
        this.position = null;

        this._body_scrollLeft = 0;
        this._element_scrollLeft = 0;
        this._body_scrollTop = 0;
        this._element_scrollTop = 0;
        this._offsetLeft = 0;
        this._offsetTop = 0;

        this.setCanvasDimensions(this.canvasElement.width, this.canvasElement.height);
    }

    setCanvasDimensions(w, h) {
        this.canvas_width = w;
        this.canvas_half_width = w / 2;
        this.canvas_height = h;
        this.canvas_half_height = h / 2;
        // console.log("this.canvas_width: " + this.canvas_width);
        // console.log("this.canvas_half_width: " + this.canvas_half_width);
        // console.log("this.canvas_height: " + this.canvas_height);
        // console.log("this.canvas_half_height: " + this.canvas_half_height);
    }

    initialize() {
        for (let i = 0; i < NUMBER_OF_MOUSE_BUTTONS; i += 1) {
            this.buttonPreviousState[i] = false;
            this.buttonPressed[i] = false;
            this.buttonClicked[i] = false;
        }

        this._body_scrollLeft = document.body.scrollLeft;
        this._element_scrollLeft = document.documentElement.scrollLeft;
        this._body_scrollTop = document.body.scrollTop;
        this._element_scrollTop = document.documentElement.scrollTop;
        this._offsetLeft = this.canvasElement.offsetLeft;
        this._offsetTop = this.canvasElement.offsetTop;

        // register handlers for mouse events
        this.canvasElement.addEventListener('mousedown', evt => this._onMouseDown(evt));
        this.canvasElement.addEventListener('mouseup', evt => this._onMouseUp(evt));
        this.canvasElement.addEventListener('mousemove', evt => this._onMouseMove(evt));
        // canvas.addEventListener('click', onMouseEvent, false);
        // canvas.addEventListener('dblclick', onMouseEvent, false);
        // canvas.addEventListener('mousewheel', onMouseEvent, false);
        // canvas.addEventListener('mouseover', onMouseEvent, false);
        // canvas.addEventListener('mouseout', onMouseEvent, false);
    }

    update() {
        for (let i = 0; i < NUMBER_OF_MOUSE_BUTTONS; i += 1) {
            this.buttonClicked[i] = (!this.buttonPreviousState[i]) && this.buttonPressed[i];
            this.buttonPreviousState[i] = this.buttonPressed[i];
        }
    }

    isButtonPressed(button) {
        return this.buttonPressed[button];
    }

    isButtonClicked(button) {
        return this.buttonClicked[button];
    }

    getPosition() {
        return vec2.fromValues(
            this.mouse.x - this.canvas_half_width,
            this.mouse.y - this.canvas_half_height
        );
    }

    // Event handler functions
    _onMouseDown(event) {
        this.buttonPressed[event.button] = true;
    }

    _onMouseUp(event) {
        this.buttonPressed[event.button] = false;
    }

    _onMouseMove(event) {
        let x, y;

        if (event.pageX || event.pageY) {
            // newer browsers have these properties
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + this._body_scrollLeft + this._element_scrollLeft;
            y = event.clientY + this._body_scrollTop + this._element_scrollTop;
        }
        x -= this._offsetLeft;
        y -= this._offsetTop;

        this.mouse.x = x;
        this.mouse.y = y;
        this.mouse.inverseY = this.canvas_height - y - 1;
    }
}
