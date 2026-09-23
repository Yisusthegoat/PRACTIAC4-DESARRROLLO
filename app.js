"use strict";
(() => {
    const palettes = {
        aurora: [158, 190, 252],
        ocean: [182, 198, 165],
        sunset: [42, 8, 350]
    };
    const canvas = document.querySelector("#particleCanvas");
    const fpsValue = document.querySelector("#fpsValue");
    const memoryUsed = document.querySelector("#memoryUsed");
    const memoryLimit = document.querySelector("#memoryLimit");
    const memoryStatus = document.querySelector("#memoryStatus");
    const particleCounter = document.querySelector("#particleCounter");
    const statusBadge = document.querySelector("#statusBadge");
    const particleAmount = document.querySelector("#particleAmount");
    const speedAmount = document.querySelector("#speedAmount");
    const particleSize = document.querySelector("#particleSize");
    const shapeSelect = document.querySelector("#shapeSelect");
    const paletteSelect = document.querySelector("#paletteSelect");
    const trailToggle = document.querySelector("#trailToggle");
    const validationMessage = document.querySelector("#validationMessage");
    const actionButtons = document.querySelector("#actionButtons");
    if (!canvas || !fpsValue || !memoryUsed || !memoryLimit || !memoryStatus || !particleCounter || !statusBadge || !particleAmount || !speedAmount || !particleSize || !shapeSelect || !paletteSelect || !trailToggle || !validationMessage || !actionButtons) {
        return;
    }
    const canvasElement = canvas;
    const fpsDisplay = fpsValue;
    const memoryUsedDisplay = memoryUsed;
    const memoryLimitDisplay = memoryLimit;
    const memoryStatusDisplay = memoryStatus;
    const counterDisplay = particleCounter;
    const statusDisplay = statusBadge;
    const particleInput = particleAmount;
    const speedInput = speedAmount;
    const sizeInput = particleSize;
    const shapeInput = shapeSelect;
    const paletteInput = paletteSelect;
    const trailInput = trailToggle;
    const messageDisplay = validationMessage;
    const buttonsContainer = actionButtons;
    const context = canvasElement.getContext("2d");
    if (!context) {
        messageDisplay.textContent = "No se pudo iniciar Canvas 2D en este navegador.";
        return;
    }
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const randomBetween = (min, max) => Math.random() * (max - min) + min;
    const formatMegabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    const readOptions = () => ({
        amount: clamp(Number(particleInput.value), 20, 160),
        speed: clamp(Number(speedInput.value), 20, 220),
        size: clamp(Number(sizeInput.value), 2, 12),
        trails: trailInput.checked,
        palette: paletteInput.value,
        shape: shapeInput.value
    });
    function addEllipse(points, cx, cy, rx, ry, count) {
        for (let i = 0; i < count; i += 1) {
            const angle = (i / count) * Math.PI * 2;
            points.push({ x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry });
        }
    }
    function addLine(points, x1, y1, x2, y2, count) {
        for (let i = 0; i < count; i += 1) {
            const t = count === 1 ? 0 : i / (count - 1);
            points.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
        }
    }
    function addArc(points, cx, cy, rx, ry, start, end, count) {
        for (let i = 0; i < count; i += 1) {
            const t = count === 1 ? 0 : i / (count - 1);
            const angle = start + (end - start) * t;
            points.push({ x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry });
        }
    }
    function buildShapePoints(width, height, shape, count) {
        var _a;
        const points = [];
        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height);
        if (shape === "hummingbird") {
            addEllipse(points, cx + scale * 0.04, cy + scale * 0.02, scale * 0.12, scale * 0.18, Math.floor(count * 0.24));
            addArc(points, cx - scale * 0.08, cy - scale * 0.02, scale * 0.32, scale * 0.26, Math.PI * 1.05, Math.PI * 1.95, Math.floor(count * 0.28));
            addArc(points, cx - scale * 0.02, cy + scale * 0.03, scale * 0.28, scale * 0.2, Math.PI * 0.1, Math.PI * 0.85, Math.floor(count * 0.16));
            addLine(points, cx + scale * 0.14, cy - scale * 0.08, cx + scale * 0.38, cy - scale * 0.18, Math.floor(count * 0.12));
            addLine(points, cx - scale * 0.04, cy + scale * 0.18, cx - scale * 0.24, cy + scale * 0.35, Math.floor(count * 0.1));
            addLine(points, cx + scale * 0.02, cy + scale * 0.18, cx + scale * 0.12, cy + scale * 0.34, Math.floor(count * 0.1));
        }
        if (shape === "whale") {
            addEllipse(points, cx - scale * 0.02, cy + scale * 0.02, scale * 0.34, scale * 0.16, Math.floor(count * 0.46));
            addArc(points, cx - scale * 0.02, cy - scale * 0.02, scale * 0.35, scale * 0.19, Math.PI * 1.05, Math.PI * 1.95, Math.floor(count * 0.14));
            addLine(points, cx + scale * 0.28, cy + scale * 0.02, cx + scale * 0.48, cy - scale * 0.14, Math.floor(count * 0.1));
            addLine(points, cx + scale * 0.28, cy + scale * 0.02, cx + scale * 0.48, cy + scale * 0.16, Math.floor(count * 0.1));
            addLine(points, cx + scale * 0.42, cy - scale * 0.12, cx + scale * 0.42, cy + scale * 0.14, Math.floor(count * 0.08));
            addLine(points, cx - scale * 0.04, cy + scale * 0.15, cx - scale * 0.17, cy + scale * 0.3, Math.floor(count * 0.08));
            addEllipse(points, cx - scale * 0.24, cy - scale * 0.02, scale * 0.02, scale * 0.02, Math.floor(count * 0.04));
        }
        if (shape === "fox") {
            addEllipse(points, cx, cy + scale * 0.08, scale * 0.2, scale * 0.22, Math.floor(count * 0.32));
            addLine(points, cx - scale * 0.12, cy - scale * 0.1, cx - scale * 0.28, cy - scale * 0.34, Math.floor(count * 0.11));
            addLine(points, cx - scale * 0.28, cy - scale * 0.34, cx - scale * 0.03, cy - scale * 0.23, Math.floor(count * 0.11));
            addLine(points, cx + scale * 0.12, cy - scale * 0.1, cx + scale * 0.28, cy - scale * 0.34, Math.floor(count * 0.11));
            addLine(points, cx + scale * 0.28, cy - scale * 0.34, cx + scale * 0.03, cy - scale * 0.23, Math.floor(count * 0.11));
            addLine(points, cx - scale * 0.18, cy + scale * 0.03, cx, cy + scale * 0.22, Math.floor(count * 0.08));
            addLine(points, cx + scale * 0.18, cy + scale * 0.03, cx, cy + scale * 0.22, Math.floor(count * 0.08));
            addEllipse(points, cx - scale * 0.07, cy, scale * 0.018, scale * 0.018, Math.floor(count * 0.045));
            addEllipse(points, cx + scale * 0.07, cy, scale * 0.018, scale * 0.018, Math.floor(count * 0.045));
            addEllipse(points, cx, cy + scale * 0.13, scale * 0.025, scale * 0.018, Math.floor(count * 0.04));
        }
        while (points.length < count) {
            points.push((_a = points[points.length % Math.max(points.length, 1)]) !== null && _a !== void 0 ? _a : { x: cx, y: cy });
        }
        return points.slice(0, count);
    }
    function createParticle(width, height, options) {
        const angle = randomBetween(0, Math.PI * 2);
        const speed = randomBetween(0.25, 1.1) * options.speed;
        const hues = palettes[options.palette];
        return {
            x: randomBetween(0, width),
            y: randomBetween(0, height),
            tx: width / 2,
            ty: height / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: randomBetween(options.size * 0.55, options.size),
            hue: hues[Math.floor(randomBetween(0, hues.length))]
        };
    }
    function setTheme(palette) {
        document.body.classList.toggle("theme-aurora", palette === "aurora");
        document.body.classList.toggle("theme-ocean", palette === "ocean");
        document.body.classList.toggle("theme-sunset", palette === "sunset");
    }
    function validateOptions(options) {
        const validAmount = options.amount >= 20 && options.amount <= 160;
        const validSpeed = options.speed >= 20 && options.speed <= 220;
        const validSize = options.size >= 2 && options.size <= 12;
        const validShape = ["hummingbird", "whale", "fox"].includes(options.shape);
        messageDisplay.textContent = validAmount && validSpeed && validSize && validShape ? "" : "Revise los rangos permitidos y seleccione una figura valida.";
        return validAmount && validSpeed && validSize && validShape;
    }
    function applySpeedToParticle(particle, speed) {
        const currentAngle = Math.atan2(particle.vy, particle.vx);
        const currentMagnitude = Math.hypot(particle.vx, particle.vy) || 1;
        const normalizedFactor = clamp(currentMagnitude / 90, 0.25, 1.1);
        const nextMagnitude = normalizedFactor * speed;
        particle.vx = Math.cos(currentAngle) * nextMagnitude;
        particle.vy = Math.sin(currentAngle) * nextMagnitude;
    }
    function applySizeToParticle(particle, size) {
        particle.radius = randomBetween(size * 0.55, size);
    }
    function updateMemoryMetrics() {
        const performanceMemory = performance.memory;
        if (!performanceMemory) {
            memoryUsedDisplay.textContent = "N/D";
            memoryLimitDisplay.textContent = "N/D";
            memoryStatusDisplay.textContent = "Tu navegador no expone performance.memory. En Chrome normalmente si aparece.";
            return;
        }
        memoryUsedDisplay.textContent = formatMegabytes(performanceMemory.usedJSHeapSize);
        memoryLimitDisplay.textContent = formatMegabytes(performanceMemory.jsHeapSizeLimit);
        memoryStatusDisplay.textContent = `Heap reservado: ${formatMegabytes(performanceMemory.totalJSHeapSize)}`;
    }
    function createParticleEngine(renderContext, renderCanvas) {
        let particles = [];
        let options = readOptions();
        let animationId = 0;
        let lastTime = performance.now();
        let fpsTime = 0;
        let fpsFrames = 0;
        let isPaused = false;
        const pointer = { x: 0, y: 0, active: false };
        /*
          Closure: las variables particles, options, lastTime, fpsFrames e isPaused
          viven dentro de createParticleEngine. Los metodos retornados las siguen
          recordando entre cada frame sin exponerlas como variables globales.
        */
        const resize = () => {
            const rect = renderCanvas.getBoundingClientRect();
            const scale = window.devicePixelRatio || 1;
            renderCanvas.width = Math.floor(rect.width * scale);
            renderCanvas.height = Math.floor(rect.height * scale);
            renderContext.setTransform(scale, 0, 0, scale, 0, 0);
        };
        const syncParticles = () => {
            const rect = renderCanvas.getBoundingClientRect();
            while (particles.length < options.amount) {
                particles.push(createParticle(rect.width, rect.height, options));
            }
            particles = particles.slice(0, options.amount);
            assignTargets();
            counterDisplay.textContent = `${particles.length} particulas`;
        };
        const updateOptions = (nextOptions) => {
            const speedChanged = nextOptions.speed !== options.speed;
            const sizeChanged = nextOptions.size !== options.size;
            const shapeChanged = nextOptions.shape !== options.shape;
            options = nextOptions;
            setTheme(options.palette);
            if (speedChanged) {
                particles.forEach((particle) => applySpeedToParticle(particle, options.speed));
            }
            if (sizeChanged) {
                particles.forEach((particle) => applySizeToParticle(particle, options.size));
            }
            syncParticles();
            if (shapeChanged) {
                assignTargets();
            }
        };
        const assignTargets = () => {
            const rect = renderCanvas.getBoundingClientRect();
            const targets = buildShapePoints(rect.width, rect.height, options.shape, particles.length);
            particles.forEach((particle, index) => {
                const target = targets[index];
                particle.tx = target.x;
                particle.ty = target.y;
            });
        };
        const reset = () => {
            const rect = renderCanvas.getBoundingClientRect();
            particles = Array.from({ length: options.amount }, () => createParticle(rect.width, rect.height, options));
            assignTargets();
            counterDisplay.textContent = `${particles.length} particulas`;
        };
        const update = (dt) => {
            const rect = renderCanvas.getBoundingClientRect();
            particles.forEach((particle) => {
                const targetDx = particle.tx - particle.x;
                const targetDy = particle.ty - particle.y;
                const pull = options.speed * 0.018;
                particle.vx += targetDx * pull * dt;
                particle.vy += targetDy * pull * dt;
                if (pointer.active) {
                    const dx = pointer.x - particle.x;
                    const dy = pointer.y - particle.y;
                    const distance = Math.hypot(dx, dy) || 1;
                    const force = Math.min(220 / distance, 2.4);
                    particle.vx -= (dx / distance) * force * dt * 20;
                    particle.vy -= (dy / distance) * force * dt * 20;
                }
                particle.vx *= 0.985;
                particle.vy *= 0.985;
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;
                if (particle.x < particle.radius || particle.x > rect.width - particle.radius) {
                    particle.vx *= -1;
                    particle.x = clamp(particle.x, particle.radius, rect.width - particle.radius);
                }
                if (particle.y < particle.radius || particle.y > rect.height - particle.radius) {
                    particle.vy *= -1;
                    particle.y = clamp(particle.y, particle.radius, rect.height - particle.radius);
                }
            });
        };
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const a = particles[i];
                    const b = particles[j];
                    const distance = Math.hypot(a.x - b.x, a.y - b.y);
                    if (distance < 115) {
                        renderContext.beginPath();
                        renderContext.strokeStyle = `hsla(${a.hue}, 88%, 70%, ${1 - distance / 115})`;
                        renderContext.lineWidth = 0.8;
                        renderContext.moveTo(a.x, a.y);
                        renderContext.lineTo(b.x, b.y);
                        renderContext.stroke();
                    }
                }
            }
        };
        const draw = () => {
            const rect = renderCanvas.getBoundingClientRect();
            renderContext.fillStyle = options.trails ? "rgba(5, 10, 19, 0.18)" : "#050a13";
            renderContext.fillRect(0, 0, rect.width, rect.height);
            drawConnections();
            particles.forEach((particle) => {
                renderContext.beginPath();
                renderContext.fillStyle = `hsl(${particle.hue}, 92%, 68%)`;
                renderContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                renderContext.fill();
            });
            renderContext.strokeStyle = "rgba(255, 255, 255, 0.18)";
            renderContext.strokeRect(0.5, 0.5, rect.width - 1, rect.height - 1);
        };
        const renderFrame = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;
            if (!isPaused) {
                update(dt);
                draw();
                fpsTime += dt;
                fpsFrames += 1;
                if (fpsTime >= 0.5) {
                    fpsDisplay.textContent = String(Math.round(fpsFrames / fpsTime));
                    updateMemoryMetrics();
                    fpsTime = 0;
                    fpsFrames = 0;
                }
            }
            animationId = requestAnimationFrame(renderFrame);
        };
        const start = () => {
            resize();
            reset();
            lastTime = performance.now();
            animationId = requestAnimationFrame(renderFrame);
        };
        const togglePause = () => {
            isPaused = !isPaused;
            statusDisplay.textContent = isPaused ? "Pausado" : "Ejecutando";
            statusDisplay.classList.toggle("is-paused", isPaused);
        };
        const stop = () => {
            cancelAnimationFrame(animationId);
        };
        const setPointer = (x, y, active) => {
            pointer.x = x;
            pointer.y = y;
            pointer.active = active;
        };
        return { start, stop, reset, resize, updateOptions, togglePause, setPointer };
    }
    const engine = createParticleEngine(context, canvasElement);
    const handleControlChange = () => {
        const options = readOptions();
        if (!validateOptions(options)) {
            return;
        }
        engine.updateOptions(options);
    };
    const handlePointerMove = (event) => {
        const rect = canvasElement.getBoundingClientRect();
        engine.setPointer(event.clientX - rect.left, event.clientY - rect.top, true);
    };
    particleInput.addEventListener("input", handleControlChange);
    speedInput.addEventListener("input", handleControlChange);
    sizeInput.addEventListener("input", handleControlChange);
    shapeInput.addEventListener("change", handleControlChange);
    paletteInput.addEventListener("change", handleControlChange);
    trailInput.addEventListener("change", handleControlChange);
    window.addEventListener("resize", engine.resize);
    canvasElement.addEventListener("pointermove", handlePointerMove);
    canvasElement.addEventListener("pointerleave", () => engine.setPointer(0, 0, false));
    buttonsContainer.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) {
            return;
        }
        if (button.dataset.action === "pause") {
            engine.togglePause();
            button.textContent = button.textContent === "Pausar" ? "Reanudar" : "Pausar";
        }
        if (button.dataset.action === "reset") {
            engine.reset();
        }
    });
    window.addEventListener("beforeunload", () => {
        engine.stop();
    });
    setTheme("aurora");
    updateMemoryMetrics();
    engine.start();
})();
