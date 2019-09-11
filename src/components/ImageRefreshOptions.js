/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import RadioInput from "./RadioInput";

// CSS
const componentStyle = css`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const formatSeconds = ({
  seconds,
  minutesLabel = "minutes",
  hoursLabel = "hours",
  hourLabel = "hour"
}) => {
  const hrLabel = seconds === 60 * 60e3 ? hourLabel : hoursLabel;
  return seconds >= 60 * 60e3
    ? formatSecondsIntoHours({ seconds, label: hrLabel })
    : formatSecondsIntoMinutes({ seconds, label: minutesLabel });
};

const formatSecondsIntoMinutes = ({ seconds, label }) => {
  return `${Number(seconds) / 60e3} ${label}`;
};

const formatSecondsIntoHours = ({ seconds, label }) => {
  return `${Number(seconds) / 60e3 / 60} ${label}`;
};

function ImageRefreshOptions({
  options = [],
  minutesLabel,
  hoursLabel,
  onChange,
  selectedImageRefreshInterval
}) {
  return (
    <div css={componentStyle}>
      {options.length > 0 &&
        options.map(seconds => (
          <RadioInput
            key={seconds}
            id={seconds}
            label={formatSeconds({ seconds, minutesLabel, hoursLabel })}
            onChange={onChange}
            checked={seconds === selectedImageRefreshInterval}
          />
        ))}
    </div>
  );
}

export default ImageRefreshOptions;
