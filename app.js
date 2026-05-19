//Timer
window.onload = () => {
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const reset = document.getElementById("reset");
    const timer = document.getElementById("timer");

    let timeLeft = 20 * 60; // Default to 20 minutes
    let interval;

    const updateTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timer.innerHTML = 
        `${minutes.toString().padStart(2,"0")}
        :
        ${seconds.toString().padStart(2,"0")}`;
    };

    const startTimer = () => {
        const userInput = document.getElementById("userInput");
        const minutes = parseInt(userInput.value);

        if(!isNaN(minutes) && minutes > 0) {
            timeLeft = minutes * 60;
            updateTimer();

        interval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if(timeLeft === 0){
                clearInterval(interval);
                document.getElementById("ding-sound").play();
                alert("Time's up!");
                timeLeft = 20 * 60;
                updateTimer();
            }
        }, 1000);   
        
        } else {
            alert("Please enter a valid number of minutes.");
        }
       
    };

    const stopTimer = () => clearInterval(interval);

    const resetTimer = () => {
        clearInterval(interval);
        timeLeft = 20 * 60;
        updateTimer();
    }

    start.addEventListener("click", startTimer);
    stop.addEventListener("click", stopTimer);
    reset.addEventListener("click", resetTimer);

    updateTimer();
  
} 

 //To do list
(function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");

    function updateCounters() {
        const completedTasks = listContainer.querySelectorAll("li.completed").length; // count completed tasks only inside the list
        const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length; // count uncompleted tasks only inside the list

        completedCounter.textContent = completedTasks;
        uncompletedCounter.textContent = uncompletedTasks;
    }

    function addTask() {
        const task = inputBox.value.trim(); //trim removes whitespace from both ends of a string
        
        if (!task) {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");
        
        li.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${task}</span>
            </label>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>
        `;

        listContainer.appendChild(li);
        inputBox.value = ""; //clears input box after adding task

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const taskSpan = li.querySelector("span");
        const deleteBtn = li.querySelector(".delete-btn");

        checkbox.addEventListener("click", function () {
            li.classList.toggle("completed", checkbox.checked); //toggle adds completed class to list item 
            updateCounters();
        });

        editBtn.addEventListener("click", function () {
            const update = prompt("Edit task:", taskSpan.textContent);

            if (update !== null) {
                taskSpan.textContent = update;
                li.classList.remove("completed");
                checkbox.checked = false;
            }
        });

        deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task?")) {
                li.remove();
                updateCounters();
            } 
        });
    }

    window.addTask = addTask;
    updateCounters();
})();

    