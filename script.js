console.log("script")

import Vertex from './vertex.js'
const G = 6.67384 * Math.pow(10, 4);
const E = Math.pow(10, -2);

let loops = 0;

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



    const vertex1 = new Vertex(randomX(canvas.width), randomX(canvas.height), ctx);
    const vertex2 = new Vertex(randomX(canvas.width), randomX(canvas.height), ctx, 20, 'green');
    const vertex3 = new Vertex(randomX(canvas.width), randomX(canvas.height), ctx, 10, 'red');
    const vertex4 = new Vertex(randomX(canvas.width), randomX(canvas.height), ctx, 10, 'black');
    const vertex5 = new Vertex(randomX(canvas.width), randomX(canvas.height), ctx, 10, 'blue');

    const V = {
        [vertex1.id]: vertex1,
        [vertex2.id]: vertex2,
        [vertex3.id]: vertex3,
        [vertex4.id]: vertex4,
        [vertex5.id]: vertex5,

    }

    const graph = {
        [vertex1.id]: [vertex2.id, vertex5.id],
        [vertex2.id]: [vertex1.id, vertex3.id, vertex4.id],
        [vertex3.id]: [vertex2.id],
        [vertex4.id]: [vertex2.id],
        [vertex5.id]: [vertex1.id],
    }



    const Varr = [];
    Varr.push(vertex1);
    Varr.push(vertex2);
    Varr.push(vertex3);
    Varr.push(vertex4);
    Varr.push(vertex5);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // draw all V and E
        for (let k in graph) {
            const v = V[k];
            v.f = { x: 0, y: 0 }
            graph[k].forEach(u => drawLine(v, V[u]))
            v.draw();
        }

        for (let k in graph) {
            const v = V[k];
            // calcGravity(v);
            for (let t in graph) {
                const u = V[t];
                console.log(k, t)

                if (v.id !== u.id)
                    calcRepulsiveF(v, u)
                if (graph[k].includes(Number(t))) {
                    calcAtractiveF(v, u);
                }
            }
        }
        Varr.forEach(v => {
            v.calcNewPosition();
        });





        const totalForce = calcTotalF();
        loops++;
        console.log("total f =", totalForce);
        console.log(Varr.length)
        const requestID = window.requestAnimationFrame(draw);
        if (loops >= Varr.length * 50) {
            console.log("stoped")
            console.log('loops = ', loops)
            window.cancelAnimationFrame(requestID)
        }
    }

    draw();

    function calcTotalF() {

        const F = {
            x: 0,
            y: 0
        }
        Varr.forEach(v => {
            console.log(v.f)
            F.x += v.f.x;
            F.y += v.f.y;
        });

        console.log(F);

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

        let m = dy / dx;
        let a = Math.atan(m);

        if (dx === 0)
            a = 90;

        let F = (G) / (d * d);
        if (d < 50)
            F = 0

        v.f.x += F * Math.abs(Math.cos(a)) * Math.sign(dx);
        v.f.y += F * Math.abs(Math.sin(a)) * Math.sign(dy);

    }

    function calcRepulsiveF(v1, v2) {
        console.log(v1.id, v2.id)
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;

        const d = Math.sqrt(dx * dx + dy * dy);

        let m = dy / dx;
        let a = Math.atan(m);

        if (dx === 0)
            a = 90;

        let F = (G * 5) / (d * d);
        if (d === 0)
            F = 0


        v1.f.x += F * Math.abs(Math.cos(a)) * Math.sign(dx);
        v1.f.y += F * Math.abs(Math.sin(a)) * Math.sign(dy);

    }

    function calcAtractiveF(v1, v2) {
        console.log("a")
        const k = 0.5;
        const l = 10;
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        const F = k * (d - l);


        let m = dy / dx;

        let a = Math.atan(m);
        if (dx === 0)
            a = 90

        v1.f.x += F * Math.abs(Math.cos(a)) * Math.sign(dx);
        v1.f.y += F * Math.abs(Math.sin(a)) * Math.sign(dy);
    }
}


function randomX(width) {
    return Math.random() * width;
}
function randomY(height) {
    return Math.random() * height;
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
