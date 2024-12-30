"use client"

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion-transitions";

/****************************************************
 * Relacionado con las transiciones de animación de framer-motion 
 * se le pasa el hijo que serian todos los elementos que se quieren animar con Fade In
*****************************************************/
 

export type MotionTransitionProps = {
    children: React.ReactNode;
    className?: string;
    position: 'right' | 'bottom'
};

export function FadeInTransition(props: MotionTransitionProps) {
    const { children, className, position } = props

    return (
        <motion.div
            variants={fadeIn(position)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={className}
        >
            {children}
        </motion.div>
    )
}