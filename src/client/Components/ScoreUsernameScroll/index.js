import React, { useState, useEffect } from "react";
import {
  scoreDetails,
  scoreListItem,
  scoreRank,
  scoreRankContainer,
  scoreUsername,
  scoreValue,
} from "../Scores/styles";
import "./styles.css";

const checkIfUsernameTooBig = (scoreDetailsWidth, scoreUsernameWidth) =>
  scoreUsernameWidth > scoreDetailsWidth;

const ScoreUsernameScroll = ({ score, index }) => {
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
  }, [score]);

  const usernameTooBig = checkIfUsernameTooBig(
    scoreDetailsWidth,
    scoreUsernameWidth
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
                <div ref={scoreUsernameRef}>{score.username}</div>
                {usernameTooBig && (
                  <div>
                    &nbsp; &nbsp; &nbsp;
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
};

export default ScoreUsernameScroll;
