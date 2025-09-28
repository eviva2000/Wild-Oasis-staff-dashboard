import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  @media (max-width: 768px) {
    overflow-x: auto;
    font-size: 1.2rem;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  @media (max-width: 768px) {
    column-gap: 1.6rem;
    min-width: 600px;
  }

  @media (max-width: 480px) {
    column-gap: 1.2rem;
    min-width: 500px;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    font-size: 1rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    padding: 1rem 1.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.propTypes = {
  columns: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

Body.propTypes = {
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
