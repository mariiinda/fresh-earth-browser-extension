/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = () => css`
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 55px;
  padding-bottom: 16px;
  text-align: center;
  color: black;
  line-height: 1.3rem;
  transition: color 0.3s ease-in;

  &:hover,
  &:focus {
    color: black;
    span {
      opacity: 1;
    }
    span:after {
      z-index: -1;
      height: 1.4rem;
      background: white;
    }
    svg {
      stroke: #0a5656;
    }
  }

  span {
    position: relative;
    top: 4px;
    color: currentColor;
    font-size: 1.1rem;
    font-family: var(--title-font);
    z-index: 1;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  span:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: transparent;
    transition: height 0.3s ease-in-out;
  }

  svg {
    padding-top: 10px;
    stroke: #333;
  }
`;

function Component({ id, text, onClick, isOpen }) {
  return (
    <button
      css={componentStyle()}
      onBlur={event => {
        // trap keyboard focus while menu is open
        //isOpen && event.currentTarget.parentNode.focus();
      }}
      id={id}
      onClick={onClick}
      tabIndex={isOpen ? 0 : -1}
      aria-hidden={!isOpen}
    >
      <svg
        viewBox="0 0 23 23"
        aria-hidden="true"
        focusable="false"
        css={css`
          width: 23px;
        `}
      >
        <g
          stroke="inherit"
          strokeWidth="3"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <path d="M20.5 2.5L2.735 20.265M2.5 2.5l17.765 17.765" />
        </g>
      </svg>
      <span>{text}</span>
    </button>
  );
}

export default Component;
