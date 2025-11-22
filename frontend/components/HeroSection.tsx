"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandApple, IconBrandGooglePlay } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

function HeroSection() {
  const TARGET = 300;
  const DURATION_MS = 1800;
  const [number, setNumber] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
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
  }, []);
  return (
    <section className="flex items-center justify-center w-full p-4 bg-[#F9F9F9]">
      <div className="flex flex-col gap-4 w-full sm:max-w-[90vw]">
        <div className="flex items-end justify-center">
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative inline-block w-full max-w-md hover:scale-105 transition-all duration-300"
          >
            <div className="absolute -inset-6 rounded-2xl blur-3xl opacity-20 bg-blur-blue"></div>

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
            transition={{ duration: 0.7 }}
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
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative inline-block w-full max-w-md hover:scale-105 transition-all duration-300"
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

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold sm:text-6xl">
            Your AI Health Coach
          </h1>
          <p className="text-[#777E90] text-xs text-center w-full max-w-xs sm:text-base sm:max-w-lg">
            Transform your wellness journey with personalized AI-powered
            guidance that adapts to your unique needs.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center justify-center gap-1 bg-white rounded-full px-4 py-2 cursor-pointer transition-all hover:scale-105 duration-200">
              <IconBrandApple fill="black" size={28} />
              <span className="text-sm sm:text-lg font-bold">Download</span>
            </button>
            <button className="flex items-center justify-center gap-1 bg-white rounded-full px-4 py-2 cursor-pointer transition-all hover:scale-105 duration-200">
              <IconBrandGooglePlay size={28} />
              <span className="text-sm sm:text-lg font-bold">Download</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
