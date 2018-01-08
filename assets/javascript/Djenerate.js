var topics=["dance","party","rave","music","drinks"];

$(document).ready(function() {
renderButtons();
	function renderButtons(){

		$("#buttons-view").empty();
		for(var i=0;i<topics.length;i++){
		var newButton=$("<button>");
		newButton.addClass("buttonsClass");
		newButton.attr("data", topics[i]);
		newButton.text(topics[i]);
		$("#buttons-view").append(newButton);
	}

	}

$("#find-dj").on("click",function(){
	event.preventDefault();	
	var djStuff=$("#dj-input").val();
	console.log(djStuff);
	topics.push(djStuff);	
	console.log(topics);
	renderButtons();
      click();
});

function click(){
	var form=document.getElementById("#dj-form")
       form.reset();
	}

$(document).on("click","button",function(){
	var clubstuff = $(this).attr("data");
	console.log(clubstuff);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        clubstuff + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
           var results = response.data;
           console.log(results);
           $("#gif-image-view").empty();
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p id='rate'>").text("Rating: " + rating);
            var personImage = $("<img>"); 
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still",results[i].images.fixed_height_still.url);
            personImage.attr("data-animate",results[i].images.fixed_height.url);
             personImage.attr("data-state","still");
            personImage.addClass("gifClass");
            gifDiv.prepend(p);
            gifDiv.append(personImage);
            $("#gif-image-view").prepend(gifDiv);
          }
        });
    });
//renderButtons();
$(document).on("click",".gifClass", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).delay("fast").attr("src", $(this).attr("data-animate"));
        $(this).delay("fast").attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});
