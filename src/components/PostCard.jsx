import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, Clock } from "lucide-react";
import { formatDate } from "../utils/format.js";

function Author({ author }) {
  return (
    <div className="flex items-center gap-3">
      <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" loading="lazy" />
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">{author.name}</p>
        <p className="text-xs text-zinc-500">{author.role}</p>
      </div>
    </div>
  );
}

function GridCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/80 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute start-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-white transition group-hover:text-orange-400">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Author author={post.author} />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#151515] transition duration-300 hover:border-orange-500/40 sm:flex-row"
    >
      <div className="aspect-[16/9] overflow-hidden sm:aspect-auto sm:w-[35%] sm:shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-7 py-7">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 font-bold text-orange-500">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold leading-snug text-white transition group-hover:text-orange-400 sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-lg leading-8 text-zinc-400">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white/80" loading="lazy" />
            <div className="leading-tight">
              <p className="text-[17px] font-bold text-white">{post.author.name}</p>
              <p className="text-sm text-zinc-500">{post.author.role}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-[17px] font-bold text-orange-500">
            اقرأ المقال
            <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PostCard({ post, view = "grid" }) {
  return view === "list" ? <ListCard post={post} /> : <GridCard post={post} />;
}
