import React from "react";
import ReactDOM from "react-dom";
import computeAnchor from "../../../index";
import mockData from "./mock";

export default class OffsetExample extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentAnchor: ""
  };

  ref;
  dispose;
  contentList = mockData("offset");

  componentDidMount() {
    this.register();
  }

  register() {
    this.setState({
      dispose: computeAnchor({
        element: ReactDOM.findDOMNode(this.ref),
        anchors: this.contentList.map(i => i.anchor),
        callback: anchor => {
          this.setState({ currentAnchor: anchor });
        },
        offset: {
          top: 80
        }
      })
    });
  }

  render() {
    let btnName = this.state.dispose ? "Dispose" : "Register";
    let labelName = this.state.dispose ? "listening div.wheel:" : "disposed";
    return (
      <div
        className="offset-example-wrapper"
        style={{ height: 500 }}
        ref={ref => (this.ref = ref)}
      >
        <div className="fixed-top current-anchor offset-anchor">
          <div className="btn-ctn">
            <button
              className="dispose-btn"
              onClick={() => {
                if (this.state.dispose) {
                  this.state.dispose();
                  this.setState({
                    dispose: null
                  });
                } else {
                  this.register();
                }
              }}
            >
              {btnName}
            </button>
          </div>
          <div className="label">{labelName}</div>
          <div className="anchor-name">{this.state.currentAnchor}</div>
        </div>
        <ul className="offset-example-content-list">
          {this.contentList.map(({ anchor, height }) => {
            let active = this.state.currentAnchor === anchor;
            return (
              <li
                id={anchor}
                className={
                  "offset-example-content-item" + active ? "active" : ""
                }
              >
                <h3 className="offset-example-content-title">{anchor}</h3>
                <div className="content-box" style={{ height }}>
                  content placeholder
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
