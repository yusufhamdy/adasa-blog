import { Link } from "react-router-dom";
import { Calendar, FileText, List, Mail } from "lucide-react";
import { Badge } from "./SectionHeader.jsx";
import { useActiveSection, usePageTitle } from "../hooks.js";
import { siteInfo } from "../services/posts.js";

const LAST_UPDATED = "٩ أكتوبر ٢٠٢٦";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LegalPage({ title, badge, intro, sections, otherPage }) {
  usePageTitle(title);
  const ids = sections.map((_, index) => `legal-${index + 1}`);
  const activeId = useActiveSection(ids);

  return (
    <>
      <section className="bg-grid border-b border-[#262626]">
        <div className="mx-auto max-w-4xl px-4 pb-20 pt-[115px] text-center sm:px-6">
          <Badge>{badge}</Badge>
          <h1 className="mt-8 text-4xl font-black leading-tight text-white sm:text-[3.2rem]">{title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.7] text-zinc-400 sm:text-[1.3rem]">{intro}</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#151515] px-5 py-2 text-base text-zinc-400">
            <Calendar className="h-4 w-4 text-orange-500" />
            آخر تحديث: {LAST_UPDATED}
          </span>
        </div>
      </section>

      <div className="mx-auto max-w-5xl gap-10 px-6 pb-20 pt-12 xl:grid xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_340px]">
        <aside className="order-first mb-8 xl:order-last xl:mb-0">
          <div className="space-y-5 xl:sticky xl:top-28">
            <nav className="rounded-3xl border border-[#262626] bg-[#151515] p-6" aria-label="محتويات الصفحة">
              <div className="flex items-center gap-3 text-white">
                <List className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-bold">محتويات الصفحة</h2>
              </div>
              <ul className="mt-4 max-h-[50vh] space-y-1 overflow-y-auto">
                {sections.map((section, index) => {
                  const isActive = activeId === ids[index];
                  return (
                    <li key={section.title}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(ids[index])}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl border-s-2 px-3 py-2.5 text-start text-base transition ${
                          isActive
                            ? "border-orange-500 bg-orange-500/10 text-orange-400"
                            : "border-transparent text-zinc-400 hover:text-orange-400"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs ${
                            isActive ? "bg-orange-500 text-white" : "bg-zinc-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                        {section.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              to={otherPage.to}
              className="flex items-center gap-3 rounded-2xl border border-[#262626] bg-[#151515] p-5 text-base text-zinc-300 transition hover:border-orange-500/60 hover:text-orange-400"
            >
              <FileText className="h-5 w-5 text-orange-500" />
              {otherPage.label}
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          {sections.map((section, index) => (
            <section
              key={section.title}
              id={ids[index]}
              className="scroll-mt-28 rounded-3xl border border-[#262626] bg-[#151515] p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 font-bold text-orange-500">
                  {index + 1}
                </span>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              {section.paragraphs.map((text) => (
                <p key={text} className="mt-5 text-lg leading-9 text-zinc-400">
                  {text}
                </p>
              ))}
              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg leading-8 text-zinc-400">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/[0.07] p-8 text-center">
            <Mail className="mx-auto h-8 w-8 text-orange-500" />
            <h2 className="mt-4 text-xl font-bold text-white">هل لديك أي استفسار؟</h2>
            <a href={`mailto:${siteInfo.email}`} className="mt-3 inline-block text-lg font-bold text-orange-500 hover:text-orange-400">
              {siteInfo.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
