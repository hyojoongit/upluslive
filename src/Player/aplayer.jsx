import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 532px;
  height: 930px;
  background-color: white;
  border: 1px solid gray;
  box-shadow: 2px 2px 3px gray;
  position: absolute;
  transition: all 0.5s ease-in-out;
`;

const Card1 = styled(Card)`
  z-index: ${(props) => (props.focused ? 3 : 1)};
  left: ${(props) => (props.focused ? 0 : -100)}px;
`;

const Card2 = styled(Card)`
  z-index: ${(props) => (props.focused ? 2 : 0)};
  left: ${(props) => (props.focused ? 572 : 0)}px;
`;

const Card3 = styled(Card)`
  z-index: ${(props) => (props.focused ? 1 : 0)};
  left: ${(props) => (props.focused ? 1144 : 572)}px;
`;

const App = () => {
  const [focusedCard, setFocusedCard] = useState(1);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 && focusedCard !== 3) {
      setFocusedCard(focusedCard + 1);
    }
    if (e.keyCode === 37 && focusedCard !== 1) {
      setFocusedCard(focusedCard - 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCard]);

  return (
    <Wrapper>
      <Card1 focused={focusedCard === 1}>Card 1</Card1>
      <Card2 focused={focusedCard === 2}>Card 2</Card2>
      <Card3 focused={focusedCard === 3}>Card 3</Card3>
    </Wrapper>
  );
};

export default App;
