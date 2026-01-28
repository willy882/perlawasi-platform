'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Model(props: any) {
    const group = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/models/oversized_t-shirt/scene.gltf')

    // Clonar la escena para asegurar una instancia fresca y modificable
    const clone = useMemo(() => {
        const clonedScene = scene.clone()

        // Material blanco puro nuevo (creado una sola vez)
        const whiteMaterial = new THREE.MeshStandardMaterial({
            color: '#FFFFFF', // Blanco explícito
            roughness: 0.3,   // Un poco más suave para que refleje mejor la luz
            metalness: 0.0,   // Nada metálico
            emissive: '#111111', // Sutil auto-iluminación para que no se vea gris
        })

        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                child.material = whiteMaterial
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        return clonedScene
    }, [scene])

    // Rotación automática
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.5
        }
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={clone} scale={2.5} />
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
                        snap={true} // Simplificado para evitar error de TS
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
