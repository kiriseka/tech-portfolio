

interface TerminalLayoutProps {
    children: React.ReactNode;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-[var(--color-charcoal)] text-[var(--color-text-main)] overflow-hidden font-mono selection:bg-[var(--color-olive)] selection:text-white">
            {/* Scanline Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] bg-repeat" />

            {/* CRT Flicker */}
            <div className="pointer-events-none fixed inset-0 z-50 animate-flicker opacity-[0.04] bg-white mix-blend-overlay" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8">
                {children}
            </div>

            {/* Vignette */}
            <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
};

export default TerminalLayout;
