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
  getUsernameStyle,
} from "./styles";
import "./styles.css";

const checkIfUsernameTooBig = (scoreDetailsWidth, scoreUsernameWidth) =>
  scoreUsernameWidth > scoreDetailsWidth;

const ScoreList = () => {
  const [scores, setScores] = useState([
    {
      _id: "64636a10b01541807c273dca",
      username: "dhdsgjhgjhgdshew",
      user_score: 9145,
    },
    { _id: "64636a97b01541807c273dcf", username: "fd", user_score: 270 },
    { _id: "64636a7ab01541807c273dcb", username: "fd", user_score: 260 },
    { _id: "64636a89b01541807c273dcd", username: "fd", user_score: 252 },
    { _id: "64636ab1b01541807c273dd3", username: "fd", user_score: 250 },
    { _id: "64636aaab01541807c273dd2", username: "fd", user_score: 246 },
    { _id: "6463672a777f5d10bf938239", username: "df", user_score: 246 },
    { _id: "64636aa4b01541807c273dd1", username: "fd", user_score: 240 },
    { _id: "64636a9db01541807c273dd0", username: "fd", user_score: 238 },
    { _id: "64636a81b01541807c273dcc", username: "fd", user_score: 216 },
  ]);

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
        {scores.map((score, index) => {
          // Change colors for podium
          const scoreRankContainerUpdated = { ...scoreRankContainer };
          const scoreDetailsUpdated = { ...scoreDetails };
          const scoreDetailsRef = React.useRef(null);
          const scoreUsernameRef = React.useRef(null);
          const [scoreDetailsWidth, setScoreDetailsWidth] = useState(0);
          const [scoreUsernameWidth, setScoreUsernameWidth] = useState(0);

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

          useEffect(() => {
            setScoreDetailsWidth(scoreDetailsRef.current.offsetWidth);
            setScoreUsernameWidth(scoreUsernameRef.current.offsetWidth);
          }, []);

          const usernameTooBig = checkIfUsernameTooBig(
            scoreDetailsWidth,
            scoreUsernameWidth
          );

          console.log(
            "username " + score.username + " too big ?",
            usernameTooBig
          );

          const animationPlayState = usernameTooBig ? "running" : "paused";

          return (
            <div key={score._id} style={scoreListItem}>
              <div style={scoreRankContainerUpdated}>
                <span style={scoreRank}>{index + 1}</span>
              </div>
              <div style={scoreDetailsUpdated} ref={scoreDetailsRef}>
                <div style={scoreUsername}>
                  <div className="m-scroll">
                    <div className="m-scroll__title">
                      <div style={{ animationPlayState: animationPlayState }}>
                        <div ref={scoreUsernameRef}>
                          {score.username}
                          &nbsp; &nbsp; &nbsp;
                        </div>
                        {usernameTooBig && (
                          <div>
                            {score.username}
                            &nbsp; &nbsp; &nbsp;
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
