"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Truck } from "lucide-react"

function TruckModel3D() {
  const truckRef = useRef()

  // Simulate loading a 3D model
  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={truckRef} position={[0, -1, 0]} scale={1.5}>
      {/* This is a placeholder for the actual 3D truck model */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      <mesh position={[1.5, 0.75, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      <mesh position={[-0.5, -0.75, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.5, -0.75, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.5, -0.75, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.5, -0.75, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

export default function TruckModel() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Truck className="h-12 w-12 text-indigo-500 animate-pulse mb-4" />
          <p className="text-slate-400">Loading 3D model...</p>
        </div>
      ) : (
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[6, 3, 6]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Suspense fallback={null}>
            <TruckModel3D />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />

          {/* Grid floor */}
          <gridHelper args={[20, 20, "#4f46e5", "#1f2937"]} position={[0, -2, 0]} />
        </Canvas>
      )}

      {/* Overlay information */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
        <h3 className="text-white font-medium mb-1">Real-time Fleet Tracking</h3>
        <p className="text-slate-300 text-sm">Monitor your entire fleet with 3D visualization and real-time updates</p>
      </div>

      {/* Interactive hotspots */}
      {!isLoading && (
        <>
          <motion.div
            className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-white text-xs font-bold">1</span>
            <div className="absolute -right-40 top-0 bg-slate-900 p-3 rounded-lg border border-slate-700 w-36 hidden group-hover:block">
              <p className="text-white text-xs">GPS Tracking System</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center cursor-pointer"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <span className="text-white text-xs font-bold">2</span>
          </motion.div>
        </>
      )}
    </div>
  )
}

