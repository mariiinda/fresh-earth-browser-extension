/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import posed from "react-pose";

// CSS
const componentStyle = css`
  text-transform: uppercase;
  padding: 0 0 20px;
  flex: 0 1 145px;
  text-align: center;
  letter-spacing: 3px;

  > svg {
    width: 100%;
    font-family: var(--title-font);

    #logo-text1 {
      font-size: 5rem;
      fill: #104d60;
    }
    #logo-text2 {
      font-size: 6.2rem;
      fill: var(--main-dark-color);
    }
  }
`;

// Animation
const Heading = posed.h1({
  visible: {
    opacity: 1,
    transition: {
      duration: 400,
      delay: 350,
      ease: "easeInOut"
    }
  },
  hidden: { opacity: 0 },
  props: { i: 0 }
});

function Logo({ isMenuOpen = false }) {
  return (
    <Heading css={componentStyle} pose={isMenuOpen ? "visible" : "hidden"}>
      <svg viewBox="0 0 258 145">
        <g fill="none" fillRule="evenodd">
          <path
            d="M256 129.223C256 58.96 199.14 2 129 2S2 58.96 2 129.223"
            stroke="#00342F"
            strokeWidth="4"
          />
          <text id="logo-text1" transform="translate(2 2)">
            <tspan x="50" y="82">
              Fresh
            </tspan>
          </text>
          <text id="logo-text2" transform="translate(2 2)">
            <tspan x="27" y="143">
              Earth
            </tspan>
          </text>
        </g>
      </svg>
    </Heading>
  );
}

export default Logo;
