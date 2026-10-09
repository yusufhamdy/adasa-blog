import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export default function RelatedPostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/70 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute start-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-white transition group-hover:text-orange-400">{post.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="h-6 w-6 rounded-full object-cover" loading="lazy" />
            {post.author.name}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
