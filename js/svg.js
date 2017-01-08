import { animate } from './anim';

export default class SVGObject {
    constructor(el) {
        this.el = el;
        this.BBox = this.el.getBBox();
        this.centerX = this.BBox.x + this.BBox.width / 2;
        this.centerY = this.BBox.y + this.BBox.height / 2;
        this.originX = this.centerX;
        this.originY = this.centerY;
        this.visibleHeight = this.BBox.height;
    }

    rotate(angle) {
        this.el.setAttributeNS(null, 'transform', `rotate(${angle}, ${this.originX}, ${this.originY})`);
        // animate(this._rotate.bind(this), 0, angle, 300);
    }

    translate(x, y) {
        this.el.setAttributeNS(null, 'transform', `translate(${x}, ${y})`);
    }

    bend(deltaX, deltaY, angle) {
        this.el.setAttributeNS(null, 'transform', `translate(${deltaX}, ${deltaY}) rotate(${angle}, ${this.originX}, ${this.originY})`);
    }

    animate(method, duration, ...args) {
        // switch(method) {
        //     case 'rotate':
        //         return animate(this.rotate.bind(this), 0, args[0], duration, 'cubicIn', () => {
        //             animate(this.rotate.bind(this), args[0], 0, duration + 100, 'cubicOut');
        //         });
        //     case 'bend':
        //         this.bend(...args); break;
        // }
    }

    animRotate(angle, duration) {
        let rotation = {
            name: 'rotrot',
            start: 0,
            end: angle,
            duration,
            easing: 'cubicIn'
        };

        let self = this;

        animate([rotation], angle => {
            self.rotate(angle);
        }, () => {
            animate([reverse(rotation)], angle => {
                self.rotate(angle);
            });
        });
    }

    animBend(treeDelta, treeAngle, duration) {
        let rotation = {
            name: 'bendrot',
            start: 0,
            end: treeAngle,
            duration,
            easing: 'cubicIn'
        };

        let translationY = {
            name: 'bendtran',
            start: 0, 
            end: treeDelta,
            duration,
            easing: 'cubicIn'
        };

        let self = this;

        animate([rotation, translationY], (angle, deltaY) => {
            self.bend(0, deltaY, angle);
        }, () => {
            animate([reverse(rotation), reverse(translationY)], (angle, deltaY) => {
                self.bend(0, deltaY, angle);
            });
        });
    }
}

function reverse(animation) {
    let start = animation.start;
    animation.start = animation.end;
    animation.end = start;
    animation.complete = false;
    animation.easing = 'cubicOut'
    animation.duration = animation.duration * 1.3;
    return animation;
}