import { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'BOOT' },
    { id: 'artifacts', label: 'ARTIFACTS' },
    { id: 'skills', label: 'TOOLKIT' },
    { id: 'log', label: 'LOGS' },
    { id: 'publication', label: 'RESEARCH' },
    { id: 'contact', label: 'TRANSMIT' },
];

const SectionIndicator = () => {
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const mid = window.scrollY + window.innerHeight * 0.35;
            let closest = SECTIONS[0].id;
            let minDist = Infinity;
            SECTIONS.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (!el) return;
                const dist = Math.abs(el.offsetTop - mid);
                if (dist < minDist) { minDist = dist; closest = id; }
            });
            setActive(closest);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] hidden xl:flex flex-col gap-5">
            {SECTIONS.map(({ id, label }, i) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-3 cursor-pointer bg-transparent border-none p-0"
                >
                    <div className={`transition-all duration-300 ${active === id
                        ? 'w-3 h-3 bg-[var(--color-olive)] border border-[var(--color-olive)]'
                        : 'w-2 h-2 bg-transparent border border-[var(--color-sepia)] opacity-30 group-hover:opacity-80'}`}
                    />
                    <span className={`font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-200 ${active === id
                        ? 'opacity-100 text-[var(--color-olive)]'
                        : 'opacity-0 group-hover:opacity-70 text-[var(--color-text-main)]'}`}>
                        {String(i + 1).padStart(2, '0')}.{label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default SectionIndicator;
