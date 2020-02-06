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
        field.addEventListener("click", onClickCallable)
        return new Field(x, y, field);
    }

    _createNewLine() {
        return document.createElement("br");
    }

}

class Field {

    constructor (x, y, element) {
        this.x = x;
        this.y = y;
        this.checked = false;
        this.element = element;
        this.element.setAttribute($BUTTON_X_ATTRIBUTE, x);
        this.element.setAttribute($BUTTON_Y_ATTRIBUTE, y);
    }

    get getElement() {
        return this.element;
    }

}

class ChessJumper {

    _onClick(e) {
        let selectedField = e.target;
        let x = selectedField.getAttribute($BUTTON_X_ATTRIBUTE);
        let y = selectedField.getAttribute($BUTTON_Y_ATTRIBUTE);
        this._move(x, y);
    }

    _move(x, y) {
        console.log(`${x} ${y}`);
    }

    start(squareSize) {
        this.board = new Board(squareSize);
        this.board.create($GAME_CLASS, $HTML_BUTTON_ELEMENT, $HTML_BUTTON_CLASS, this._onClick);
    }

}

const main = () => {
    const chessJumper = new ChessJumper();
    chessJumper.start(10);
}

document.addEventListener("DOMContentLoaded", main);