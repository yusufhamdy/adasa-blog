import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonBase = "flex h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-bold transition";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-12 flex flex-col items-center gap-3" aria-label="التنقل بين الصفحات">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="الصفحة السابقة"
          className={`${buttonBase} border-white/10 bg-zinc-900 text-white hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${buttonBase} ${
              page === currentPage
                ? "border-transparent bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-orange-500"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="الصفحة التالية"
          className={`${buttonBase} border-white/10 bg-zinc-900 text-white hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-zinc-500">
        صفحة {currentPage} من {totalPages}
      </p>
    </nav>
  );
}
