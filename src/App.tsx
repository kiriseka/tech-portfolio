import { useState } from 'react';
import { Menu } from 'lucide-react';
import TerminalLayout from './components/Layout/TerminalLayout';
import Hero from './components/Hero/Hero';
import CommandPalette from './components/CommandPalette/CommandPalette';
import ProjectGrid from './components/Projects/ProjectGrid';
import SkillNodeMap from './components/Skills/SkillNodeMap';
import LogEntry from './components/Log/LogEntry';
import TerminalForm from './components/Contact/TerminalForm';
import Publication from './components/Publication/Publication';
import CursorFollower from './components/UI/CursorFollower';
import EasterEgg from './components/UI/EasterEgg';
import ScrollReveal from './components/UI/ScrollReveal';

const App = () => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    return (
        <TerminalLayout>
            <CursorFollower />
            <EasterEgg />

            <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />

            {/* Mobile Menu Trigger */}
            <button
                onClick={() => setIsPaletteOpen(true)}
                className="fixed top-6 right-6 z-50 p-2 bg-[var(--color-charcoal)] border border-[var(--color-olive)] text-[var(--color-olive)] hover:bg-[var(--color-olive)] hover:text-[var(--color-charcoal)] transition-colors md:hidden"
            >
                <Menu size={24} />
            </button>

            <div className="flex flex-col gap-5 md:gap-5 pb-20">
                <Hero />
                <ScrollReveal><ProjectGrid /></ScrollReveal>
                <ScrollReveal delay={0.05}><SkillNodeMap /></ScrollReveal>
                <ScrollReveal delay={0.05}><LogEntry /></ScrollReveal>
                <ScrollReveal delay={0.05}><Publication /></ScrollReveal>
                <ScrollReveal delay={0.05}><TerminalForm /></ScrollReveal>
            </div>
        </TerminalLayout>
    );
};

export default App;
