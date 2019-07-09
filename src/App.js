import React from "react";

import Page from "./views/Page";
import { CopyProvider } from "./state/useLocalization";
import "./styles/main.css";

function App() {
  return (
    <CopyProvider>
      <div className="wrapper">
        <Page />
      </div>
    </CopyProvider>
  );
}

export default App;
