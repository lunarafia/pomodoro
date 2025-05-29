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