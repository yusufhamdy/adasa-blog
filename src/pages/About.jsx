import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, Handshake, Mail, Newspaper, PenTool, RefreshCw, Target, Users, Zap } from "lucide-react";
import { Badge } from "../components/SectionHeader.jsx";
import SocialIcon, { socialHome, socialHover } from "../components/SocialIcons.jsx";
import { usePageTitle } from "../hooks.js";
import { getTeam, siteInfo } from "../services/posts.js";

const stats = [
  { icon: Users, value: "مليون +2", label: "قارئ شهرياً" },
  { icon: Newspaper, value: "500+", label: "مقالة منشورة" },
  { icon: PenTool, value: "50+", label: "كاتب خبير" },
  { icon: BookOpen, value: "15+", label: "تصنيف" },
];

const values = [
  { icon: Target, title: "الجودة أولاً", text: "محتوى مدروس ومكتوب بعناية" },
  { icon: Zap, title: "تركيز عملي", text: "أمثلة واقعية يمكنك تطبيقها اليوم", filled: true },
  { icon: Handshake, title: "المجتمع", text: "نتعلم مع آلاف المصورين" },
  { icon: RefreshCw, title: "دائماً محدث", text: "أحدث التقنيات وأفضل الممارسات" },
];

const teamSocials = ["twitter", "github", "linkedin"];

export default function About() {
  usePageTitle("من نحن");
  const team = getTeam();

  return (
    <>
      <section className="bg-grid border-b border-[#262626]">
        <div className="mx-auto max-w-4xl px-4 pb-24 pt-[115px] text-center sm:px-6">
          <Badge>من نحن</Badge>
          <h1 className="mt-8 text-4xl font-black leading-tight text-white sm:text-[3.2rem]">
            مهمتنا هي <span className="text-gradient">الإعلام والإلهام</span>
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg leading-[1.7] text-zinc-400 sm:text-[1.4rem]">
            {siteInfo.description} نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
          </p>

          <div className="mt-[41px] grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-3xl border border-[#262626] bg-[#151515] px-4 py-7">
                <Icon className="mx-auto h-7 w-7 fill-orange-500 stroke-orange-600" />
                <p className="text-gradient mt-3 text-[2rem] font-black leading-tight">{value}</p>
                <p className="mt-1 text-base text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#262626] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="inline-flex items-center gap-4 text-4xl font-black">
              <span className="h-9 w-1.5 rounded bg-orange-500" />
              قيمنا
              <span className="h-9 w-1.5 rounded bg-orange-500" />
            </h2>
            <p className="mt-5 text-xl text-zinc-400">المبادئ التي توجه كل ما نقوم بإنشائه</p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {values.map(({ icon: Icon, title, text, filled }) => (
              <div key={title} className="rounded-2xl border border-[#262626] bg-[#151515] px-6 py-9 text-center transition hover:-translate-y-1 hover:border-orange-500/40">
                <Icon className={filled ? "mx-auto h-12 w-12 fill-orange-500 stroke-orange-500" : "mx-auto h-12 w-12 text-orange-500"} strokeWidth={2.2} />
                <h3 className="mt-4 text-[1.35rem] font-bold text-white">{title}</h3>
                <p className="mt-2 text-base text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <Badge>فريقنا</Badge>
            <h2 className="mt-6 text-4xl font-black sm:text-5xl">تعرف على كتابنا</h2>
            <p className="mx-auto mt-5 max-w-3xl text-xl text-zinc-400">
              فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {team.map((author) => (
              <div key={author.name} className="group rounded-2xl border border-[#262626] bg-[#151515] p-8 text-center transition duration-300 hover:border-orange-500/60">
                <div className="relative mx-auto h-[7.4rem] w-[7.4rem]">
                  <img src={author.avatar} alt={author.name} className="h-full w-full rounded-full object-cover ring-4 ring-[#262626] transition duration-300 group-hover:ring-orange-500/60" loading="lazy" />
                  <span className="absolute bottom-1 end-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#151515] bg-orange-500 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{author.name}</h3>
                <p className="mt-1 text-sm font-medium text-orange-500">{author.role}</p>
                <div className="mt-5 flex justify-center gap-3">
                  {teamSocials.map((name) => (
                    <a
                      key={name}
                      href={socialHome[name]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#222] text-zinc-500 transition ${socialHover[name]}`}
                    >
                      <SocialIcon name={name} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-white sm:text-4xl">لديك أسئلة؟ دعنا نتحدث!</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/85">
            نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا أو أردت المساهمة، لا تتردد في التواصل.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${siteInfo.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              <Mail className="h-4 w-4" />
              تواصل معنا
            </a>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              تصفح المقالات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
