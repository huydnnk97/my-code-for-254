import styled from "styled-components";

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  transform: translate(-50%, -50%);
  width: ${({ size }) => size}%;
  height: ${({ size }) => size}%;
`;

export default Circle;
