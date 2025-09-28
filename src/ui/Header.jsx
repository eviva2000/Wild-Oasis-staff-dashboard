import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  @media (max-width: 768px) {
    padding: 1.2rem 2.4rem;
    grid-row: 1;
  }

  @media (max-width: 480px) {
    padding: 1rem 1.6rem;
  }
`;

function Header() {
  return <StyledHeader></StyledHeader>;
}

export default Header;
