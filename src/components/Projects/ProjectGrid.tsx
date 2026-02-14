import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Database, Globe, X, ExternalLink, Github, Box } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    type: string;
    description: string;
    tech: string[];
    icon: React.ReactNode;
    github?: string;
    demo?: string;
}

const projects: Project[] = [
    {
        id: '01',
        title: 'KMS & RBA System',
        type: 'Enterprise System',
        description: 'Designed and implemented key modules for Knowledge Management (KMS) and Risk-Based Audit (RBA) systems at PT Solmit Bangun Indonesia. Managed the end-to-end SDLC from requirements to debugging.',
        tech: ['CodeIgniter 3', 'PHP', 'MySQL', 'Bootstrap'],
        icon: <Database size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka',
    },
    {
        id: '02',
        title: 'Logistics App',
        type: 'Internal Tool',
        description: 'Developed an internal logistics application for PT Adi Agripana Abadi to manage goods distribution. Engineered CRUD functionalities for invoices and outlets, plus Role-Based Access Control (RBAC).',
        tech: ['Laravel', 'PHP', 'PostgreSQL', 'RBAC'],
        icon: <Box size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka',
    },
    {
        id: '03',
        title: 'Visual Novel AI',
        type: 'Research Project',
        description: 'Implemented Decision Tree algorithms in a visual novel game using the RenPy engine. Published in AIP Conference Proceedings. Explored the intersection of narrative gaming and AI.',
        tech: ['Python', 'RenPy', 'AI', 'Algorithms'],
        icon: <Globe size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka',
    },
    {
        id: '04',
        title: 'Live Chat App',
        type: 'Real-time System',
        description: 'A real-time chat application built with Laravel. Features instant messaging, user presence, and channel management. Demonstrates WebSocket integration and event broadcasting.',
        tech: ['Laravel', 'WebSockets', 'JavaScript', 'MySQL'],
        icon: <Database size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka/laravel-live-chat-app',
    },
    {
        id: '05',
        title: 'Portfolio Game',
        type: 'Interactive Web',
        description: 'An experimental portfolio concept designed as a playable game. Showcases creative coding and interactive frontend development skills.',
        tech: ['JavaScript', 'Game Dev', 'Canvas'],
        icon: <Folder size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka/portfolio-game',
    },
    {
        id: '06',
        title: 'iCourse Platform',
        type: 'LMS Application',
        description: 'A comprehensive course management system for educational content. Features student enrollment, course progression tracking, and administrative dashboards.',
        tech: ['PHP', 'Web', 'Database Design'],
        icon: <Folder size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka/iCourse',
    },
];

const ProjectGrid = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="artifacts" className="py-20 max-w-7xl mx-auto">
            <div className="flex items-center mb-12">
                <span className="font-mono text-[var(--color-sepia)] mr-4">02.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white">Artifacts</h2>
                <div className="flex-1 h-px bg-[var(--color-charcoal)] ml-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--color-olive)] w-1/4 animate-loading-bar opacity-30"></div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        whileHover={{ y: -5, borderColor: 'var(--color-olive)' }}
                        className="group relative h-64 bg-[rgba(26,26,26,0.6)] border border-[var(--color-charcoal)] p-6 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20 font-mono text-xs group-hover:opacity-100 transition-opacity text-[var(--color-olive)]">
                            ID: {project.id}
                        </div>

                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 origin-top-left">
                            {project.icon}
                        </div>

                        <div className="relative z-10">
                            <h3
                                className="text-xl font-bold mb-1 text-[var(--color-text-main)] group-hover:text-white transition-colors glitch-text-hover inline-block"
                                data-text={project.title}
                            >
                                {project.title}
                            </h3>
                            <p className="text-xs font-mono text-[var(--color-olive)] opacity-70">{project.type}</p>
                        </div>

                        {/* Hover Glitch Overlay */}
                        <div className="absolute inset-0 bg-[var(--color-sepia)] opacity-0 group-hover:opacity-5 mix-blend-overlay transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Side Drawer Details */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            layoutId={`card-${selectedId}`} // Syncs with grid item
                            className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[var(--color-charcoal)] border-l border-[var(--color-sepia)] z-[70] p-8 md:p-12 overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-6 right-6 text-[var(--color-text-main)] hover:text-[var(--color-olive)]"
                            >
                                <X size={24} />
                            </button>

                            <div className="font-mono text-[var(--color-olive)] text-sm mb-6">
                                // ARTIFACT_DETAILS_LOADED
                            </div>

                            <div className="mb-8">
                                {selectedProject.icon}
                            </div>

                            <h2 className="text-4xl font-bold mb-2 text-white">{selectedProject.title}</h2>
                            <p className="font-mono text-[var(--color-sepia)] mb-8">{selectedProject.type}</p>

                            <div className="prose prose-invert border-t border-[var(--color-text-main)] border-opacity-20 pt-8 mb-8">
                                <p className="text-lg leading-relaxed text-[var(--color-text-main)] opacity-90">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="mb-12">
                                <h4 className="font-mono text-sm uppercase tracking-widest text-[var(--color-text-main)] opacity-50 mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="px-3 py-1 border border-[var(--color-text-main)] border-opacity-30 text-xs font-mono text-[var(--color-text-main)]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                {selectedProject.demo && (
                                    <a
                                        href={selectedProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 px-6 py-3 bg-[var(--color-olive)] text-[var(--color-charcoal)] font-bold hover:bg-white transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 px-6 py-3 border border-[var(--color-text-main)] hover:border-white transition-colors text-[var(--color-text-main)] hover:text-white"
                                    >
                                        <Github size={18} />
                                        <span>Source Code</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectGrid;
