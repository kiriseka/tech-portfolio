import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Folder, Database, Globe, X, ExternalLink, Github, Box } from 'lucide-react';
import logisticsAppImage from '../../assets/logistics-app.png';
import adiLandingPageImage from '../../assets/adi-landing-page.png';
import personalLandingPageImage from '../../assets/personal-landing-page.png';
import liveChatAppImage from '../../assets/live-chat-app.png';
import monitorFollowingLedImage from '../../assets/monitor-following-led.jpg';
import selfHostedWebsiteImage from '../../assets/self-hosted-website.png';
import monitorFollowingLedVideo from '../../assets/monitor-following-led.mp4';


interface Project {
    id: string;
    title: string;
    type: string;
    description: string;
    tech: string[];
    icon: React.ReactNode;
    github?: string;
    demo?: string;
    image?: string;
    video?: string;
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
        description: 'Developed an internal logistics application for PT Adi Agripana Abadi to manage goods distribution. Engineered CRUD functionalities, plus Role-Based Access Control (RBAC) and many other complex stuff :D',
        tech: ['Laravel', 'PHP', 'MariaDB', 'RBAC'],
        icon: <Box size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka',
        image: logisticsAppImage,
    },
    {
        id: '03',
        title: 'Company Landing Page',
        type: 'Landing Page',
        description: 'Landing page for PT Adi Agripana Abadi. Engineered with modern web technologies to showcase company profile and services.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        icon: <Globe size={40} className="text-[var(--color-sepia)]" />,
        demo: 'https://adiagripana.com',
        image: adiLandingPageImage,
        // github: 'https://github.com/kiriseka',
    },
    {
        id: '04',
        title: 'Personal Landing Page',
        type: 'Landing Page',
        description: 'Landing page for personal portfolio. Engineered with modern web technologies to showcase professional profile and skills.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        icon: <Globe size={40} className="text-[var(--color-sepia)]" />,
        demo: 'https://milaseptiyah.my.id',
        image: personalLandingPageImage,
        // github: 'https://github.com/kiriseka/laravel-live-chat-app',
    },
    {
        id: '05',
        title: 'Endless Runner Game',
        type: 'Godot Game',
        description: 'An endless runner game made with Godot Engine. Showcases creative coding and game development skills. I do the code, while my friend do the art.',
        tech: ['Godot', 'GDScript', 'Game Dev'],
        icon: <Folder size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/GemoGame/Kucing-Oren-Run-Godot',
        // Example of image usage:
        // image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600'
    },
    {
        id: '06',
        title: 'Laravel Live Chat App',
        type: 'Web Application',
        description: 'A live chat application built with Laravel. Features real-time messaging. Just me, when I try to learn broadcasting features on Laravel. (and pusher :D)',
        tech: ['Laravel', 'PHP', 'Web'],
        icon: <Folder size={40} className="text-[var(--color-sepia)]" />,
        github: 'https://github.com/kiriseka/laravel-live-chat-app',
        image: liveChatAppImage,
    },
    {
        id: '07',
        title: 'Monitor-following LED Strip',
        type: 'IoT Project',
        description: 'A monitor-following LED strip built with Arduino. Features real-time monitoring of monitor display. Created using Adalight (https://github.com/Wifsimster/adalight_ws2812), and Prismatik (https://github.com/psieg/Lightpack/releases). Credits to them, I can watch my anime with immersive experience :D.',
        tech: ['Arduino', 'C++', 'IoT'],
        icon: <Box size={40} className="text-[var(--color-sepia)]" />,
        // github: 'https://github.com/kiriseka/monitor-following-led-strip',
        image: monitorFollowingLedImage,
        video: monitorFollowingLedVideo,
    },
    {
        id: '08',
        title: 'Self Hosted Web Server',
        type: 'Linux',
        description: 'While I create this using my lovely CachyOS, I also create my own web server. It is a web server that is hosted on my own computer. That is why I put an image of this website xD. So, sorry if this web feels slow, because, you know, it is self hosted :D. (and internet speed in my location is not that fast 😔)',
        tech: ['Linux', 'Web Server', 'Ubuntu Server', 'Aapanel', 'CachyOS'],
        icon: <Box size={40} className="text-[var(--color-sepia)]" />,
        // github: 'https://github.com/kiriseka/monitor-following-led-strip',
        image: selfHostedWebsiteImage,
    },
];

