import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Trigger = 'sudo' | 'hack' | 'matrix' | 'konami' | 'got' | 'marvel';

const MESSAGES: Record<Trigger, { title: string; lines: string[] }> = {
    sudo: {
        title: 'PRIVILEGE ESCALATION',
        lines: [
            '> sudo --force-access-all',
            '[sudo] password: ••••••••••',
            '',
            'Authenticating identity...',
            '████████████████████ 100%',
            '',
            '✓ ACCESS GRANTED',
            '✓ ROOT PERMISSIONS ELEVATED',
            '',
            'WELCOME, OPERATOR 👁',
        ],
    },
    hack: {
        title: 'INTRUSION SEQUENCE',
        lines: [
            '> launch hack_sequence.sh',
            'BYPASSING FIREWALL...',
            'ROUTING THROUGH 7 PROXIES...',
            'ENCRYPTED TUNNEL: ESTABLISHED',
            '',
            'SYSTEM BREACHED.',
            '',
            '(╯°□°）╯︵ ┻━┻',
            '',
            '— just a portfolio, chill —',
        ],
    },
    matrix: {
        title: 'SIMULATION ALERT',
        lines: [
            '',
            '"Wake up, Neo..."',
            '"The Matrix has you."',
            '"Follow the white rabbit."',
            '',
            'W A K E   U P .',
            '',
            '— click to exit the matrix —',
        ],
    },
    konami: {
        title: 'CHEAT CODE ACCEPTED',
        lines: [
            '⬆ ⬆ ⬇ ⬇ ⬅ ➡ ⬅ ➡  B  A',
            '',
            '✓ +9999 CHARISMA',
            '✓ +9999 RIZZ',
            '✓ DEVELOPER MODE: ON',
            '',
            'Thanks for playing 🎮',
        ],
    },
    got: {
        title: 'WINTER IS COMING',
        lines: [
            'The night is dark and full of bugs.',
            '',
            '"A developer always pays his debts."',
            '- House Lannister of Tech',
            '',
            'Hold the door...',
            '',
            '❄ THE NORTH REMEMBERS 🐺',
        ],
    },
    marvel: {
        title: 'MULTIVERSE ANOMALY',
        lines: [
            'My spidey-sense is tingling! 🕸',
            '',
            '"With great power, comes great responsibility."',
            '',
            'Your friendly neighborhood developer is here.',
            '',
            'THWIP! 🕷',
        ],
    },
};

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const TEXT_TRIGGERS: Trigger[] = ['sudo', 'hack', 'matrix', 'got', 'marvel'];

const EasterEgg = () => {
    const [trigger, setTrigger] = useState<Trigger | null>(null);
    const bufRef = useRef('');
    const konamiRef = useRef<string[]>([]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            // Konami
            konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
            if (JSON.stringify(konamiRef.current) === JSON.stringify(KONAMI)) {
                setTrigger('konami'); konamiRef.current = []; bufRef.current = ''; return;
            }

            // Text triggers
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                bufRef.current = (bufRef.current + e.key.toLowerCase()).slice(-10);
                const found = TEXT_TRIGGERS.find(t => bufRef.current.endsWith(t));
                if (found) { setTrigger(found); bufRef.current = ''; }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        if (!trigger) return;
        const t = setTimeout(() => setTrigger(null), 5000);
        return () => clearTimeout(t);
    }, [trigger]);

    const info = trigger ? MESSAGES[trigger] : null;

    return (
        <AnimatePresence>
            {trigger && info && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setTrigger(null)}
                    className="fixed inset-0 z-[9999] bg-black/96 flex flex-col items-center justify-center font-mono cursor-pointer px-8"
                >
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="max-w-md w-full">
                        <div className="text-[var(--color-olive)] text-[10px] tracking-widest mb-3 opacity-50">// EASTER_EGG_TRIGGERED</div>
                        <div className="border border-[var(--color-sepia)] bg-[#0a0a0a] p-6">
                            <div className="text-[var(--color-sepia)] text-xs tracking-widest uppercase mb-4 border-b border-[var(--color-sepia)]/30 pb-2">{info.title}</div>
                            <div className="space-y-1">
                                {info.lines.map((line, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                                        className="text-sm text-[var(--color-text-main)]">{line || '\u00A0'}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3 text-center text-[9px] text-[var(--color-olive)] opacity-40 tracking-widest">[CLICK ANYWHERE TO DISMISS]</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
