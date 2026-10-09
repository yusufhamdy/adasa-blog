import { Link } from "react-router-dom";
import { Frown, Home, Newspaper } from "lucide-react";
import { usePageTitle } from "../hooks.js";

export default function NotFound() {
  usePageTitle("الصفحة غير موجودة");

  return (
    <section className="bg-grid border-b border-white/5">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-1 pt-[38px] text-center sm:px-6">
        <p className="text-gradient-404 text-[6rem] font-black leading-none sm:text-[9rem] md:text-[13.5rem]" dir="ltr">
          404
        </p>

        <div className="relative -mt-2.5 h-32 w-32 md:h-[8.4rem] md:w-[8.4rem]">
          <div className="flex h-full w-full items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/25">
            <Frown className="h-14 w-14 text-orange-500 md:h-[3.75rem] md:w-[3.75rem]" strokeWidth={1.8} />
          </div>
          <span className="absolute -start-3 -top-3 h-6 w-6 rotate-12 rounded-lg bg-orange-500" />
          <span className="absolute -bottom-1 -end-4 h-5 w-5 rounded-full bg-amber-600/70" />
        </div>

        <h1 className="mt-[2.7rem] text-3xl font-bold text-white md:text-4xl">عفواً! الصفحة غير موجودة</h1>
        <p className="mt-4 max-w-xl text-lg font-medium leading-9 text-zinc-400 md:text-[21px]">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-5 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110"
          >
            <Home className="h-5 w-5" />
            الذهاب للرئيسية
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-10 py-5 text-lg font-bold text-white transition hover:border-orange-500"
          >
            <Newspaper className="h-5 w-5" />
            تصفح المقالات
          </Link>
        </div>

        <div className="mt-[65px] w-full max-w-xl border-t border-white/10 pt-8">
          <p className="text-base text-zinc-500">قد تجد هذه مفيدة:</p>
          <div className="mt-5 flex items-center justify-center gap-4 text-base text-orange-500">
            <Link to="/blog" className="hover:text-orange-400">المدونة</Link>
            <span className="text-zinc-600">·</span>
            <Link to="/about" className="hover:text-orange-400">من نحن</Link>
            <span className="text-zinc-600">·</span>
            <Link to="/privacy" className="hover:text-orange-400">الخصوصية</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
