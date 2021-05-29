import { getKingPosition, getPawnPosition } from "./Position";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const circular = (index, len) => {
  const new_index = ((index % len) + len) % len;
  return new_index;
};

const moveItemsHelper = async (board, index, direction) => {
  const setOriginalItems = board[index][1];
  while (board[index][0].pawn.pop()) {
    const real_index = circular(index + direction, board.length);
    const [items, setItems] = board[real_index];
    let pos = null;
    if (real_index == 0) {
      let num_pawn = items.pawn.length + 1;
      if (!items.king && num_pawn >= 5) {
        items.king = { top: 100, left: 25 };
        num_pawn -= 5;
      }
      pos = getKingPosition(num_pawn, 25, 175, 40, 100);
    } else if (real_index == Math.floor(board.length / 2)) {
      let num_pawn = items.pawn.length + 1;
      if (!items.king && num_pawn >= 5) {
        items.king = { top: 100, left: 75 };
        num_pawn -= 5;
      }
      pos = getKingPosition(num_pawn, 25, 175, 0, 60);
    } else {
      pos = getPawnPosition(items.pawn.length + 1);
    }
    items.pawn = pos;
    setItems({ ...items });
    setOriginalItems({ ...board[index][0] });
    await sleep(250);
    direction += Math.sign(direction);
  }
  return circular(index + direction, board.length);
};

const moveItems = async (board, index, direction) => {
  const right_index = Math.floor(board.length / 2);
  for (;;) {
    const current_index = await moveItemsHelper(board, index, direction);
    if (current_index == 0 || current_index == right_index) {
      return 0;
    } else if (board[current_index][0].pawn.length != 0) {
      index = current_index;
    } else if (board[current_index][0].pawn.length == 0) {
      const next_index = circular(current_index + direction, board.length);
      if (next_index == 0 || next_index == right_index) {
        if (board[next_index][0].pawn.length < 3) {
          return 0;
        }
      }
      const [items, setItems] = board[next_index];
      if (items.pawn.length != 0) {
        const score = items.pawn.length + (items.king ? 5 : 0);
        items.pawn = [];
        items.king = undefined;
        setItems({ ...items });
        return score;
      } else {
        return 0;
      }
    }
  }
};

const gameOver = (board) => {
  return !(board[0][0].king || board[Math.floor(board.length / 2)][0].king);
};

export { moveItems, gameOver };
