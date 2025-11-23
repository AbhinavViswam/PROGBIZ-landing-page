"use client";
import {
  useCreateFeature,
  useDeleteFeature,
  useFeatures,
  useUpdateFeature,
} from "@/backend/feature/feature.query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";

export default function Features() {
  const { data } = useFeatures();
  const { mutate: createMutation, isPending: createPending } = useCreateFeature();
  const { mutate: deleteMutation, isPending: deletePending } = useDeleteFeature();
  const { mutate: updateMutation, isPending: updatePending } = useUpdateFeature();
  const features = data?.feature ?? [];


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function openCreateModal() {
    setEditingId(null);
    resetForm();
    setIsModalOpen(true);
  }

  function openEditModal(item: any) {
    setEditingId(item._id ?? null);
    setTitle(item.title ?? "");
    setSubtitle(item.subtitle ?? "");
    setContent(item.content ?? "");
    setPreview(item.imgurl ?? null);
    setFile(null); 
    setIsModalOpen(true);
  }

  function resetForm() {
    setTitle("");
    setSubtitle("");
    setContent("");
    setFile(null);
    setPreview(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim() || !content.trim()) return;

    if (editingId) {
      const payload: any = { title: title.trim(), subtitle: subtitle.trim(), content: content.trim() };
      if (file) payload.file = file;
      updateMutation({id:editingId,payload});
    } else {
      if (!file) return; // create requires image file
      createMutation({ title: title.trim(), subtitle: subtitle.trim(), content: content.trim(), file });
    }

    resetForm();
    setEditingId(null);
    setIsModalOpen(false);
  }

  function handleDelete(id: any) {
    if (id === undefined) return;
    if (!confirm("Delete this feature?")) return;
    deleteMutation(id);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Features</h2>
          <button onClick={openCreateModal} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm border border-[#E6E6E6] hover:shadow-md">
            <IconCirclePlus />
            <span>Add Feature</span>
          </button>
        </div>

        {features.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-6 py-20">
            <div className="text-3xl">No Features added by Admin</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {features.map((item: any) => (
                <motion.div
                  key={item._id ?? item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  className="bg-[#FCFCFD] flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl shadow-sm"
                >
                  <div className="w-full sm:max-w-2xl flex flex-col items-start justify-center gap-3">
                    <h3 className="text-[#23262F] font-bold text-xl">{item.title}</h3>
                    <p className="text-[#23262F] text-sm font-semibold">{item.subtitle}</p>
                    <p className="text-[#777E90] text-sm">{item.content}</p>
                  </div>

                  <div className="relative bg-[#F4F5F6] w-full sm:w-64 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
                    {item.imgurl ? (
                      <Image alt={item.title || "feature image"} src={item.imgurl} width={300} height={200} className="object-contain rounded-xl h-auto w-full" />
                    ) : (
                      <div className="text-sm text-[#777E90]">No image</div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        disabled={updatePending}
                        className="p-2 rounded bg-white/80 hover:bg-white"
                        aria-label={`Edit feature ${item._id ?? item.id}`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id ?? item.id)}
                        disabled={deletePending}
                        className="p-2 rounded bg-white/80 hover:bg-white"
                        aria-label={`Delete feature ${item._id ?? item.id}`}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal for create / update Feature */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="absolute inset-0 bg-black/40" onClick={() => { setIsModalOpen(false); setEditingId(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

              <motion.div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <header className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{editingId ? "Edit Feature" : "Add Feature"}</h3>
                  <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="p-2 rounded">✕</button>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border rounded px-3 py-2" required />
                  <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" className="border rounded px-3 py-2" required />
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="border rounded px-3 py-2 min-h-[120px] resize-vertical" required />

                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Image {editingId ? "(leave empty to keep existing)" : "(required)"}</span>
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                  </label>

                  {/* {preview && (
                    <div className="w-full max-h-60 overflow-hidden rounded">
                      <img src={preview} alt="preview" className="object-contain w-[50vw] h-[50vh]" />
                    </div>
                  )} */}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="button" onClick={() => { resetForm(); setIsModalOpen(false); setEditingId(null); }} className="px-4 py-2 rounded-2xl border">Cancel</button>
                    <button type="submit" disabled={createPending || updatePending} className="px-4 py-2 rounded-2xl bg-black text-white">{editingId ? (updatePending ? "Updating..." : "Update Feature") : (createPending ? "Adding..." : "Add Feature")}</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
