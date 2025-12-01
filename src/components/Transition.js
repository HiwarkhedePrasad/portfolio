'use client';
import { motion } from "framer-motion";
import { useTransition } from "../context/TransitionContext";

export default function Transition() {
  const { transitionStage } = useTransition();

  const animHelper = {
    enter: (i) => ({
      height: "0vh",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.07 * (7 - i), 
      },
    }),
    exit: (i) => ({
      height: "100vh",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.07 * (7 - i), 
      },
    }),
  };

  return (
    <div className="fixed inset-0 top-0 left-0 w-full h-full flex z-[100] pointer-events-none">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="w-full bg-black relative"
          variants={animHelper}
          initial="enter"
          animate={transitionStage}
          custom={index}
        />
      ))}
    </div>
  );
}
