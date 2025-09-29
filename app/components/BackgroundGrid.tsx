'use client'

/** 
 * A dynamic background grid that responds to mouse movement.
 * Utilizes Framer Motion for smooth animations.
 * The grid subtly shifts based on cursor position, creating an engaging visual effect.
 * Aquired from: https://v0.app/templates/19ASXyrQxvo
*/

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from 'react'

const BackgroundGrid = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const gridX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })
  const gridY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(((e.clientX - centerX) / centerX) * 20)
      mouseY.set(((e.clientY - centerY) / centerY) * 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div className="fixed inset-0 z-0">
      <div className="absolute inset-0" />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
          backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)",
          x: gridX,
          y: gridY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#00000056] via-transparent to-transparent" />
    </motion.div>
  )
}

export default BackgroundGrid
