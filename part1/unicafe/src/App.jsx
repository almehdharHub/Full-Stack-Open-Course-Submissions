import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = (good - bad) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100;

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total feedback: {totalFeedback}</p>
      <p>Average score: {totalFeedback === 0 ? 0 : averageScore.toFixed(2)}</p>
      <p>
        Positive feedback:{" "}
        {totalFeedback === 0 ? 0 : positivePercentage.toFixed(2)}%
      </p>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;
  console.log("average", average);
  console.log("good", good);
  console.log("all", all);
  console.log("positive", positive);
  console.log("neutral", neutral);
  console.log("bad", bad);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>

      {good + neutral + bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
