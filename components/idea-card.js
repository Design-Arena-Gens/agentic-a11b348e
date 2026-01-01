"use client";

export function IdeaCard({ idea }) {
  return (
    <article className="idea-card">
      <header className="idea-card__title">
        <h3>{idea.name}</h3>
        <span className="idea-card__badge">{idea.capital} মূলধন</span>
      </header>
      <p className="idea-card__description">{idea.description}</p>
      <div className="idea-card__meta">
        <span>অনুকূল আবহাওয়া: {idea.climate.join(", ")}</span>
      </div>
    </article>
  );
}
