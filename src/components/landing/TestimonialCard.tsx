import { useState } from "react";
import { Heart, MoreHorizontal } from "lucide-react";

// Mesmo modelo visual de post do Instagram usado em TestimonialsSection.tsx
// (avatar com anel gradiente, selo verificado, estrelas, curtidas), extraído
// como componente próprio pra poder ser reaproveitado fora do carrossel da
// LP principal (ex: tela de depoimentos do quiz) sem duplicar o carrossel
// embla nem mexer no componente já em produção.

export interface Testimonial {
  handle: string;
  name: string;
  initials: string;
  ringA: string;
  ringB: string;
  avatarA: string;
  avatarB: string;
  likes: number;
  timeAgo: string;
  verified: boolean;
  text: string;
}

const StarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const VerifiedBadge = () => (
  <div className="inline-flex items-center justify-center w-4 h-4 bg-[#0095f6] rounded-full ml-1 flex-shrink-0">
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="white">
      <path d="M10.6 3.8L4.8 9.6 1.4 6.2l1.4-1.4 2 2 4.4-4.4 1.4 1.4z" />
    </svg>
  </div>
);

const TestimonialCard = ({ testimonial: t }: { testimonial: Testimonial }) => {
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);
  const gradientId = `ig-grad-${t.handle}`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="40%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-12 h-12 rounded-full p-[2.5px] flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${t.ringA}, ${t.ringB})` }}
          >
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              {!imgError ? (
                <img
                  src={`/avatars/${t.handle}.jpg`}
                  alt={t.name}
                  loading="lazy"
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${t.avatarA}, ${t.avatarB})` }}
                >
                  <span className="text-white font-bold text-xs tracking-wide select-none">{t.initials}</span>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center">
              <p className="text-sm font-semibold text-gray-900 leading-tight truncate">@{t.handle}</p>
              {t.verified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill={`url(#${gradientId})`}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-xs text-gray-400">Instagram</span>
            </div>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-300 flex-shrink-0" />
      </div>

      {/* Stars */}
      <div className="px-5 pb-2.5 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      {/* Comment text */}
      <div className="px-5 pb-4 flex-1">
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          <span className="font-semibold text-gray-900">@{t.handle} </span>
          {t.text}
        </p>
      </div>

      <div className="mx-5 border-t border-gray-100" />

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked((prev) => !prev)} className="flex items-center gap-1.5 group" aria-label="Curtir">
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                liked ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 group-hover:text-red-400"
              }`}
            />
            <span className={`text-xs font-medium transition-colors ${liked ? "text-red-500" : "text-gray-500"}`}>
              {liked ? t.likes + 1 : t.likes}
            </span>
          </button>
          <span className="text-xs text-gray-400 cursor-default">Responder</span>
        </div>
        <span className="text-xs text-gray-400">{t.timeAgo}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
