import React from "react";

const stories = [
  {
    title: "Sapna’s nursery employs 12 women",
    excerpt:
      "A village nursery grew from 300 to 8,000 saplings per season with donor support.",
    href: "#",
  },
  {
    title: "School micro‑forest blooms in 9 months",
    excerpt:
      "Students maintain a 600‑sapling mini‑forest, boosting shade and pollinators.",
    href: "#",
  },
  {
    title: "Revived stream after monsoon",
    excerpt:
      "Riparian planting and brushwood check‑dams helped stabilize banks this year.",
    href: "#",
  },
];

const Stories = () => (
  <section id="stories" style={styles.wrap} aria-labelledby="stories-title">
    <div style={styles.container}>
      <h2 id="stories-title" style={styles.h2}>Stories</h2>
      <div style={styles.grid}>
        {stories.map((s) => (
          <article key={s.title} style={styles.card}>
            <h3 style={styles.h3}>{s.title}</h3>
            <p style={styles.p}>{s.excerpt}</p>
            <a href={s.href} style={styles.link} aria-label={`Read story: ${s.title}`}>
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const styles = {
  wrap: { padding: "3rem 1rem", background: "#fff" },
  container: { maxWidth: 1080, margin: "0 auto" },
  h2: { color: "#154734", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "#fdfdfd",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: "1rem",
  },
  h3: { margin: "0 0 0.25rem" },
  p: { margin: "0 0 0.75rem" },
  link: { color: "#2e8b57", textDecoration: "none", fontWeight: 600 },
};

export default Stories;
