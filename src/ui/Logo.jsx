import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;

  @media (max-width: 768px) {
    height: 6rem;
  }

  @media (max-width: 480px) {
    height: 4.8rem;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
