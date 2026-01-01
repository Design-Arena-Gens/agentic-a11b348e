"use client";

import { useMemo, useState } from "react";
import { IdeaCard } from "../components/idea-card";
import {
  ideaCategories,
  climateOptions,
  capitalOptions,
  supportIdeas
} from "../data/ideas";

export default function Home() {
  const [search, setSearch] = useState("");
  const [climate, setClimate] = useState("সব");
  const [capital, setCapital] = useState("সব");

  const filteredIdeas = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ideaCategories.filter((idea) => {
      const matchesSearch =
        term.length === 0 ||
        idea.name.toLowerCase().includes(term) ||
        idea.description.toLowerCase().includes(term);
      const matchesClimate =
        climate === "সব" || idea.climate.includes(climate);
      const matchesCapital = capital === "সব" || idea.capital === capital;
      return matchesSearch && matchesClimate && matchesCapital;
    });
  }, [search, climate, capital]);

  const spotlight = useMemo(() => {
    const list =
      climate === "সব" && capital === "সব" && search.trim().length === 0
        ? ideaCategories
        : filteredIdeas;
    if (list.length === 0) {
      return null;
    }
    return list[Math.floor(Math.random() * list.length)];
  }, [filteredIdeas, climate, capital, search]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">বাংলাদেশি খামার উদ্যোক্তাদের জন্য</p>
          <h1>খামারে বিনিয়োগের সেরা আইডিয়া খুঁজে নিন</h1>
          <p className="lead">
            আবহাওয়া, মূলধন ও বাজার অনুযায়ী সাজানো কৃষি ও পশুপালনের সুযোগ তালিকা, সাথে ব্যবস্থাপনা কৌশল।
          </p>
        </div>
        <div className="hero-card">
          <h2>স্পটলাইট পরিকল্পনা</h2>
          {spotlight ? (
            <>
              <h3>{spotlight.name}</h3>
              <p>{spotlight.description}</p>
              <ul className="hero-card__tags">
                <li>{spotlight.capital} মূলধন</li>
                <li>আবহাওয়া: {spotlight.climate.join(", ")}</li>
              </ul>
            </>
          ) : (
            <p>আপনার ফিল্টার অনুসারে কোনো আইডিয়া পাওয়া যায়নি।</p>
          )}
        </div>
      </section>

      <section className="filters">
        <div className="filter-field">
          <label htmlFor="search">আইডিয়া খুঁজুন</label>
          <input
            id="search"
            type="search"
            placeholder="যেমন: মাছ, ছাগল, জৈব..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="climate">আবহাওয়া</label>
          <select
            id="climate"
            value={climate}
            onChange={(event) => setClimate(event.target.value)}
          >
            <option value="সব">সব</option>
            {climateOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="capital">মূলধন</label>
          <select
            id="capital"
            value={capital}
            onChange={(event) => setCapital(event.target.value)}
          >
            <option value="সব">সব</option>
            {capitalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="results">
        <header className="results__header">
          <h2>প্রস্তাবিত খামার আইডিয়া</h2>
          <span>{filteredIdeas.length} টি সুযোগ</span>
        </header>
        <div className="idea-grid">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
        {filteredIdeas.length === 0 && (
          <p className="empty-state">
            আপনার নির্বাচিত মানদণ্ডে কোন প্রস্তাব নেই। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
        )}
      </section>

      <section className="support">
        <h2>সহায়ক কৌশল</h2>
        <div className="support-grid">
          {supportIdeas.map((cluster) => (
            <div key={cluster.title} className="support-card">
              <h3>{cluster.title}</h3>
              <ul>
                {cluster.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>
          এই রিসোর্সটি আপনাকে খামার আইডিয়া বেছে নেওয়ার প্রাথমিক কাঠামো দিচ্ছে। বিস্তারিত ব্যবসা পরিকল্পনা তৈরিতে স্থানীয় কৃষি সম্প্রসারণ অফিস বা বিশেষজ্ঞের সাথে যোগাযোগ করুন।
        </p>
      </footer>
    </main>
  );
}
