"use client";
import { useFaqs } from "@/backend/faq/faq.query";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data } = useFaqs();

  const faqs = data?.faq ?? [];

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.28, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.28, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  if (!faqs.length) {
    return (
      <div className="w-full flex items-center justify-center text-3xl ">
        No FAQs added by Admin
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <div className="text-center max-w-md flex flex-col gap-4">
        <h1 className="text-5xl font-semibold">Frequently Asked Questions</h1>
        <p className="text-base text-[#777E90]">
          Get answers to common questions about our AI health assistant app
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col border-t border-[#D5D5D5] py-4">
        {faqs.length === 0 ? (
          <p className="text-sm text-[#777E90] py-4">No FAQs available.</p>
        ) : (
          faqs.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            const key = item?.id ?? idx;

            return (
              <div key={key} className="flex flex-col">
                <div className="flex items-center justify-between w-full py-4">
                  <h2 className="text-3xl font-semibold">
                    {item.question?.endsWith("?")
                      ? item.question
                      : `${item.question}?`}
                  </h2>

                  <motion.button
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="p-2"
                    type="button"
                  >
                    <motion.span
                      variants={iconVariants}
                      initial={isOpen ? "open" : "closed"}
                      animate={isOpen ? "open" : "closed"}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {isOpen ? <IconMinus /> : <IconPlus />}
                    </motion.span>
                  </motion.button>
                </div>

                <div className="border-b border-[#D5D5D5]">
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        key={`faq-answer-${idx}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        //@ts-ignore
                        variants={answerVariants}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#4B4B4B] py-4">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default FAQ;
