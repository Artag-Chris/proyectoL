"use client"

import { motion } from "framer-motion";


/****************************************************
 * Relacionado con las animaciones de entrada y salida de framer-motion 
 * se le pasa el hijo que serian todos los elementos que se quieren animar con Rotate
*****************************************************/
 

export type RotateProps = {
    children: React.ReactNode;
    className?: string;
    
};

export function Rotate(props: RotateProps) {
    const { children, className,  } = props

    return (
        <motion.div
        className={className}
        initial={{rotate: -50, scale: 0.5, opacity: 0} }
        animate={{  rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: -50, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}



/* 


*/