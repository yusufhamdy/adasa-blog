import data from "../data/posts.json";

export const siteInfo = data.siteInfo;
export const categories = data.categories;
export const allPosts = data.posts;

export function getFeaturedPosts() {
  return allPosts.filter((post) => post.featured);
}

export function getLatestPosts(count = 3) {
  return allPosts
    .filter((post) => !post.featured)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function getPostBySlug(slug) {
  return allPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post, count = 3) {
  return allPosts.filter((item) => item.category === post.category && item.id !== post.id).slice(0, count);
}

export function searchPosts({ search = "", category = "" }) {
  const term = search.trim().toLowerCase();

  return allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (!term) return true;

    const text = [post.title, post.excerpt, post.content, post.category, ...post.tags].join(" ").toLowerCase();
    return text.includes(term);
  });
}

// Every author appears once, in the order of the posts
export function getTeam() {
  const authors = new Map();
  allPosts.forEach((post) => {
    if (!authors.has(post.author.name)) authors.set(post.author.name, post.author);
  });
  return [...authors.values()];
}
