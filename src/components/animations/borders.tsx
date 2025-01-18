import { motion } from "framer-motion";
import React from "react";

interface BorderAnimationProps {
  children: React.ReactNode;
  borderColor?: string;
  borderWidth?: string;
  duration?: number;
}

const BorderAnimation: React.FC<BorderAnimationProps> = ({
  children,
  borderColor = "black",
  borderWidth = "2px",
  duration = 2,
}) => {
  const borderVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      <motion.svg
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={borderVariants}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "inherit",
          boxSizing: "border-box",
        }}
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="inherit"
          ry="inherit"
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
          strokeDasharray="0 1"
          strokeDashoffset="0"
          animate={{
            strokeDasharray: ["0 1", "1 0"],
            transition: { duration: duration, ease: "easeInOut" },
          }}
        />
      </motion.svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BorderAnimation;