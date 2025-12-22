import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

interface Director {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  insta?: string;
  bio: string;
  year?: string;
}

interface DirectorCardProps {
  director: Director;
  index?: number;
  onClick: () => void;
}

function DirectorCard({ director, index = 0, onClick }: DirectorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={director.img}
          alt={director.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold mb-1">{director.name}</h3>
        <p className="text-sm text-orange-400 mb-3">{director.role}</p>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {director.linkedin && (
            <a
              href={director.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-orange-500 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {director.insta && (
            <a
              href={director.insta}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-orange-500 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const MemoizedDirectorCard = memo(DirectorCard);
