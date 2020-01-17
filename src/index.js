import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// // class Square extends React.Component {
// //     render() {
// //         return (
// //             <button
// //                 className="square"
// //                 onClick={()=> this.props.onClick()}
// //                 // we replaced the numbers with an “X” mark determined by Square’s own state.
// //                 // This is why Square currently ignores the value prop passed to it by the Board.
// //                 >
// //             {this.props.value}
// //             {/*show that value from Board
// //              Passing a prop from a parent Board component to a child Square component*/}
// //             </button>
// //     );
// //     }
// // }
// //we can write a function that takes props as input and returns what should be rendered
//
// function Square(props){
//     return(
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }
//
// class Board extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state={
//     //         squares: Array(9).fill(null),
//     //         xIsNext: true,
//     //     };
//     //     //we’ll maintain the value of each of the 9 squares in one location
//     //     // the best approach is to store the game’s state in the parent Board component instead of in each Square
//     //     // we need to declare the shared state in their parent component instead
//     //     // The parent component can pass the state back down to the children by using props;
//     //     // this keeps the child components in sync with each other and with the parent component
//     // }
//
//     renderSquare(i) {
//         return (
//             <Square
//             value={this.props.squares[i]}
//             onClick={() =>this.props.onClick(i)}
//             />
//         );
//         //pass prop value to Square
//     }
//
//     render() {
//         return (
//             <div>
//                 {/*<div className="status">{status}</div>*/}
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }
//
// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             history: [{
//                 squares: Array(9).fill(null),
//             }],
//             xIsNext: true,
//         };
//     }
//
//     handleClick(i) {
//         const history = this.state.history;
//         const current = history[history.length-1];
//         const squares= this.state.squares.slice();
//         // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
//
//         if(calculateWinner(squares) || squares[i]){
//             return;
//         }
//
//         // return early by ignoring a click if someone has won the game or if a Square is already filled
//
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         //“X”s and “O”s can take turns now
//
//         this.setState({
//             history:history.concat([{
//                 squares:squares,
//             }]),
//             xIsNext: !this.state.xIsNext,
//         });
//     }
//
//     render() {
//         const history = this.state.history;
//         const current = history[history.length-1];
//         const winner = calculateWinner(current.squares);
//         let status;
//         if(winner){
//             status = 'Winner: ' + winner;
//         }else{
//             status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
//         }
//
//         return (
//             <div className="game">
//             <div className="game-board">
//
//                 <Board
//                 squares={current.squares}
//                 onClick={(i)=>this.handleClick(i)}
//                 />
//
//             </div>
//             <div className="game-info">
//             <div>{status}</div>
//             <ol>{/* TODO */}</ol>
//             </div>
//             </div>
//     );
//     }
// }
//
// // ========================================
//
// ReactDOM.render(
// <Game />,
//     document.getElementById('root')
// );
//
// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null;
// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
    this.setState({
        stepNumber:step,
        xIsNext:(step%2)===0,
    })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move)=>{
            const desc = move ? 'Go to move #' +move : 'Go to game start';
            return(
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
