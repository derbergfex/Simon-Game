$(document).ready(function()
{
    // Global variables to be used.
    var random = [];
    var clicked = [];
    var x = 0;
    var litButtons = [];
    // Start button.
    var start = document.querySelector('#start');
    // Strict button.
    var strict = document.querySelector('#strict');
    // Initial count.
    var count = 1;
    // Sounds.
    var audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"); 
    var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var audio4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

    // On/off switch.
    $(".switchSpace").click(function()
    {
        // Upon switching off, we clear the global variables and reset the other attributes.
        if ($(".switch").hasClass('switchOn') == true)
        {
            random.splice(0, random.length);
            clicked.splice(0, clicked.length);
            litButtons.splice(0, litButtons.length);
            x = 0;
            count = 1;
            $(".count").addClass("ledOff");
            $(".count").removeClass("red");
            $(".switch").removeClass("switchOn")
            $(".count").text("--");
            $("#" + 1).removeClass("clickable").addClass("unclickable");
            $("#" + 2).removeClass("clickable").addClass("unclickable");
            $("#" + 3).removeClass("clickable").addClass("unclickable");
            $("#" + 4).removeClass("clickable").addClass("unclickable");
            $("#strict-led").removeClass("ledOn")
            start.removeEventListener('click', startGame, false);
            strict.removeEventListener('click', strictGame, false);
        }
        else
        {
            initGame();
            $(".count").removeClass("ledOff");
            $(".count").addClass("red");
            $(".switch").addClass("switchOn")
            start.addEventListener('click', startGame, false);
            strict.addEventListener('click', strictGame, false);              
        }    

    });
    
    function strictGame()
    {
        if ($("#strict-led").hasClass("ledOn"))
        {
            $("#strict-led").removeClass("ledOn");
        }
        else
        {
            $("#strict-led").addClass("ledOn");     
        }
    }

    function initGame()
    {
        // 20 being the total number of light ups throughout a full game.
        for (var i = 0; i < 20; i++)
        {
            random[i] = Math.ceil((Math.random() * 4));
        }
    }

    function startGame()
    { 
        start.removeEventListener('click', startGame, false);
        var tempOne = 0;
        var tempTwo = count;

        // This is to avoid the user clicking any of the buttons whilst the pattern is displayed.
        $("#" + 1).removeClass("clickable").addClass("unclickable");
        $("#" + 2).removeClass("clickable").addClass("unclickable");
        $("#" + 3).removeClass("clickable").addClass("unclickable");
        $("#" + 4).removeClass("clickable").addClass("unclickable");

        setTimeout(function()
        {
            $("#" + 1).addClass("clickable").removeClass("unclickable");
            $("#" + 2).addClass("clickable").removeClass("unclickable");
            $("#" + 3).addClass("clickable").removeClass("unclickable");
            $("#" + 4).addClass("clickable").removeClass("unclickable");
        }, count * 1000);

        // The display of the current count pattern begins here.
        setTimeout(function()
        {
            $(".count").text(count);
            slowLoop(tempOne, tempTwo);
        }, 1000);
               
    }

    // A recursive function used to light up the buttoms at current level.
    function slowLoop(tempA, tempB)  
    {
        if (tempA < tempB)
        {    
            litButtons.push(random[tempA]);
            lightItUp(random[tempA]);
            tempA++;
            setTimeout(function()
            { 
                slowLoop(tempA, tempB);
            }, 1000);    
        }
    } 

    // Upon the user's clicks.
    $("#" + 1).click(function()
    {
        clicked.push(1);
        lightItUp(1);
        checkFunction();       
    });

    $("#" + 2).click(function()
    { 
        clicked.push(2);
        lightItUp(2);
        checkFunction();
    });

    $("#" + 3).click(function()
    {
        clicked.push(3);
        lightItUp(3);
        checkFunction();
    });

    $("#" + 4).click(function()
    {
        clicked.push(4);
        lightItUp(4);
        checkFunction(); 
    });
    
    function lightItUp(id)
    {  
        if (id == 1)
        {
            $("#" + id).addClass('greenBright');
            audio1.play();
            setTimeout(function()
            {
                $("#" + id).removeClass('greenBright');
            }, 400);
        }
        else if (id == 2)
        {
            $("#" + id).addClass('redBright');
            audio2.play();
            setTimeout(function()
            {
                $("#" + id).removeClass('redBright');
            }, 400);
        }
        else if (id == 3)
        {
            $("#" + id).addClass('yellowBright');
            audio3.play();
            setTimeout(function()
            {
                $("#" + id).removeClass('yellowBright');
            }, 400);
        }
        else if (id == 4)
        {
            $("#" + id).addClass('blueBright');
            audio4.play();
            setTimeout(function()
            {
                $("#" + id).removeClass('blueBright');
            }, 400);
        }   
    }

    function checkFunction()
    {
        // In the case of the user passing the current level and not yet won.
        if (clicked.join() === litButtons.join() && count < 20)
        {
            // x is the initial index of each count pattern in clicked and litButtons arrays.
            x += count;
            count++;
            startGame();
        }
        // In the case of the user passing the final level.
        else if (clicked.join() === litButtons.join() && count == 20)
        {
            $(".count").text("W");
            $("#" + 1).removeClass("clickable").addClass("unclickable");
            $("#" + 2).removeClass("clickable").addClass("unclickable");
            $("#" + 3).removeClass("clickable").addClass("unclickable");
            $("#" + 4).removeClass("clickable").addClass("unclickable");
            strict.removeEventListener('click', strictGame, false);
        }
          
        // In the case of the user not passing the current level.
        else if (clicked[clicked.length - 1] != litButtons[clicked.length - 1])
        {
            // If strict mode is on.
            if ($("#strict-led").hasClass("ledOn"))
            {
                $(".count").text("!!");
                random.splice(0, random.length);
                clicked.splice(0, clicked.length);
                litButtons.splice(0, litButtons.length);
                x = 0;
                count = 1;
                initGame();
                startGame();               
            }
            else
            {
                $(".count").text("!!");
                clicked.splice(x, count);
                litButtons.splice(x, count);
                startGame(); 
            }                  
        } 
    }

});

