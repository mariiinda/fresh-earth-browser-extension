/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx, css } from "@emotion/core";

import CloseButton from "./CloseButton/";

function Component({ isOpen, onClose, controlId = "menu-button", children }) {
  let menuArea = React.createRef();
  useEffect(() => {
    if (isOpen) {
      // set focus to firsttabable element
      const nextFocus = menuArea.current.querySelector('[tabindex="0"]');
      nextFocus && nextFocus.focus();
    }
  }, [menuArea, isOpen]);

  const menuCSS = css`
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: ${isOpen ? "auto" : "none"};
    transform: translate3d(${isOpen ? "0" : "-110%"}, 0, 0);
    transition: transform 0.5s 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
    @media (min-width: 720px) {
      width: 50%;
      max-width: 420px;
    }
  `;

  const contentCSS = css`
    position: relative;
    z-index: 5;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 52px 20px 0;
    min-width: 320px;
    background: rgba(255, 255, 255, 0.9);
    @media (min-width: 720px) {
      padding: 52px 40px 0;
    }
  `;

  return (
    <div
      ref={menuArea}
      onKeyDown={event => {
        const { shiftKey, keyCode } = event;
        const focusableEls = menuArea.current.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        if (keyCode === 27) {
          onClose();
        }
        if (shiftKey && keyCode === 9) {
          if (
            isOpen &&
            firstFocusableEl &&
            document.activeElement === firstFocusableEl
          ) {
            lastFocusableEl.focus();
            event.preventDefault();
          }
        } else if (keyCode === 9) {
          if (
            isOpen &&
            lastFocusableEl &&
            document.activeElement === lastFocusableEl
          ) {
            firstFocusableEl.focus();
            event.preventDefault();
          }
        }
      }}
      aria-controls={controlId}
      id="sliding-menu-content"
      tabIndex={isOpen ? null : -1}
      aria-hidden={!isOpen}
      css={menuCSS}
    >
      <div css={contentCSS}>
        <>
          {children}
          <CloseButton
            id="close-btn"
            onClick={onClose}
            isOpen={isOpen}
            text="close"
          />
        </>
      </div>
    </div>
  );
}

export default Component;
