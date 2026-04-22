import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';

/* ── Canvas particle network ──────────────────────────────────── */
const ParticleCanvas = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                life: Math.random() * 200,
                maxLife: 200 + Math.random() * 200,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                if (p.life > p.maxLife || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                    p.life = 0;
                }
                const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(85, 107, 47, ${alpha})`;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(112, 66, 20, ${0.15 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── Scrolling hex data stream ────────────────────────────────── */
const HEX_CHARS = '0123456789ABCDEF';
const DataStream = () => {
    const [cols, setCols] = useState<string[][]>([]);

    useEffect(() => {
        const NUM_COLS = 4;
        const ROWS = 30;
        const init = Array.from({ length: NUM_COLS }, () =>
            Array.from({ length: ROWS }, () => HEX_CHARS[Math.floor(Math.random() * 16)])
        );
        setCols(init);

        const interval = setInterval(() => {
            setCols(prev =>
                prev.map(col => {
                    const shifted = [...col];
                    shifted.shift();
                    shifted.push(HEX_CHARS[Math.floor(Math.random() * 16)]);
                    return shifted;
                })
            );
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 right-0 h-full flex gap-3 pr-4 pt-4 pointer-events-none select-none overflow-hidden opacity-20">
            {cols.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1">
                    {col.map((char, ri) => (
                        <span
                            key={ri}
                            className="text-[10px] font-mono leading-none"
                            style={{
                                color: ri === col.length - 1 ? '#a6e22e' : '#556b2f',
                                opacity: (ri / col.length) * 0.8 + 0.2,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

/* helper: shared entrance animation props */
const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: 'easeOut' as const },
});

/* ── Hero ─────────────────────────────────────────────────────── */
const Hero = () => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');
    const text1 = 'Initialising system sequence...';
    const text2 = 'User detected: Maulana Hamdani | Fullstack Developer';
    const text3 = 'hint: the keyboard is listening...';
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const typeSequence = async () => {
            await new Promise(r => setTimeout(r, 1200));
            // Type line 1
            for (let i = 0; i <= text1.length; i++) {
                setLine1(text1.slice(0, i));
                await new Promise(r => setTimeout(r, 30));
            }
            await new Promise(r => setTimeout(r, 300));
            // Type line 2
            for (let i = 0; i <= text2.length; i++) {
                setLine2(text2.slice(0, i));
                await new Promise(r => setTimeout(r, 40));
            }
            await new Promise(r => setTimeout(r, 1000));
            // Type line 3 (hint)
            for (let i = 0; i <= text3.length; i++) {
                setLine3(text3.slice(0, i));
                await new Promise(r => setTimeout(r, 50));
            }
        };
        typeSequence();
    }, []);

    useEffect(() => {
        const id = setInterval(() => setShowCursor(p => !p), 530);
        return () => clearInterval(id);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden">

            {/* Particle network */}
            <ParticleCanvas />

            {/* Hex stream (desktop only) */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-16">
                <DataStream />
            </div>

            {/* Top accent line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
                style={{ originX: 0 }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--color-sepia)] via-[var(--color-olive)] to-transparent"
            />

            {/* Content */}
            <div className="relative z-10 w-full">

                {/* Terminal label */}
                <motion.div {...fadeUp(0.3)} className="flex items-center gap-2 text-[var(--color-olive)] mb-8 font-mono text-sm">
                    <Terminal size={14} className="animate-pulse" />
                    <span className="opacity-70">root@portfolio:~/entry_point</span>
                    <span className="px-2 py-0.5 text-[10px] bg-[var(--color-olive)] text-black font-bold tracking-widest">LIVE</span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                    {...fadeUp(0.5)}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 tracking-tighter text-white leading-[1.05]"
                >
                    <span className="opacity-40 mr-4 text-2xl md:text-4xl align-middle font-mono text-[var(--color-sepia)]">01.</span>
                    Creating<br />
                    <span
                        className="text-[var(--color-sepia)] relative inline-block glitch-text hero-glow"
                        data-text="digital artifacts"
                    >
                        digital artifacts
                        <span className="absolute -inset-1 border border-[var(--color-olive)] opacity-20 -z-10 translate-x-1 translate-y-1" />
                    </span>
                </motion.h1>

                {/* H2 */}
                <motion.h2
                    {...fadeUp(0.7)}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 tracking-tighter text-white leading-[1.05]"
                >
                    <span className="opacity-40 mr-4 text-2xl md:text-4xl align-middle font-mono">&amp;</span>
                    interactive{' '}
                    <span className="italic font-serif text-[var(--color-sepia)]">systems</span>.
                </motion.h2>

                {/* Typing block */}
                <motion.div
                    {...fadeUp(0.9)}
                    className="font-mono text-base md:text-lg text-[var(--color-text-main)] max-w-3xl min-h-28 mb-12 bg-black/30 border border-[var(--color-olive)]/20 px-4 py-3"
                >
                    <div className="mb-2 opacity-80">
                        <span className="text-[var(--color-olive)] mr-2">{'>'}</span>
                        {line1}
                    </div>

                    <div className="mb-2 flex flex-wrap items-center">
                        {line1.length > 5 && (
                            <span className="text-[var(--color-olive)] mr-2">{'>'}</span>
                        )}
                        <span className="mr-2">{line2.split('Maulana')[0]}</span>
                        {line2.includes('Maulana') && (
                            <span className="font-bold text-xl md:text-2xl text-[#4ade80] tracking-wide relative inline-block name-glow">
                                {line2.split('User detected: ')[1] || 'Maulana Hamdani | Fullstack Developer'}
                            </span>
                        )}
                        {/* Cursor moves here if line3 hasn't started yet */}
                        {line2.length === text2.length && line3.length === 0 && (
                            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 bg-[var(--color-olive)] inline-block h-[1.1em] w-2.5 align-middle`} />
                        )}
                    </div>

                    {line3.length > 0 && (
                        <div className="flex flex-wrap items-center opacity-60 text-sm md:text-base mt-4 pt-4 border-t border-[var(--color-olive)]/20">
                            <span className="text-[var(--color-olive)] mr-2">{'>'}</span>
                            <span className="mr-2">{line3}</span>
                            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 bg-[var(--color-olive)] inline-block h-[1.1em] w-2.5 align-middle`} />
                        </div>
                    )}
                </motion.div>

                {/* CTA */}
                <motion.div {...fadeUp(1.1)}>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                            const el = document.getElementById('artifacts');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="cta-pulse group relative px-8 py-4 bg-[var(--color-charcoal)] border border-[var(--color-sepia)] overflow-hidden cursor-pointer"
                    >
                        <span className="relative z-10 flex items-center gap-3 font-mono text-sm tracking-[0.2em] uppercase text-white">
                            <span>Initialize Process</span>
                            <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-sepia)] to-[var(--color-olive)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 opacity-25" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-charcoal)] to-transparent pointer-events-none" />


        </section>
    );
};

export default Hero;
