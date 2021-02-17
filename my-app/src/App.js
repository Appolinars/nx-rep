import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Pick from "./components/Pick";
import Element from "./components/Element";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { figure: "" };

    this.pickFigure = this.pickFigure.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Pick pickFigure = { this.pickFigure } />
        <Element figure = { this.state.figure } />
      </div>
    );
  }

  pickFigure(element) {
    this.setState({ figure: element });
  }
}

export default App;
