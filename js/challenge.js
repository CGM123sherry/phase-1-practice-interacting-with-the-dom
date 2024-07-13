
//convert array like objects to objects
function _toConsumableArray(arr) { 
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
    }
    return Array.from(arr);
}
// Boolean to track if the counter is running (true) or paused (false).
var playing = !0, 
// Function to start the timer.
timer = function() { 
    return setInterval(function() {
        // Get the counter element.
        var counter = document.getElementById("counter"), 
        // Parse its inner text to an integer.
            value = parseInt(counter.innerText); 
            // Increment the counter's text by 1.
        counter.innerText = value + 1; 
    }, 1000); // Execute every 1000 milliseconds (1 second).
},
// Start the timer and store the interval ID.
interval = timer(), 
// Get the minus button element.
minus = document.getElementById("minus"), 
// Get the plus button element.
plus = document.getElementById("plus"), 
// Get the heart (like) button element.
heart = document.getElementById("heart"), 
// Get the pause button element.
pause = document.getElementById("pause"), 
// Get the first form element.
commentForm = document.getElementsByTagName("form")[0]; 

// Add a click event listener to the minus button.
minus.addEventListener("click", function() { 
// Get the counter element.
    var counter = document.getElementById("counter"), 
    // Parse its inner text to an integer.
        value = parseInt(counter.innerText); 
// Decrement the counter's text by 1.
    counter.innerText = value - 1; 
});

// Add a click event listener to the plus button.
plus.addEventListener("click", function() { 
// Get the counter element.
    var counter = document.getElementById("counter"), 
    // Parse its inner text to an integer.
        value = parseInt(counter.innerText); 
        // Increment the counter's text by 1.
    counter.innerText = value + 1; 
});

    // Add a click event listener to the heart button.
heart.addEventListener("click", function() { 
    // Get the counter element.
    var counter = document.getElementById("counter"), 
    // Parse its inner text to an integer.
        value = parseInt(counter.innerText), 
    // Get the likes list element.
        likesList = document.querySelector(".likes"), 
        existingLikeItem;

    // Check if the current counter value already has a like item in the list.
    if ([].concat(_toConsumableArray(likesList.children)).map(function(item) {
        return parseInt(item.dataset.num);
    }).includes(value)) {
        // Find the existing like item.
        existingLikeItem = document.querySelector('[data-num="' + value + '"]'); 
    // Get the current like count.
        var count = parseInt(existingLikeItem.children[0].innerText); 
        existingLikeItem.innerHTML = value + ' has been liked <span>' + (count + 1) + '</span> times'; // Update the like count.
    } else {
    // Create a new like item.
        existingLikeItem = document.createElement("li"); 
        // Set a data attribute with the counter value.
        existingLikeItem.setAttribute("data-num", value); 
        // Set the initial like count.
        existingLikeItem.innerHTML = value + ' has been liked <span>1</span> time'; 
        // Append the new like item to the likes list.
        likesList.appendChild(existingLikeItem); 
    }
});

    // Add a click event listener to the pause button.
pause.addEventListener("click", function() { 
    if (playing) {
        // Set playing to false.
        playing = !1; 
        // Clear the timer interval.
        clearInterval(interval); 
        // Change button text to "resume".
        this.innerText = "resume"; 
    } else {
        playing = !0; // Set playing to true.
        interval = timer(); // Restart the timer.
        this.innerText = "pause"; // Change button text to "pause".
    }

    // Enable or disable all buttons except the pause button.
    [].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(btn) {
        if (btn.id !== "pause") btn.disabled = !playing;
    });
});

// Add a submit event listener to the comment form.
commentForm.addEventListener("submit", function(event) { 
    // Prevent the form from submitting normally.
    event.preventDefault(); 
    // Get the form input element.
    var input = this.children[0], 
    // Get the input value.
        text = input.value; 
        // Clear the input field.
    input.value = ""; 
    // Get the comments list element.
    var commentsList = document.querySelector(".comments"), 
// Create a new paragraph for the comment.
        comment = document.createElement("p"); 
        // Set the paragraph text to the input value.
    comment.innerText = text; 
    // Append the new comment to the comments list.
    commentsList.appendChild(comment); 
});
