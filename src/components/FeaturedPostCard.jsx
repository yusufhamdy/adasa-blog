import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { formatDate } from "../utils/format.js";

export default function FeaturedPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/80 transition duration-300 hover:border-orange-500/40 md:min-h-80 md:flex-row"
    >
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:w-1/2">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          <Star className="h-3 w-3 fill-current" />
          مميز
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="rounded-full bg-orange-500/10 px-3 py-1 font-semibold text-orange-400">{post.category}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-extrabold leading-snug text-white transition group-hover:text-orange-400 md:text-3xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-orange-500/40" loading="lazy" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              <p className="text-xs text-zinc-500">{formatDate(post.date)}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
            اقرأ المقال
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
