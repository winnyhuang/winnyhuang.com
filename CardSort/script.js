$(document).ready(function() {

$(window).load(function(){
	// array of card representations
	//var cards = ["H2", "H3", "H4", "H5", "H6", "S2", "S3", "S4", "S5", "S6", "C2", "C3", "C4", "C5", "C6", "D2", "D3", "D4", "D5", "D6"];
	var cards = ["two_hearts", "three_hearts", "four_hearts", "five_hearts", "six_hearts",
				 "two_spades", "three_spades", "four_spades", "five_spades", "six_spades",
				 "two_clubs", "three_clubs", "four_clubs", "five_clubs", "six_clubs",
				 "two_diamonds", "three_diamonds", "four_diamonds", "five_diamonds", "six_diamonds"]
	
	$("#card1").click(function() {
		discard("card1");
	});
	
	$("#card2").click(function() {
		discard("card2");
	});
	
	$("#card3").click(function() {
		discard("card3");
	});
	
	$("#card4").click(function() {
		discard("card4");
	});
	
	$("#card5").click(function() {
		discard("card5");
	});
	
	$("#deal_pile").click(function() {
		deal();
	});
	
	// choose 5 random cards and instantiate them in positions
	function initialize() {
		$.each(["card1", "card2", "card3", "card4", "card5"], function() {
			var card = getRandomCard();
			$("#"+this).append($("#"+card));
		});
	}
	
	// given divID, discards card at that div
	function discard(divID) {
		//$("#"+divID).children().hide("slow");
		$("#"+divID).children().animate({
			"top": $("#discard_pile").offset().top,
			"left": $("#discard_pile").offset().left
			}, "slow", "linear", function() {
				$("#"+divID).empty();
				//$("#discard_pile").append($("#"+divID).children());
			});
		
		
		//$("#discard_pile").children().show();
	}
	
	function deal() {
		// containers with hidden (missing) cards
		var hidden = $(".hand").filter(function(index) {
			return $(this).children().length == 0;
		});
		var newCard = getRandomCard();
		
		// no hidden cards, so replace a random card
		if (hidden.length == 0) {
			
			// get random number between 1-5 inclusive
			var randomIndex = Math.floor(Math.random()*5) + 1;
			replaceCard("card" + randomIndex, newCard);
		}
		
		// there is at least one empty space, new card should take one of those spaces
		else {
			var space = hidden[Math.floor(Math.random() * hidden.length)];
			replaceCard(space.id, newCard);
		}
	}
	
	// divID is id of card to replace (card1, card2, etc.)
	// newCard is string representation of new card ("H3", "C3")
	function replaceCard(divID, newCard) {

		// container doesn't have card, go ahead and append
		if ($("#"+divID).children().length == 0) {
			
			$("#"+newCard).show();
			$("#"+newCard).css({
				"position": "absolute",
			});
			$("#"+newCard).animate({
				"top": $("#"+divID).offset().top,
				"left": $("#"+divID).offset().left
			}, "slow", function() {
				$("#"+divID).append($("#"+newCard));
			});
		}
		// container still has card, discard it and append
		else {

			$("#"+divID).children().animate({
				"top": $("#discard_pile").offset().top,
				"left": $("#discard_pile").offset().left
			}, "slow", "linear", function() {
				$("#"+divID).empty();

				$("#"+newCard).css({
					"position": "absolute",
				});
				$("#"+newCard).show();
				$("#"+newCard).animate({
					"top": $("#"+divID).offset().top,
					"left": $("#"+divID).offset().left
				}, "slow", function() {
					$("#"+divID).append($("#"+newCard));
				});
			});	
		}
	}
	
	// removes and returns random card from cards array
	function getRandomCard() {
		var index = Math.floor(Math.random()*cards.length);
		return cards.splice(index, 1);
	}
	
	initialize();
});
});