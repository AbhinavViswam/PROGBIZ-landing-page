"use client";
import {
  useCreateTestimonial,
  useDeleteTestimonial,
  useTestimonials,
  useUpdateTestimonial,
} from "@/backend/testimonial/testimonial.query";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconTrash, IconEdit } from "@tabler/icons-react";

export default function Testimonial() {
  const { data } = useTestimonials();
  const { mutate: createMutation, isPending: createPending } = useCreateTestimonial();
  const { mutate: deleteMutation, isPending: deletePending } = useDeleteTestimonial();
  const { mutate: updateMutation, isPending: updatePending } = useUpdateTestimonial();
  const testimonials: any[] = data?.testimonial ?? [];

  const [index, setIndex] = useState(0);

  // Admin modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  // Keep index valid when testimonials change
  useEffect(() => {
    if (!testimonials.length) {
      setIndex(0);
    } else if (index >= testimonials.length) {
      setIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const next = () => setIndex((i) => (testimonials.length ? (i + 1) % testimonials.length : 0));
  const prev = () => setIndex((i) => (testimonials.length ? (i - 1 + testimonials.length) % testimonials.length : 0));

  // Modal open helpers
  function openCreateModal() {
    setEditingId(null);
    setName("");
    setRole("");
    setDescription("");
    setIsModalOpen(true);
  }

  function openEditModal(t: any) {
    setEditingId(t._id ?? t.id ?? null);
    setName(t.name ?? "");
    setRole(t.role ?? "");
    setDescription(t.description ?? "");
    setIsModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !description.trim()) return;

    if (editingId) {
      updateMutation({ id: editingId, payload: { name: name.trim(), role: role.trim(), description: description.trim() } });
    } else {
      createMutation({ name: name.trim(), role: role.trim(), description: description.trim() });
    }

    setIsModalOpen(false);
    setEditingId(null);
    setName("");
    setRole("");
    setDescription("");
  }

  function handleDelete(id: any) {
    if (id === undefined) return;
    if (!confirm("Delete this testimonial?")) return;
    deleteMutation(id);
  }

  // Render
  return (
    <section className="flex flex-col items-center justify-center w-full px-6 py-20 bg-[#F4F5F6]">
      {/* Title */}
      <div className="text-center flex flex-col items-center justify-center mb-12">
        <h1 className="text-5xl font-semibold max-w-2xl">Our Users Feel the Transformation</h1>
        <p className="text-[#777E90] max-w-md mt-2">Real Stories from People Empowered by Personalized Wellness</p>
      </div>

      {/* Admin: Add button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <button onClick={openCreateModal} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm border border-[#E6E6E6] hover:shadow-md">Add Testimonial</button>
      </div>

      {/* Empty state */}
      {testimonials.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <div className="text-3xl">No testimonials added by Admin</div>
        </div>
      )}

      {/* Testimonial Card Container (only show when there are testimonials) */}
      {testimonials.length > 0 && (
        <>
          <div className="relative flex items-center justify-center w-full max-w-4xl mb-8">
            {/* Left Arrow */}
            <button onClick={prev} aria-label="previous testimonial" className="absolute -left-6 bg-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl">‹</button>

            {/* Animated Card */}
            <div className="max-w-2xl w-full">
              <AnimatePresence initial={false} mode="wait">
                <motion.div key={index} initial={{ opacity: 0, x: 40, scale: 0.98 }} //@ts-ignore
                  animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }} exit={{ opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.35 } }} className="bg-white flex flex-col items-center justify-center rounded-3xl shadow p-10 text-center h-auto sm:h-[50vh] sm:min-w-2xl relative">
                  <p className="text-[#23262F] text-lg leading-relaxed mb-8">{testimonials[index]?.description}</p>

                  {/* User Info */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden bg-[#FFBC99]" />

                    <div className="flex flex-col text-left">
                      <p className="font-semibold">{testimonials[index]?.name}</p>
                      <p className="text-[#777E90] text-sm">{testimonials[index]?.role}</p>
                    </div>
                  </div>

                  {/* Admin controls on card */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button type="button" onClick={() => openEditModal(testimonials[index])} disabled={updatePending} className="px-3 py-1 rounded bg-white/90 hover:bg-white"><IconEdit /></button>
                    <button type="button" onClick={() => handleDelete(testimonials[index]?._id )} disabled={deletePending} className="px-3 py-1 rounded bg-white/90 hover:bg-white"><IconTrash /></button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button onClick={next} aria-label="next testimonial" className="absolute -right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl">›</button>
          </div>

          {/* Bottom User Bubbles: show first 3 visible, scroll horizontally for more */}
          <div className="w-full flex justify-center">
            <div className="flex gap-4 px-3 py-2 max-w-[520px] w-full overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

              {testimonials.map((t: any, i: number) => {
                const isActive = i === index;
                return (
                  <motion.div key={i} onClick={() => setIndex(i)} layout whileHover={{ y: -4, scale: 1.02 }} animate={isActive ? { scale: [1, 1.03, 1], y: [0, -3, 0] } : { scale: 1, y: 0 }} transition={{ duration: 0.45 }} className={`min-w-40 snap-start flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-shadow ${isActive ? "shadow-md opacity-100" : "shadow-sm bg-white/95 opacity-60"}`}>
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
        </>
      )}

      {/* Modal for create / update Testimonial */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/40" onClick={() => { setIsModalOpen(false); setEditingId(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

            <motion.div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="p-2 rounded">✕</button>
              </header>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border rounded px-3 py-2" required />
                <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role / Subtitle" className="border rounded px-3 py-2" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Testimonial" className="border rounded px-3 py-2 min-h-[120px] resize-vertical" required />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="px-4 py-2 rounded-2xl border">Cancel</button>
                  <button type="submit" disabled={createPending || updatePending} className="px-4 py-2 rounded-2xl bg-black text-white">{editingId ? (updatePending ? "Updating..." : "Update") : createPending ? "Adding..." : "Add"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
