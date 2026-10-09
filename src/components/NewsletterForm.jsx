import { useState } from "react";
import { Mail } from "lucide-react";

// There is no backend, so the form only shows a thank you message
export default function NewsletterForm({ buttonText, variant = "card" }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isFooter = variant === "footer";

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  }

  if (isSubscribed) {
    return <p className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-300">شكراً لاشتراكك! سنراسلك قريباً.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={isFooter ? "flex flex-col gap-4" : "flex flex-col gap-3 sm:flex-row"}>
      <div className="relative min-w-0 flex-1">
        {isFooter && <Mail className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />}
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="أدخل بريدك الإلكتروني"
          className={`w-full border text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none ${
            isFooter
              ? "h-16 rounded-2xl border-[#2f2f2f] bg-[#0f0f0f] ps-14 pe-5 text-lg focus:ring-4 focus:ring-orange-500/20"
              : "rounded-xl border-white/10 bg-zinc-900/60 px-5 py-3 text-sm"
          }`}
        />
      </div>
      <button
        type="submit"
        className={`bg-gradient-to-r from-orange-500 to-orange-600 font-bold text-white transition hover:brightness-110 ${
          isFooter ? "h-16 w-full rounded-full text-base" : "rounded-xl px-6 py-3 text-sm"
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}
