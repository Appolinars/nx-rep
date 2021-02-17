import { Component } from "react";

class Element extends Component {
  render() {
    return (
      <div className="column">
        <h2 className="title">Выбранный элемент</h2>
        <div className={this.props.figure}></div>
      </div>
    );
  }
}

export default Element;
