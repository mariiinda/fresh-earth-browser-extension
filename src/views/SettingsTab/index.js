/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import posed from "react-pose";

import ImageSelectCard from "../../components/ImageSelectCard";
import ImageRefreshOptions from "../../components/ImageRefreshOptions";

//state
import { useImageSource } from "../../state/useImageSource";
import { useLocalization } from "../../state/useLocalization";

// CSS
const componentStyle = css`
  text-align: center;
`;

const legendStyle = css`
  background: var(--secondary-highlight-color);
  display: block;
  width: 100%;
  margin-bottom: 20px;
`;

const fieldsetStyle = css`
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
`;

const selectWrapper = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 6px;
  margin-bottom: 20px;
`;

// Animation
const Fieldset = posed.fieldset({
  visible: {
    opacity: 1,
    transition: ({ i }) => ({
      duration: 250,
      delay: i * 400
    })
  },
  hidden: { opacity: 0 },
  props: { i: 0 }
});

function Component({ isMenuOpen = false }) {
  // hooks
  const {
    state: {
      activeId = "",
      imageSources = [],
      selectedSourceIds = [],
      selectedImageRefreshInterval,
      imageRefreshIntervalOptions = []
    },
    addSelectedSourceIds,
    removeSelectedSourceIds,
    setSelectedImageRefreshInterval
  } = useImageSource();

  const {
    state: { copy }
  } = useLocalization();

  // events
  const handleImageSelectChange = ({ target, id }) => {
    if (!target.checked) {
      removeSelectedSourceIds(id);
    } else {
      addSelectedSourceIds(id);
    }
  };
  const handleImageRefreshIntervalChange = ({ id }) => {
    setSelectedImageRefreshInterval(id);
  };

  return (
    <div css={componentStyle}>
      <form>
        <Fieldset
          css={fieldsetStyle}
          pose={isMenuOpen ? "visible" : "hidden"}
          i={1}
        >
          <legend css={legendStyle}>{copy.imageSelectLegend}</legend>

          <div css={selectWrapper}>
            {imageSources.map(({ id, label, thumb }, index) => {
              const isChecked = selectedSourceIds.includes(id);
              const isDisabled = isChecked && selectedSourceIds.length === 1;
              return (
                <ImageSelectCard
                  key={id}
                  isActive={activeId === id}
                  id={id}
                  index={index}
                  label={label}
                  thumb={thumb}
                  onChange={handleImageSelectChange}
                  checked={isChecked}
                  disabled={isDisabled}
                />
              );
            })}
          </div>
        </Fieldset>

        <Fieldset
          css={fieldsetStyle}
          pose={isMenuOpen ? "visible" : "hidden"}
          i={2}
        >
          <legend css={legendStyle}>{copy.imageRefreshLegend}:</legend>

          <ImageRefreshOptions
            options={imageRefreshIntervalOptions}
            minutesLabel={copy.minutes}
            hoursLabel={copy.hours}
            hourLabel={copy.hour}
            onChange={handleImageRefreshIntervalChange}
            selectedImageRefreshInterval={selectedImageRefreshInterval}
          />
        </Fieldset>
      </form>
    </div>
  );
}

export default Component;
