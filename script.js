var mainPageBttn = document.getElementById("initial-page-bttn"),
    roundPageBttn = document.getElementById("game-bttn"),
    gamePageBttn = document.getElementById("play-bttn"),
    roundUp = document.getElementById("number-up"),
    roundDown = document.getElementById("number-down"),
    roundInput = document.getElementById("number-input");


//Button to go back to the main page
mainPageBttn.addEventListener("click", backToMainPage);
function backToMainPage(){
    var roundsPage = document.getElementsByClassName("rounds-page"),
        mainPage = document.getElementsByClassName("main-page"),
        gamePage = document.getElementsByClassName("game-page");

    for (let i = 0; i < roundsPage.length; i++){
        roundsPage[i].style.display = "none";
    }

    for (let a = 0; a < mainPage.length; a++){
        mainPage[a].style.display = "flex";
        console.log(mainPage[a]);
    }
    for (let i = 0; i < gamePage.length; i++){
        gamePage[i].style.display = "none";
    }
    document.getElementById("content-space").style.display = "block";
}
//Button to go to Round Page
roundPageBttn.addEventListener("click", toRoundPage);
function toRoundPage(){
    /*Reset:*/
    roundInput.value = 1;

    /*Button functionality*/

    var roundsPage = document.getElementsByClassName("rounds-page"),
        mainPage = document.getElementsByClassName("main-page");

    for (let i = 0; i < roundsPage.length; i++){
        roundsPage[i].style.display = "block";
        console.log(roundsPage[i]);
    }
    for (let a = 0; a < mainPage.length; a++){
        mainPage[a].style.display = "none";
        //console.log(mainPage[a]);
    }

}
    //"How many rounds?" Controler
    roundInput.addEventListener("input", limitRounds);
    function limitRounds(){
        var roundInput = document.getElementById("number-input");

        if (roundInput.value == 0){
            roundInput.value = 1;
        }
        if (roundInput.value > 100){
            roundInput.value = 100;
        }
    }
    roundUp.addEventListener("click", moreOneRound);
    function moreOneRound(){
            var roundInput = document.getElementById("number-input");
        
            if (roundInput.value == ""){
                roundInput.value = 1;
            }
            else{
                roundInput.style.borderColor = "black";
                roundInput.value = parseInt(roundInput.value) + 1;
            }
    }
    roundDown.addEventListener("click", lessOneRound);
    function lessOneRound(){
        var roundInput = document.getElementById("number-input");

        if (roundInput.value == 1){
            roundInput.style.borderColor = "red";

            function blackAgain(){
                roundInput.style.borderColor = "black";
            }
            setTimeout(blackAgain, 200);
        }
        else{
            roundInput.value = parseInt(roundInput.value) - 1;
        }
    }

//Button to the Game Page
gamePageBttn.addEventListener("click", toGamePage);
function toGamePage(){
    var roundsPage = document.getElementsByClassName("rounds-page"),
        mainPage = document.getElementsByClassName("main-page"),
        gamePage = document.getElementsByClassName("game-page"),
        readyBttn = document.getElementById("ivechoosen");

    for (let i = 0; i < roundsPage.length; i++){
        roundsPage[i].style.display = "none";
    }
    for (let i = 0; i < mainPage.length; i++){
        mainPage[i].style.display = "none";
    }
    for (let i = 0; i < gamePage.length; i++){
        gamePage[i].style.display = "block";
    }
    readyBttn.style.display = "none";
    document.getElementById("content-space").style.display = "none";

//Set the scores and the round limit
    document.getElementById("pc-scores").innerHTML = pcScore + "/" + roundInput.value;
    document.getElementById("user-scores").innerHTML = userScore + "/" + roundInput.value;
}

    //Helper functions

    //only one option allowed
        var rockChoice = document.getElementById("rock"),
            paperChoice = document.getElementById("paper"),
            scissorsChoice = document.getElementById("scissors");

        rockChoice.addEventListener("input", function(){
            document.getElementById("showresult").innerHTML = "";
            document.getElementById("ivechoosen").style.display = "block";
            paperChoice.checked = false;
            scissorsChoice.checked = false;
            choicesDisplayerReset();
        })
        paperChoice.addEventListener("input", function(){
            document.getElementById("showresult").innerHTML = "";
            document.getElementById("ivechoosen").style.display = "block";
            scissorsChoice.checked = false;
            rockChoice.checked = false;
            choicesDisplayerReset();
        })
        scissorsChoice.addEventListener("input", function(){
            document.getElementById("showresult").innerHTML = "";
            document.getElementById("ivechoosen").style.display = "block";
            rockChoice.checked = false;
            paperChoice.checked = false;
            choicesDisplayerReset();
        })

    
    //Score updater
    let userScore = 0, pcScore = 0;

    function userScoreMore(){
        document.getElementById("ivechoosen").style.display = "none";
        userScore += 1;
        document.getElementById("user-scores").innerHTML = userScore + "/" + roundInput.value;
        document.getElementById("showresult").innerHTML = "Hunf...'cê ganhou...";
    }
    function pcScoreMore(){
        document.getElementById("ivechoosen").style.display = "none";
        pcScore += 1;
        document.getElementById("pc-scores").innerHTML = pcScore + "/" + roundInput.value;
        document.getElementById("showresult").innerHTML = "KKKK 'Cê perdeu!";
    }
    function tie(){
        document.getElementById("ivechoosen").style.display = "none";
        document.getElementById("showresult").innerHTML = "Empataram!";
    }

    //Choices displayer
    function choicesDisplayer(user, pc){
        document.getElementById("user-Choice").setAttribute('src', "images/gesture-" + user + ".svg");
        document.getElementById("pc-Choice").setAttribute('src', "images/gesture-" + pc + ".svg");
    }
        //Choices displayer reset
        function choicesDisplayerReset(){
            document.getElementById("user-Choice").setAttribute('src', "");
            document.getElementById("pc-Choice").setAttribute('src', "");
        }

    //Game comparison
    document.getElementById("ivechoosen").addEventListener("click", play);

    function play(){
        document.getElementById("ivechoosen").style.display = "none";

        var userChoice,
            rockChoice = document.getElementById("rock"),
            paperChoice = document.getElementById("paper"),
            scissorsChoice = document.getElementById("scissors"),
            pcChoice;
            
        //Rock = 0; Paper = 1; Scissors = 2.
        const options = ["rock","paper","scissors"]
              optionsElements = [rockChoice, paperChoice, scissorsChoice];

        //Pc choice
        pcChoice = Math.floor(Math.random()*3);
        pcChoice = options[pcChoice];

        //User choice
        for (let i = 0; i < optionsElements.length; i++){
            if (optionsElements[i].checked == true){
                userChoice = optionsElements[i].value;
            }
        }
        userChoice = options[userChoice];

        //Both: USER and PC
        both = userChoice + pcChoice;
        choicesDisplayer(userChoice, pcChoice);

        if(userChoice == pcChoice){
            tie();
        }
        else{

            switch (both){
                //PC win
                case "rockpaper":
                    pcScoreMore();
                    break
    
                case "paperscissors":
                    pcScoreMore();
                    break
    
                case "scissorsrock":
                    pcScoreMore();
                    break
    
                //User win
                case "paperrock":
                    userScoreMore();
                    break
    
                case "scissorspaper":
                    userScoreMore();
                    break
    
                case "rockscissors":
                    userScoreMore();
                    break
            }
        }
        /*Reset options*/
        rockChoice.checked = false;
        paperChoice.checked = false;
        scissorsChoice.checked = false;
}
