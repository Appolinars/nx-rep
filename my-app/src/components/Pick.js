import { Component } from "react";

class Pick extends Component {
    render() {
        return (
            <div className='column'>
                <h2 className='title'>Выберите фигуру</h2>
                <button className='btn' onClick={() => this.props.pickFigure('square')}>Квадрат</button>
                <button className='btn' onClick={() => this.props.pickFigure('triangle')}>Треугольник</button>
                <button className='btn' onClick={() => this.props.pickFigure('rhomb')}>Ромб</button>
            </div>
        )
    }
}

export default Pick;