/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = ({ isActive = false }) => css`
  position: relative;
  width: 10px;
  height: 10px;
  background: ${isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"};
  border-radius: 50%;
  margin-right: 10px;
  border: ${isActive
    ? "var(--secondary-highlight-color) solid 1px"
    : "transparent solid 1px"};
  box-shadow: ${isActive
    ? "0 0 8px var(--secondary-highlight-color)"
    : "0 0 10px var(--main-bg-color), 0 0 10px var(--main-bg-color), 0 0 10px var(--main-bg-color)"};
  transition: background 0.3s ease-in-out;
  opacity: 0.8;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0px 8px var(--main-highlight-color);
  }

  &:focus {
    border: var(--main-highlight-color) solid 1px;
    outline: none;
    box-shadow: 0 0px 8px var(--main-highlight-color);
  }
`;

const labelStyle = css`
  display: inline-block;
  position: absolute;
  bottom: 14px;
  left: 0;
  background: white;
  transform: translate3d(-50%, 0, 0);
  width: 150px;
  height: 20px;
  text-align: center;
  color: black;
  line-height: 2rem;
  text-transform: uppercase;
  box-shadow: 0 0px 8px var(--main-dark-color);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

function PaginationItem({
  isActive = false,
  label = "",
  index = null,
  onClick
}) {
  return (
    <button
      type="button"
      css={componentStyle({ isActive })}
      onClick={({ target }) => {
        target.blur();
        onClick(index);
      }}
    >
      <span css={labelStyle}>{label}</span>
    </button>
  );
}

export default PaginationItem;
