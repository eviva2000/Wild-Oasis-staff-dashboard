import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  @media (max-width: 768px) {
    font-size: ${(props) => {
      if (props.size === "small") return "1.1rem";
      if (props.size === "medium") return "1.3rem";
      return "1.5rem";
    }};
    
    padding: ${(props) => {
      if (props.size === "small") return "0.3rem 0.6rem";
      if (props.size === "medium") return "1rem 1.4rem";
      return "1rem 2rem";
    }};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => {
      if (props.size === "small") return "1rem";
      if (props.size === "medium") return "1.2rem";
      return "1.4rem";
    }};
    
    padding: ${(props) => {
      if (props.size === "small") return "0.2rem 0.5rem";
      if (props.size === "medium") return "0.8rem 1.2rem";
      return "0.8rem 1.6rem";
    }};
  }
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;