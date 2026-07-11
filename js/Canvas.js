"use strict";

/* ===========================
   Canvas Setup
=========================== */

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ===========================
   Physics
=========================== */

const GRAVITY = 0.08;
const FRICTION = 0.98;

let particles = [];

/* ===========================
   Particle Class
=========================== */

class Particle {

    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;

        this.radius = radius;
        this.color = color;

        this.velocity = velocity;

        this.alpha = 1;
    }

    draw() {

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
    }

    update() {

        this.draw();

        this.velocity.x *= FRICTION;
        this.velocity.y *= FRICTION;

        this.velocity.y += GRAVITY;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.alpha -= 0.01;
    }
}

/* ===========================
   Firework Generator
=========================== */

function createFirework(x, y) {

    const particleCount = 120;
    const power = 7;

    for (let i = 0; i < particleCount; i++) {

        const angle = (Math.PI * 2 / particleCount) * i;

        particles.push(
            new Particle(
                x,
                y,
                Math.random() * 3 + 2,
                `hsl(${Math.random() * 360},100%,60%)`,
                {
                    x: Math.cos(angle) * Math.random() * power,
                    y: Math.sin(angle) * Math.random() * power
                }
            )
        );
    }
}

/* ===========================
   Animation Loop
=========================== */

function animate() {

    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => particle.alpha > 0);

    particles.forEach(particle => particle.update());
}

animate();

/* ===========================
   Auto Fireworks
=========================== */

setInterval(() => {

    // distanceOfTime comes from index.js
    if (typeof distanceOfTime === "undefined" || distanceOfTime > 0) {
        return;
    }

    const padding = window.innerWidth < 768 ? 50 : 180;

    const x = random(padding, canvas.width - padding);
    const y = random(50, canvas.height - 120);

    createFirework(x, y);

}, 1800);

/* ===========================
   Utilities
=========================== */

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
