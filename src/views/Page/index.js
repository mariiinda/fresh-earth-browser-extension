/** @jsx jsx */
import { useReducer, useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";

import AppButton from "../../components/AppButton";
import MenuButton from "../../components/SlidingMenu/MenuButton";
import SlidingMenu from "../../components/SlidingMenu";
import Logo from "../../components/Logo";
import Tabs from "../../components/Tabs";
import AboutTab from "../AboutTab";
import SettingsTab from "../SettingsTab";
import StatusText from "../../components/StatusText";

// state
import MenuReducer from "../../state/menu";
import { ImageSourceProvider } from "../../state/useImageSource";
import { useLocalization } from "../../state/useLocalization";
// utils
import StorageWrapper from "../../storage/storageWrapper";

// CSS
const componentStyle = mouseClicked => css`
  position: relative;
  width: 100%;
  height: 100%;

  /* hide focus style for mouse users */
  * {
    :focus {
      outline: ${mouseClicked ? "none !important" : null};
      box-shadow: ${mouseClicked ? "none !important" : null};
    }
  }
`;

const navStyle = menuIsOpen => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  filter: ${menuIsOpen ? "blur(4px)" : 0};
`;

function Component() {
  // hooks
  const [menuState, menuDispatch] = useReducer(MenuReducer, { isOpen: false });
  const [mouseClicked, setMouseClicked] = useState(false);
  const { isOpen: menuIsOpen } = menuState;
  const closeMenu = () => menuDispatch({ type: "close" });

  // localization
  const {
    state: { language, copy },
    setLanguage
  } = useLocalization();

  useEffect(() => {
    async function fetchLanguageSetting() {
      const localizationState = await StorageWrapper.get("localizationState");
      let nextLanguage = "en";
      if (localizationState && localizationState.language) {
        nextLanguage = localizationState.language;
      }
      setLanguage(nextLanguage);
    }
    if (language === "") {
      fetchLanguageSetting();
    }
  }, [language, setLanguage]);

  return (
    <div
      css={componentStyle(mouseClicked)}
      onMouseDown={() => {
        setMouseClicked(true);
      }}
      onKeyDown={event => {
        const { keyCode } = event;
        if (keyCode === 9) {
          setMouseClicked(false);
        }
      }}
    >
      <nav css={navStyle(menuIsOpen)}>
        <MenuButton
          text={copy.menuButtonText}
          isOpen={menuIsOpen}
          onClick={() => menuDispatch({ type: "open" })}
        />
        <AppButton text={copy.appButtonText} />
      </nav>

      <ImageSourceProvider>
        <SlidingMenu onClose={closeMenu} isOpen={menuState.isOpen}>
          <Logo isMenuOpen={menuState.isOpen} />
          <Tabs tabList={copy.tabList} isMenuOpen={menuState.isOpen}>
            <SettingsTab isMenuOpen={menuState.isOpen} />
            <AboutTab />
          </Tabs>
        </SlidingMenu>
        <StatusText />
      </ImageSourceProvider>
    </div>
  );
}

export default Component;
