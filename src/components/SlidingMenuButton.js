/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = isOpen => css`
  position: relative;
  z-index: var(--top-z-index);
  width: 34px;
  height: 55px;
  padding-bottom: 14px;
  color: #fff;
  text-decoration: none;
  text-align: center;
  line-height: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  opacity: ${isOpen ? 0 : 1};

  &:hover,
  &:focus {
    span {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    height: 100%;
    top: 0;
    left: 3px;
    z-index: 5;
    color: currentColor;
    font-size: 1.1rem;
    font-family: var(--title-font);
    display: flex;
    align-items: flex-end;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  svg {
    position: relative;
    z-index: 10;
    top: 2px;
    width: 100%;
    height: 22px;
    pointer-events: none;
    fill: white;
  }
`;

function SlidingMenuButton({ text, onClick, isOpen, id = "menu-button" }) {
  return (
    <button
      type="button"
      id={id}
      aria-controls="sliding-menu-content"
      aria-expanded={isOpen}
      aria-label="Open and view site options and about information"
      tabIndex={isOpen ? -1 : 0}
      aria-hidden={isOpen}
      onClick={event => {
        onClick();
        event.currentTarget.blur();
      }}
      css={componentStyle(isOpen)}
    >
      <svg viewBox="0 0 24 22" aria-hidden="true" focusable="false">
        <g fill="inherit" fillRule="evenodd">
          <path d="M0 0h24v4H0z" />
          <path opacity=".8" d="M0 9h24v4H0z" />
          <path opacity=".6" d="M0 18h24v4H0z" />
        </g>
      </svg>
      <span>{text}</span>
    </button>
  );
}

export default SlidingMenuButton;
