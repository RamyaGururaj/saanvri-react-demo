import { useState, useMemo } from "react";

const questions = [
  {
    id: 1,
    question: "On average, how many days are there between your periods?",
    options: [
      { text: "21–35 days", score: 2 },
      { text: "Less than 21 days", score: 1 },
      { text: "More than 35 days", score: 1 },
      { text: "Irregular", score: 0 },
    ],
  },
  {
    id: 2,
    question: "How many days does your bleeding usually last?",
    options: [
      { text: "3–7 days", score: 2 },
      { text: "Less than 3 days", score: 1 },
      { text: "More than 7 days", score: 1 },
    ],
  },
  {
    id: 3,
    question: "How often do you change your pad/tampon/cup during the heaviest flow?",
    options: [
      { text: "Every 3–5 hours", score: 2 },
      { text: "Every 1–2 hours", score: 1 },
      { text: "Rarely change it", score: 0 },
    ],
  },
  {
    id: 4,
    question: "What is the most common color of your period blood?",
    options: [
      { text: "Bright red", score: 2 },
      { text: "Dark brown/black", score: 1 },
      { text: "Pink", score: 1 },
      { text: "Grayish or foul-smelling", score: 0 },
    ],
  },
  {
    id: 5,
    question: "How bad are your menstrual cramps?",
    options: [
      { text: "Mild and manageable", score: 2 },
      { text: "Moderate with painkillers needed", score: 1 },
      { text: "Severe – miss school/work", score: 0 },
    ],
  },
  {
    id: 6,
    question: "Is your period predictable?",
    options: [
      { text: "Yes", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "No, very unpredictable", score: 0 },
    ],
  },
  {
    id: 7,
    question: "Do you notice unusual odor or discomfort during your cycle?",
    options: [
      { text: "No", score: 2 },
      { text: "Mild", score: 1 },
      { text: "Strong/foul smell or irritation", score: 0 },
    ],
  },
  {
    id: 8,
    question: "How is your mood before/during your period?",
    options: [
      { text: "Slightly irritable or tired", score: 2 },
      { text: "Frequent mood swings or sadness", score: 1 },
      { text: "Depression, anxiety, rage", score: 0 },
    ],
  },
];

const tips = {
  high: [
    "Maintain your healthy habits: balanced diet, hydration, and sleep.",
    "Continue tracking your cycles to spot any changes early.",
  ],
  mid: [
    "Try stress-reducing activities like yoga or meditation.",
    "Monitor your symptoms next cycle and consider speaking to a doctor if they persist.",
  ],
  low: [
    "Schedule a check-up with a gynecologist.",
    "Track your cycles regularly to help identify patterns.",
    "Consider blood tests to check hormone levels and thyroid health.",
  ],
};

const SCORE_THRESHOLDS = {
  high: 14,
  mid: 8,
};

const getMaxScore = () =>
  questions.reduce((acc, q) => acc + Math.max(...q.options.map((o) => o.score)), 0);

export default function PeriodHealthChecker() {
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  // Calculate the total score safely using the selected indices
  const totalScore = useMemo(() => {
    return Object.entries(answers).reduce((acc, [qId, optIdx]) => {
      const question = questions.find((q) => q.id === Number(qId));
      if (!question) return acc;
      const selectedOption = question.options[optIdx];
      return acc + (selectedOption ? selectedOption.score : 0);
    }, 0);
  }, [answers]);

  const maxScore = useMemo(getMaxScore, []);

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  const getResult = () => {
    if (totalScore >= SCORE_THRESHOLDS.high)
      return {
        status: "✅ Great! Your cycle shows signs of a healthy balance.",
        tips: tips.high,
      };
    if (totalScore >= SCORE_THRESHOLDS.mid)
      return { status: "⚠️ Mild issues to keep an eye on.", tips: tips.mid };
    return { status: "❗ Some symptoms may need medical attention.", tips: tips.low };
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
    setShowIncomplete(false);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      setShowIncomplete(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="period-checker-container">
      {!submitted ? (
        <>
          <h1 className="checker-title">Period Health Checker</h1>
          <div className="progress-bar" aria-label="Progress indicator">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemax={100}
              aria-label={`Progress: ${progress}%`}
            />
          </div>
          {questions.map((q) => (
            <fieldset key={q.id} className="question-card">
              <legend>{q.question}</legend>
              {q.options.map((opt, index) => (
                <label
                  key={index}
                  className={`option-label${answers[q.id] === index ? " selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    onChange={() => handleOptionSelect(q.id, index)}
                    checked={answers[q.id] === index}
                    aria-checked={answers[q.id] === index}
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </fieldset>
          ))}
          {showIncomplete && (
            <div className="validation-message">
              Please answer all questions before submitting ❤
            </div>
          )}
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit
          </button>
        </>
      ) : (
        <div className="result-card">
          <h2>Your Period Health Result</h2>
          <p className="score">
            Score: {totalScore} / {maxScore}
          </p>
          <p className="result-status">{getResult().status}</p>
          <div className="tips">
            <h3>Tips for You:</h3>
            <ul>
              {getResult().tips.map((tip, index) => (
                <li key={index}>💖 {tip}</li>
              ))}
            </ul>
          </div>
          <h3 className="summary-header">Summary of your answers:</h3>
          <ul className="answers-summary">
            {questions.map((q) => {
              const selectedIndex = answers[q.id];
              const selectedOption = q.options[selectedIndex];
              return (
                <li key={q.id}>
                  <span className="question-text">{q.question}</span>
                  <span className="answer-text">
                    {selectedOption ? selectedOption.text : "—"}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            className="retake-button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setShowIncomplete(false);
            }}
          >
            Retake Test
          </button>
        </div>
      )}
    </main>
  );
}
