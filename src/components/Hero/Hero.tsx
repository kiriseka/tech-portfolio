import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Hero = () => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const text1 = "Initialising system sequence...";
    const text2 = "User detected: Maulana Hamdani | Fullstack Developer";
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const typeSequence = async () => {
            // Type Line 1
            for (let i = 0; i <= text1.length; i++) {
                setLine1(text1.slice(0, i));
                await new Promise(r => setTimeout(r, 30));
            }

            // Pause
            await new Promise(r => setTimeout(r, 300));

            // Type Line 2
            for (let i = 0; i <= text2.length; i++) {
                setLine2(text2.slice(0, i));
                await new Promise(r => setTimeout(r, 40));
            }
        };

        typeSequence();
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-start pt-20">

            {/* Terminal Header */}
            <div className="flex items-center space-x-2 text-[var(--color-olive)] mb-6 opacity-80 font-mono text-sm">
                <Terminal size={16} />
                <span>root@portfolio:~/entry_point</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter text-white">
                <span className="opacity-50 mr-4 text-2xl md:text-4xl align-middle font-mono text-[var(--color-sepia)]">01.</span>
                Creating digital <br />
                <span className="text-[var(--color-sepia)] relative inline-block glitch-text" data-text="artifacts">
                    artifacts
                    <span className="absolute -inset-1 border border-[var(--color-olive)] opacity-20 -z-10 translate-x-1 translate-y-1"></span>
                </span>
                <span className="ml-4 opacity-50 font-normal text-2xl md:text-4xl">&&</span>
            </h1>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter text-white">
                interactive <span className="italic font-serif text-[var(--color-sepia)]">systems</span>.
            </h2>

            {/* Typing Subtext */}
            <div className="font-mono text-lg md:text-xl text-[var(--color-text-main)] max-w-3xl min-h-32 mb-12">
                <div className="mb-2">
                    <span className="text-[var(--color-olive)] mr-2">{'>'}</span>
                    {line1}
                </div>

                {/* Only show second line area if line1 is started/done */}
                <div className="flex flex-wrap items-center">
                    {line1.length > 5 && (
                        <span className="text-[var(--color-olive)] mr-2 animate-[fadeIn_0.5s_ease-in_forwards]" style={{ animationDelay: '1.5s' }}>{'>'}</span>
                    )}

                    {/* Split line 2 manually for styling control */}
                    <span className="mr-2">
                        {line2.split("Maulana")[0]}
                    </span>

                    {line2.includes("Maulana") && (
                        <span className="font-bold text-2xl md:text-3xl text-[#4ade80] tracking-wide relative inline-block">
                            {line2.split("User detected: ")[1] || "Maulana Hamdani | Fullstack Developer"}
                            {/* Text Glow Effect */}
                            <span className="absolute inset-0 blur-[2px] opacity-50 bg-[#4ade80] -z-10 block"></span>
                        </span>
                    )}

                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 bg-[var(--color-olive)] text-[var(--color-charcoal)] px-1 inline-block h-[1.2em] w-3 align-middle`}>
                    </span>
                </div>
            </div>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-[var(--color-charcoal)] border border-[var(--color-text-main)] overflow-hidden"
            >
                <span className="relative z-10 flex items-center space-x-2 font-mono text-sm tracking-widest uppercase">
                    <span>Initialize Process</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-[var(--color-sepia)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 opacity-20"></div>
            </motion.button>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none -z-10 opacity-10">
                <div className="w-full h-full border-l border-[var(--color-sepia)] border-dashed"></div>
            </div>
        </section>
    );
};

export default Hero;
