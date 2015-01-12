$(document).ready(function() {

	//what does this do?
	//returns the value as a string. if value is 11, 12, or 13, it makes it Jack, Queen, or King.
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	//adds objects to the deck class which each have a number and suit key which are defined in the loop.
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	//creates an empty copy array, loops through all values in the array backwards, creates a random number and adds that index of array into copy and
	//removes it from array so it doesn't use it again, randomizing the indexes of array.
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);
	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players
	for(var i = 0; i < deck.length; i++){
		if(i % 2 === 0){
			cards_player_1.push(deck[i]);
		} else {
			cards_player_2.push(deck[i]);
		}
	}
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(cardOne, cardTwo){
		if(cardOne.number > cardTwo.number)return cardOne;
		else if(cardTwo.number > cardOne.number)return cardTwo;
		else return false;	
	}
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
		var winner = false;
		winner = war(cards_player_1[0], cards_player_2[0]);
		if(winner === cards_player_1[0]){
			cards_player_1.push(cards_player_1.shift(),cards_player_2.shift());
		} else if(winner === cards_player_2[0]){
			cards_player_2.push(cards_player_1.shift(),cards_player_2.shift());
		} else {
			winner = war(cards_player_1[3], cards_player_2[3]);
			if(winner === cards_player_1[3]){
			cards_player_1.push(cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift());
			} else if(winner === cards_player_2[3]){
			cards_player_1.push(cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift(),cards_player_1.shift(),cards_player_2.shift());
			}
		}
		advance();
	}
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
