"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const tododata = {
            todo: "",
            status: false,
        };
        const todoInput = document.getElementById("floating_outlined");
        ;
        const statusInput = document.getElementById("default-checkbox");
        ;
        if (todoInput && statusInput) {
            tododata.todo = todoInput.value;
            tododata.status = statusInput.checked;
            postTodo(tododata);
        }
    });
}
function postTodo(tododata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tododata),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            alert("Todo Added !");
            window.location.assign("todolist.html");
        }
        catch (error) {
            console.log(error);
        }
    });
}
