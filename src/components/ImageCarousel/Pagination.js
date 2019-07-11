/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import PaginationItem from "./PaginationItem";

// CSS
const componentStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Pagination({ items = [], activeId = "", onClick }) {
  return (
    <div css={componentStyle}>
      {items.length > 0 &&
        items.map(({ id, label }, index) => {
          const isActive = activeId === id;
          return (
            <PaginationItem
              key={id}
              label={label}
              isActive={isActive}
              id={id}
              onClick={onClick}
              index={index}
            />
          );
        })}
    </div>
  );
}

export default Pagination;
