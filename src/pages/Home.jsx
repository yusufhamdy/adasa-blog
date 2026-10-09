import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  FolderOpen,
  Info,
  Layers,
  Mail,
  Mountain,
  Newspaper,
  PenTool,
  Settings,
  SlidersHorizontal,
  Sun,
  User,
  Users,
} from "lucide-react";
import SectionHeader, { Badge } from "../components/SectionHeader.jsx";
import PostCard from "../components/PostCard.jsx";
import FeaturedPostCard from "../components/FeaturedPostCard.jsx";
import NewsletterForm from "../components/NewsletterForm.jsx";
import { usePageTitle } from "../hooks.js";
import { categories, getFeaturedPosts, getLatestPosts, getTeam } from "../services/posts.js";

const stats = [
  { icon: Newspaper, value: "50+", label: "مقالة" },
  { icon: Users, value: "10+ ألف", label: "قارئ" },
  { icon: FolderOpen, value: "4", label: "تصنيفات" },
  { icon: PenTool, value: "6", label: "كاتب" },
];

const categoryIcons = {
  إضاءة: Sun,
  بورتريه: User,
  "مناظر طبيعية": Mountain,
  تقنيات: SlidersHorizontal,
  معدات: Settings,
};

function Hero() {
  return (
    <section className="bg-grid relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge>مرحباً بك في عدسة</Badge>
        <h1 className="mt-8 text-5xl font-black leading-tight text-white sm:text-6xl md:text-7xl">
          اكتشف <span className="text-gradient">فن</span>
          <br />
          التصوير الفوتوغرافي
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            استكشف المقالات
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold text-white transition hover:border-orange-500"
          >
            <Info className="h-4 w-4" />
            اعرف المزيد
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-zinc-900/70 p-5 text-center">
              <Icon className="mx-auto h-5 w-5 text-orange-500" />
              <p className="text-gradient mt-2 text-2xl font-black">
                {value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <Badge>التصنيفات</Badge>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">استكشف حسب الموضوع</h2>
          <p className="mt-2 text-sm text-zinc-400">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || Layers;
            return (
              <Link
                key={category.name}
                to={`/blog?category=${encodeURIComponent(category.name)}`}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-zinc-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-500"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-white/20 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold text-white">{category.name}</span>
                  <span className="block text-xs text-zinc-500 transition group-hover:text-white/80">
                    {category.count} مقالة
                  </span>
                </span>
                <span className="absolute end-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition group-hover:opacity-100">
                  <ChevronLeft className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedPosts() {
  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge="مميز"
          title="مقالات مختارة"
          subtitle="محتوى منتقى لبدء رحلة تعلمك"
          action={{ to: "/blog", label: "عرض الكل", icon: <ChevronLeft className="h-4 w-4" />, outline: true }}
        />
        <div className="flex flex-col gap-6">
          {getFeaturedPosts().map((post) => (
            <FeaturedPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestPosts() {
  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge="الأحدث"
          title="أحدث المقالات"
          subtitle="محتوى جديد طازج من المطبعة"
          action={{ to: "/blog", label: "عرض جميع المقالات", icon: <ArrowLeft className="h-4 w-4" /> }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getLatestPosts(3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const subscribers = getTeam().slice(0, 3);

  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 text-center sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Mail className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            اشترك في <span className="text-gradient">نشرتنا الإخبارية</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني.
          </p>
          <div className="mt-6">
            <NewsletterForm buttonText="اشترك الآن" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="flex -space-x-2 space-x-reverse">
                {subscribers.map((author) => (
                  <img key={author.name} src={author.avatar} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-zinc-900" />
                ))}
              </span>
              انضم إلى 10,000+ مشترك
            </span>
            <span>بدون رسائل مزعجة</span>
            <span>إلغاء الاشتراك في أي وقت</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("");

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedPosts />
      <LatestPosts />
      <Newsletter />
    </>
  );
}
