'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Plant3D({ mirrored = false }: { mirrored?: boolean }) {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const W = mount.clientWidth  || 220
        const H = mount.clientHeight || 300

        // ── Renderer ────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(W, H)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2
        mount.appendChild(renderer.domElement)

        // ── Scene & Camera ───────────────────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 100)
        camera.position.set(0, 0.2, 3.2)

        // ── Lighting ─────────────────────────────────────────────────────────
        // Ambient suave
        scene.add(new THREE.AmbientLight(0xfff5e0, 0.6))

        // Luz principal cálida (naranja Buho)
        const keyLight = new THREE.DirectionalLight(0xf97316, 1.8)
        keyLight.position.set(3, 5, 4)
        keyLight.castShadow = true
        keyLight.shadow.mapSize.set(1024, 1024)
        keyLight.shadow.camera.near = 0.1
        keyLight.shadow.camera.far = 20
        scene.add(keyLight)

        // Luz de relleno fría (verde selva)
        const fillLight = new THREE.DirectionalLight(0x4ade80, 0.8)
        fillLight.position.set(-4, 2, -2)
        scene.add(fillLight)

        // Rim light trasero
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.5)
        rimLight.position.set(0, 3, -5)
        scene.add(rimLight)

        // Point light naranja sutil desde abajo
        const glowLight = new THREE.PointLight(0xf97316, 0.6, 6)
        glowLight.position.set(0, -1, 1.5)
        scene.add(glowLight)

        // ── Plano suelo con sombra ───────────────────────────────────────────
        const shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.ShadowMaterial({ opacity: 0.12, transparent: true })
        )
        shadowPlane.rotation.x = -Math.PI / 2
        shadowPlane.position.y = -1.4
        shadowPlane.receiveShadow = true
        scene.add(shadowPlane)

        // ── Grupo principal ──────────────────────────────────────────────────
        const pivot = new THREE.Group()
        if (mirrored) pivot.scale.x = -1
        scene.add(pivot)

        // ── Animación ────────────────────────────────────────────────────────
        let mixer: THREE.AnimationMixer | null = null
        let raf: number
        const clock = new THREE.Clock()

        const animate = () => {
            raf = requestAnimationFrame(animate)
            const delta = clock.getDelta()
            const elapsed = clock.elapsedTime

            // Flotado suave + leve balanceo
            pivot.position.y = Math.sin(elapsed * 0.8) * 0.07
            pivot.rotation.y = Math.sin(elapsed * 0.4) * 0.12
            pivot.rotation.z = Math.sin(elapsed * 0.6) * 0.025

            if (mixer) mixer.update(delta)
            renderer.render(scene, camera)
        }
        animate()

        // ── Cargar GLB ───────────────────────────────────────────────────────
        const loader = new GLTFLoader()
        loader.load(
            '/models/buho.glb',
            (gltf) => {
                const model = gltf.scene

                // Sombras en todos los meshes
                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                        // Mejorar materiales existentes
                        const mesh = child as THREE.Mesh
                        if (mesh.material) {
                            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
                            mats.forEach(mat => {
                                if (mat instanceof THREE.MeshStandardMaterial) {
                                    mat.envMapIntensity = 0.4
                                    mat.needsUpdate = true
                                }
                            })
                        }
                    }
                })

                // Centrar y escalar automáticamente
                const box = new THREE.Box3().setFromObject(model)
                const center = box.getCenter(new THREE.Vector3())
                const size = box.getSize(new THREE.Vector3())
                const maxDim = Math.max(size.x, size.y, size.z)
                const scale = 2.2 / maxDim
                model.scale.setScalar(scale)
                model.position.sub(center.multiplyScalar(scale))

                pivot.add(model)

                // Activar animaciones del GLB si existen
                if (gltf.animations && gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(model)
                    gltf.animations.forEach(clip => {
                        const action = mixer!.clipAction(clip)
                        action.play()
                    })
                }
            },
            undefined,
            (err) => console.warn('buho.glb load error:', err)
        )

        // ── Cleanup ──────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(raf)
            renderer.dispose()
            if (mixer) mixer.stopAllAction()
            mount.removeChild(renderer.domElement)
        }
    }, [mirrored])

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100%' }}
        />
    )
}
