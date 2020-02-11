'use strict'

let $todoInput;
let $alertInfo;
let $addButton;
let $todoUlList;
let $popup;
let $popupInfo;
let $editedPopup;
let $popupInput;
let $addPopupButton;
let $closePopupButton;
let $taskCounter = 0;

const getDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addButton = document.querySelector('.addBtn');
    $todoUlList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupButton = document.querySelector('.accept');
    $closePopupButton = document.querySelector('.cancel');
};

const createDOMEvents = () => {
    $addButton.addEventListener("click", addNewTask);
    $todoUlList.addEventListener("click", clickListener);
    $closePopupButton.addEventListener("click", closePopup);
    $addPopupButton.addEventListener("click", updateTodo);
    $todoInput.addEventListener("keyup", enterCheck);
};

const addNewTask = () => {
    $alertInfo.innerHTML = "";
    let task = $todoInput.value;
    if(task != "") {
        let newTask = document.createElement("li");
        newTask.id = `task-${$taskCounter++}`;
        newTask.innerHTML = task;
        newTask.appendChild(getToolsButtons());
        $todoUlList.appendChild(newTask);
        $todoInput.value = "";
    } else 
        $alertInfo.innerHTML = "Add new task description!"
}

const getToolsButtons = () => {
    let toolsPanel = document.createElement("div");
    toolsPanel.classList.add("tools");

    let completeButton = getButton("complete", "fas fa-check");
    toolsPanel.appendChild(completeButton);

    let editButton = getButton("edit", null, "EDIT");
    toolsPanel.appendChild(editButton);

    let removeButton = getButton("delete", "fas fa-times");
    toolsPanel.appendChild(removeButton);

    return toolsPanel;
}

const getButton = (className, iconClass, text) => {
    let button = document.createElement("button");
    button.className = className;
    if(iconClass != null) {
        let icon = document.createElement("i");
        icon.className = iconClass;
        button.appendChild(icon);
    }
    if(text != null)
        button.innerHTML = text;
    return button;
}

const clickListener = (e) => {
    if(e.target.closest("button") != null ) {
        let closestButton = e.target.closest("button"); 
        if(closestButton.classList.contains("complete")) 
            markAsDone(closestButton.closest("li"));
        if(closestButton.classList.contains("edit")) 
            editTask(closestButton.closest("li"));  
        if(closestButton.classList.contains("delete")) 
            removeFromList(closestButton.closest("li"));
    }
};

const markAsDone = (liElement) => {
    liElement.className = "completed";
}

const editTask = (liElement) => {
    $editedPopup = liElement;
    $popupInput.value = liElement.firstChild.textContent;
    console.log($editedPopup);
    $popup.style.display = "flex";
};

const updateTodo = () => {
    if($popupInput.value !== '') {
        $popupInfo.innerText = "";
        $editedPopup.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
    } else {
        $popupInfo.innerText = "Provide new description";
    }
}

const closePopup = () => {
    $popup.style.display = "none";
}

const removeFromList = (liElement) => {
    $todoUlList.removeChild(liElement);
    if($todoUlList.childNodes.length <= 1)
        $alertInfo.innerText = "No tasks added.";
}

const enterCheck = (e) => {
    if(e.keyCode === 13)
        addNewTask();
}

const main = () => {
    getDOMElements();
    createDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);