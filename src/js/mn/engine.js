import Mouse from './mouse'
import WorldToScreen from '../transform/world_to_screen';

class Engine {
    constructor() {
        this._scene = null;

        this._canvas = null;
        this.ctx = null;
        this.fpsout = null;

        this.backgroundColor = 'white';

        // timing related member variables
        this.lastUpdate = new Date;
        this.fps = 30;

        // input related member variables
        this.mouse = null;

        this.transform = new WorldToScreen;
    }

    get scene() { return this._scene; }
    set scene(value) { this._scene = value; }

    initialize() {
        this._canvas = document.querySelector('canvas');
        this.ctx = this._canvas.getContext('2d');
        this.fpsout = document.querySelector('#fps');

        window.addEventListener('resize', this._resizeCanvas.bind(this), false);
        // document.getElementById('head').addEventListener("click", this._fullscreen.bind(this));
        setInterval(() => {
            this.fpsout.innerHTML = this.fps.toFixed(1) + "fps";
        }, 1000);

        this.mouse = new Mouse(this._canvas);
        this.mouse.initialize();

        this._resizeCanvas();
    }

    run() {
        this._scene.initialize();
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }

    drawFrame() {
        window.requestAnimationFrame(this.drawFrame.bind(this));
        
        let now = new Date;
        let dt = (now - this.lastUpdate) / 1000;
        if (dt==0 || isNaN(dt)) return;
        
        this.mouse.update();

        this.clear(this.ctx);
        this._scene.draw(this.ctx, this.transform);
    
        this._scene.update(dt, this.mouse,this.transform);
    
        this.lastUpdate = now;
        this.fps += (1/dt - this.fps) / 10;
    }
    
    clear(ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // identity matrix
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    _resizeCanvas() {
        let w = document.body.offsetWidth;  // or window.innerWidth; what is the difference?
        let h = document.body.offsetHeight; // or window.innerHeight; what is the difference?
        console.log(w, h);
    
        this._canvas.width  = w;
        this._canvas.height = h;

        this.mouse.setCanvasDimensions(w, h);
        this.transform.setCanvasDimensions(w, h);
    }

    _fullscreen() {
        this._canvas.requestFullscreen();
    }
}

const instance = new Engine;
export default instance;
