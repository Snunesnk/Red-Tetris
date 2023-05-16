import React, { useState, useEffect } from "react";
import {
  scoreDetails,
  scoreList,
  scoreListItem,
  scoreListTitle,
  scoreRank,
  scoreRankContainer,
  scoreUsername,
  scoreValue,
} from "./styles";

const ScoreList = () => {
  const [scores, setScores] = useState([]);

  // Fetch the top 10 scores from the API endpoint
  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch("http://localhost:3042/getTopTenScores", options)
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error("Error fetching scores:", error));
  }, []);

  return (
    <div style={scoreList}>
      <h2 style={scoreListTitle}>Leaderboard</h2>
      <div>
        {scores.map((score, index) => {
          // Change colors for podium
          const scoreRankContainerUpdated = { ...scoreRankContainer };
          const scoreDetailsUpdated = { ...scoreDetails };

          switch (index) {
            case 0:
              scoreRankContainerUpdated.backgroundColor = "#FFD700";
              scoreRankContainerUpdated.color = "black";
              scoreDetailsUpdated.backgroundColor = "#FFD700";
              scoreDetailsUpdated.color = "black";
              break;
            case 1:
              scoreRankContainerUpdated.backgroundColor = "#C0C0C0";
              scoreDetailsUpdated.backgroundColor = "#C0C0C0";
              break;
            case 2:
              scoreRankContainerUpdated.backgroundColor = "#CD7F32";
              scoreDetailsUpdated.backgroundColor = "#CD7F32";
              break;
            default:
              break;
          }

          return (
            <div key={score._id} style={scoreListItem}>
              <div style={scoreRankContainerUpdated}>
                <span style={scoreRank}>{index + 1}</span>
              </div>
              <div style={scoreDetailsUpdated}>
                <div style={scoreUsername}>{score.username}</div>
                <div style={scoreValue}>{score.user_score}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreList;
