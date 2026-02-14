// @ts-nocheck
import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere, Line, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
    id: string;
    x: number;
    y: number;
    z: number;
    label: string;
    category: 'frontend' | 'backend' | 'tools' | 'languages';
}

interface Link {
    source: string;
    target: string;
}

// Map percentage positions to 3D space: x(-5 to 5), y(3 to -3), z(-2 to 2)
const skills: Node[] = [
    // Languages (Top / Center-Left)
    { id: 'php', x: -3, y: 2, z: 0, label: 'PHP', category: 'languages' },
    { id: 'js', x: -1, y: 2.5, z: 1, label: 'JavaScript', category: 'languages' },
    { id: 'java', x: 1, y: 2, z: -1, label: 'Java', category: 'languages' },
    { id: 'python', x: 3, y: 2.5, z: 0, label: 'Python', category: 'languages' },

    // Frameworks & Backend (Middle Layer)
    { id: 'laravel', x: -3.5, y: 0, z: 1, label: 'Laravel', category: 'backend' },
    { id: 'ci', x: -2, y: -0.5, z: -1, label: 'CodeIgniter', category: 'backend' },
    { id: 'sql', x: 0, y: 0, z: 0, label: 'SQL', category: 'backend' },

    // Frontend (Middle Right)
    { id: 'html', x: -1, y: -1.5, z: 1.5, label: 'HTML/CSS', category: 'frontend' },
    { id: 'bootstrap', x: 0.5, y: -2, z: 0.5, label: 'Bootstrap', category: 'frontend' },

    // Tools (Bottom / Periphery)
    { id: 'git', x: 2, y: -1, z: 1, label: 'Git', category: 'tools' },
    { id: 'network', x: 3, y: -2.5, z: -0.5, label: 'Networking', category: 'tools' },
    { id: 'iot', x: -4, y: -2.5, z: 0, label: 'IoT', category: 'tools' },
];

const links: Link[] = [
    { source: 'php', target: 'laravel' },
    { source: 'php', target: 'ci' },
    { source: 'js', target: 'html' },
    { source: 'html', target: 'bootstrap' },
    { source: 'laravel', target: 'sql' },
    { source: 'ci', target: 'sql' },
    { source: 'java', target: 'python' },
    { source: 'python', target: 'iot' },
    { source: 'git', target: 'laravel' },
    { source: 'network', target: 'iot' },
];

const NodeMesh = ({ node }: { node: Node }) => {
    const isPrimary = node.category === 'languages' || node.category === 'backend';
    const color = isPrimary ? '#a6e22e' : '#ffb000'; // Olive (Green) vs Sepia (Amber)

    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            // Subtle float effect relative to initial position
            ref.current.position.y = node.y + Math.sin(state.clock.elapsedTime + node.x) * 0.1;
        }
    });

    return (
        // @ts-ignore
        <group ref={ref} position={[node.x, node.y, node.z]}>
            <Sphere args={[0.15, 32, 32]}>
                {/* @ts-ignore */}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Glow Halo */}
            {/* @ts-ignore */}
            <pointLight distance={1.5} intensity={2} color={color} />

            <Billboard>
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.25}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {node.label}
                </Text>
                <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.12}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {node.category.toUpperCase()}
                </Text>
            </Billboard>
        </group>
    );
};

const Connections = () => {
    const lines = useMemo(() => {
        return links.map((link) => {
            const source = skills.find((n) => n.id === link.source)!;
            const target = skills.find((n) => n.id === link.target)!;
            return [
                new THREE.Vector3(source.x, source.y, source.z),
                new THREE.Vector3(target.x, target.y, target.z),
            ];
        });
    }, []);

    return (
        <>
            {lines.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color="#704214" // Muted Sepia for connections to not distract
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}
        </>
    );
};

const Scene = () => {
    const { size } = useThree();

    useFrame((state) => {
        // Responsive Z calculation
        // On mobile (narrow width), we need to pull back significantly to fit the wide node map
        const isMobile = size.width < 600;
        const targetZ = isMobile ? 18 : 8;

        // Parallax Camera Movement
        const x = (state.mouse.x * 2);
        const y = (state.mouse.y * 2);

        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.05);
        // Smoothly interpolate Z to the target position
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
                {skills.map((node) => (
                    <NodeMesh key={node.id} node={node} />
                ))}
            </group>
            <Connections />
        </>
    );
};

const SkillNodeMap = () => {
    return (
        <section className="py-20 max-w-7xl mx-auto min-h-[600px] relative overflow-hidden">
            <div className="flex items-center mb-4 px-6 md:px-0">
                <span className="font-mono text-[var(--color-sepia)] mr-4">03.</span>
                <h2 className="text-3xl font-bold tracking-tighter text-white">Toolkit (Neural Net)</h2>
            </div>

            <div className="w-full h-[600px] border border-[var(--color-charcoal)] bg-[rgba(0,0,0,0.4)] rounded-lg relative">
                <div className="absolute top-4 right-4 z-10 font-mono text-xs text-[var(--color-olive)] opacity-50 pointer-events-none">
                    // MOUSE_INTERACTION: ENABLED
                    <br />
                    // RENDER_MODE: 3D_WEBGL
                </div>

                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Scene />
                </Canvas>
            </div>
        </section>
    );
};

export default SkillNodeMap;
