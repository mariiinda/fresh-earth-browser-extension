/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useImageSource } from "../../state/useImageSource";
import { useLocalization } from "../../state/useLocalization";
import { useNotifications } from "../../state/useNotifications";

import StatusItem from "./StatusItem";

// CSS
const componentStyle = css`
  position: absolute;
  z-index: var(--top-z-index);
  bottom: 20px;
  right: 20px;
  text-align: right;
  font-family: var(--title-font);
  letter-spacing: 1px;
  font-size: 1.2rem;
  color: var(--main-bg-color);
  line-height: 3rem;
`;

function Component() {
  // hooks
  const {
    state: { activeSource = {} }
  } = useImageSource();

  const {
    state: { isPending, hasError, refreshDate = null }
  } = useNotifications();

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  const {
    state: { copy }
  } = useLocalization();
  const date = new Date(refreshDate).toLocaleDateString("en-GB", options);

  const isOffline = !(window.navigator && window.navigator.onLine);
  return (
    <div css={componentStyle}>
      <StatusItem
        isVisible={activeSource.label && !isPending}
        label={copy.satellite}
        value={activeSource.spacecraft}
      />

      <StatusItem
        isVisible={activeSource.label && !isPending}
        label={copy.view}
        value={activeSource.label}
      />

      <StatusItem
        isVisible={isPending}
        label={copy.status}
        value={copy.loading}
        isLoading={true}
      />

      <StatusItem
        isVisible={
          refreshDate !== null &&
          date !== "Invalid Date" &&
          !isPending &&
          !hasError
        }
        label={copy.refreshed}
        value={date}
      />

      <StatusItem
        isVisible={isOffline}
        label={copy.status}
        value={copy.offline}
      />

      <StatusItem
        isVisible={hasError}
        label={copy.status}
        value={copy.imageError}
        isLoading={true}
        isError={true}
      />
    </div>
  );
}

export default Component;
