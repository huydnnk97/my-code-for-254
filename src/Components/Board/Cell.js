import styled from "styled-components";

const CellContainer = styled.div.attrs(({ ncol, width }) => ({
  width: width || 100 / ncol,
}))`
  padding-bottom: ${({ width }) => width}%;
  width: ${({ width }) => width}%;
  position: relative;
`;

export default CellContainer;
