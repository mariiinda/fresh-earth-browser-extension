/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = css`
  position: relative;
  z-index: var(--top-z-index);
  width: 34px;
  height: 55px;
  padding-bottom: 14px;
  color: #fff;
  text-decoration: none;
  text-align: center;
  line-height: 1.3rem;
  cursor: posinter;
  transition: all 0.3s ease-in;

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
    left: 7px;
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

function Component({ text = "" }) {
  if (!(window.chrome && window.chrome.tabs)) return null;
  return (
    <button
      css={componentStyle}
      onClick={() => {
        window.chrome.tabs.getCurrent(tab => {
          window.chrome.tabs.update(tab.id, {
            url: "chrome://apps/"
          });
        });
      }}
    >
      <svg viewBox="0 0 58 58" aria-hidden="true" focusable="false">
        <g fill="none" fillRule="evenodd">
          <g fill="#F9CE1C">
            <path d="M44 44h14v14H44zM22 44h14v14H22zM44 22h14v14H44z" />
          </g>
          <g fill="#389C5C">
            <path d="M0 44h14v14H0zM0 22h14v14H0z" />
          </g>
          <path fill="#02B0FF" d="M22 22h14v14H22z" />
          <g fill="#F55253">
            <path d="M44 0h14v14H44zM22 0h14v14H22zM0 0h14v14H0z" />
          </g>
        </g>
      </svg>

      <span>{text}</span>
    </button>
  );
}

export default Component;
