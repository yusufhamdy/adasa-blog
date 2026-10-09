import { Link } from "react-router-dom";

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400">
      {children}
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
    </span>
  );
}

export default function SectionHeader({ badge, title, subtitle, action }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Badge>{badge}</Badge>
        <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
      </div>
      {action && (
        <Link
          to={action.to}
          className={
            action.outline
              ? "inline-flex w-fit items-center gap-2 rounded-xl border border-orange-500/60 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/10"
              : "inline-flex w-fit items-center gap-2 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
          }
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  );
}
