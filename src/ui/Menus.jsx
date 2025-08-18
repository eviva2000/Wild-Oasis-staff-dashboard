import { useState } from "react";
import PropTypes from "prop-types";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const MenuList = styled.ul`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  min-width: 150px;
  z-index: 1000;
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuItemButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }
`;

function Menus({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <HiEllipsisVertical />
      </MenuButton>

      {isOpen && (
        <MenuList>
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </MenuList>
      )}
    </MenuContainer>
  );
}

function Menu({ children }) {
  return <div>{children}</div>;
}

Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

Menus.Menu = Menu;

export default Menus;
