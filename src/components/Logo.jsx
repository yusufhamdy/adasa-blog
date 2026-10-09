import { siteInfo } from "../services/posts.js";

const BRAND = "#ED9624";
const CENTER = { x: 24, y: 24.2 };

function point(radius, degrees) {
  const angle = (degrees * Math.PI) / 180;
  return [CENTER.x + radius * Math.cos(angle), CENTER.y + radius * Math.sin(angle)];
}

// Six curved aperture blades, each one rotated by 60 degrees
const blades = Array.from({ length: 6 }, (_, index) => {
  const start = -100 + index * 60;
  const [x1, y1] = point(5, start);
  const [x2, y2] = point(18.6, start + 62);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A17 17 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
});

export function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke={BRAND}>
        <circle cx="24" cy="24" r="22.5" strokeWidth="2.8" />
        <circle cx="24" cy="24" r="18.9" strokeWidth="1" />
        <g strokeWidth="1" strokeLinecap="round">
          {blades.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
      </g>
      <circle cx={CENTER.x} cy={CENTER.y} r="4.9" fill={BRAND} />
      <path d="M43.6 38C44.4 43.4 45.6 46.2 48 47.8C43 48.3 40 47.6 36.5 45.6Z" fill={BRAND} />
    </svg>
  );
}

export function HeaderLogo() {
  return (
    <div className="flex items-center gap-4 lg:gap-5">
      <LogoMark className="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
      <span className="leading-tight">
        <span className="block text-xl font-extrabold text-white sm:text-2xl">{siteInfo.name}</span>
        <span className="hidden text-sm font-medium text-orange-500 md:block">{siteInfo.tagline}</span>
      </span>
    </div>
  );
}

export function FooterLogo() {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-[3.3rem] w-[3.3rem] items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-3xl font-extrabold text-white shadow-lg shadow-orange-500/30">
        ع
      </span>
      <span className="text-3xl font-extrabold text-white">{siteInfo.name}</span>
    </div>
  );
}
