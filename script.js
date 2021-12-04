$(document).ready(function () {
    clearTimer = false;
    let seconds = 59;
    shuffle();
    $('.number-box').sortable({
        connectWith: '#start, #end',
    })
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check = true;
    let countdown = function() {
        let timerID = setInterval(function () {
            let sec = seconds < 10 ? "0"+ seconds: seconds;
            $('#minutes').text('00');
            $('#seconds').text(sec);
            seconds--;
            if(seconds<0){
                clearInterval(timerID);
                $('.error').show();
                $('#errorCheck').hide();
                $('.error-text').text(`You lose`);

            }else if(clearTimer){
                clearInterval(timerID);
                $('#minutes').text('01');
                $('#seconds').text('00');
                seconds = 59;
                clearTimer = false;
            }
        },1000);
    }
    function shuffle(){
        let parent = $("#start");
        let divs = $(".number");        
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    }
    $('#new').on('click', function(){
        clearTimer = true;
        seconds = 59;
        shuffle();
        $('#minutes').text('01');
        $('#seconds').text('00');
        $('#start-button').prop( "disabled", false);
        $('#start-button').css({
            "background-color": "crimson",
        });
        $('#check').prop( "disabled", true);
        $('#check').css({
            "background-color": "gray",
        });
        $('#errorCheck').show()
        
    })
    $('#errorCheck').on('click', function () { 
        clearTimer = true;
        $('#check').prop( "disabled", true);
        $('#check').css({
            "background-color": "gray",
        });       
        for (let i = 0; i < $('.number').length; i++) {
            if ($('.number').eq(i).text() != numbers[i]) {
                check = false;
                break;
            }
        }
        if (check) {
            console.log("you win");
            clearTimer = true;
            seconds = 59;
            $('.error-text').text('You win');
            $('#errorCheck').hide()            
        }
        else {
            console.log("you lose");
            clearTimer = true;
            seconds = 59;
            $('.error-text').text('It`s a pitty, but you lost');
            $('#errorCheck').hide()
        }
        check = true;
        $('body').css({
            backgroundColor: "#fff",
        });
    })
    $('#close').on('click', function(){
        $('.error').slideUp();
        $('body').css({
            backgroundColor: "#fff",
        });


    })
    $('#start-button').on('click', function(){
        clearTimer = false;
        countdown();
        $('#check').prop( "disabled", false);
            $('#check').css({
                "background-color": "crimson",
            });        
        $('#start-button').prop( "disabled", true);
        $('#start-button').css({
            "background-color": "gray",
        });
    })
    $('#check').on('click', function(){
            $('.error-text').text(`You still have time ${$('#seconds').text()}, you shure?`);
            $('.error').show();
            $('body').css({
                backgroundColor: 'rgb(168, 168, 168, 0.5)',
            });
    })
})