import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import styled from "styled-components";

const LeftContainer = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 50%;
  height: 100%;
  opacity: 0;
  &:hover {
    opacity: 1;
    background: linear-gradient(
      90deg,
      rgba(4, 142, 201, 0.5) 20%,
      rgba(0, 212, 255, 0) 100%
    );
  }
`;

const RightContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 0%;
  width: 50%;
  height: 100%;
  opacity: 0;
  &:hover {
    opacity: 1;
    background: linear-gradient(
      270deg,
      rgba(4, 142, 201, 0.5) 20%,
      rgba(0, 212, 255, 0) 100%
    );
  }
`;

const LeftIcon = styled(FiArrowLeftCircle)`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
`;

const RightIcon = styled(FiArrowRightCircle)`
  position: absolute;
  left: 95%;
  top: 50%;
  transform: translate(-100%, -50%);
  z-index: 1;
`;

const LeftArrow = ({ displayArrow, onClick }) => {
  if (!displayArrow) return null;
  return (
    <LeftContainer onClick={onClick}>
      <LeftIcon size="50%" />
    </LeftContainer>
  );
};

const RightArrow = ({ displayArrow, onClick }) => {
  if (!displayArrow) return null;
  return (
    <RightContainer onClick={onClick}>
      <RightIcon size="50%" />
    </RightContainer>
  );
};

export { LeftArrow, RightArrow };
