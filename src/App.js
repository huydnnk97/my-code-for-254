import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import BoardContainer from "./Components/Board/Board";
import ScoreContainer from "./Components/Score/Score";

Modal.setAppElement("#root");

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    zIndex: "10000",
  },
};

function App() {
  const [scores, setScores] = useState([0, 0]);
  const [player, setPlayer] = useState(0);
  const [gameState, setGameState] = useState("new");
  const [isOpenHUD, setOpenHUD] = useState(true);
  const [HUDLabel, setHUDLabel] = useState("Welcome!");

  useEffect(() => {
    if (gameState == "over") {
      if (scores[0] == scores[1]) {
        setHUDLabel("Tie!");
      } else if (scores[0] > scores[1]) {
        setHUDLabel("Player 1 win!");
      } else if (scores[0] < scores[1]) {
        setHUDLabel("Player 2 win!");
      }
      setOpenHUD(true);
    }
  }, [gameState]);

  return (
    <div className="App">
      <Modal isOpen={isOpenHUD} contentLabel={HUDLabel} style={modalStyle}>
        <h3>{HUDLabel}</h3>
        <button
          onClick={() => {
            setOpenHUD(false);
            setScores([0, 0]);
            setGameState("reset");
            setPlayer(0);
          }}
        >
          New Game!
        </button>
      </Modal>
      <BoardContainer
        ncol={5}
        npawn={5}
        {...{
          setScores,
          player,
          setPlayer,
          setGameState,
          isOpenHUD,
          gameState,
        }}
      />
      <ScoreContainer scores={scores} />
    </div>
  );
}

export default App;
