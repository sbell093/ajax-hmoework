// Array of cartoon characters
var cartoons = [
    "Doug", "Bugs Bunny", "Patrick Star", "Pink Panther", "Morty", "Rick Sanchez", "Stimpy", "Plankton", "Mario", "Bart Simpson"
];

function displayCharacters() {
    var topic = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6yVRfjLPM7rFGhOVsJD0CngXrM9l9I4m&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"

    })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='topic'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var carImg = $("<img>");
                carImg.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.append(carImg);

                $("#gif-here").prepend(gifDiv);
            }
        })
};

// Function for rendering buttons
function renderButtons() {
    $("#buttons-view").empty();

    for (let i = 0; i < cartoons.length; i++) {

        //Loop through array of characters
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data", cartoons[i]);
        a.text(cartoons[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-character").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#input").val().trim();
    cartoons.push(topic);

    // Calling renderButtons which handles the processing of our cartoon array
    renderButtons();
});

$(document).on("click", ".topic", displayCharacters);

// Calling the renderButtons function to display the intial buttons
renderButtons();







