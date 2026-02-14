import { useState } from 'react';
import { Menu } from 'lucide-react';
import TerminalLayout from './components/Layout/TerminalLayout';
import Hero from './components/Hero/Hero';
import CommandPalette from './components/CommandPalette/CommandPalette';
import ProjectGrid from './components/Projects/ProjectGrid';
import SkillNodeMap from './components/Skills/SkillNodeMap';
import LogEntry from './components/Log/LogEntry';
import TerminalForm from './components/Contact/TerminalForm';

const App = () => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    return (
        <TerminalLayout>
            <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />

            {/* Mobile Menu Trigger */}
            <button
                onClick={() => setIsPaletteOpen(true)}
                className="fixed top-6 right-6 z-50 p-2 bg-[var(--color-charcoal)] border border-[var(--color-olive)] text-[var(--color-olive)] hover:bg-[var(--color-olive)] hover:text-[var(--color-charcoal)] transition-colors md:hidden"
            >
                <Menu size={24} />
            </button>

            <Hero />
            <ProjectGrid />
            <SkillNodeMap />
            <LogEntry />
            <TerminalForm />
        </TerminalLayout>
    )
}



export default App
