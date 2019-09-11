/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = ({ checked }) => css`
  position: relative;
  display: flex;
  width: 50%;
  margin-bottom: 8px;

  &:before {
    content: "";
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
    background: white;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 10;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #f1f1f1;
  }
`;

const inputStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);

  &:checked + label:after {
    background: var(--main-link-color);
  }

  &:focus + label:before {
    border: var(--main-highlight-color) solid 1px;
    box-shadow: 0 0px 8px var(--main-highlight-color);
  }

  &:checked + label:after {
    transform: scale(1);
    opacity: 1;
  }
`;

const labelWrapperStyle = () => css`
  &:before {
    content: "";
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: transparent solid 1px;
    box-sizing: border-box;
    cursor: pointer;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 11;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transform: scale(0);

    opacity: 1;
    transition: opacity 0.3s ease-in-out, transform 0.15s ease-in-out;
  }
`;

const labelStyle = css`
  > span {
    cursor: pointer;
    position: relative;
    z-index: 5;
    color: var(--main-bg-color);
    left: 28px;
  }
`;

function RadioInput({ id = "", label = "", onChange, checked = false }) {
  return (
    <div css={componentStyle({ checked })}>
      <input
        css={inputStyle}
        name={id}
        id={`radio-input-${id}`}
        checked={checked}
        type="radio"
        onChange={({ target }) => {
          onChange({ target, id });
        }}
      />
      <label css={labelWrapperStyle()} htmlFor={`radio-input-${id}`}>
        <span css={labelStyle}>
          <span>{label}</span>
        </span>
      </label>
    </div>
  );
}

export default RadioInput;
