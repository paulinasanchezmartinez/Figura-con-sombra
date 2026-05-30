const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawPoint(x, y, radius = 3, color = 'red') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawRectangle(x, y, width, height, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color = 'black') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTriangle(x1, y1, x2, y2, x3, y3,  fillColor = null, strokeColor = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawPolygon(points, fillColor = null, strokeColor = 'black', width = 2) {
    if (points.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();

    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawText(text, x, y, color = 'black', font = '20px Arial') {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

function drawImage(x, y, width, height) {
    const img = new Image();
    img.src = './images/imagen1.jpg';
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarPlanoCartesiano() {
    // Ejes X y Y
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    // Cuadricula
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i < canvas.height; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
    // Nombre de los ejes
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Y', canvas.width / 2, 10);
    ctx.fillText('X', 490, canvas.height / 2);
}

function drawLineFromAtoB() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    let x2 = parseInt(document.getElementById('x2').value);
    let y2 = parseInt(document.getElementById('y2').value);
    y1*=-1;
    y2*=-1;
    drawLine(xCenter + x1, yCenter + y1, xCenter + x2, yCenter + y2);
}

let punto = {x: 0, y: 0, z:0};
let puntosEjeX = [];
let puntosEjeY = [];
function initPuntos() {
    for (let i = 0; i < 51; i++) {
        puntosEjeX.push({x: i*10, y: 250, z: 0});
        puntosEjeY.push({x: 250, y: i*10, z: 0});
    }
}
initPuntos();
function drawStar() {
    clearCanvas();
    dibujarPlanoCartesiano();
    for (let i = 0; i < 26; i++) {
        drawLine(puntosEjeY[i].x, puntosEjeY[i].y, puntosEjeX[25+i].x, puntosEjeX[25+i].y);
        drawLine(puntosEjeX[25+i].x, puntosEjeX[25+i].y, puntosEjeY[50-i].x, puntosEjeY[50-i].y);
        drawLine(puntosEjeX[i].x, puntosEjeX[i].y, puntosEjeY[25+i].x, puntosEjeY[25+i].y);
        drawLine(puntosEjeX[i].x, puntosEjeX[i].y, puntosEjeY[25-i].x, puntosEjeY[25-i].y);
    }
}

function RotateStarOnZ(centroX=250, centroY=250, centroZ=0, angle) {
    let grados = angle * Math.PI / 180;
    let puntosEjeXRotados = [];
    let puntosEjeYRotados = [];
    const cos = Math.cos(grados);
    const sin = Math.sin(grados);
    for (let i = 0; i < 51; i++) {
        let x = puntosEjeX[i].x - centroX;
        let y = puntosEjeX[i].y - centroY;
        let xRot = x * cos - y * sin;
        let yRot = x * sin + y * cos;
        let zRot = puntosEjeX[i].z;
        puntosEjeXRotados.push({x: xRot + centroX, y: yRot + centroY, z: zRot + centroZ});
    }
    for (let i = 0; i < 51; i++) {
        let x = puntosEjeY[i].x - centroX;
        let y = puntosEjeY[i].y - centroY;
        let xRot = x * cos - y * sin;
        let yRot = x * sin + y * cos;
        let zRot = puntosEjeY[i].z;
        puntosEjeYRotados.push({x: xRot + centroX, y: yRot + centroY, z: zRot + centroZ});
    }
    puntosEjeX=puntosEjeXRotados;
    puntosEjeY=puntosEjeYRotados;
    drawStar();
}

function RotateStarOnX(centroX=250, centroY=250, centroZ=0, angle) {
    let grados = angle * Math.PI / 180;
    let puntosEjeYRotados = [];
    const cos = Math.cos(grados);
    const sin = Math.sin(grados);
    for (let i = 0; i < 51; i++) {
        let x = puntosEjeY[i].x - centroX;
        let y = puntosEjeY[i].y - centroY;
        let z = puntosEjeY[i].z - centroZ;
        let xRot = x;
        let yRot = y * cos - z * sin;
        let zRot = y * sin + z * cos;
        puntosEjeYRotados.push({x: xRot + centroX, y: yRot + centroY, z: zRot + centroZ});
    }
    puntosEjeY=puntosEjeYRotados;
    drawStar();
}

function RotateStarOnY(centroX=250, centroY=250, centroZ=0, angle) {
    let grados = angle * Math.PI / 180;
    let puntosEjeXRotados = [];
    const cos = Math.cos(grados);
    const sin = Math.sin(grados);
    for (let i = 0; i < 51; i++) {
        let x = puntosEjeX[i].x - centroX;
        let y = puntosEjeX[i].y - centroY;
        let z = puntosEjeX[i].z - centroZ;
        let yRot = y;
        let xRot = x * cos + z * sin;
        let zRot = -x * sin + z * cos;
        puntosEjeXRotados.push({x: xRot + centroX, y: yRot + centroY, z: zRot + centroZ});
    }
    puntosEjeX=puntosEjeXRotados;
    drawStar();
}

function drawCircleWithMath() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const x = parseInt(document.getElementById('x').value) + xCenter;
    let y = parseInt(document.getElementById('y').value);
    y*=-1;
    y+=yCenter;
    const radius = parseInt(document.getElementById('radius').value);
    for (let i = 0; i < 360; i+=10) {
        drawLineFromCircleWithDegrees(i, x, y, radius, 'red', 2);
    }
}

function drawLineFromCircleWithDegrees(degrees, x, y, radius, color = 'red', width = 2) {
    const angle = degrees * 2 * Math.PI / 360;
    const x1 = x + radius * Math.cos(angle);
    const y1 = y + radius * Math.sin(angle);
    drawLine(x, y, x1, y1, color, width);
    const x2 = x + radius * Math.cos(angle + 10 * 2 * Math.PI / 360);
    const y2 = y + radius * Math.sin(angle + 10 * 2 * Math.PI / 360);
    drawLine(x1, y1, x2, y2, color, width);
}

let clockInterval = null;
function drawClock() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const width  = canvas.width;
    const height = canvas.height;
    const radiusSeconds = width / 2-30;
    const radiusMinutes = width / 2-75;
    const widthLine = 2;
    const x = xCenter;
    const y = yCenter;
    const img = new Image();
    img.src = './images/reloj2.jpg';
    img.onload = () => {
        let degreesSeconds = 270;
        let degreesMinutes = 270;
        clockInterval = setInterval(() => {
            ctx.drawImage(img, xCenter - width / 2, yCenter - height / 2, width, height);
            angleSeconds = degreesSeconds * 2 * Math.PI / 360;
            x1 = x + radiusSeconds * Math.cos(angleSeconds);
            y1 = y + radiusSeconds * Math.sin(angleSeconds);
            drawLine(x, y, x1, y1, 'green', widthLine);
        
            angleMinutes = degreesMinutes * 2 * Math.PI / 360;
            x1 = x + radiusMinutes * Math.cos(angleMinutes);
            y1 = y + radiusMinutes * Math.sin(angleMinutes);
            drawLine(x, y, x1, y1, "red", 4);

            degreesSeconds+=6;
            if (degreesSeconds == 270) degreesMinutes += 6;
            if (degreesSeconds == 360) degreesSeconds = 0;
            if (degreesMinutes == 360) degreesMinutes = 0;
        }, 1000);
    }
}

function stopClock() {
    clearInterval(clockInterval);
}

function drawSineWave() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const frequency = parseInt(document.getElementById('frequency').value);
    const amplitude = parseInt(document.getElementById('amplitude').value);
    const phase = parseInt(document.getElementById('phase').value);
    for (let i = 0; i < canvas.width; i+=5) {
        const x = i;
        const y = yCenter + amplitude * Math.sin(frequency * x + phase);
        drawPoint(x, y);
    }
}

// --- FUNCIONES MATEMÁTICAS PARA SOMBRAS (CONVEX HULL) ---
function convexHull2D(pts) {
    if (pts.length < 3) return pts.slice();
    let lo = 0;
    for (let i = 1; i < pts.length; i++)
        if (pts[i].x < pts[lo].x || (pts[i].x === pts[lo].x && pts[i].y < pts[lo].y)) lo = i;
    const hull = [];
    let cur = lo;
    do {
        hull.push(pts[cur]);
        let nxt = (cur + 1) % pts.length;
        for (let i = 0; i < pts.length; i++) {
            const cross = (pts[nxt].x - pts[cur].x) * (pts[i].y - pts[cur].y)
                        - (pts[nxt].y - pts[cur].y) * (pts[i].x - pts[cur].x);
            if (cross < 0) nxt = i;
        }
        cur = nxt;
    } while (cur !== lo && hull.length <= pts.length);
    return hull;
}


// --- LÓGICA DEL PRISMA PENTAGONAL ---
const radioBase = 60;
const profundidad = 60;
let pentagonoVertices = [];
let sombraActivada = false;

function initPentagono() {
    pentagonoVertices = [];
    for (let i = 0; i < 5; i++) {
        let angulo = (i * 72 + 90) * Math.PI / 180; 
        pentagonoVertices.push({ x: radioBase * Math.cos(angulo), y: radioBase * Math.sin(angulo), z: profundidad });
    }
    for (let i = 0; i < 5; i++) {
        let angulo = (i * 72 + 90) * Math.PI / 180;
        pentagonoVertices.push({ x: radioBase * Math.cos(angulo), y: radioBase * Math.sin(angulo), z: -profundidad });
    }
}

initPentagono();

const pentagonoFaces = [
    { indices: [0, 1, 2, 3, 4], color: 'red' },
    { indices: [9, 8, 7, 6, 5], color: 'blue' },
    { indices: [0, 1, 6, 5], color: 'green' },
    { indices: [1, 2, 7, 6], color: 'yellow' },
    { indices: [2, 3, 8, 7], color: 'orange' },
    { indices: [3, 4, 9, 8], color: 'purple' },
    { indices: [4, 0, 5, 9], color: 'cyan' }
];

function project3D(vertex, cx, cy) {
    return {
        x: cx + vertex.x,
        y: cy - vertex.y,
        z: vertex.z
    };
}

function toggleSombraPentagono() {
    sombraActivada = !sombraActivada;
    drawPentagono();
}

function drawPentagono() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    clearCanvas();
    dibujarPlanoCartesiano();

    // 1. DIBUJAR SOMBRA Y LUZ (Si está activado)
    if (sombraActivada) {
        const light = { x: -200, y: 400, z: -150 };
        // Piso matemático un poco más abajo del radio del pentágono
        const groundY = -(radioBase + 80); 

        const shadowPts = pentagonoVertices.map(v => {
            const dy = v.y - light.y;
            if (Math.abs(dy) < 0.001) return null;
            const t = (groundY - light.y) / dy;
            if (t < 0) return null;
            const sx = light.x + t * (v.x - light.x);
            const sz = light.z + t * (v.z - light.z);
            return {
                x: cx + sx + sz * 0.3,
                y: (cy - groundY) - sz * 0.2
            };
        }).filter(p => p !== null);

        if (shadowPts.length >= 3) {
            const hull = convexHull2D(shadowPts);
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.moveTo(hull[0].x, hull[0].y);
            for (let i = 1; i < hull.length; i++) ctx.lineTo(hull[i].x, hull[i].y);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // Dibujar indicador de la fuente de luz
        const lightCanvasX = Math.max(8, Math.min(canvas.width - 8, cx + light.x));
        const lightCanvasY = Math.max(8, Math.min(canvas.height - 8, cy - light.y));
        ctx.save();
        ctx.beginPath();
        ctx.arc(lightCanvasX, lightCanvasY, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }

    // 2. DIBUJAR EL PRISMA PENTAGONAL
    const facesToDraw = pentagonoFaces.map(face => {
        const projected = face.indices.map(i => project3D(pentagonoVertices[i], cx, cy));
        const avgZ = projected.reduce((sum, p) => sum + p.z, 0) / projected.length;
        return { face, projected, avgZ };
    });

    facesToDraw.sort((a, b) => a.avgZ - b.avgZ); 

    for (const { face, projected } of facesToDraw) {
        const points2D = projected.map(p => ({ x: p.x, y: p.y }));
        drawPolygon(points2D, face.color, 'black', 1);
    }
}

function resetAndDrawPentagono() {
    initPentagono();
    sombraActivada = false; 
    drawPentagono();
}

function rotatePoint3D(p, cx, cy, cz, axis, angleDeg) {
    const rad = angleDeg * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    let x = p.x - cx, y = p.y - cy, z = p.z - cz;
    let xRot, yRot, zRot;
    
    if (axis === 'Z') {
        xRot = x * cos - y * sin;
        yRot = x * sin + y * cos;
        zRot = z;
    } else if (axis === 'X') {
        xRot = x;
        yRot = y * cos - z * sin;
        zRot = y * sin + z * cos;
    } else { // 'Y'
        xRot = x * cos + z * sin;
        yRot = y;
        zRot = -x * sin + z * cos;
    }
    return { x: xRot + cx, y: yRot + cy, z: zRot + cz };
}

function rotatePentagono(axis, angle) {
    const cx = 0, cy = 0, cz = 0; 
    pentagonoVertices = pentagonoVertices.map(v => rotatePoint3D(v, cx, cy, cz, axis, angle));
    drawPentagono();
}
