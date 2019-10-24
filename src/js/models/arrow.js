import { vec2 } from 'gl-matrix';

export default class {
    constructor() {
        this.position = vec2.fromValues(0, 0);
        this.color = "#ffff00";
        this.rotation = 0;
    }

    draw(ctx) {
        let x = this.position[0];
        let y = this.position[1];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-50, -25);
        ctx.lineTo(0, -25);
        ctx.lineTo(0, -50);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(0, 25);
        ctx.lineTo(-50, 25);
        ctx.lineTo(-50, -25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    update(dt, mouse) {
        let mousePosition = mouse.getPosition();
        let easing = 0.05;

        let dx = mousePosition[0] - this.position[0];
        let dy = mousePosition[1] - this.position[1];
        this.rotation = Math.atan2(dy, dx); //in radians
        
        // let currentRotation = this.rotation * 180 / Math.PI; // in degrees
        // while(currentRotation < 0) currentRotation += 360;
        // while(currentRotation > 360) currentRotation -= 360;
        
        // // let targetRotation = Math.atan2(dy, dx); //in radians
        // let targetRotation = Math.atan2(dy, dx) * 180 / Math.PI; //in degrees
        // while(targetRotation < 0) targetRotation += 360;
        // while(targetRotation > 360) targetRotation -= 360;
        
        // let deltaRotation = (targetRotation - currentRotation) * easing;
        // // while(deltaRotation < 0) deltaRotation += 360;
        // while(deltaRotation > 360) deltaRotation -= 360;
        // this.rotation += (deltaRotation * Math.PI / 180); // in radians
        
        // if (mouse.isButtonPressed(0)) {
        //     console.log('target rotation: ' + targetRotation);
        //     console.log('current rotation: ' + currentRotation);
        //     console.log('delta rotation: ' + deltaRotation);
        //     console.log('rotation: ' + this.rotation * 180 / Math.PI);
        //     console.log(this.rotation);
        // }

        let arrowPosition = vec2.clone(this.position);
        let v = vec2.sub(vec2.create(), mousePosition, arrowPosition);
        vec2.scale(v, v, easing);
        vec2.add(this.position, arrowPosition, v);
    }
}