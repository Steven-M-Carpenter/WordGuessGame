
    // Set the global variables to be used in the code
    var totalWins = 0;
    var totalLosses = 0;
    var guessesRemaining = 12;
    var guessedLetters = [];
    var lettersInWord = [];
    var letterIndices = [];
    var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var validWords = ["profound","behavior","confront","frighten","daughter","graduate","faithful","vertical","grateful","reaction","elephant","restrain","language","official","civilian","license","express","habitat","address","apology","despise","crevice","popular","hallway","musical","scatter","cabinet","deliver","protest","capture","uniform","develop","replace","account","provide","interrupt","computing","classroom","radiation","performer","executrix","privilege","available","variation","landowner","incapable","monstrous","blackmail","condition","modernize","willpower","ambiguous","fascinate","departure","sentiment","battlefield","legislature","declaration","personality","fluctuation","expenditure","hypothesize","responsible","consumption","mathematics","contraction","distributor","shareholder","preparation","acquisition","astonishing","celebration","stimulation","examination","disposition","application","observation","grandfather","development","institution","compartment","arrangement","temperature","replacement","expectation","environment","orientation","participate","fashionable","established","interactive","exploration","legislation","commemorate","circulation","deprivation","incongruous","coincidence","inspiration","improvement","respectable","requirement","cooperation","armory", "ballistic", "charcol", "davenport", "elephant", "neighborly", "passenger", "abnormal", "resident", "faithful", "business", "compound", "security", "physical", "skeleton", "frighten", "suitcase", "threaten", "literacy", "category", "profound", "approval", "function", "conflict", "fragrant", "contrast", "discreet", "midnight", "original", "national", "adoption", "generate", "quantity", "separate", "distinct", "division", "unlikely", "settlement", "basketball", "presidency", "substitute", "motorcycle", "incredible", "compromise", "dictionary", "retirement", "separation"];
    var audioWin = new Audio("./assets/TaDa.mp3");
    var audioLoss = new Audio("./assets/TrapDoorCreak.mp3");

    // Define the function to update letters guessed
    function updateLettersGuessed() {
        var html = "Letters Guessed:  " + guessedLetters;
        document.getElementById("p_lettersGuessed").textContent = html;
        // document.querySelector("#p_lettersGuessed").innerHTML = html;
    }


    // Define the function to update guesses remaining
    function updateGuessesRemaining() {
        var html = "Guesses Remaining:  " + guessesRemaining;
        document.getElementById("p_guessesRemaining").textContent = html;
        // document.querySelector("#p_guessesRemaining").innerHTML = html;
    }


    // Define the function to update win/loss stats
    function updateStats() {
        var html_1 = "Wins:  " + totalWins;
        var html_2 = "Losses:  " + totalLosses;
        document.getElementById("p_wins").textContent = html_1;
        document.getElementById("p_losses").textContent = html_2;
        // document.querySelector("#p_wins").innerHTML = html_1;
        // document.querySelector("#p_losses").innerHTML = html_2;
    }


    // Define the function to update a given letter block
    function pokeLetter(letter, boxNum) {
        var matchedLetter = letter.toUpperCase();
        var targetBox = "ltr" + boxNum;
        var html = matchedLetter;
        document.getElementById(targetBox).textContent = html;
        // document.querySelector("#" + targetBox).innerHTML = html;
    }

    // Define the function to see if the letter has been guessed
    function hasLetterBeenGuessed(letter) {
        var letterPresent = guessedLetters.includes(letter);
        return letterPresent;
    }

    // Define the function to see if the letter is in the word
    function isLetterInWord(letter) {
        letterIndices = [];
        var indexVals = lettersInWord.indexOf(letter);
        if (indexVals != -1) {
            while (indexVals != -1) {
                letterIndices.push(indexVals);
                indexVals = lettersInWord.indexOf(letter, indexVals + 1);
            }
            return true;        
        }
        else {
            return false;
        }
    }

    // Populate the first word from the valid word array 
    function pickRandomWord() {
        chosenWord = validWords[Math.floor(Math.random() * validWords.length)];
        console.log("chosenWord: " + chosenWord);
        return chosenWord;
    }

    // Break the chosen word down and populate comparison array
    function breakIntoLetters(wordSelected) {
        for (i = 0; i <= wordSelected.length; i++) {
            componentLetter = wordSelected.charAt(i);
            lettersInWord.push(componentLetter);
            letterTracker = lettersInWord;
        }
    }

    // Get the number of letters in the chosen word and tailor the screen
    function countLetters() {
        lenOfWord = chosenWord.length;
        hideCount = 11 - lenOfWord;
        var tempCalc = 10 - hideCount;
        for (i = 10; i > tempCalc; i--) {
            var elementID = "ltr" + i;
            document.getElementById(elementID).style.visibility = "hidden";
        }
    }

    // Reset the game when time to play again
    function gameReset() {
        guessesRemaining = 12;
        guessedLetters = [];
        lettersInWord = [];
        letterTracker = [];
        letterIndices = [];
        for (i = 0; i < 11; i++) {
            elementID = "ltr" + i;
            document.getElementById(elementID).style.visibility = "visible";
            document.getElementById(elementID).textContent = "___";
        }
    }


