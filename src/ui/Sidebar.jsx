import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    grid-row: 2;
    padding: 1.6rem 2.4rem;
    border-right: none;
    border-bottom: 1px solid var(--color-grey-100);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    overflow-x: auto;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
    gap: 1.6rem;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
