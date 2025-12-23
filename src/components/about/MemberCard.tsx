import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

interface Member {
  name: string;
  role: string;
  domain?: string;
  img: string;
  linkedin?: string;
  instagram?: string;
  year?: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
  onClick: () => void;
}

function MemberCard({ member, index, onClick }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={75}
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
        <p className="text-xs text-orange-400 mb-1">{member.role}</p>
        {member.domain && (
          <p className="text-xs text-gray-400 mb-2">{member.domain}</p>
        )}

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-orange-500 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-3 h-3" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-orange-500 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const MemoizedMemberCard = memo(MemberCard);
