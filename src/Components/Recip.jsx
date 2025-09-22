import React, { useState } from "react";

const recipesData = {
  sweet: [
    {
      title: "🍮 Kesar Phirni",
      ingredients: "Rice, milk, sugar, saffron, cardamom, pistachios",
      benefits: "A creamy, saffron-infused dessert rich in calcium and flavor.",
      steps: [
        "Soak 2 tbsp rice for 15 minutes, then grind coarsely.",
        "Boil 2 cups milk; add rice, cook on low until thick.",
        "Add sugar, a pinch of saffron, and cardamom powder.",
        "Stir till creamy. Top with pistachios and serve chilled."
      ],
    },
    {
      title: "🍛 Churma Ladoo",
      ingredients: "Wheat flour, jaggery, ghee, cardamom, nuts",
      benefits: "Traditional Rajasthani energy balls loaded with fiber.",
      steps: [
        "Roast 1 cup wheat flour in ghee until golden.",
        "Add powdered jaggery, cardamom, and chopped nuts.",
        "Shape dough into small ladoos and serve."
      ],
    },
    {
      title: "🧁 Coconut Barfi",
      ingredients: "Desiccated coconut, condensed milk, sugar, cardamom",
      benefits: "Quick treat with the goodness of coconut.",
      steps: [
        "Mix 2 cups coconut and 1 cup condensed milk in a pan.",
        "Add sugar and a pinch of cardamom.",
        "Cook on low till mixture leaves the sides of the pan.",
        "Spread in a tray, cool, slice, and serve."
      ],
    },
    {
      title: "🍠 Shakarkandi Halwa",
      ingredients: "Sweet potato, ghee, milk, cardamom, sugar",
      benefits: "Vitamin-rich halwa that's easy to digest.",
      steps: [
        "Boil and mash 2 medium sweet potatoes.",
        "Sauté mashed sweet potatoes in 1 tbsp ghee.",
        "Add 1/2 cup milk, 2 tbsp sugar, and cardamom powder.",
        "Cook for 5 minutes stirring constantly. Serve warm."
      ],
    },
    {
      title: "🍌 Elaichi Banana Sheera",
      ingredients: "Semolina, banana, ghee, sugar, cardamom",
      benefits: "A nourishing Maharashtrian sweet for instant energy.",
      steps: [
        "Roast 1/2 cup semolina in 1 tbsp ghee till fragrant.",
        "Add 1 mashed banana, 2 tbsp sugar, a dash of cardamom, and 1 cup water.",
        "Cook stirring till thickened. Serve hot."
      ],
    },
  ],
  salty: [
    {
      title: "🍘 Masala Murmura",
      ingredients: "Puffed rice, peanuts, curry leaves, spices",
      benefits: "Light, crunchy snack with protein and fiber.",
      steps: [
        "Heat 1 tsp oil; add curry leaves, peanuts, and spices (turmeric, chili powder).",
        "Add 2 cups puffed rice; stir well for 2 minutes.",
        "Serve immediately."
      ],
    },
    {
      title: "🥟 Baked Samosa Bites",
      ingredients: "Whole wheat flour, potatoes, peas, spices",
      benefits: "Baked variant for a guilt-free, classic snack.",
      steps: [
        "Mix boiled mashed potatoes, peas, and spices.",
        "Fill into small whole wheat dough circles; fold and seal.",
        "Bake at 180°C until golden and crisp."
      ],
    },
    {
      title: "🍢 Paneer Tikka Skewers",
      ingredients: "Paneer, yogurt, spices, bell peppers",
      benefits: "High-protein, savory snack with grilled veggies.",
      steps: [
        "Marinate paneer cubes and bell peppers in spiced yogurt for 15 minutes.",
        "Skewer and grill or roast until golden."
      ],
    },
    {
      title: "🥚 Egg Bhurji Toast",
      ingredients: "Eggs, onion, tomato, green chili, bread",
      benefits: "Quick, spicy, protein-rich breakfast or snack.",
      steps: [
        "Sauté chopped onion, tomato, and chili.",
        "Add 2 beaten eggs and scramble until cooked.",
        "Serve hot on toasted bread."
      ],
    },
    {
      title: "🍠 Masala Roasted Makhana",
      ingredients: "Fox nuts (makhana), olive oil, turmeric, chili powder",
      benefits: "Calcium-rich, light, and crunchy snack.",
      steps: [
        "Roast 2 cups makhana in 1 tsp olive oil until crisp.",
        "Toss with turmeric, salt, and chili powder.",
        "Serve as a healthy snack."
      ],
    },
  ],
  healthy: [
    {
      title: "🥗 Sprout Chaat",
      ingredients: "Moong sprouts, tomatoes, cucumber, lemon, spices",
      benefits: "Packed with protein, fiber, and vitamins.",
      steps: [
        "Mix 1 cup boiled sprouts with chopped tomatoes and cucumber.",
        "Add chaat masala, lemon juice, and coriander leaves.",
        "Toss well and serve fresh."
      ],
    },
    {
      title: "🌽 Corn & Pomegranate Salad",
      ingredients: "Boiled corn, pomegranate, coriander, lemon juice",
      benefits: "Antioxidant-rich and refreshing.",
      steps: [
        "Mix 1 cup boiled corn with 1/2 cup pomegranate seeds.",
        "Add chopped coriander and a squeeze of lemon juice.",
        "Serve chilled."
      ],
    },
    {
      title: "🥒 Curd & Cucumber Raita",
      ingredients: "Yogurt, cucumber, cumin, mint",
      benefits: "Promotes gut health and cooling.",
      steps: [
        "Whisk 1 cup yogurt smooth.",
        "Add grated cucumber, roasted cumin powder, and chopped mint.",
        "Mix and chill before serving."
      ],
    },
    {
      title: "🍠 Sweet Potato Chaat",
      ingredients: "Boiled sweet potato, chaat masala, lemon, coriander",
      benefits: "Iron-rich and anti-inflammatory.",
      steps: [
        "Dice boiled sweet potatoes.",
        "Toss with chaat masala, lemon juice, and chopped coriander.",
        "Serve immediately."
      ],
    },
    {
      title: "🍅 Tomato Cucumber Kosambari",
      ingredients: "Cucumber, tomatoes, moong dal, coconut",
      benefits: "Light, protein-rich, and cooling South Indian salad.",
      steps: [
        "Soak 2 tbsp moong dal for 30 minutes.",
        "Mix chopped cucumber, tomato, grated coconut, and soaked dal.",
        "Season with lemon juice and salt, then serve."
      ],
    },
  ],
  comfort: [
    {
      title: "🍲 Khichdi",
      ingredients: "Rice, moong dal, turmeric, ghee, cumin",
      benefits: "Easily digestible, nourishing comfort food.",
      steps: [
        "Rinse 1/2 cup rice and 1/2 cup moong dal thoroughly.",
        "Sauté cumin seeds in 1 tsp ghee.",
        "Add rice, dal, turmeric, salt, and 3 cups water.",
        "Cook until soft and porridge-like."
      ],
    },
    {
      title: "🥔 Aloo Paratha",
      ingredients: "Whole wheat flour, potato, spices, ghee",
      benefits: "Hearty, wholesome North Indian comfort food.",
      steps: [
        "Mix whole wheat flour and water into a soft dough.",
        "Prepare spiced mashed potato filling.",
        "Roll dough, fill with potato mix, fold, and cook on tava with ghee."
      ],
    },
    {
      title: "🍛 Moong Dal Cheela",
      ingredients: "Moong dal, ginger, green chili, coriander",
      benefits: "Protein-rich savory pancakes.",
      steps: [
        "Soak moong dal for 2-3 hours and blend to a smooth batter.",
        "Add grated ginger, chopped chili, and coriander.",
        "Cook ladlefuls on a non-stick pan until golden on both sides."
      ],
    },
    {
      title: "🥘 Palak Paneer",
      ingredients: "Spinach, paneer, tomato, spices",
      benefits: "Iron and calcium rich creamy curry.",
      steps: [
        "Blanch spinach and blend with sautéed onions and tomatoes.",
        "Cook the spinach puree with spices, add paneer cubes.",
        "Simmer for 5 minutes and serve."
      ],
    },
    {
      title: "🥣 Daliya Upma",
      ingredients: "Broken wheat (daliya), veggies, mustard seeds, curry leaves",
      benefits: "Fiber-rich and filling comfort breakfast.",
      steps: [
        "Roast 1 cup broken wheat until fragrant.",
        "Sauté mustard seeds, curry leaves, and chopped vegetables.",
        "Add daliya, 2 cups water, and salt; cook till water is absorbed."
      ],
    },
  ],
};

