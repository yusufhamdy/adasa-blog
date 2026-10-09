import { Link } from "react-router-dom";
import { FooterLogo } from "../components/Logo.jsx";
import NewsletterForm from "../components/NewsletterForm.jsx";
import SocialIcon from "../components/SocialIcons.jsx";
import { categories, siteInfo } from "../services/posts.js";

const socialNames = ["twitter", "github", "linkedin", "youtube"];
const FOOTER_CATEGORIES = 4;

function FooterTitle({ children }) {
  return (
    <h4 className="mb-7 flex items-center gap-4 text-xl font-bold text-white">
      {children}
      <span className="h-0.5 w-10 bg-orange-500" />
    </h4>
  );
}

const linkClass = "text-lg text-zinc-500 transition hover:text-orange-400";

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-gradient-to-b from-transparent to-orange-500/[0.03]">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-[61px] px-6 pb-16 pt-[69px] md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Link to="/" className="inline-block">
            <FooterLogo />
          </Link>
          <p className="mt-6 text-lg leading-8 text-zinc-500">{siteInfo.description}</p>
          <div className="mt-6 flex gap-2.5">
            {socialNames.map((name) => (
              <a
                key={name}
                href={siteInfo.social[name]}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-400 transition hover:border-orange-500 hover:text-orange-400"
              >
                <SocialIcon name={name} className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <FooterTitle>استكشف</FooterTitle>
          <ul className="space-y-4 ps-2">
            <li><Link to="/" className={linkClass}>الرئيسية</Link></li>
            <li><Link to="/blog" className={linkClass}>المدونة</Link></li>
            <li><Link to="/about" className={linkClass}>من نحن</Link></li>
          </ul>
        </div>

        <div>
          <FooterTitle>التصنيفات</FooterTitle>
          <ul className="space-y-4 ps-2">
            {categories.slice(0, FOOTER_CATEGORIES).map((category) => (
              <li key={category.name}>
                <Link to={`/blog?category=${encodeURIComponent(category.name)}`} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterTitle>ابق على اطلاع</FooterTitle>
          <p className="mb-6 text-lg text-zinc-500">اشترك للحصول على أحدث المقالات والتحديثات.</p>
          <NewsletterForm buttonText="اشترك" variant="footer" />
        </div>
      </div>

      <div className="border-t border-[#262626]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-base text-zinc-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} عدسة. صنع بكل <span className="text-orange-500">♥</span> جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="transition hover:text-orange-400">سياسة الخصوصية</Link>
            <Link to="/terms" className="transition hover:text-orange-400">شروط الخدمة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
