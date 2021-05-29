const getPawnPosition = (
  npos,
  top_min = 0,
  top_max = 100,
  left_min = 0,
  left_max = 100
) => {
  const ncol = Math.ceil(Math.sqrt(npos));
  const top_lim = top_max - top_min;
  const left_lim = left_max - left_min;
  let pos = new Array(npos);
  for (let i = 0; i < ncol; ++i) {
    for (let j = 0; j < ncol; ++j) {
      if (i * ncol + j >= npos) break;
      const top = (top_lim / (2 * ncol)) * (2 * i + 1) + top_min;
      const left = (left_lim / (2 * ncol)) * (2 * j + 1) + left_min;
      pos[i * ncol + j] = { top, left };
    }
  }
  return pos;
};

const getKingPosition = (
  npos,
  top_min = 0,
  top_max = 100,
  left_min = 0,
  left_max = 100,
  ncol = 2
) => {
  const nrow = Math.ceil(npos / ncol);
  const top_lim = top_max - top_min;
  const left_lim = left_max - left_min;
  let pos = new Array(npos);
  for (let i = 0; i < nrow; ++i) {
    for (let j = 0; j < ncol; ++j) {
      const top = (top_lim / (2 * nrow)) * (2 * i + 1) + top_min;
      const left = (left_lim / (2 * ncol)) * (2 * j + 1) + left_min;
      if (i * ncol + j >= npos) break;
      pos[i * ncol + j] = { top, left };
    }
  }
  return pos;
};

export { getPawnPosition, getKingPosition };
