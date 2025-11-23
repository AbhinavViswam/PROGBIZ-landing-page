"use client";
import { useTestimonials } from "@/backend/testimonial/testimonial.query";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Testimonial() {
  const { data } = useTestimonials();
  const testimonials: any[] = data?.testimonial ?? [];

  const [index, setIndex] = useState(0);

  // Guard: when testimonials load or length changes, keep index valid
  if (testimonials.length && index >= testimonials.length) {
    setIndex(0);
  }

  const next = () =>
    setIndex((i) => (testimonials.length ? (i + 1) % testimonials.length : 0));
  const prev = () =>
    setIndex((i) =>
      testimonials.length
        ? (i - 1 + testimonials.length) % testimonials.length
        : 0
    );

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="w-full flex items-center justify-center text-3xl py-20">
        No testimonials added by Admin
      </div>
    );
  }

  const item = testimonials[index];

  // animation presets
  const cardEnter = { opacity: 0, x: 40, scale: 0.98 };
  const cardCenter = {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  };
  const cardExit = {
    opacity: 0,
    x: -30,
    scale: 0.98,
    transition: { duration: 0.35 },
  };

  return (
    <section className="flex flex-col items-center justify-center w-full px-6 py-20 bg-[#F4F5F6]">
      {/* Title */}
      <div className="text-center flex flex-col items-center justify-center mb-12">
        <h1 className="text-5xl font-semibold max-w-2xl">
          Our Users Feel the Transformation
        </h1>
        <p className="text-[#777E90] max-w-md mt-2">
          Real Stories from People Empowered by Personalized Wellness
        </p>
      </div>

      {/* Testimonial Card Container */}
      <div className="relative flex items-center justify-center w-full max-w-4xl mb-8">
        {/* Left Arrow */}
        <button
          onClick={prev}
          aria-label="previous testimonial"
          className="absolute -left-6 bg-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl"
        >
          ‹
        </button>

        {/* Animated Card */}
        <div className="max-w-2xl w-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={cardEnter}
              //@ts-ignore
              animate={cardCenter}
              exit={cardExit}
              className="bg-white flex flex-col items-center justify-center rounded-3xl shadow p-10 text-center h-auto sm:h-[50vh] sm:min-w-2xl"
            >
              <p className="text-[#23262F] text-lg leading-relaxed mb-8">
                {item.description}
              </p>

              {/* User Info */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-[#FFBC99]" />

                <div className="flex flex-col text-left">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[#777E90] text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          aria-label="next testimonial"
          className="absolute -right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl"
        >
          ›
        </button>
      </div>

      {/* Bottom User Bubbles: show first 3 visible, scroll horizontally for more */}
      <div className="w-full flex justify-center">
        <div
          className="flex gap-4 px-3 py-2 max-w-[520px] w-full overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {testimonials.map((t: any, i: number) => {
            const isActive = i === index;
            return (
              <motion.div
                key={i}
                onClick={() => setIndex(i)}
                layout
                whileHover={{ y: -4, scale: 1.02 }}
                animate={
                  isActive
                    ? { scale: [1, 1.03, 1], y: [0, -3, 0] }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.45 }}
                className={`min-w-40 snap-start flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-shadow ${
                  isActive
                    ? "shadow-md opacity-100"
                    : "shadow-sm bg-white/95 opacity-60"
                }`}
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0 bg-[#FFBC99]" />

                <div className="min-w-0">
                  <p className="font-medium truncate">{t.name}</p>
                  <p className="text-xs text-[#777E90] truncate">{t.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
