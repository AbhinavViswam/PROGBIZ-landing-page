"use client";
import { useFeatures } from "@/backend/feature/feature.query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Features() {
  const { data } = useFeatures();
  const features = data?.feature ?? [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!features.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);


  const item = features[index];

  if (features.length === 0) {
    return (
      <div className="w-full flex items-center justify-center text-3xl ">
        No Features added by Admin
      </div>
    );
  }

  return (
    <div className="overflow-hidden w-full">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            x: -30,
            transition: { duration: 0.35, ease: "easeIn" },
          }}
          className="bg-[#FCFCFD] flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:justify-between p-8 sm:py-16 sm:px-40"
        >
          <div className="w-full sm:max-w-xl flex flex-col items-start justify-center gap-6">
            <h1 className="text-[#23262F] font-black text-4xl">{item.title}</h1>

            <div className="flex flex-col gap-1">
              <p className="text-[#23262F] text-base font-semibold">
                {item.subtitle}
              </p>
              <p className="text-[#777E90] text-sm w-full sm:max-w-[30vw]">
                {item.content}
              </p>
            </div>

            <button className="bg-white cursor-pointer hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-sm py-2 px-4 rounded-full">
              Read More
            </button>
          </div>

          <div className="bg-[#F4F5F6] sm:max-h-[50vh] w-full sm:max-w-lg rounded-4xl overflow-hidden p-10 flex items-center justify-center">
            <Image
              alt="img"
              src={item.imgurl}
              width={400}
              height={500}
              className="object-contain rounded-xl h-auto w-full sm:max-h-[50vh]"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Features;
