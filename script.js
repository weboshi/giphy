 // Initial array of reactions
      var reactions = ["Happy", "Sad", "Angry", "Lazy"];

      // displayReactionInfo function re-renders the HTML to display the appropriate content
      function displayReactionInfo() {

        var reaction = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific reaction button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var reactionDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var reactionImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item
            reactionImage.attr("src", results[i].images.fixed_height_still.url);
            reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
            reactionImage.attr("data-animate", results[i].images.fixed_height.url);
            reactionImage.attr("data-state", "still");
            reactionImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            reactionDiv.append(p);
            reactionDiv.append(reactionImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(reactionDiv);
          }
          // On click function that transforms gifs to stills that can be started on click
          $(".gif").on("click", function() {
                var state = $(this).data("state");

                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).data("state", "animate");
                    console.log("Switched state: " +$(this).data("state"));
                } else {
                    $(this).attr("src", $(this).data("still"));
                    $(this).data("state", "still");
                    console.log("Switched state: " + $(this).data("state"));
                }
                })
    });
    }

      // Function for displaying reaction info
      function renderButtons() {

        // Deleting the movies prior to adding new movies to prevent repeat buttons
        $("#buttons-view").empty();

        // Looping through the array of reactions and generating buttons
        for (var i = 0; i < reactions.length; i++) {
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("reaction");
          // Adding a data-attribute
          a.attr("data-name", reactions[i]);
          // Providing the initial button text
          a.text(reactions[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a reaction button is clicked
      $("#add-reaction").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var reaction = $("#reaction-input").val().trim();

        // Adding reaction from the textbox to our array
        reactions.push(reaction);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "reaction"
      $(document).on("click", ".reaction", displayReactionInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
