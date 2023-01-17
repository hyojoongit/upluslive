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
  margin: 30px 10px;
  margin-right: auto;
`;

function Nav({ children }) {
  return (
    <Navigation>
      <Logo src="https://github.com/hyojoongit/upluslive/blob/main/public/images/logo.png?raw=true"></Logo>
      {children}
    </Navigation>
  );
}

export default Nav;
