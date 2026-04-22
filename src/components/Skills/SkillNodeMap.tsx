// @ts-nocheck
import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere, Line, Billboard } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X } from 'lucide-react';

interface Node {
    id: string;
    x: number; y: number; z: number;
    label: string;
    category: 'frontend' | 'backend' | 'tools' | 'languages';
    detail: string;
    projects: string[];
}

interface Link { source: string; target: string; }

const skills: Node[] = [
    { id: 'php', x: -3, y: 2, z: 0, label: 'PHP', category: 'languages', detail: 'Primary server-side language for enterprise web systems.', projects: ['KMS & RBA System', 'Logistics App', 'Live Chat App'] },
    { id: 'js', x: -1, y: 2.5, z: 1, label: 'JavaScript', category: 'languages', detail: 'Client-side logic, DOM manipulation, and async interactions.', projects: ['Company Landing Page', 'Personal Landing Page'] },
    { id: 'java', x: 1, y: 2, z: -1, label: 'Java', category: 'languages', detail: 'Object-oriented programming and data structures (academic).', projects: ['Academic Projects'] },
    { id: 'python', x: 3, y: 2.5, z: 0, label: 'Python', category: 'languages', detail: 'Scripting, automation, and IoT sensor data processing.', projects: ['IoT Project', 'Data Automation'] },
    { id: 'laravel', x: -3.5, y: 0, z: 1, label: 'Laravel', category: 'backend', detail: 'Full MVC framework: routing, Eloquent ORM, Blade, Queues.', projects: ['Logistics App', 'Live Chat App'] },
    { id: 'ci', x: -2, y: -0.5, z: -1, label: 'CodeIgniter', category: 'backend', detail: 'Rapid PHP framework used for enterprise system modules.', projects: ['KMS & RBA System'] },
    { id: 'sql', x: 0, y: 0, z: 0, label: 'SQL', category: 'backend', detail: 'Relational DB design, complex queries, joins & transactions.', projects: ['Logistics App', 'KMS & RBA System', 'Live Chat App'] },
    { id: 'html', x: -1, y: -1.5, z: 1.5, label: 'HTML/CSS', category: 'frontend', detail: 'Semantic HTML5 + CSS3 across all web projects.', projects: ['All Web Projects'] },
    { id: 'bootstrap', x: 0.5, y: -2, z: 0.5, label: 'Bootstrap', category: 'frontend', detail: 'Responsive grid & UI components for rapid prototyping.', projects: ['KMS & RBA System', 'Logistics App'] },
    { id: 'git', x: 2, y: -1, z: 1, label: 'Git', category: 'tools', detail: 'Version control, branching strategies, GitHub workflows.', projects: ['All Projects'] },
    { id: 'network', x: 3, y: -2.5, z: -0.5, label: 'Networking', category: 'tools', detail: 'TCP/IP, DNS, server config on self-hosted CachyOS setup.', projects: ['Self Hosted Web Server'] },
    { id: 'iot', x: -4, y: -2.5, z: 0, label: 'IoT', category: 'tools', detail: 'Hardware + software with Arduino for monitor LED ambilight.', projects: ['Monitor-following LED Strip'] },
];

const links: Link[] = [
    { source: 'php', target: 'laravel' }, { source: 'php', target: 'ci' },
    { source: 'js', target: 'html' }, { source: 'html', target: 'bootstrap' },
    { source: 'laravel', target: 'sql' }, { source: 'ci', target: 'sql' },
    { source: 'java', target: 'python' }, { source: 'python', target: 'iot' },
    { source: 'git', target: 'laravel' }, { source: 'network', target: 'iot' },
];

const NodeMesh = ({ node, onSelect }: { node: Node; onSelect: (n: Node) => void }) => {
    const isPrimary = node.category === 'languages' || node.category === 'backend';
    const color = isPrimary ? '#a6e22e' : '#ffb000';
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = node.y + Math.sin(state.clock.elapsedTime + node.x) * 0.1;
        }
    });

    return (
        // @ts-ignore
        <group ref={ref} position={[node.x, node.y, node.z]} onClick={(e) => { e.stopPropagation(); onSelect(node); }}>
            <Sphere args={[0.15, 32, 32]}>
                {/* @ts-ignore */}
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} metalness={0.8} />
            </Sphere>
            {/* @ts-ignore */}
            <pointLight distance={1.5} intensity={2} color={color} />
            <Billboard>
                <Text position={[0, 0.4, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">{node.label}</Text>
                <Text position={[0, 0.2, 0]} fontSize={0.12} color={color} anchorX="center" anchorY="middle">{node.category.toUpperCase()}</Text>
            </Billboard>
        </group>
    );
};

