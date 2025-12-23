import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface Person {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  insta?: string;
  instagram?: string;
  bio: string;
  domain?: string;
  year?: string;
}

interface FlipCardPopupProps {
  person: Person | null;
  onClose: () => void;
}

export function FlipCardPopup({ person, onClose }: FlipCardPopupProps) {
  useEffect(() => {
    if (person) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [person]);

  if (!person) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <motion.div
          className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            overscrollBehavior: "contain",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto overscroll-contain">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={person.img}
                alt={person.name}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                quality={85}
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {person.name}
                </h2>
                <p className="text-orange-400 font-semibold text-lg mb-1">
                  {person.role}
                </p>
                {person.domain && (
                  <p className="text-gray-400 text-sm">{person.domain}</p>
                )}
                {person.year && (
                  <p className="text-gray-500 text-sm mt-1">{person.year}</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">About</h3>
                <p className="text-gray-300 leading-relaxed">{person.bio}</p>
              </div>

              <div className="flex gap-2">
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-orange-500 rounded-lg text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {(person.insta || person.instagram) && (
                  <a
                    href={person.insta || person.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-orange-500 rounded-lg text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
