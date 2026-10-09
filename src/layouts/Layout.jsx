import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Keyed by path only, so typing in the blog search does not scroll the page */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </div>
  );
}
