import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const ModalView = styled.div`
  transition: 0.4s;
  z-index: 5;
  display: flex;
  width: 1920px;
  height: 728px;
  position: absolute;
  bottom: -728px;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(9, 13, 25, 0) 0%,
    rgba(9, 13, 25, 0.95) 40%
  );
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${(p) =>
    p.visible &&
    css`
      bottom: 0;
    `}
`;

const Title = styled.p`
  position: absolute;
  top: 120px;

  font-weight: 700;
  font-size: 40px;
  line-height: 64px;
  text-align: center;
  color: #eeeeee;
`;

const IconWrapper = styled.div`
  transition: 0.6s;
  transition-delay: 0.2s;
  margin-bottom: -200px;
  opacity: 0;
  align-items: center;
  display: flex;
  position: relative;
  height: 200px;
  width: auto;
  ${(p) =>
    p.visible &&
    css`
      opacity: 1;
      margin-bottom: 0px;
    `}
`;

const ReactIcon = styled.div`
  transition: 0.2s;
  display: flex;
  height: 160px;
  width: 160px;
  border-radius: 80px;
  background-color: #3e4154;
  margin: 0 20px 0 20px;
  font-size: 80px;
  justify-content: center;
  align-items: center;
  ${(p) =>
    p.focused &&
    css`
      height: 200px;
      width: 200px;
      border-radius: 100px;
      background-color: #eee;
      margin: 0 0px 0 0px;
    `}
  ${(p) =>
    p.animate &&
    css`
      animation: ${iconWiggle} 0.2s ease-in-out;
    `}
`;

const CancelButton = styled.div`
  position: absolute;
  width: 440px;
  bottom: 94px;
  border-radius: 8px;
  height: 88px;
  background-color: #3e4154;
  transition: 0.2s;
  font-size: 30px;
  font-weight: 700;
  color: #aeaeb2;
  align-items: center;
  display: flex;
  justify-content: center;
  vertical-align: bottom;

  ${(p) =>
    p.focused &&
    css`
      bottom: 88px;
      width: 480px;

      height: 100px;
      background-color: #eee;
      color: #090d19;
    `}
`;

const iconWiggle = keyframes`

  0%{
    /* transform: rotate3d(0, 1, 0, 0deg); */
    scale: 1;
  }

  50% {
    /* transform: rotate3d(0, 1, 0, 180deg); */
    scale: 0.9;
  }

  100%{
    /* transform: rotate3d(0, 1, 0,360deg); */
    scale: 1;

  }
`;

function ReactModal({ visible, setShowModal }) {
  const [focusedReaction, setFocusedReaction] = useState(0);
  const [isShaking, setIsShaking] = useState(null);

  useEffect(() => {
    if (visible) {
      // Add the event listener when the modal is shown
      document.addEventListener("keydown", handleKeyDown);
    } else {
      // Remove the event listener when the modal is hidden
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, focusedReaction]);

  function handleKeyDown(e) {
    //   8: Backspace
    //   13: enter
    //   37: left
    //   38: up
    //   39: right
    //   40: down
    if (
      e.keyCode === 8 ||
      (e.keyCode === 38 && focusedReaction != "cancel") ||
      (e.keyCode === 13 && focusedReaction === "cancel")
    ) {
      console.log("set modal false");
      setFocusedReaction(0);
      setShowModal(false);
    } else if (e.keyCode === 13 && focusedReaction != "cancel") {
      if (focusedReaction === 0) {
        console.log("activate reaction 0 animation");
        setIsShaking(0);
      } else if (focusedReaction === 1) {
        console.log("activate reaction 1 animation");
        setIsShaking(1);
      } else if (focusedReaction === 2) {
        console.log("activate reaction 2 animation");
        setIsShaking(2);
      } else if (focusedReaction === 3) {
        console.log("activate reaction 3 animation");
        setIsShaking(3);
      } else if (focusedReaction === 4) {
        console.log("activate reaction 4 animation");
        setIsShaking(4);
      }
      console.log("isShaking : ", isShaking);
    } else if (
      e.keyCode === 37 &&
      focusedReaction !== 0 &&
      focusedReaction !== "cancel"
    ) {
      setFocusedReaction(focusedReaction - 1);
      console.log("focusedReaction : ", focusedReaction);
    } else if (
      e.keyCode === 39 &&
      focusedReaction !== 4 &&
      focusedReaction !== "cancel"
    ) {
      setFocusedReaction(focusedReaction + 1);
      console.log("focusedReaction : ", focusedReaction);
    } else if (e.keyCode === 40) {
      setFocusedReaction("cancel");
    } else if (e.keyCode === 38) {
      setFocusedReaction(2);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "1080px",
        width: "1920px",
        overflow: "hidden",
      }}
    >
      <ModalView visible={visible}>
        <Title>반응 남기기</Title>
        <IconWrapper visible={visible}>
          <ReactIcon focused={focusedReaction === 0} animate={isShaking === 0}>
            😀
          </ReactIcon>
          <ReactIcon focused={focusedReaction === 1} animate={isShaking === 1}>
            😍
          </ReactIcon>
          <ReactIcon focused={focusedReaction === 2} animate={isShaking === 2}>
            🤣
          </ReactIcon>
          <ReactIcon focused={focusedReaction === 3} animate={isShaking === 3}>
            🤩
          </ReactIcon>
          <ReactIcon focused={focusedReaction === 4} animate={isShaking === 4}>
            🤔
          </ReactIcon>
        </IconWrapper>
        <CancelButton focused={focusedReaction === "cancel"}>취소</CancelButton>
      </ModalView>
    </div>
  );
}

export default ReactModal;
