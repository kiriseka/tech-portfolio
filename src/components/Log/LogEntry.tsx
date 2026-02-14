import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Log {
    date: string;
    title: string;
    content: string;
    tags: string[];
}

const logs: Log[] = [
    {
        date: '2025.06 - 2025.12',
        title: 'IELTS Tutor @ Titiknol English Course',
        content: 'Delivered targeted IELTS Writing & Reading lessons. Taught key test-taking strategies (skimming, scanning) and fostered a supportive environment for students.',
        tags: ['Education', 'Teaching'],
    },
    {
        date: '2023.09 - 2024.01',
        title: 'Fullstack Developer @ PT Solmit Bangun Indonesia',
        content: 'Developed and maintained full-stack applications using CodeIgniter 3. Designed and implemented modules for Knowledge Management (KMS) and Risk-Based Audit (RBA) systems. Managed end-to-end SDLC.',
        tags: ['Fullstack', 'CodeIgniter', 'System Design'],
    },
    {
        date: '2023.02 - 2023.08',
        title: 'Fullstack Developer @ PT Adi Agripana Abadi',
        content: 'Developed an internal logistics application using Laravel. Engineered CRUD functionalities for invoices/outlets and implemented RBAC for secure user management.',
        tags: ['Laravel', 'Logistics', 'RBAC'],
    },
    {
        date: '2021.08 - 2022.08',
        title: 'Leader @ Gemo Game UIN Bandung',
        content: 'Developed and facilitated game development workshops. Mentored members through the complete development lifecycle and fostered a dynamic learning environment.',
        tags: ['Leadership', 'Game Dev', 'Mentoring'],
    },
];

const LogEntry = () => {
    return (
        <section className="py-20 max-w-4xl mx-auto px-6">
            <div className="flex items-center mb-16">
                <span className="font-mono text-[var(--color-sepia)] mr-4">04.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white">System Logs</h2>
            </div>

            <div className="relative border-l border-[var(--color-charcoal)] ml-3 md:ml-6 space-y-12">
                {logs.map((log, index) => (
                    <LogItem key={index} log={log} />
                ))}
            </div>
        </section>
    );
};

const LogItem = ({ log }: { log: Log }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full border border-[var(--color-sepia)] bg-[var(--color-charcoal)] transition-colors duration-500 ${isInView ? 'bg-[var(--color-olive)] border-[var(--color-olive)]' : ''}`} />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="font-mono text-xs text-[var(--color-olive)] mb-2 flex items-center flex-wrap gap-2 font-bold">
                    <span className="whitespace-nowrap text-[#FFC107]">[{log.date}]</span>
                    <span className="text-white hidden md:inline">|</span>
                    <div className="flex flex-wrap gap-2">
                        {log.tags.map(tag => (
                            <span key={tag} className="text-gray-300">#{tag}</span>
                        ))}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group cursor-pointer w-fit">
                    <span className="group-hover:text-[var(--color-olive)] transition-colors">{log.title}</span>
                </h3>

                <p className="text-[var(--color-text-main)] font-mono text-sm leading-relaxed max-w-2xl bg-[rgba(255,255,255,0.05)] p-5 border-l-2 border-[var(--color-olive)] shadow-sm">
                    {log.content}
                </p>
            </motion.div>
        </div>
    );
};

export default LogEntry;
