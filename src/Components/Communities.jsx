import React, { useState } from "react";

const Communities = () => {
  // State for new post input
  const [newPostText, setNewPostText] = useState("");
  // State for list of posts, prefilled with example posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Anonymous Sister 💕",
      time: "2 hours ago",
      content:
        "Hot water bottles are a GAME CHANGER! I also drink raspberry leaf tea and it helps so much with cramps 🍵",
      likes: 12,
    },
    {
      id: 2,
      author: "Wellness Warrior 🌸",
      time: "5 hours ago",
      content:
        "Yoga saved my life during periods! Child's pose and cat-cow stretches are amazing for lower back pain 🧘‍♀️",
      likes: 8,
    },
    {
      id: 3,
      author: "Chocolate Queen 🍫",
      time: "1 day ago",
      content:
        "Dark chocolate and magnesium supplements help with my mood swings. Also, being kind to myself is KEY! 💜",
      likes: 15,
    },
  ]);

  // Handler to add a new post anonymously
  const shareExperience = () => {
    const text = newPostText.trim();
    if (!text) {
      alert("Please enter some text to share.");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: "Anonymous Sister 💕",
      time: "just now",
      content: text,
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  // Handler to like a post
  const likePost = (postId) => {
    setPosts((postsPrev) =>
      postsPrev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div id="community" className="section">
      <h2 style={{ textAlign: "center", marginTop:"30px", marginBottom: "20px", color: "#7b1fa2" }}>
        👭 Women's Experience Wall
      </h2>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 id="share-heading">Share Your Experience 💕</h3>
        <div className="form-group">
          <textarea
            rows="4"
            placeholder="Share what worked for you during your period... 🌸"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "1em", color: "#666" }}
          />
        </div>
        <button
          className="btn"
          onClick={shareExperience}
          style={{
            marginTop: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#7b1fa2",
            color: "white",
            fontWeight: "600",
          }}
        >
          Share Anonymously 💖
        </button>
      </div>

      <div id="communityPosts">
        {posts.map(({ id, author, time, content, likes }) => (
          <div
            key={id}
            className="post"
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginBottom: "16px",
              marginLeft: "60px",
              marginRight: "60px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="post-header"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}
            >
              <span className="post-author" style={{ fontWeight: "600" }}>
                {author}
              </span>
              <span className="post-time" style={{ color: "#666", fontSize: "0.85em" }}>
                {time}
              </span>
            </div>
            <p style={{ marginBottom: "10px" }}>{content}</p>
            <button
              className="like-btn"
              onClick={() => likePost(id)}
              style={{
                cursor: "pointer",
                border: "none",
                background: "none",
                fontSize: "1.1em",
                color: "#7b1fa2",
              }}
              aria-label={`Like post by ${author}`}
            >
              💜 {likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
