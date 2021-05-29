import styled from "styled-components";
import CellContainer from "./Cell";
import King from "../Items/King";
import Pawn from "../Items/Pawn";

const Container = styled.div.attrs(({ ncol, side }) => ({
  width: 100 / (ncol + 2),
  order: side == "left" ? 1 : 3,
}))`
  width: ${({ width }) => width}%;
  order: ${({ order }) => order};
  display: flex;
  flex-direction: column;
`;

const Border = styled.div.attrs(({ ver, hor }) => ({
  borderTop: ver == "top" ? "bottom" : "top",
  borderLeft: hor == "left" ? "right" : "left",
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  border-${({ ver }) => ver}-${({ hor }) => hor}-radius: 100%;
  border-style: solid;
  border-color: #ff7400;
  border-width: ${({ borderWidth }) => 2 * borderWidth}rem;
  border-${({ borderTop }) => borderTop}-style: none;
  border-${({ borderLeft }) => borderLeft}-width: ${({ borderWidth }) =>
  borderWidth}rem;
`;

const KingContainer = ({ ncol, side, cell, borderWidth }) => {
  const items = cell[0];
  return (
    <Container {...{ ncol, side }}>
      <CellContainer width={100}>
        <Border ver="top" hor={side} borderWidth={borderWidth}>
          {(items.king && <King {...items.king} size={25} />) || undefined}
          {items.pawn.map(({ top, left }, i) => (
            <Pawn key={`pawn,${side},${i}`} {...{ top, left }} size={15} />
          ))}
        </Border>
      </CellContainer>
      <CellContainer width={100}>
        <Border ver="bottom" hor={side} borderWidth={borderWidth}></Border>
      </CellContainer>
    </Container>
  );
};

export default KingContainer;
