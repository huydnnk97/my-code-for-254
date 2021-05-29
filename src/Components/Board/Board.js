import { useEffect, useState } from "react";
import styled from "styled-components";
import PawnContainer from "./Pawn";
import KingContainer from "./King";
import { getPawnPosition } from "../Utils/Position";
import { gameOver, moveItems } from "../Utils/Game";

const Container = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const borderWidth = 0.1;

const BoardContainer = ({
  ncol,
  npawn,
  setScores,
  player,
  setPlayer,
  setGameState,
  isOpenHUD,
  gameState,
}) => {
  let board = new Array(2 * ncol + 2);
  board[0] = useState({ pawn: [], king: { top: 100, left: 25 } });
  board[ncol + 1] = useState({ pawn: [], king: { top: 100, left: 75 } });
  for (let i = 1; i < ncol + 1; ++i) {
    board[i] = useState({ pawn: getPawnPosition(npawn), king: 0 });
  }
  for (let i = ncol + 2; i < board.length; ++i) {
    board[i] = useState({ pawn: getPawnPosition(npawn), king: 0 });
  }

  useEffect(() => {
    if (gameState == "reset") {
      board[0][1]({ pawn: [], king: { top: 100, left: 25 } });
      board[ncol + 1][1]({ pawn: [], king: { top: 100, left: 75 } });
      for (let i = 1; i < ncol + 1; ++i) {
        board[i][1]({ pawn: getPawnPosition(npawn), king: 0 });
      }
      for (let i = ncol + 2; i < board.length; ++i) {
        board[i][1]({ pawn: getPawnPosition(npawn), king: 0 });
      }
    }
  }, [gameState]);

  return (
    <Container>
      <KingContainer {...{ ncol, side: "left", cell: board[0], borderWidth }} />
      <PawnContainer
        {...{
          ncol,
          rows: [board.slice(1, ncol + 1), board.slice(ncol + 2, 2 * ncol + 2)],
          borderWidth,
          isOpenHUD,
          player,
          moveGame: async (index, direction) => {
            const score = await moveItems(board, index, direction);
            setScores((curr) => {
              let curr_score = curr[player] + score;
              let need_fill = true;
              for (let j = 0; j < ncol; ++j) {
                const items = board[player * (ncol + 1) + j + 1][0];
                if (items.pawn.length > 0) {
                  need_fill = false;
                  break;
                }
              }
              if (need_fill) {
                for (let j = 0; j < ncol; ++j) {
                  const [items, setItems] = board[player * (ncol + 1) + j + 1];
                  items.pawn = getPawnPosition(1);
                  setItems({ ...items });
                  curr_score--;
                  if (curr_score < 0) {
                    setGameState("over");
                    break;
                  }
                }
              }
              curr[player] = curr_score;
              return Array.from(curr);
            });
            setPlayer(1 - player);
            if (gameOver(board)) setGameState("over");
          },
        }}
      />
      <KingContainer
        {...{ ncol, side: "right", cell: board[ncol + 1], borderWidth }}
      />
    </Container>
  );
};

export default BoardContainer;
