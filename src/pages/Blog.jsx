import { useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { BookOpen, LayoutGrid, List, Search } from "lucide-react";
import { Badge } from "../components/SectionHeader.jsx";
import PostCard from "../components/PostCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { usePageTitle } from "../hooks.js";
import { categories, searchPosts } from "../services/posts.js";

const PAGE_SIZE = 6;

function chipClass(isActive) {
  return `rounded-xl border px-5 py-2.5 text-base transition ${
    isActive
      ? "border-transparent bg-gradient-to-r from-orange-500 to-[#ff5500] font-bold text-white"
      : "border-[#262626] bg-[#151515] font-medium text-zinc-300 hover:border-orange-500/60"
  }`;
}

function viewButtonClass(isActive) {
  return `flex h-11 w-11 items-center justify-center rounded-lg transition ${
    isActive ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white"
  }`;
}

export default function Blog() {
  usePageTitle("المدونة");

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchInput = useRef(null);
  const results = useRef(null);

  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  const posts = useMemo(() => searchPosts({ search, category }), [search, category]);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), totalPages);
  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (location.state?.focusSearch) searchInput.current?.focus();
  }, [location.state]);

  function updateParams(changes, { keepPage = false, replace = false } = {}) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    if (!keepPage) next.delete("page");
    setSearchParams(next, { replace });
  }

  function changePage(newPage) {
    updateParams({ page: newPage > 1 ? String(newPage) : "" }, { keepPage: true });
    results.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetFilters() {
    setSearchParams(view === "list" ? { view: "list" } : {});
  }

  return (
    <>
      <section className="bg-grid border-b border-[#262626]">
        <div className="mx-auto max-w-4xl px-4 pb-[137px] pt-[103px] text-center sm:px-6">
          <Badge>
            <BookOpen className="h-4 w-4" />
            مدونتنا
          </Badge>
          <h1 className="mt-[37px] text-[2.6rem] font-extrabold leading-tight text-white sm:text-[3.5rem]">
            استكشف <span className="text-gradient">مقالاتنا</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-zinc-400 sm:text-2xl">اكتشف الدروس والرؤى وأفضل الممارسات للتصوير الحديث</p>
        </div>
      </section>

      <div className="sticky top-[63px] z-40 border-b border-[#262626] bg-[#0a0a0a]/95 backdrop-blur-xl sm:top-[87px] lg:top-[95px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:gap-10 xl:flex-row-reverse xl:justify-between">
          <div className="relative w-full lg:w-[22rem] lg:shrink-0">
            <input
              ref={searchInput}
              type="search"
              value={search}
              onChange={(event) => updateParams({ q: event.target.value }, { replace: true })}
              placeholder="ابحث في المقالات..."
              aria-label="ابحث في المقالات"
              className="w-full rounded-xl border border-[#262626] bg-[#151515] py-[15px] pe-14 ps-14 text-xl text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            />
            <Search className="pointer-events-none absolute end-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 lg:flex-1 xl:flex-none">
            <button type="button" onClick={() => updateParams({ category: "" })} className={chipClass(!category)}>
              جميع المقالات
            </button>
            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => updateParams({ category: item.name })}
                className={chipClass(category === item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section ref={results} className="mx-auto max-w-7xl scroll-mt-44 px-6 pb-16 pt-2">
        <div className="mb-[38px] flex items-center justify-between">
          <p className="text-base text-zinc-400">
            عرض <span className="font-bold text-white">{posts.length}</span> مقالات
          </p>
          <div className="flex gap-1 rounded-xl border border-[#262626] bg-[#151515] p-1">
            <button
              type="button"
              onClick={() => updateParams({ view: "" }, { keepPage: true })}
              aria-label="عرض شبكي"
              aria-pressed={view === "grid"}
              className={viewButtonClass(view === "grid")}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => updateParams({ view: "list" }, { keepPage: true })}
              aria-label="عرض قائمة"
              aria-pressed={view === "list"}
              className={viewButtonClass(view === "list")}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <>
            <div className={view === "list" ? "flex flex-col gap-6" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
              {visiblePosts.map((post) => (
                <PostCard key={post.id} post={post} view={view} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={changePage} />
          </>
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-white/5 bg-zinc-900/60 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <Search className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-xl font-bold">لا توجد مقالات مطابقة</h2>
            <p className="mt-2 text-sm text-zinc-400">جرّب كلمات بحث مختلفة أو اختر تصنيفاً آخر.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              عرض كل المقالات
            </button>
          </div>
        )}
      </section>
    </>
  );
}
