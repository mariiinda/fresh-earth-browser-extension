/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = isSelected => css`
  position: relative;
  flex: 1;
  color: ${isSelected ? "white" : "var(--main-bg-color)"};
  background: ${isSelected ? "var(--main-link-color)" : "#fff"};
  cursor: ${isSelected ? "default" : "pointer"};
  height: 36px;
  text-transform: uppercase;
  font-family: var(--title-font);
  letter-spacing: 1px;
  font-size: 1.4rem;
  transition: background 0.3s ease-in-out;
  overflow: hidden;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      180deg,
      rgba(238, 238, 238, 0) 0%,
      var(--secondary-highlight-color) 100%
    );
    transform: translate3d(0, 110%, 0);
    transition: transform 0.5s 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  &:hover {
    &:before {
      transform: ${!isSelected
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 110%, 0)"};
    }
  }

  &:focus {
    outline: var(--main-highlight-color) solid 1px;
    box-shadow: 0 0px 8px var(--main-highlight-color);
  }

  > span {
    position: relative;
  }
`;

function TabButton({ id, children, onClick, isSelected, tabIndex }) {
  return (
    <button
      css={componentStyle(isSelected)}
      id={id}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`${id}-tab`}
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}

export default TabButton;