const ProjectGrid = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const selectedProject = projects.find(p => p.id === selectedId);

    // Reset and delay video loading when opening details
    useEffect(() => {
        if (selectedId) {
            setIsVideoLoaded(false);
            const timer = setTimeout(() => setIsVideoLoaded(true), 800); // slightly longer than animation to be safe
            return () => clearTimeout(timer);
        } else {
            setIsVideoLoaded(false);
        }
    }, [selectedId]);

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
                        {(project.image || project.video) && (
                            <div className="absolute inset-0 z-0">
                                {/* Prioritize Image as static thumbnail. Only show video if NO image is present. */}
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : project.video ? (
                                    <video
                                        src={project.video}
                                        muted
                                        loop
                                        playsInline
                                        autoPlay
                                        className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[rgba(26,26,26,0.8)] to-transparent" />
                            </div>
                        )}

                        <div className="absolute top-0 right-0 p-4 opacity-20 font-mono text-xs group-hover:opacity-100 transition-opacity text-[var(--color-olive)] z-10">
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
                        <div className="absolute inset-0 bg-[var(--color-sepia)] opacity-0 group-hover:opacity-5 mix-blend-overlay transition-opacity z-20" />
                    </motion.div>
                ))}
            </div>

            {/* Side Drawer Details */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[60]" // Wrapper to handle layoutId sync cleanly
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedId}`} // Syncs with grid item
                            className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[var(--color-charcoal)] border-l border-[var(--color-sepia)] z-[70] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
                        >
                            {/* Close Button - Fixed relative to drawer */}
                            <div className="absolute top-0 right-0 p-6 z-[80]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="text-[var(--color-text-main)] hover:text-[var(--color-olive)] p-2 bg-[var(--color-charcoal)]/80 backdrop-blur-sm rounded-full"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12">
                                <div className="font-mono text-[var(--color-olive)] text-sm mb-6">
                                    // ARTIFACT_DETAILS_LOADED
                                </div>

                                {/* Media Section */}
                                <div className="mb-8 relative space-y-4">
                                    {/* If both exist, show both. Otherwise show whichever exists. */}
                                    {selectedProject.image && (
                                        <div
                                            className="w-full h-64 rounded-sm overflow-hidden border border-[var(--color-charcoal)] relative group cursor-zoom-in"
                                            onClick={() => setViewImage(selectedProject.image || null)}
                                        >
                                            <img
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-[var(--color-sepia)] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity" />
                                            {/* Icon Overlay for Image */}
                                            <div className="absolute bottom-[0px] left-0 z-20 p-2 bg-[var(--color-charcoal)] border-t border-r border-[var(--color-sepia)]">
                                                {selectedProject.icon}
                                            </div>
                                        </div>
                                    )}

                                    {selectedProject.video && (
                                        <div
                                            className="w-full h-64 rounded-sm overflow-hidden border border-[var(--color-charcoal)] relative group cursor-zoom-in"
                                            onClick={() => setViewImage(selectedProject.video || null)}
                                        >
                                            {isVideoLoaded ? (
                                                <video
                                                    src={selectedProject.video}
                                                    muted
                                                    loop
                                                    playsInline
                                                    autoPlay
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                /* Show placeholder image (or black bg) while waiting for delay */
                                                <>
                                                    {selectedProject.image ? (
                                                        <img
                                                            src={selectedProject.image}
                                                            alt="Video Loading..."
                                                            className="w-full h-full object-cover grayscale opacity-50"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                                                            <div className="w-8 h-8 border-2 border-[var(--color-sepia)] border-t-transparent rounded-full animate-spin" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                                        <div className="px-3 py-1 bg-black/60 text-[var(--color-sepia)] text-xs font-mono border border-[var(--color-sepia)]">
                                                            LOADING PREVIEW...
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <div className="absolute inset-0 bg-[var(--color-sepia)] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity" />
                                            {/* Label for Video */}
                                            <div className="absolute bottom-0 right-0 p-1 bg-[var(--color-charcoal)] text-[var(--color-olive)] text-xs font-mono border-t border-l border-[var(--color-sepia)]">
                                                VIDEO PREVIEW
                                            </div>
                                        </div>
                                    )}

                                    {/* Fallback Icon if NO media */}
                                    {!selectedProject.image && !selectedProject.video && (
                                        <div className="mb-8">
                                            {selectedProject.icon}
                                        </div>
                                    )}
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
                            </div> {/* End of scrollable content */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Lightbox */}
            {createPortal(
                <AnimatePresence>
                    {viewImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewImage(null)}
                            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                        >
                            <button
                                onClick={() => setViewImage(null)}
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                            >
                                <X size={32} />
                            </button>
                            {/* Determine if viewImage is a video or image based on extension or property logic. 
                                For simplicity, checking extension or if it matches a known video source. 
                                Since we set viewImage to either image or video URL, we can check basic extensions.
                            */}
                            {(viewImage?.endsWith('.mp4') || viewImage?.endsWith('.webm')) ? (
                                <motion.video
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    src={viewImage}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[90vh] shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    src={viewImage}
                                    alt="Project Full View"
                                    className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default ProjectGrid;
