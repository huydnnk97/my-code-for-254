import styled from "styled-components";
import CellContainer from "./Cell";
import Pawn from "../Items/Pawn";
import { LeftArrow, RightArrow } from "../Items/Arrow";

const Container = styled.div.attrs(({ ncol }) => ({
  width: (100 / (ncol + 2)) * ncol,
}))`
  width: ${({ width }) => width}%;
  order: 2;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: ${({ side }) => (side == "top" ? "row" : "row-reverse")};
`;

const CellBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-color: #ff7400;
  border-width: ${({ borderWidth }) => borderWidth}rem;
  border-${({ side }) => side}-width: ${({ borderWidth }) =>
  2 * borderWidth}rem;
`;

const Cell = ({
  ncol,
  cell,
  side,
  borderWidth,
  arrowOnClick,
  displayArrow,
}) => {
  const items = cell[0];
  return (
    <CellContainer {...{ ncol }}>
      <CellBorder {...{ side, borderWidth }}>
        <LeftArrow
          displayArrow={displayArrow && items.pawn.length != 0}
          onClick={async () => {
            await arrowOnClick(1);
          }}
        />
        <RightArrow
          displayArrow={displayArrow && items.pawn.length != 0}
          onClick={async () => {
            await arrowOnClick(-1);
          }}
        />
        {items.pawn.map(({ top, left }, j) => (
          <Pawn key={`pawn,${j}`} {...{ top, left }} size={15} />
        ))}
      </CellBorder>
    </CellContainer>
  );
};

const PawnContainer = ({ ncol, rows, borderWidth, moveGame, player }) => {
  return (
    <Container {...{ ncol }}>
      {rows.map((row, i) => {
        const side = i == 0 ? "top" : "bottom";
        const direction = i == 0 ? -1 : 1;
        const displayArrow = i == player;
        return (
          <Row key={`row,${i}`} side={side}>
            {row.map((cell, j) => {
              const index = i * (ncol + 1) + j + 1;
              const arrowOnClick = async (sign) => {
                await moveGame(index, sign * direction);
              };
              return (
                <Cell
                  key={`cell,${index}`}
                  {...{
                    ncol,
                    cell,
                    side,
                    borderWidth,
                    arrowOnClick,
                    displayArrow,
                  }}
                />
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default PawnContainer;
