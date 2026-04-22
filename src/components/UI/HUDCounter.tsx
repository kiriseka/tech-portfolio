import { useState, useEffect } from 'react';

const SECTION_IDS = ['hero', 'artifacts', 'skills', 'log', 'publication', 'contact'];

const HUDCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const seen = new Set<string>();
        const observers = SECTION_IDS.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    seen.add(id);
                    setCount(seen.size);
                }
            }, { threshold: 0.1 });
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    return (
        <div className="fixed bottom-4 left-6 z-[60] font-mono text-[9px] tracking-[0.2em] text-[var(--color-olive)] opacity-30 pointer-events-none select-none hidden md:block">
            [{count}/{SECTION_IDS.length}] SECTORS SCANNED
        </div>
    );
};

export default HUDCounter;
