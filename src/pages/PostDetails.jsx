import { Link, useLoaderData } from "react-router-dom";
import { ArrowLeft, Calendar, Camera, ChevronLeft, Clock, Home, Images, List, Mail, Share2, Tags } from "lucide-react";
import RelatedPostCard from "../components/RelatedPostCard.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import { useActiveSection, usePageTitle } from "../hooks.js";
import { getPostBySlug, getRelatedPosts } from "../services/posts.js";
import { formatDate, formatShortDate, parseContent } from "../utils/format.js";

export function postLoader({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) throw new Response("Not Found", { status: 404 });
  return post;
}

// Filled icons use a dark stroke so the details of the icon stay visible
function IconBox({ icon: Icon, className = "h-10 w-10", filled = false }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-500 ${className}`}>
      <Icon className={filled ? "h-5 w-5 fill-orange-500 stroke-orange-950" : "h-5 w-5"} />
    </span>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-[#262626] bg-[#151515] ${className}`}>{children}</div>;
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PostDetails() {
  const post = useLoaderData();
  const relatedPosts = getRelatedPosts(post);
  const blocks = parseContent(post.content);
  const headings = blocks.filter((block) => block.type === "heading");
  usePageTitle(post.title);
  const activeId = useActiveSection(headings.map((_, index) => `section-${index + 1}`));

  let headingIndex = 0;

  return (
    <>
      <section className="relative flex min-h-[34rem] flex-col justify-between overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:min-h-[37.3rem] lg:pb-[64px]">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/10" />

        <div className="relative mx-auto w-full max-w-5xl">
          <nav className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-base text-zinc-300 backdrop-blur" aria-label="مسار التنقل">
            <Link to="/" aria-label="الرئيسية" className="hover:text-orange-400">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronLeft className="h-4 w-4 text-zinc-500" />
            <Link to="/blog" className="hover:text-orange-400">المدونة</Link>
            <ChevronLeft className="h-4 w-4 text-zinc-500" />
            <span className="text-orange-500">{post.category}</span>
          </nav>
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-zinc-300">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-1.5 text-base font-bold text-white"
            >
              {post.category}
            </Link>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-[43px] max-w-4xl text-4xl font-extrabold leading-[1.25] text-white sm:text-[3.5rem]">{post.title}</h1>

          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 pe-8 backdrop-blur">
            <img src={post.author.avatar} alt={post.author.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-orange-500" />
            <div className="leading-snug">
              <p className="text-xl font-bold text-white">{post.author.name}</p>
              <p className="text-base text-zinc-400">{post.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl gap-10 px-6 pb-16 pt-10 xl:grid xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_340px]">
        <aside className="order-first mb-8 xl:order-last xl:mb-0">
          <div className="space-y-8 xl:sticky xl:top-24 xl:space-y-4">
            {headings.length > 0 && (
              <Card className="p-8 xl:p-6">
                <div className="flex items-center gap-4">
                  <IconBox icon={List} />
                  <h2 className="text-xl font-bold">محتويات المقال</h2>
                </div>
                <ul className="mt-9 xl:mt-5">
                  {headings.map((heading, index) => (
                    <li key={heading.text}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(`section-${index + 1}`)}
                        aria-current={activeId === `section-${index + 1}` ? "true" : undefined}
                        className={`flex w-full items-center gap-4 rounded-xl border-s-2 px-3 py-5 text-start text-lg transition xl:py-2.5 ${
                          activeId === `section-${index + 1}`
                            ? "border-orange-500 bg-orange-500/10 text-orange-400"
                            : "border-transparent text-zinc-400 hover:text-orange-400"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm ${
                            activeId === `section-${index + 1}` ? "bg-orange-500 text-white" : "bg-zinc-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <Card className="grid grid-cols-2 gap-4 p-5 xl:p-4">
              <div className="rounded-2xl bg-black/50 py-6 text-center xl:py-4">
                <Clock className="mx-auto h-5 w-5 text-orange-500" />
                <p className="mt-2 text-lg font-bold text-white">{post.readTime}</p>
                <p className="text-sm text-zinc-500">وقت القراءة</p>
              </div>
              <div className="rounded-2xl bg-black/50 py-6 text-center xl:py-4">
                <Calendar className="mx-auto h-5 w-5 text-orange-500" />
                <p className="mt-2 text-lg font-bold text-white">{formatShortDate(post.date)}</p>
                <p className="text-sm text-zinc-500">تاريخ النشر</p>
              </div>
            </Card>

            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/[0.07] p-8 text-center xl:p-6">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/20 xl:h-12 xl:w-12">
                <Mail className="h-6 w-6 fill-orange-500 stroke-orange-950" />
              </span>
              <h2 className="mt-5 text-xl font-bold">لا تفوّت جديدنا</h2>
              <p className="mt-2 text-base text-zinc-400">اشترك للحصول على أحدث المقالات</p>
              <Link
                to="/blog"
                className="mt-6 block rounded-xl bg-[#ff6b00] py-5 xl:mt-4 xl:py-4 text-lg font-bold text-white transition hover:brightness-110"
              >
                تصفح المزيد
              </Link>
            </div>

          </div>
        </aside>

        <div className="min-w-0 space-y-8">
        <blockquote className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.07] px-8 py-7 text-lg italic leading-8 text-orange-100/90">
          "{post.excerpt}"
        </blockquote>

        <article className="pt-6">
          {blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p key={index} className="mb-7 text-[1.15rem] leading-9 text-zinc-300">
                  {block.text}
                </p>
              );
            }

            headingIndex += 1;
            return (
              <h2 key={index} id={`section-${headingIndex}`} className="mb-5 mt-[65px] flex scroll-mt-28 items-center gap-4 text-3xl font-bold text-white sm:text-4xl">
                <IconBox icon={Camera} className="h-12 w-12" filled />
                {block.text}
              </h2>
            );
          })}
        </article>

        <Card className="p-8">
          <div className="flex items-center gap-4">
            <IconBox icon={Tags} filled />
            <h2 className="text-base font-bold">الوسوم</h2>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-[#262626] bg-[#1a1a1a] px-5 py-2 text-base text-zinc-400 transition hover:border-orange-500 hover:text-orange-400"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </Card>

        <Card className="flex flex-wrap items-center justify-between gap-4 px-8 py-6">
          <div className="flex items-center gap-4">
            <IconBox icon={Share2} filled />
            <h2 className="text-base font-bold">شارك المقال</h2>
          </div>
          <ShareButtons title={post.title} />
        </Card>

        <Card className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-start">
          <img src={post.author.avatar} alt={post.author.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2 ring-orange-500/40" />
          <div>
            <p className="text-xs font-bold text-orange-500">كاتب المقال</p>
            <h2 className="mt-1 text-2xl font-extrabold">{post.author.name}</h2>
            <p className="text-sm text-zinc-500">{post.author.role}</p>
            <p className="mt-3 text-base text-zinc-400">{post.author.role} شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.</p>
          </div>
        </Card>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-5xl border-t border-[#262626] px-6 pb-16 pt-16">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <IconBox icon={Images} className="h-14 w-14" filled />
              <div>
                <h2 className="text-3xl font-bold">مقالات قد تعجبك</h2>
                <p className="text-base text-zinc-500">استكشف المزيد من المحتوى المميز</p>
              </div>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-base font-bold text-orange-500 hover:text-orange-400">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((related) => (
              <RelatedPostCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
