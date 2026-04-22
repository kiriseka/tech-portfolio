import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

interface PublicationItem {
    id: string;
    authors: React.ReactNode;
    year: string;
    title: string;
    venue: string;
    link?: string;
}

const publications: PublicationItem[] = [
    {
        id: 'pub-01',
        authors: <><span className="font-bold text-white">Hamdani, M.</span></>,
        year: '2024',
        title: 'Comparison of exact match search algorithms on resource-constrained systems [bachelor\'s thesis]',
        venue: 'UIN Sunan Gunung Djati Bandung.',
        link: 'https://digilib.uinsgd.ac.id/93651/', // Placeholder link
    },
    {
        id: 'pub-02',
        authors: <>Ramdania, D. R., <span className="font-bold text-white">Hamdani, M.</span>, Harika, M., Gerhana, Y. A., & Qomaruddin, N.</>,
        year: '2024',
        title: 'Decision tree algorithm in visual novel game using RenPy games engine',
        venue: 'AIP Conference Proceedings, 3058, 060020.',
        link: 'https://doi.org/10.1063/5.0201995',
    },
    {
        id: 'pub-03',
        authors: <>Fuadi, R. S., Maylawati, D. S., Pratama, R. N., Firdaus, A. M., Sari, D. P., & <span className="font-bold text-white">Hamdani, M.</span></>,
        year: '2022',
        title: 'Data clusterization of Muslim majority countries to find out the most factors causing gender issues using the K-Means algorithm',
        venue: 'Proceedings of the 2022 10th International Conference on Cyber and IT Service Management (CITSM).',
        link: 'https://doi.org/10.1109/CITSM56380.2022.9935861',
    }
];

const Publication = () => {
    return (
        <section id="publication" className="py-20 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center mb-12">
                <span className="font-mono text-[var(--color-sepia)] mr-4">05.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Publication</h2>
                <div className="flex-1 h-px bg-[var(--color-charcoal)] ml-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--color-olive)] w-1/4 animate-loading-bar opacity-30"></div>
                </div>
            </div>

            {/* Content List */}
            <div className="space-y-6">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-[rgba(26,26,26,0.6)] border border-[var(--color-charcoal)] p-6 hover:border-[var(--color-olive)] transition-colors overflow-hidden"
                    >
                        {/* Interactive decorative edge */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-sepia)] opacity-20 group-hover:opacity-100 group-hover:bg-[var(--color-olive)] transition-all duration-300"></div>

                        <div className="flex flex-col md:flex-row gap-4 items-start relative z-10 pl-2">
                            <div className="mt-1 flex-shrink-0 text-[var(--color-sepia)] group-hover:text-[var(--color-olive)] transition-colors">
                                <BookOpen size={24} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[var(--color-text-main)] leading-relaxed mb-2 break-words">
                                    {pub.authors} ({pub.year}). <span className="italic">{pub.title}</span>. {pub.venue}
                                </p>

                                {pub.link && pub.link !== '#' && (
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 text-sm font-mono text-[var(--color-olive)] hover:text-white transition-colors mt-2 break-all"
                                    >
                                        <ExternalLink size={14} className="flex-shrink-0" />
                                        <span>{pub.link}</span>
                                    </a>
                                )}
                                {pub.link === '#' && (
                                    <a
                                        href={pub.link}
                                        className="inline-flex items-center space-x-2 text-sm font-mono text-[var(--color-olive)] hover:text-white transition-colors mt-2 opacity-50 cursor-not-allowed"
                                        title="Link not available yet"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <ExternalLink size={14} className="flex-shrink-0" />
                                        <span>Link Pending</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Glitch hover background effect */}
                        <div className="absolute inset-0 bg-[var(--color-sepia)] opacity-0 group-hover:opacity-5 mix-blend-overlay transition-opacity pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Publication;
