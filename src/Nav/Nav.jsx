import styled from "styled-components";

const Navigation = styled.nav`
  width: 266px;
  padding: 20px;
  margin: 30px 0 0 40px;
  background-color: rgb(9, 13, 25, 0.8);
  border-radius: 20px;
  position: fixed;
  backdrop-filter: blur(40px);
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

let Logo = styled.img`
  height: 88px;
  margin: 30px 20px;
  margin-right: auto;
`;

function Nav({ children }) {
  return (
    <Navigation>
      <Logo src="https://shareditassets.s3.ap-northeast-2.amazonaws.com/production/uploads/product/logo/694/medium_%EC%9B%8D%EC%8A%A4_logo.png"></Logo>
      {children}
    </Navigation>
  );
}

export default Nav;
