import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import WindowExample from "./examples/window-example";
import ElementExample from "./examples/element-example";
import OffsetExample from "./examples/offset-example";

class DemoPage extends React.Component {
  render() {
    return (
      <div className="demo-page-wrapper">
        <div className="compute-anchor-demo-information">
          <h1 className="title">Compute Anchor</h1>
          <h2 className="sub-title">This is a small package</h2>
          <p className="description">Wrote by teeeemoji</p>
        </div>
        <div className="examples-ctn">
          <div className="example-item">
            <WindowExample />
          </div>
          <div className="example-item">
            <ElementExample />
          </div>
          <div className="example-item">
            <OffsetExample />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DemoPage />, document.getElementById("app"));
