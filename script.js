console.log("script")

import Vertex from './vertex.js'
const G = 6.67384 * Math.pow(10, 2);


window.addEventListener('load', () => {
    console.log("window loaded");
    start();
});

function start() {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const dimensions = getObjectFitSize(
        true,
        canvas.clientWidth,
        canvas.clientHeight,
        canvas.width,
        canvas.height
    );

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // draw the center
    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        color: 'black',
        draw() {
            ctx.moveTo(this.x, this.y)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            // ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }



    const vertex1 = new Vertex(center.x + 150, center.y + 50, ctx);
    const vertex2 = new Vertex(center.x - 50, center.y - 50, ctx, 20, 'green');


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        center.draw();
        vertex1.draw();
        vertex2.draw();

        drawLine(vertex1, center);
        drawLine(vertex2, center);

        calcGravity(vertex1);
        calcGravity(vertex2);

        calcRepulsiveF(vertex1, center);
        calcRepulsiveF(vertex2, center);
        // vertex.calcVelocity();
        vertex1.calcNewPosition();
        vertex2.calcNewPosition();

        console.log("v = ", vertex2.v)
        console.log("(x,y) = ", vertex2.x, vertex2.y)
        console.log("F = ", vertex2.f)

        const totalForce = calcTotalF();
        console.log("total f =", totalForce);
        if (Math.abs(totalForce) > 100)
            window.requestAnimationFrame(draw);
    }

    draw();

    function calcTotalF() {
        const F = {
            x: vertex1.f.x + vertex2.f.x,
            y: vertex1.f.y + vertex2.f.y
        }

        return Math.sqrt(F.x * F.x + F.y * F.y);
    }

    function drawLine(v1, v2) {
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
    }


    function calcGravity(v) {
        const dx = center.x - v.x;
        const dy = center.y - v.y;

        const d = Math.sqrt(dx * dx + dy * dy);

        const m = dy / dx;
        const a = Math.atan(m);

        const F = (G) / (d * d);

        const f = {
            x: F * Math.cos(a) * Math.sign(dx),
            y: F * Math.sin(a) * Math.sign(dy)
        }
        v.f = f;
    }

    function calcRepulsiveF(v1, v2) {
        const k = 1.5;
        const l = 250;
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        const F = k * (d - l);
        const m = dy / dx;
        v1.f.x += F * Math.cos(m) * Math.sign(dx);
        v1.f.y += F * Math.sin(m) * Math.sign(dy);


    }
}




// to fix bitmap of canvas
function getObjectFitSize(
    contains /* true = contain, false = cover */,
    containerWidth,
    containerHeight,
    width,
    height
) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }

    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2
    };
}
