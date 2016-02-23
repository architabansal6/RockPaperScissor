
var Game = function(choiceX,choiceY,callback){

	var getComputerChoice = function(){
		return Math.random();
	}

	if(choiceY){

		console.log(choiceY);
		
	}else{
		choiceY = getComputerChoice();
		if (choiceY < 0.34) {
			choiceY = "rock";
		} else if(choiceY <= 0.67) {
			choiceY = "paper";
		} else {
			choiceY = "scissors";
		}

		console.log("computer choiceY" + choiceY);

	    
	    
	}


	var compare = function(choice1,choice2,callback){
	    if(choice1 == choice2){
	        // document.write("The result is a tie!");
	        // alert("that was a tie! Play again");
	        // userChoice = getUserChoice();
	        // computerChoice = getComputerChoice();
	        // compare(userChoice,computerChoice);
	        console.log("its a tie");

	        callback("tie");
	    }
	    else if(choice1 == "rock"){
	        if(choice2 == "scissors"){
	        	console.log("2 a scissor but rock wins");
	            callback("rock wins");
	            
	        }
	        else{
	        	console.log("2 a scissor but paper wins");
	            callback("paper wins");
	        }
	    }
	    else if(choice1 == "paper"){
	        if(choice2 == "rock"){
	            callback("paper wins");
	        }
	        else{
	            callback("scissors wins");
	        } 
	    }
	    else{
	        if(choice2 == "rock"){
	            callback("rock wins");
	        }
	        else{
	            callback("scissors wins");
	        } 
	    }

	}

	var resultt = compare(choiceX,choiceY,function(result){

		// console.log("result" + result);
		callback(result);
	}); 
	
};

exports.Game = Game;



