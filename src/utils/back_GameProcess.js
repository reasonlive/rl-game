//game processes and checking rules
///////////////////////////////////
//imports to the GamePage Component

export default class GameProcess {

	constructor(player1,player2){

		this.player1 = {...player1,cards:[]};
		this.player2 = {...player2,cards:[]};
		this.players = [this.player1,this.player2];
		this.deck = this.initDeck();
		this.heap = [];
	}



	initDeck(){
		let suits = ['spades', 'clubs', 'diams', 'hearts'];
		let result = [];
		for(let suit of suits){
			for(let i=6;i<=14;i++){
				let rank = ""+i;
				if(i === 11)rank = 'J';
				if(i === 12)rank = "Q";
				if(i === 13)rank = "K";
				if(i === 14)rank = "A";
				
				result.push({rank:rank,suit:suit,trump:false});
			}
		}
		return result;
	}



	getDeck(pos){
		if(pos){
			return this.deck[pos];
		}else{
			return this.deck;
		}
		
	}

	//after taking the last deck card
	unsetDeck(){
		this.deck = null;
	}

	//after the second player is in 
	//and game has started
	shuffle(){


		let length = this.deck.length;

		let randVals = [],shuffledDeck = [];

		for(let i=0;i<length;i++){
			let randNum = Math.random()*(length-1);
			randNum = randNum.toFixed(0);
			if(randVals.includes(randNum)){
				--i;
				continue;
			}
			randVals.push(randNum)

		}

		for(let i=0;i<length;i++){
			shuffledDeck.push(this.deck[randVals[i]]);
		}

		//set up trump
		let trump = shuffledDeck[0].suit;
		
		for(let card of shuffledDeck){
			if(card.suit === trump){
				card.trump = true;
			}
		}

		
		this.deck = shuffledDeck;
	}

	distribute(player,init){
		if(init){
			for(let i =0;i<6;i++){
				this.player1.cards.push(this.deck.pop());
				this.player2.cards.push(this.deck.pop());
			}
			return;
		}else{
			if(!this.deck){
				player.winner = true;
				return player;
			}
			let remained = player['cards'].length;
			let needAmount = 6 - remained;
			if(this.deck && this.deck.length > needAmount){
				for(let i=0;i<needAmount;i++){
					player.cards.push(this.deck.pop());
				}
			}else{
				let deckRemained = this.deck && this.deck.length;
				for(let i=0;i<deckRemained;i++){
					player.cards.push(this.deck.pop());
				}
				this.unsetDeck();
			}
			
		}
	}


	//take away all the unbeatten cards
	takeHeap(player){
		let length = this.heap.length;
		for(let i=0;i<length;i++){
			player.cards.push(this.heap.pop());

		}
		this.heap = [];
	}

	//put card into main heap
	//when activeCards is 
	intoHeap(card){	
		this.heap.push(card);
	}



	transCharIntoInt(char){
		//if(!isNaN(char))return char;
		switch(char){
			case 'J':return 11;
			case 'Q':return 12;
			case 'K':return 13;
			case 'A':return 14;
			default:return parseInt(char);
		}
	}

	transIntIntoChar(int){
		switch(int){
			case 11: return 'J';
			case 12: return 'Q';
			case 13: return 'K';
			case 14: return 'A';
			default:return int.toString();
		}
	}

	setFirst(trump){	
		let trumps = [];

		for(let player of this.players){
			for(let card of player.cards){
				if(card.suit === trump){
					trumps.push({player: player.name,rank:card.rank});
				}
			}
		}
		//console.log(trumps)
		let trumpedCards = [];
		//console.log(`trumps length is :${trumps.length}`)
		if(trumps.length < 1){
			this.players[0].first = true;
			return;
		}

		for(let i=0;i<trumps.length;i++){
			let cardRank = this.transCharIntoInt(trumps[i].rank);
			trumpedCards.push(cardRank);
		}
		

		
		let greatest = Math.max(...trumpedCards);
		greatest = this.transIntIntoChar(greatest);

		let first = null;
		
		for(let cards of trumps){
			//console.log(cards)
			if(cards.rank == greatest){
				//console.log(cards.rank)
				for(let player of this.players){
					if(player.name === cards.player){
						player.first = true;
						first = player;
						break;
					}
				}
			}
		}

		return first;
	}


	//checking rules and player steps
	//hit card as attack card
	//beaten card as defend card
	checkStep(hitCard, beatenCard){
		
		let hitValue = this.transCharIntoInt(hitCard.rank);
		let beatenValue = this.transCharIntoInt(beatenCard.rank);
		

		if(hitValue < beatenValue && hitCard.suit === beatenCard.suit){
			return true;
		}

		if(hitCard.trump == 'false' && beatenCard.trump == 'true'){
			return true;
		}

		if(hitCard.trump == 'true' && beatenCard.trump == 'true' && hitValue < beatenValue){
			return true;
		}

		return false;
		

		
	}


}




