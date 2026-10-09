import { createHashRouter } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import PostDetails, { postLoader } from "./pages/PostDetails.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import NotFound from "./pages/NotFound.jsx";

// HashRouter keeps every route working on GitHub Pages, even after a refresh
export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <PostDetails />, loader: postLoader, errorElement: <NotFound /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
