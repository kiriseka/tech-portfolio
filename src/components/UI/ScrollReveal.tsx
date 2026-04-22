import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props { children: ReactNode; delay?: number; }

const ScrollReveal = ({ children, delay = 0 }: Props) => (
    <motion.div
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.85, delay, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);

export default ScrollReveal;
