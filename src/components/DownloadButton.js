/** @jsx jsx */
import { jsx, css } from "@emotion/core";

function DownloadButton({ blobUrl = "", filename = "image", text }) {
  return (
    <a
      href={blobUrl}
      download={filename}
      css={css`
        position: absolute;
        bottom: -5%;
        right: 5px;
        z-index: 10;
        width: 28px;
        color: #fff;
        text-decoration: none;
        text-align: center;
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
            height: 100%;
            background: white;
          }
        }

        span {
          position: relative;
          color: currentColor;
          font-size: 1.1rem;
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
          transition: 0.3s ease-in-out;
        }
      `}
    >
      <svg
        viewBox="0 0 28 25"
        aria-hidden="true"
        focusable="false"
        css={css`
          opacity: 0.6;
          width: 100%;
          height: 28px;
        `}
      >
        <g fill="none" fillRule="evenodd">
          <path fill="#FFF" d="M0 23h28v2H0z" strokeWidth="3" />
          <g stroke="#FFF" strokeLinecap="round" strokeWidth="3">
            <path d="M8 10l6 6M20 10l-6 6M14 15.667V2" />
          </g>
        </g>
      </svg>
      <span>{text}</span>
    </a>
  );
}

export default DownloadButton;
