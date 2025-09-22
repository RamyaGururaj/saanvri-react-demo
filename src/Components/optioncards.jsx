import React from "react";
import { useNavigate } from "react-router-dom";

const cardsData = [
  { id: "dashboard", icon: "🏠", title: "Home", subtitle: "Dashboard & daily tips", path: "/home" },
  { id: "tracker", icon: "📅", title: "Cycle Tracker", subtitle: "Track your periods", path: "/tracker" },
  { id: "journal", icon: "💭", title: "Feel It Out", subtitle: "Your safe journal space", path: "/feelitout" },
  { id: "remedies", icon: "🌿", title: "Remedies", subtitle: "Natural period relief", path: "/remedies" },
  { id: "games", icon: "🎮", title: "Games", subtitle: "Mood boosting fun", path: "/games" },
  { id: "community", icon: "👭", title: "Community", subtitle: "Share experiences", path: "/community" },
  { id: "recipes", icon: "🍫", title: "Recipes", subtitle: "Craving-based treats", path: "/recipies" },
  { id: "health-checker", icon: "🩺", title: "Health Checker", subtitle: "Track your health", path: "/healthchecker" }
];

const createFloatingHearts = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "💜";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 100);
  }
};

const OptionCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    createFloatingHearts();
    navigate(path);
  };

  return (
    <div className="nav">
      {cardsData.map(({ id, icon, title, subtitle, path }) => (
        <div
          key={id}
          className="nav-card"
          onClick={() => handleCardClick(path)}
          role="button"
          tabIndex={0}
        >
          <span className="nav-icon">{icon}</span>
          <div className="nav-title">{title}</div>
          <div className="nav-subtitle">{subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default OptionCards;