const Connections = () => {
    const lines = useMemo(() => links.map((link) => {
        const s = skills.find(n => n.id === link.source)!;
        const t = skills.find(n => n.id === link.target)!;
        return [new THREE.Vector3(s.x, s.y, s.z), new THREE.Vector3(t.x, t.y, t.z)];
    }), []);

    return (
        <>
            {lines.map((points, i) => (
                <Line key={i} points={points} color="#704214" lineWidth={1} transparent opacity={0.3} />
            ))}
        </>
    );
};

const Scene = ({ onNodeSelect }: { onNodeSelect: (n: Node) => void }) => {
    const { size } = useThree();
    useFrame((state) => {
        const isMobile = size.width < 600;
        const targetZ = isMobile ? 18 : 8;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            {/* @ts-ignore */}
            <ambientLight intensity={0.5} />
            {/* @ts-ignore */}
            <pointLight position={[10, 10, 10]} />
            {/* @ts-ignore */}
            <group>
                {skills.map((node) => <NodeMesh key={node.id} node={node} onSelect={onNodeSelect} />)}
            </group>
            <Connections />
        </>
    );
};

const CATEGORY_COLORS: Record<string, string> = {
    languages: '#a6e22e',
    backend: '#a6e22e',
    frontend: '#ffb000',
    tools: '#ffb000',
};

const SkillNodeMap = () => {
    const [selected, setSelected] = useState<Node | null>(null);

    return (
        <section id="skills" className="py-32 md:py-48 max-w-7xl mx-auto min-h-[600px] relative overflow-hidden">
            <div className="flex items-center mb-4 px-6 md:px-0">
                <span className="font-mono text-[var(--color-sepia)] mr-4">03.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white">Toolkit (Neural Net)</h2>
            </div>

            <div className="text-[10px] font-mono text-[var(--color-olive)] opacity-40 mb-3 px-6 md:px-0 tracking-widest">
                // CLICK ANY NODE TO INSPECT
            </div>

            <div className="w-full h-[600px] border border-[var(--color-charcoal)] bg-[rgba(0,0,0,0.4)] rounded-lg relative">
                <div className="absolute top-4 right-4 z-10 font-mono text-xs text-[var(--color-olive)] opacity-50 pointer-events-none">
                    // MOUSE_INTERACTION: ENABLED<br />
                    // RENDER_MODE: 3D_WEBGL
                </div>

                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Scene onNodeSelect={setSelected} />
                </Canvas>

                {/* Tooltip Overlay */}
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute top-4 left-4 w-80 bg-[#0a0a0a]/95 border border-[var(--color-sepia)] p-5 font-mono z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 text-[var(--color-text-main)] opacity-50 hover:opacity-100"
                            >
                                <X size={16} />
                            </button>
                            <div className="text-[10px] tracking-widest opacity-40 mb-3">// NODE_INSPECT</div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[selected.category], boxShadow: `0 0 8px ${CATEGORY_COLORS[selected.category]}` }} />
                                <span className="text-white font-bold text-xl tracking-tight">{selected.label}</span>
                                <span className="text-[10px] tracking-widest opacity-50 uppercase">{selected.category}</span>
                            </div>
                            <p className="text-sm text-[var(--color-text-main)] opacity-80 leading-relaxed mb-4">{selected.detail}</p>
                            <div>
                                <div className="text-[10px] tracking-widest text-[var(--color-olive)] opacity-60 mb-2 uppercase">Used In</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {selected.projects.map(p => (
                                        <span key={p} className="text-xs px-2.5 py-1 border border-[var(--color-olive)] text-[var(--color-olive)]">{p}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SkillNodeMap;
