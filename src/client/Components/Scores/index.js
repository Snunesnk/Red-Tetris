import React, { useState, useEffect } from "react";
import { scoreList, scoreListTitle } from "./styles";
import ScoreUsernameScroll from "../ScoreUsernameScroll";

const ScoreList = () => {
  const [scores, setScores] = useState([]);

  // Fetch the top 10 scores from the API endpoint
  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(`/getTopTenScores`, options)
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error("Error fetching scores:", error));
  }, []);

  return (
    <div style={scoreList}>
      <h2 style={scoreListTitle}>Leaderboard</h2>
      <div>
        {scores.map((score, index) => (
          <ScoreUsernameScroll score={score} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ScoreList;
