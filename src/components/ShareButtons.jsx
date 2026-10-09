import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import SocialIcon from "./SocialIcons.jsx";

const buttonClass =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/80 text-zinc-300 transition hover:border-orange-500 hover:text-orange-400";

export default function ShareButtons({ title }) {
  const [isCopied, setIsCopied] = useState(false);

  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title);
  const shareLinks = [
    { name: "twitter", label: "X", href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { name: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${text}%20${url}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((item) => (
        <a key={item.name} href={item.href} target="_blank" rel="noreferrer" aria-label={`مشاركة على ${item.label}`} className={buttonClass}>
          <SocialIcon name={item.name} className="h-4 w-4" />
        </a>
      ))}
      <button type="button" onClick={copyLink} aria-label="نسخ الرابط" className={buttonClass}>
        {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