const icons = {
  sweet: "🍫",
  salty: "🥨",
  healthy: "🥗",
  comfort: "🍲",
};

const Recip = () => {
  const [selectedCategory, setSelectedCategory] = useState("sweet");

  return (
    <div className="track-container">
    <div id="recipes" className="section">
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#7b1fa2" }}>
        🍫 Craving-Based Recipes
      </h2>

      <div className="card">
        <h3>What are you craving today? 🤔</h3>
        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {Object.keys(recipesData).map((category) => (
            <div
              key={category}
              className="recipe-btn"
              onClick={() => setSelectedCategory(category)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedCategory(category);
                }
              }}
              style={{ cursor: "pointer", userSelect: "none" }}
              aria-pressed={selectedCategory === category}
            >
              <span style={{ fontSize: "1.5em" }}>{icons[category]}</span>
              <span style={{ marginLeft: 5, textTransform: "capitalize" }}>
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div id="recipeResults">
        <div className="dashboard-grid">
          {recipesData[selectedCategory].length > 0 ? (
            recipesData[selectedCategory].map(
              ({ title, ingredients, benefits, steps }, i) => (
                <div className="card" key={i}>
                  <h3>{title}</h3>
                  <p>
                    <strong>Ingredients:</strong> {ingredients}
                  </p>
                  <p>
                    <strong>Benefits:</strong> {benefits}
                  </p>
                  <div>
                    <strong>Steps:</strong>
                    <ol>
                      {steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )
            )
          ) : (
            <p>No recipes available for this category.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Recip;
