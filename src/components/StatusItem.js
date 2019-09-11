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
  0%{transform: translate3d(-10%,0,0)}
    50%{transform: translate3d(-50%,0,0)}
    100%{transform: translate3d(-10%,0,0)}
`;

const wrapperStyle = ({
  isLoading = false,
  isError = false,
  isVisible = false
}) => css`
  position: relative;
  background: white;
  overflow: hidden;
  display: inline-block;
  height: 24px;
  line-height: 0;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 400%;
    height: 2px;
    background: blue;
    display: ${isLoading && isVisible ? "block" : "none"};
    transform: translate3d(0, 0, 0);
    background: ${isError
      ? "linear-gradient(270deg, #f74f0c, #ee4806, #ffbca2)"
      : "linear-gradient(270deg, #e4fafa, #01d59b, #01d59b)"};
    background-size: 100% 100%;
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

const labelStyle = css`
  opacity: 0.9;
  display: inline-block;
  height: 24px;
  line-height: 2rem;
`;

const nameStyle = css`
  background: var(--secondary-highlight-color);
  padding: 2px;
  display: inline-block;
  height: 24px;
  line-height: 2rem;
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

function StatusItem({
  isVisible = false,
  label = "",
  value = "",
  isLoading = false,
  isError = false
}) {
  return (
    <Box css={componentStyle} pose={isVisible ? "visible" : "hidden"}>
      <span css={wrapperStyle({ isLoading, isError, isVisible })}>
        <span css={labelStyle}>&nbsp;{label}:&nbsp;</span>
        <span css={nameStyle}>&nbsp;{value}&nbsp;</span>
      </span>
    </Box>
  );
}

export default StatusItem;
