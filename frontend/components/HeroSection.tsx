"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTestimonials } from "@/backend/testimonial/testimonial.query";
import IosAndAndroid from "./button/IosAndAndroid";

function HeroSection() {
  const { data } = useTestimonials();
  const TARGET = data?.testimonial?.length + 1000 || null;
  const DURATION_MS = 1800;
  const [number, setNumber] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!TARGET) return;
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const eased = easeOutQuad(progress);
      const value = Math.floor(eased * TARGET);
      setNumber(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setNumber(TARGET);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [TARGET]);
  return (
    <section className="flex items-center justify-center w-full p-4 bg-[#F9F9F9]">
      <div className="flex flex-col gap-4 w-full sm:max-w-[90vw]">
        <div className="flex items-end justify-center">
          <motion.div
            animate={{
              y: [0, -12, 0, 12, 0],
              rotate: [0, -4, 0, 4, 0],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            whileHover={{ scale: 1.05 }}
            className="relative inline-block w-full max-w-md transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            <div className="absolute -inset-6 rounded-2xl blur-3xl opacity-20 bg-blur-blue" />

            <Image
              src={"/gauge.png"}
              alt="gauge"
              width={400}
              height={400}
              className="relative z-10 w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Image
              src={"/mobile.png"}
              alt="mobile"
              width={400}
              height={400}
              className="h-auto w-full"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 12, 0, -12, 0],
              rotate: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            whileHover={{ scale: 1.05 }}
            className="relative inline-block w-full max-w-md transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            <div className="absolute -inset-6 rounded-2xl blur-3xl opacity-20 bg-blur-yellow"></div>

            <Image
              src={"/analysis.png"}
              alt="analysis"
              width={400}
              height={400}
              className="relative z-10 w-full h-auto"
            />
          </motion.div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/CustomerFaces.png"}
              alt="customer"
              width={400}
              height={400}
              className="h-auto w-full max-w-[15vw] sm:max-w-[8vw]"
            />
            <div className="flex items-center justify-center gap-1">
              <motion.p
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="font-semibold text-xl sm:text-2xl"
              >
                {number.toLocaleString()}
              </motion.p>
              <p className="text-xs sm:text-sm text-[#23262F] font-light">
                Happy Users
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <h1 className="text-3xl font-bold sm:text-6xl">
            Your AI Health Coach
          </h1>
          <p className="text-[#777E90] text-xs text-center w-full max-w-xs sm:text-base sm:max-w-lg">
            Transform your wellness journey with personalized AI-powered
            guidance that adapts to your unique needs.
          </p>

          <IosAndAndroid />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
