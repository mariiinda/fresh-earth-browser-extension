/** @jsx jsx */
// eslint-disable-next-line
import React, { useReducer, useState } from "react";
import { jsx, css } from "@emotion/core";

import { useLocalization } from "../../state/useLocalization";

// CSS
const componentStyle = css`
  text-align: left;
  font-size: 1.4rem;

  div > p:first-of-type {
    font-size: 1.6rem;
    font-family: var(--title-font);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 0 15px;
  }

  ul {
    margin: 0;
    padding: 1.5rem 3rem;

    li {
      padding: 0 0 0;
    }
  }

  a {
    color: var(--main-link-color);
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    transition: border 0.3s ease-out;

    &:hover {
      border-bottom: 1px solid var(--main-highlight-color);
    }
  }
  small {
    display: block;
    font-style: italic;
  }
`;

function Component() {
  const {
    state: {
      copy: { aboutTabHTML }
    }
  } = useLocalization();
  const createMarkup = html => {
    return {
      __html: html
    };
  };
  return (
    <div css={componentStyle}>
      <div dangerouslySetInnerHTML={createMarkup(aboutTabHTML)} />
    </div>
  );
}

export default Component;
