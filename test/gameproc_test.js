//gameproc_test.js

//IMITATION OF GAME PROCESS

const GameProcess = require('./game.js');



function launchAutoTest(){

	let player1 = {
		name: 'hello',
		wins: 10,
		losses: 0
	}

	let player2 = {
		name: 'world',
		wins: 0,
		losses:10
	}

	//creates process
	const proc = new GameProcess(player1,player2);

	//shuffle cards
	proc.shuffle();
	//distribute each player 6 cards
	proc.distribute(null,true);
	//set the first player who has the most high rank of trump
	proc.setFirst(proc.getDeck('0').suit);

	//makeAutoAttack makes attack

	//if it first time in the set
	//select the first card
	//else look into the heap and 
	//select the same rank if attacker has one

	//@returns selected card or null if there is no suitable
	function makeAutoAttack(player,heap){
		console.log(player.name + " is hit");
		let cards = player.cards;


		let whichCard = undefined;

		for(let card of cards){
			if(!heap){
				whichCard = card;
				break;
			}else{
				for(let heapCard of heap){
					if(heapCard.rank === card.rank){
						whichCard = card;
						break;
					}
				}
			}
		}
		
		console.log(whichCard)
		if(whichCard){

			if(cards.length < 2 && !proc.getDeck()){
				player.winner = true;
			}

			return {
				...whichCard,
				username: player.name
			}
		}else{
			return null;
		}

		

	}

	//makeAutoDefence makes defence
	//@returns defendant card or null there is no suitable
	function makeAutoDefence(player,targetCard){
		console.log(player.name + " is beat");
		let cards = player.cards;
		let whichCard = undefined;

		for(let card of cards){
			if(proc.checkStep(targetCard,card)){
				whichCard = card;
				break;
			}else{
				continue;
			}
		}
		console.log(whichCard)
		if(whichCard){

			
			return {
				...whichCard,
				username: player.name
			}
		}else{
			return null;
		}

	}

	//count moves
	let counter = 0;

	//while attacker has any cards on his hands
	//game process continue
	while(proc.attacker.cards.length > 0){
		counter++;

		let heap = proc.heap.length > 0 ? proc.heap : null;
		let card = makeAutoAttack(proc.attacker,heap);
		//if no suitable card on the hands
		//attacker take cards from deck
		if(!card){
			proc.pickCards();
			continue;
		//else selected card goes to the heap	
		}else{
			proc.intoHeap(card);
		}
		
		let card2 = makeAutoDefence(proc.defendant,card);
		//if defender hasn't any suitable card to beat
		//hi takes all the heaped cards
		//and attacker receives new portion
		if(!card2){
			proc.takeHeap(proc.defendant);
			proc.distribute(proc.attacker);
		}else{
			continue;
		}
	}


	for(let player of proc.players){
		if(player.winner)console.log(player.name+" winner!");
	}
	console.log(counter);
	console.log("amount of cards on hands "+proc.defendant.cards.length)
	console.log("amount of cards on attacker hands "+proc.attacker.cards.length)
	console.log("amount of cards in the heap "+proc.heap.length)
	
	console.log('cards in the garbage heap: '+proc.garbage.length);

	





	/*while(!proc.getDeck()){

	}*/



}

launchAutoTest();