"use client";
import { motion } from "framer-motion";
import { IconBrandAdobe, IconBrandWhatsapp } from "@tabler/icons-react";

function ClientSection() {
  const clients = [
    { title: "Logoipsum", logo: IconBrandWhatsapp },
    { title: "Logoipsum", logo: IconBrandAdobe },
    { title: "Logoipsum", logo: IconBrandWhatsapp },
    { title: "Logoipsum", logo: IconBrandAdobe },
  ];

  const duplicated = [...clients, ...clients, ...clients];

  return (
    <section className="w-full px-4 py-12 overflow-hidden bg-[#FCFCFD]">
      <motion.div
        className="flex gap-10 sm:gap-20"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 opacity-60 hover:opacity-100 transition"
          >
            <item.logo size={30} stroke={1.5} />
            <p className="font-black text-[#92918F] text-lg sm:text-2xl">{item.title}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default ClientSection;
