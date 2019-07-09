/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = ({ isActive, disabled, checked }) => css`
  position: relative;
  width: 100%;
  border-radius: 2px;
  padding: 36px 0 10px 0;
  background: var(--main-bg-color);
  opacity: ${disabled ? 0.7 : 1};
  transition: opacity 0.3s ease-in-out;

  &:before {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: ${checked ? "1px solid var(--secondary-highlight-color)" : "none"};
    box-shadow: ${checked
      ? "0 0 4px 1px var(--secondary-highlight-color)"
      : "0 0 4px 1px rgba(0,0,0,0.2)"};
  }

  &:after {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: ${isActive ? "0 0 4px 1px var(--main-link-color)" : "none"};
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

  &:checked + label:before {
    background: var(--main-link-color);
  }

  &:focus + label:before {
    border: var(--main-highlight-color) solid 1px;
    box-shadow: 0 0px 8px var(--main-highlight-color);
  }

  &:checked + label:after {
    transform: rotate(-45deg) scale(1);
    opacity: 1;
  }

  &:disabled + label:before {
    border: var(--main-link-color) solid 1px;
  }
`;

const imageWrapperStyle = css`
  ${"" /* width: 100%; */}

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const imageStyle = css`
  ${"" /* width: auto;
  height: 140px; */}

  width: 100%;
  height: auto;
  object-fit: contain;
`;

const labelWrapperStyle = disabled => css`
  cursor: ${disabled ? "default" : "pointer"};

  &:before {
    content: "";
    position: absolute;
    z-index: 5;
    top: 6px;
    left: 6px;
    display: inline-block;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    border: 2px solid var(--main-link-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 6;
    top: 12px;
    left: 11px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    height: 6px;
    width: 13px;
    transform: rotate(0deg) scale(0);
    opacity: 1;
    transition: opacity 0.3s ease-in-out, transform 0.15s ease-in-out;
  }
`;

const labelStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 99%;
  background: white url("/diagonal-lines-faded.svg") 0 0 repeat;
  letter-spacing: 0.63px;
  text-align: center;
  fill: white;
  height: 36px;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0 0 0 40px;
  border-bottom-right-radius: 10px;
  text-transform: uppercase;
  overflow: hidden;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    z-index: 4;
  }

  > span {
    position: relative;
    z-index: 5;
    color: var(--main-bg-color);
  }
`;

function Component({
  id = "",
  label = "",
  thumb = "",
  onChange,
  checked = false,
  disabled = false,
  isActive = false
}) {
  const isChromeExtension = window.chrome && window.chrome.extension;
  const thumbUrl =
    isChromeExtension && thumb !== ""
      ? window.chrome.extension.getURL(thumb)
      : thumb;
  return (
    <div css={componentStyle({ isActive, disabled, checked })}>
      <input
        css={inputStyle}
        name={id}
        id={`${id}-input`}
        checked={checked}
        type="checkbox"
        disabled={disabled}
        onChange={({ target }) => {
          onChange({ target, id });
        }}
      />
      <label css={labelWrapperStyle(disabled)} htmlFor={`${id}-input`}>
        <span css={labelStyle}>
          <span>{label}</span>
        </span>

        <div css={imageWrapperStyle}>
          <img css={imageStyle} src={thumbUrl} alt={label} />
        </div>
      </label>
    </div>
  );
}

export default Component;
