'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Model(props: any) {
    const group = useRef<THREE.Group>(null)
    // Cargar el modelo desde la carpeta pública
    const { scene } = useGLTF('/models/oversized_t-shirt/scene.gltf')

    // Rotación automática
    useFrame((state, delta) => {
        if (group.current) {
            // Rotar en el eje Y continuamente
            group.current.rotation.y += delta * 0.5 // Velocidad de rotación
        }
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} scale={2.5} />
        </group>
    )
}

export default function Polo3D() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 4], fov: 50 }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-bias={-0.0001} intensity={1} />

                <Suspense fallback={null}>
                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 500 }}
                        snap={{ mass: 4, tension: 1500 }}
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                    >
                        <Model position={[0, -0.5, 0]} />
                    </PresentationControls>

                    {/* Sombras de contacto para realismo */}
                    <ContactShadows resolution={512} scale={10} blur={2} opacity={0.25} far={10} color="#000000" />

                    {/* Entorno suave para reflejos */}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    )
}

// Pre-cargar el modelo para evitar tirones
useGLTF.preload('/models/oversized_t-shirt/scene.gltf')
