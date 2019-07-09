/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import posed from "react-pose";

import TabButton from "./TabButton";

// CSS
const componentStyle = css`
  position: relative;
  color: black;
  flex: 0 1 calc(100% - 250px);

  > * {
    display: flex;
  }
`;

// Animation
const Tab = posed.div({
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 350,
      delay: 50,
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  hidden: { opacity: 0, x: ({ i }) => (i === 0 ? "-100%" : "100%") },
  props: { i: 0 }
});

const tabItemStyle = isVisible => css`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  top: 37px;
  left: 0;
  text-align: center;
  pointer-events: ${isVisible ? "auto" : "none"};
  /* accessability: disables keyboard focus on hidden tab links */
  display: ${isVisible ? "flex" : "none"};
  > * {
    flex: 0 0 100%;
    padding-top: 20px;
    text-align: left;
    position: relative;
  }
`;

const tabButtonWrapperStyle = css`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 40px;
    left: 0;
    height: 10px;
    width: 100%;
    background: url("/diagonal-lines.svg") 0 0 repeat;
  }
`;

function Component({ tabList = [], children = null, isMenuOpen = false }) {
  const tabArea = React.createRef();

  // hooks
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useEffect(() => {
    const nextFocus = tabArea.current.querySelector('[tabindex="0"]');
    nextFocus && nextFocus.focus();
  }, [tabArea]);
  useEffect(() => {
    if (!isMenuOpen) {
      setTimeout(() => setActiveTabIndex(0), 500);
    }
  }, [isMenuOpen]);

  return (
    <div
      css={componentStyle}
      ref={tabArea}
      onKeyDown={event => {
        const { keyCode } = event;
        // on left arrow
        if (keyCode === 37) {
          const nextActiveIndex =
            Number(activeTabIndex) === 0
              ? tabList.length - 1
              : activeTabIndex - 1;
          setActiveTabIndex(nextActiveIndex);
        }
        // on right arrow
        if (keyCode === 39) {
          const nextActiveIndex =
            Number(activeTabIndex) === tabList.length - 1
              ? 0
              : activeTabIndex + 1;
          setActiveTabIndex(nextActiveIndex);
        }
        // on home arrow
        if (keyCode === 36) {
          setActiveTabIndex(0);
        }
        // on end arrow
        if (keyCode === 35) {
          setActiveTabIndex(tabList.length - 1);
        }
      }}
      hidden={!isMenuOpen}
    >
      <div css={tabButtonWrapperStyle} role="tablist">
        {tabList.length > 0 &&
          tabList.map((tab, index) => {
            const isSelected = Number(index) === activeTabIndex ? true : false;
            return (
              <TabButton
                key={tab}
                id={tab}
                onClick={() => {
                  setActiveTabIndex(Number(index));
                }}
                isSelected={isSelected}
                tabIndex={isSelected ? 0 : -1}
              >
                {tab}
              </TabButton>
            );
          })}
      </div>

      {tabList.length > 0 &&
        children.map((child, index) => {
          const tabId = tabList[index];
          const isVisible = Number(index) === activeTabIndex ? true : false;
          return (
            <Tab
              css={tabItemStyle(isVisible)}
              pose={isVisible ? "visible" : "hidden"}
              key={tabId}
              tabIndex={isVisible ? 0 : -1}
              role="tabpanel"
              id={`${tabId}-tab`}
              aria-labelledby={tabId}
              aria-hidden={!isVisible}
              i={index}
            >
              {child}
            </Tab>
          );
        })}
    </div>
  );
}

export default Component;
