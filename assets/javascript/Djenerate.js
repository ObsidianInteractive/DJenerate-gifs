var topics=["dance","party","rave","music","drinks"];

$(document).ready(function() {
renderButtons();
	function renderButtons(){

    // create and appends new button
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
	topics.push(djStuff);	
	renderButtons();
      click();
});

// Makes AJAX call and appends gif. 
function click(){
	var form=document.getElementById("#dj-form")
       form.reset();
	}

$(document).on("click","button",function(){
	var clubstuff = $(this).attr("data");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        clubstuff + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
           var results = response.data;
     
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
// Plays and pauses GIFs
$(document).on("click",".gifClass", function() {
   
      var state = $(this).attr("data-state");
 
      if (state === "still") {
        $(this).delay("fast").attr("src", $(this).attr("data-animate"));
        $(this).delay("fast").attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});
