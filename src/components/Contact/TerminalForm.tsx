import { useState } from 'react';
import { Send, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const TerminalForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        comp: '',
        msg: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate network request
        setTimeout(() => setStatus('sent'), 1500);
    };

    return (
        <section className="py-20 max-w-2xl mx-auto px-6 mb-20">
            <div className="flex items-center mb-12">
                <span className="font-mono text-[var(--color-sepia)] mr-4">05.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white">Transmission</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-[var(--color-charcoal)] p-8 font-mono shadow-2xl relative overflow-hidden">
                {/* Scanline overlay for the form specifically */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]"></div>

                <div className="relative z-10 flex items-center mb-6 text-[var(--color-olive)] text-xs opacity-70">
                    <Terminal size={14} className="mr-2" />
                    <span>SECURE_CHANNEL_ESTABLISHED</span>
                </div>

                {status === 'sent' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-[var(--color-olive)] relative z-10"
                    >
                        <div className="text-4xl mb-4">✓</div>
                        <p>TRANSMISSION RECEIVED.</p>
                        <p className="text-xs mt-2 opacity-50">Expect response within 24-48 cycles.</p>
                        <button
                            onClick={() => { setStatus('idle'); setFormData({ name: '', comp: '', msg: '' }); }}
                            className="mt-8 text-xs underline hover:text-white"
                        >
                            [RESET_SIGNAL]
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="group">
                            <label className="block text-[#a6e22e] text-sm font-bold mb-2 group-focus-within:text-white transition-all">
                                // SENDER_ID
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="> Enter identifier..."
                                className="w-full bg-[rgba(255,255,255,0.05)] border-b-2 border-[var(--color-charcoal)] px-4 py-4 text-white font-bold tracking-wide focus:outline-none focus:border-[#a6e22e] focus:bg-[rgba(255,255,255,0.1)] transition-all placeholder:text-gray-500"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[#a6e22e] text-sm font-bold mb-2 group-focus-within:text-white transition-all">
                                // ORG_AFFILIATION
                            </label>
                            <input
                                type="text"
                                value={formData.comp}
                                onChange={e => setFormData({ ...formData, comp: e.target.value })}
                                placeholder="> Enter company/entity..."
                                className="w-full bg-[rgba(255,255,255,0.05)] border-b-2 border-[var(--color-charcoal)] px-4 py-4 text-white font-bold tracking-wide focus:outline-none focus:border-[#a6e22e] focus:bg-[rgba(255,255,255,0.1)] transition-all placeholder:text-gray-500"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[#a6e22e] text-sm font-bold mb-2 group-focus-within:text-white transition-all">
                                // PAYLOAD_DATA
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.msg}
                                onChange={e => setFormData({ ...formData, msg: e.target.value })}
                                placeholder="> Enter message content..."
                                className="w-full bg-[rgba(255,255,255,0.05)] border-b-2 border-[var(--color-charcoal)] px-4 py-4 text-white font-bold tracking-wide focus:outline-none focus:border-[#a6e22e] focus:bg-[rgba(255,255,255,0.1)] transition-all placeholder:text-gray-500 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-[#a6e22e] text-black font-bold py-5 hover:bg-white hover:scale-[1.02] transition-all flex justify-center items-center space-x-2 group shadow-lg"
                        >
                            {status === 'sending' ? (
                                <span className="animate-pulse">TRANSMITTING...</span>
                            ) : (
                                <>
                                    <span>[INITIATE_TRANSFER]</span>
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default TerminalForm;
