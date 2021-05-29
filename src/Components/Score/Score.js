import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: auto;
  width: 90%;
`;

const Player = styled.div`
  width: 50%;
`;

const ScoreContainer = (props) => {
  return (
    <Container>
      {[0, 1].map((player) => (
        <Player key={`player,${player}`}>
          <h2>Player {player + 1}</h2>
          <h3>{props.scores[player]}</h3>
        </Player>
      ))}
    </Container>
  );
};

export default ScoreContainer;