//*******************************************************************************************
// Start the main game
//*******************************************************************************************

    updateStats();
    breakIntoLetters(pickRandomWord());
    countLetters();
    var remainingLength = (lettersInWord.length - 1);  //Set to length of the word
    var wordLength  = (letterTracker.length - 1);  //Set to length of the word
    guessesRemaining = (lettersInWord.length + 4);  //Set turn count to word length + 5
    updateGuessesRemaining();


    document.onkeyup = function (event) {
        var rawUserGuess = event.key
        var userGuess = rawUserGuess.toLowerCase();
        var validLetter = validLetters.indexOf(userGuess);
        var alreadyChosen = hasLetterBeenGuessed(userGuess);


        if (alreadyChosen === true) {
            validLetter = -1;
        }
        else {
        }


            if (validLetter > -1) {
                guessedLetters.push(userGuess);
                updateLettersGuessed();
                guessesRemaining--;

                var confirmedInWord = isLetterInWord(userGuess);

                if (confirmedInWord === true) {
                    for (i = 0; i < letterIndices.length; i++) {
                        var letterPosition = letterIndices[i];
                        pokeLetter(userGuess, letterPosition);
                    }
                    for (i = 0; i < letterIndices.length; i++) {
                        posToRemove = lettersInWord.lastIndexOf(userGuess);
                        wordLength--;
                        remainingLength--;
                    }
                }
            }
            updateLettersGuessed()
            //If you run out of guesses 
            if ((guessesRemaining < 1) && (wordLength >= 0)) {
                audioLoss.play();
                totalLosses++;
                alert("You lost!  The word was:  " + chosenWord);
                gameReset();
                updateStats();
                updateLettersGuessed()
                // pickRandomWord();
                breakIntoLetters(pickRandomWord());
                countLetters();
                remainingLength = (lettersInWord.length - 1);
                wordLength  = (letterTracker.length - 1);
                guessesRemaining = (lettersInWord.length + 4);
            }

            //If you win 
            if (wordLength === 0) {
                audioWin.play();
                totalWins++;
                document.body.style.backgroundColor = "green";
                window.setTimeout(function(){document.body.style.backgroundColor = "white";},300);
                gameReset();
                updateStats();
                updateLettersGuessed()
                // pickRandomWord();
                breakIntoLetters(pickRandomWord());
                countLetters();
                remainingLength = (lettersInWord.length - 1);
                wordLength  = (letterTracker.length - 1);
                guessesRemaining = (lettersInWord.length + 4);
            }
            updateGuessesRemaining();
        }


