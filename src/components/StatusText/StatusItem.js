/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import posed from "react-pose";

// CSS
const componentStyle = css`
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
const bounce = keyframes`
  0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
const wrapperStyle = isLoading => css`
  position: relative;
  background: white;
  padding: 2px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 99%;
    height: 2px;
    background: blue;
    display: ${isLoading ? "block" : "none"};
    transform: translate3d(0, 0, 0);
    background: linear-gradient(270deg, #37cda6, #e4fafa, #fcf2ee);
    background-size: 600% 600%;
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

const labelStyle = css`
  opacity: 0.9;
`;
const nameStyle = css`
  background: var(--secondary-highlight-color);
  padding: 2px;
`;

// Animation
const Box = posed.div({
  visible: {
    opacity: 1,
    height: "100%",
    transition: { duration: 300, ease: [0.01, 0.64, 0.99, 0.56] }
  },
  hidden: { opacity: 0, height: 0 }
});

function Component({
  isVisible = false,
  label = "",
  value = "",
  isLoading = false
}) {
  return (
    <Box css={componentStyle} pose={isVisible ? "visible" : "hidden"}>
      <span css={wrapperStyle(isLoading)}>
        <span css={labelStyle}>&nbsp;{label}:&nbsp;</span>
        <span css={nameStyle}>&nbsp;{value}&nbsp;</span>
      </span>
    </Box>
  );
}

export default Component;
