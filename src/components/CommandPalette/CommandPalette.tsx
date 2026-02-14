import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

interface CommandPaletteProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const CommandPalette = ({ isOpen, setIsOpen }: CommandPaletteProps) => {
    const [query, setQuery] = useState('');

    // Toggle with Cmd+K
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

    const menuItems = [
        { id: 'projects', label: 'Access Artifacts', sub: 'View Projects', icon: 'P' },
        { id: 'skills', label: 'System Diagnostics', sub: 'View Skills', icon: 'S' },
        { id: 'log', label: 'Read Logs', sub: 'About Me', icon: 'L' },
        { id: 'contact', label: 'Transmit Signal', sub: 'Contact', icon: 'T' },
    ];

    const filteredItems = menuItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-[var(--color-charcoal)] border border-[var(--color-sepia)] shadow-[0_0_30px_rgba(112,66,20,0.3)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center px-4 py-3 border-b border-[var(--color-charcoal)] bg-[rgba(255,255,255,0.03)] local-input-wrapper">
                            <Command className="w-5 h-5 text-[var(--color-sepia)] mr-3 opacity-70" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-[var(--color-text-main)] font-mono text-lg placeholder:opacity-30"
                            />
                            <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-main)] opacity-50 hover:opacity-100">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto py-2">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center px-4 py-3 mx-2 my-1 cursor-pointer hover:bg-[var(--color-sepia)] hover:bg-opacity-20 transition-colors"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center border border-[var(--color-text-main)] border-opacity-30 text-xs font-mono mr-4 group-hover:border-[var(--color-olive)] group-hover:text-[var(--color-olive)] transition-colors">
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-mono text-sm tracking-wider text-[var(--color-text-main)] group-hover:text-white">{item.label}</span>
                                            <span className="text-xs opacity-50 font-sans group-hover:text-[var(--color-olive)]">{item.sub}</span>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 text-[var(--color-olive)] text-xs font-mono">
                                            ⏎ ENTER
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-8 text-center opacity-40 font-mono text-sm">
                                    No matching protocols found.
                                </div>
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
    );
};

export default CommandPalette;
