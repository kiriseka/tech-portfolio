import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

interface CommandPaletteProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const CommandPalette = ({ isOpen, setIsOpen }: CommandPaletteProps) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    // Reset active index when query changes
    useEffect(() => { setActiveIndex(0); }, [query]);
    // Focus input when opened
    useEffect(() => { if (isOpen) { setQuery(''); setActiveIndex(0); } }, [isOpen]);

    const menuItems = [
        { id: 'artifacts', label: 'Access Artifacts', sub: 'View Projects', icon: 'P' },
        { id: 'skills', label: 'System Diagnostics', sub: 'View Skills', icon: 'S' },
        { id: 'log', label: 'Read Logs', sub: 'About Me', icon: 'L' },
        { id: 'publication', label: 'Publications', sub: 'Research & Writing', icon: 'R' },
        { id: 'contact', label: 'Transmit Signal', sub: 'Contact', icon: 'T' },
    ];

    const filteredItems = menuItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
    );

    const scrollToSection = (id: string) => {
        setIsOpen(false);
        setQuery('');
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && filteredItems[activeIndex]) {
            scrollToSection(filteredItems[activeIndex].id);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* CTRL+K Hint Badge — shown when palette is closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[60] hidden md:flex items-center gap-2 font-mono text-xs tracking-widest cursor-pointer cta-pulse bg-[var(--color-charcoal)] border border-[var(--color-sepia)] px-3 py-2 text-white hover:border-[var(--color-olive)] hover:text-[var(--color-olive)] transition-colors"
                >
                    <span className="bg-[var(--color-sepia)] text-white px-2 py-0.5 text-[10px] font-bold">CTRL+K</span>
                    <span className="opacity-70">NAVIGATE</span>
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-[var(--color-charcoal)] border border-[var(--color-sepia)] shadow-[0_0_30px_rgba(112,66,20,0.3)] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center px-4 py-3 border-b border-[var(--color-charcoal)] bg-[rgba(255,255,255,0.03)]">
                                <Command className="w-5 h-5 text-[var(--color-sepia)] mr-3 opacity-70" />
                                <input
                                    ref={inputRef}
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or use ↑↓ to navigate..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    className="flex-1 bg-transparent border-none outline-none text-[var(--color-text-main)] font-mono text-lg placeholder:opacity-30"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-main)] opacity-50 hover:opacity-100">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Keyboard hint */}
                            <div className="px-4 py-1.5 text-[9px] font-mono text-[var(--color-text-main)] opacity-30 flex gap-4">
                                <span>↑↓ NAVIGATE</span>
                                <span>↵ SELECT</span>
                                <span>ESC CLOSE</span>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto py-2">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            onKeyDown={(e) => e.key === 'Enter' && scrollToSection(item.id)}
                                            tabIndex={0}
                                            role="button"
                                            className={`group flex items-center px-4 py-3 mx-2 my-1 cursor-pointer transition-colors focus:outline-none ${activeIndex === idx ? 'bg-[var(--color-sepia)] bg-opacity-20' : 'hover:bg-[var(--color-sepia)] hover:bg-opacity-20'}`}
                                        >
                                            <div className={`w-8 h-8 flex items-center justify-center border text-xs font-mono mr-4 transition-colors ${activeIndex === idx ? 'border-[var(--color-olive)] text-[var(--color-olive)]' : 'border-[var(--color-text-main)] border-opacity-30 group-hover:border-[var(--color-olive)] group-hover:text-[var(--color-olive)]'}`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-mono text-sm tracking-wider text-[var(--color-text-main)] group-hover:text-white">{item.label}</span>
                                                <span className="text-xs opacity-50 font-sans group-hover:text-[var(--color-olive)]">{item.sub}</span>
                                            </div>
                                            <div className="ml-auto text-[var(--color-olive)] text-xs font-mono opacity-0 group-hover:opacity-100">⏎ ENTER</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center opacity-40 font-mono text-sm">No matching protocols found.</div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 bg-[rgba(0,0,0,0.3)] border-t border-[var(--color-sepia)] border-opacity-20 flex justify-between items-center text-[10px] text-[var(--color-text-main)] opacity-50 font-mono uppercase tracking-widest">
                                <span>System Ready</span>
                                <span>v1.0.4</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CommandPalette;
