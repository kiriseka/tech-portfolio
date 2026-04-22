import { useEffect, useRef, useState } from 'react';

interface Particle { x: number; y: number; life: number; }

const TRAIL_LENGTH = 18;

const CursorFollower = () => {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -300, y: -300 });
    const pos = useRef({ x: -300, y: -300 });
    const hoverRef = useRef(false);
    const trailRef = useRef<Particle[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        document.body.classList.add('custom-cursor');

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
        };
        const onOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            hoverRef.current = !!el.closest('button,a,[role="button"],input,textarea,label,[tabindex="0"]');
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);

        let id: number;
        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

            const r = hoverRef.current ? 20 : 14;
            const glowColor = hoverRef.current ? 'rgba(166,226,46,0.9)' : 'rgba(255,255,255,0.85)';
            const glowShadow = hoverRef.current
                ? '0 0 8px #a6e22e, 0 0 20px rgba(166,226,46,0.5)'
                : '0 0 6px rgba(255,255,255,0.6), 0 0 16px rgba(112,66,20,0.4)';

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${pos.current.x - r}px,${pos.current.y - r}px,0)`;
                ringRef.current.style.width = `${r * 2}px`;
                ringRef.current.style.height = `${r * 2}px`;
                ringRef.current.style.borderColor = glowColor;
                ringRef.current.style.boxShadow = glowShadow;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouse.current.x - 3}px,${mouse.current.y - 3}px,0)`;
                dotRef.current.style.backgroundColor = glowColor;
                dotRef.current.style.boxShadow = glowShadow;
            }

            // Particle trail on canvas
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    trailRef.current.push({ x: mouse.current.x, y: mouse.current.y, life: 1 });
                    if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.shift();

                    trailRef.current.forEach((p, i) => {
                        p.life -= 0.05;
                        const t = i / trailRef.current.length;
                        const size = t * 3 + 0.5;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                        ctx.fillStyle = hoverRef.current
                            ? `rgba(166,226,46,${t * 0.5})`
                            : `rgba(112,66,20,${t * 0.6})`;
                        ctx.fill();
                    });
                }
            }

            id = requestAnimationFrame(animate);
        };
        id = requestAnimationFrame(animate);

        return () => {
            document.body.classList.remove('custom-cursor');
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            cancelAnimationFrame(id);
        };
    }, []); // eslint-disable-line

    if (!visible) return null;

    const fixed: React.CSSProperties = { position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, willChange: 'transform' };

    return (
        <>
            {/* Particle trail canvas */}
            <canvas ref={canvasRef} style={{ ...fixed, width: '100vw', height: '100vh', zIndex: 9997 }} />

            {/* Lagging ring */}
            <div ref={ringRef} style={{
                ...fixed, border: '1.5px solid rgba(255,255,255,0.85)',
                transition: 'border-color 0.12s, box-shadow 0.12s, width 0.12s, height 0.12s',
            }} />

            {/* Exact dot */}
            <div ref={dotRef} style={{
                ...fixed, width: 6, height: 6, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)',
                transition: 'background-color 0.12s, box-shadow 0.12s',
            }} />
        </>
    );
};

export default CursorFollower;
