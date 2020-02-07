'use strict'

const $GAME_CLASS = ".board";
const $HTML_BUTTON_ELEMENT = "button";
const $HTML_BUTTON_CLASS = "board-button";

const $BUTTON_X_ATTRIBUTE = "button-x";
const $BUTTON_Y_ATTRIBUTE = "button-y";


class Board {

    constructor (squareSize) {
        this.squareSize = squareSize;
    }

    create(insideSelector, elementName, elementClass, onClickCallable) {
        this.insideSelector = insideSelector;
        this.mainElement = document.querySelector(insideSelector);
        this.board = new Array(this.squareSize);

        for(let x = 0; x < this.board.length; x++) {
            this.board[x] = new Array(this.squareSize);
            for(let y = 0; y < this.board.length; y++) {
                this.board[x][y] = this._createField(elementName, elementClass, x, y, onClickCallable);
                this.mainElement.appendChild(this.board[x][y].getElement)
            }
            this.mainElement.appendChild(this._createNewLine());
        }
    }

    _createField(elementName, elementClass, x, y, onClickCallable) {
        let field = document.createElement(elementName);
        field.classList.add(elementClass);
        field.addEventListener("click", onClickCallable, false)
        return new Field(x, y, field);
    }

    _createNewLine() {
        return document.createElement("br");
    }

    mark(x, y) {
        if(this._isInsideBoard(x, y)) {
            if(this._allowMove(x, y)) {
                this.board[x][y].mark();
                this.lastMove = this.board[x][y];
            }
        }
    }

    _isInsideBoard(x, y) {
        return x >= 0 && x < this.squareSize && y >= 0 && y < this.squareSize;
    }

    _allowMove(x, y) {
        const fitPoints = (a, b) => {
            if(this.lastMove.x == a + 2 && this.lastMove.y == b + 1)
                return true;
            if(this.lastMove.x == a + 2 && this.lastMove.y == b - 1)
                return true;    
            if(this.lastMove.x == a - 2 && this.lastMove.y == b + 1)
                return true;
            if(this.lastMove.x == a - 2 && this.lastMove.y == b - 1)
                return true;
            return false;
        }

        if(this.lastMove != undefined) {
            return fitPoints(x, y) || fitPoints(y, x);
        } else
            return true;
    }

}

class Field {

    constructor (x, y, element) {
        this.x = x;
        this.y = y;
        this.marked = false;
        this.element = element;
        this.element.setAttribute($BUTTON_X_ATTRIBUTE, x);
        this.element.setAttribute($BUTTON_Y_ATTRIBUTE, y);
    }

    get getElement() {
        return this.element;
    }

    get isMarked() {
        return this.marked;
    }

    mark() {
        this.element.classList.add("marked-button");
        this.marked = true;
    }

}

class ChessJumper {

    move(x, y) {
        if(this.board.lastMove != undefined)
            console.log(`previous: ${this.board.lastMove.x}x${this.board.lastMove.y} | current: ${x}x${y}`);
        this.board.mark(x, y);
    }

    start(squareSize, onClickEvent) {
        this.board = new Board(squareSize);
        this.board.create($GAME_CLASS, $HTML_BUTTON_ELEMENT, $HTML_BUTTON_CLASS, onClickEvent);
    }

}

const main = () => {
    const chessJumper = new ChessJumper();

    const onClick = (e) => {
        let selectedField = e.target;
        let x = selectedField.getAttribute($BUTTON_X_ATTRIBUTE);
        let y = selectedField.getAttribute($BUTTON_Y_ATTRIBUTE);
        chessJumper.move(x, y);
    }

    chessJumper.start(10, onClick);
}

document.addEventListener("DOMContentLoaded", main);