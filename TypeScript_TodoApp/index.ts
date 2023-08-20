const form = document.querySelector<HTMLFormElement>("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tododata = {
      todo: "",
      status: false,
    };

    const todoInput = document.getElementById("floating_outlined") as HTMLInputElement;;
    const statusInput = document.getElementById("default-checkbox") as HTMLInputElement;;

    if (todoInput && statusInput) {
      tododata.todo = todoInput.value ;
      tododata.status = statusInput.checked;
      postTodo(tododata);
    }
  });
}

async function postTodo(tododata:{todo:string, status:boolean}) {
  try {
    const response = await fetch("https://todo-app-wwun.onrender.com/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tododata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    alert("Todo Added !")
    window.location.href = "index.html"
  } catch (error) {
    console.log(error);
  }
}


