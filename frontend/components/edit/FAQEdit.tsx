"use client";
import { useCreateFaq, useDeleteFaq, useFaqs } from "@/backend/faq/faq.query";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconCirclePlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { data } = useFaqs();
  const { mutate: createMutation, isPending: createPending } = useCreateFaq();
  const { mutate: deleteMutation, isPending: deletePending } = useDeleteFaq();

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

  function resetForm() {
    setQuestion("");
    setAnswer("");
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    createMutation({ question: question.trim(), answer: answer.trim() });
    resetForm();
    setIsModalOpen(false);
  }

  function handleDelete(id: any) {
    if (id === undefined) return;
    deleteMutation(id);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="text-left max-w-md flex flex-col gap-4">
          <h1 className="text-5xl font-semibold">Frequently Asked Questions</h1>
          <p className="text-base text-[#777E90]">
            Get answers to common questions about our AI health assistant app
          </p>
        </div>

        {/* Button to open modal */}
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm border border-[#E6E6E6] hover:shadow-md"
            aria-haspopup="dialog"
          >
            <IconCirclePlus />
            <span>Add FAQ</span>
          </button>
        </div>
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

                  <div className="flex items-center gap-2">
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

                    {/* Delete button - requires id */}
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletePending}
                      className="p-2 rounded hover:bg-red-50"
                      aria-label={`Delete FAQ ${idx}`}
                    >
                      <IconTrash />
                    </button>
                  </div>
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
                        // @ts-ignore
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

      {/* Modal for creating FAQ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal panel */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Add FAQ</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </header>

              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Question</span>
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="e.g. How do I reset my password?"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Answer</span>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="border rounded px-3 py-2 min-h-[120px] resize-vertical"
                    placeholder="Write the answer here..."
                    required
                  />
                </label>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-2xl border"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={createPending}
                    className="px-4 py-2 rounded-2xl bg-black text-white"
                  >
                    {createPending ? "Adding..." : "Add FAQ"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
