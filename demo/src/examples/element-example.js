import React from "react";
import ReactDOM from "react-dom";
import computeAnchor from "../../../index";
import mockData from "./mock";

export default class ElementExample extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentAnchor: "",
    computeObj: null
  };

  ref;
  contentList = mockData("element");

  componentDidMount() {
    this.register();
  }

  componentWillUnmount() {
    this.state.computeObj();
  }

  register() {
    this.setState({
      computeObj: computeAnchor({
        element: ReactDOM.findDOMNode(this.ref),
        anchors: this.contentList.map(i => i.anchor),
        callback: anchor => {
          this.setState({ currentAnchor: anchor });
        }
      })
    });
  }

  render() {
    let btnName = this.state.computeObj ? "Dispose" : "Register";
    let labelName = this.state.computeObj ? "listening div.wheel:" : "disposed";
    return (
      <div
        className="element-example-wrapper"
        style={{ height: 400 }}
        ref={ref => (this.ref = ref)}
      >
        <div className="fixed-top current-anchor element-anchor">
          <div className="btn-ctn">
            <button
              className="dispose-btn"
              onClick={() => {
                if (this.state.computeObj) {
                  this.state.computeObj.dispose();
                  this.setState({
                    computeObj: null
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
        <ul className="element-example-content-list">
          {this.contentList.map(({ anchor, height }) => {
            let active = this.state.currentAnchor === anchor;
            return (
              <li
                id={anchor}
                className={
                  "element-example-content-item" + active ? "active" : ""
                }
              >
                <h3 className="element-example-content-title">{anchor}</h3>
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
