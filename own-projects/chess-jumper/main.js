'use strict'

const $GAME_CLASS = ".board";
const $HTML_BUTTON_ELEMENT = "button";
const $HTML_BUTTON_CLASS = "board-button";
const $HTML_MARKED_BUTTON_CLASS = "marked-button";
const $HTML_LAST_MARKED_BUTTON_CLASS = "last-marked-button";
const $HTML_HIGHLIGHTED_BUTTON_CLASS = "highlighted-button";
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
        field.innerHTML="<br>"
        field.addEventListener("click", onClickCallable, false)
        return new Field(x, y, field);
    }

    _createNewLine() {
        return document.createElement("br");
    }

    destroy() {
        for(let x = 0; x < this.board.length; x++) {
            for(let y = 0; y < this.board.length; y++) 
                this.mainElement.removeChild(this.board[x][y].getElement)
            this.mainElement.removeChild(this.mainElement.querySelector("br"));
        }
    }

    mark(x, y, text) {
        this.board[x][y].mark(text);
    }

    isInsideBoard(x, y) {
        return x >= 0 && x < this.squareSize && y >= 0 && y < this.squareSize;
    }

    isMarked(x, y) {
        return this.board[x][y].isMarked;
    }

    getField(x, y) {
        return this.board[x][y];
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

    mark(text) {
        this.marked = true;
        this.element.innerHTML = text;
    }

}

class ChessJumper {

    move(x, y) {
        if(this._allowMove(x, y)) {
            this._unhighlightAvailableMoves(); 
            this._unhighlightLastMove();
            this._setMove(x, y);
            this._setNextAvailableMoves();
            this._gameStateCheck();
            this._highlightAvailableMoves(); 
            this._highlightLastMove();
        } else {
            // TODO on already marked message
        }
    }    

    _allowMove(x, y) {
        return ((this.lastMove == undefined) || 
            (this.availableMoves.filter(field => field.x == x && field.y == y).length));
    }

    _unhighlightAvailableMoves() {
        this.availableMoves.forEach(field => {
            field.getElement.classList.remove($HTML_HIGHLIGHTED_BUTTON_CLASS);
        });
    }

    _unhighlightLastMove() {
        if(this.lastMove != undefined) {
            this.lastMove.getElement.classList.add($HTML_MARKED_BUTTON_CLASS);
            this.lastMove.getElement.classList.remove($HTML_LAST_MARKED_BUTTON_CLASS);
        }
    }

    _setMove(x, y) {
        this.lastMove = this.board.getField(x, y);
        this.board.mark(x, y, this.counter++);
    }

    _setNextAvailableMoves() {
        if(this.lastMove == undefined)
            return new Array();
        let lastMoveX = this.lastMove.x;
        let lastMoveY = this.lastMove.y;
        let coordinates = [-1, 1, -2, 2];
        let availableMoves = new Array();
        coordinates.forEach(x => 
            coordinates.forEach(y => {
                if((Math.abs(x) != Math.abs(y)) && 
                   (this.board.isInsideBoard(lastMoveX - x, lastMoveY - y)) &&
                   !(this.board.isMarked(lastMoveX - x, lastMoveY - y)))
                    availableMoves.push(this.board.getField(lastMoveX - x, lastMoveY - y))
            }
        ));
        this.availableMoves = availableMoves;
    }

    _gameStateCheck() {
        // TODO temporary solution
        if(this._isGameOver())
            alert(`Game over! Your score is ${(Math.round(this.counter*100) / (this.squareSize*this.squareSize))} points`);
        if(this._isGameWon())
            alert("You won!")
    }

    _isGameOver() {
        return !this.availableMoves.length && this.counter < (this.squareSize * this.squareSize);
    }

    _isGameWon() {
        return this.counter >= (this.squareSize * this.squareSize)
    }

    _highlightAvailableMoves() {
        this.availableMoves.forEach(field => {
            field.getElement.classList.add($HTML_HIGHLIGHTED_BUTTON_CLASS);
        });
    }

    _highlightLastMove() {
        if(this.lastMove != undefined) {
            this.lastMove.getElement.classList.remove($HTML_MARKED_BUTTON_CLASS);
            this.lastMove.getElement.classList.add($HTML_LAST_MARKED_BUTTON_CLASS); 
        }
    }

    start(squareSize, onClickEvent) {
        this.counter = 1;
        this.availableMoves = new Array();
        this.squareSize = squareSize;
        this.board = new Board(squareSize);
        this.board.create($GAME_CLASS, $HTML_BUTTON_ELEMENT, $HTML_BUTTON_CLASS, onClickEvent);
    }

    stop() {
        this.board.destroy();
        this.lastMove = undefined;
        this.counter = undefined;
    }

    restart(squareSize, onClickEvent) {
        this.stop();
        this.start(squareSize, onClickEvent);
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