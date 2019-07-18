import React from "react";
import computeAnchor from "../../../index";
import mockData from "./mock";

export default class WindowExample extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentAnchor: "",
    dispose: null
  };

  contentList = mockData("window");

  componentDidMount() {
    this.register();
  }

  register() {
    this.setState({
      dispose: computeAnchor({
        anchors: this.contentList.map(i => i.anchor),
        callback: anchor => {
          this.setState({ currentAnchor: anchor });
        }
      })
    });
  }

  render() {
    let btnName = this.state.dispose ? "Dispose" : "Register";
    let labelName = this.state.dispose
      ? "listening window.scroll:"
      : "disposed";
    return (
      <div className="window-example-wrapper">
        <div className="fixed-top current-anchor window-anchor">
          <div className="btn-ctn">
            <button
              className="dispose-btn"
              onClick={() => {
                if (this.state.dispose) {
                  this.state.dispose.dispose();
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
        <ul className="window-example-content-list">
          {this.contentList.map(({ anchor, height }) => {
            let active = this.state.currentAnchor === anchor;
            return (
              <li
                id={anchor}
                className={
                  "window-example-content-item" + active ? "active" : ""
                }
              >
                <h3 className="window-example-content-title">{anchor}</h3>
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
