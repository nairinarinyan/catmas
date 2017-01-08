let animators = {};
let currentTime;
let running;
let animId;

export function animate(animations, handler, callback) {
    if (!currentTime) currentTime = performance.now();
    animators[handler] = { animations, handler, startTime: currentTime, callback };

    if (!running) animLoop(currentTime);
}

function animLoop(timestamp) {
    animId = requestAnimationFrame(animLoop);
    running = true;
    currentTime = timestamp;

    if (!Object.keys(animators).length) return stop();

    for (let animKey in animators) {
        let animator = animators[animKey];

        update(animator);

        let args = animator.animations.map(anim => anim.value);
        animator.handler(...args);

        if (animator.complete) {
            animator.callback && animator.callback();
            delete animators[animKey];
        }
    }
}

function stop() {
    running = false;
    currentTime = null;
    cancelAnimationFrame(animId);
}

function update(animator) {
    animator.animations.forEach(anim => {
        let { start, end, duration, easing } = anim;
        let { startTime } = animator;
        let timePassed = currentTime - startTime;

        anim.value = interpolate(start, end, timePassed, duration, easing);

        if (timePassed >= duration) {
            anim.complete = true;
            anim.value = anim.end;
        } 
    });

    const completeAnimations = animator.animations.filter(anim => anim.complete);
    if (completeAnimations.length === animator.animations.length) animator.complete = true;
}

function interpolate(start, end, timePassed, duration, easingFn) {
    const t = timePassed/duration;
    easingFn = easingFn || 'cubicIn';

    const tPrime = easing[easingFn](t);
    const delta = end - start;
    const value = start + tPrime * delta;

    return value;
}


let b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

const easing = {
    cubicIn(t) {
        return t * t * t;
    },

    cubicOut(t) {
        return --t * t * t + 1;
    },

    bounceIn(t) {
        return 1 - bounceOut(1 - t);
    },

    bounceOut(t) {
        return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
    }
};
