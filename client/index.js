/**
 * Created by Alchemist on 2014/10/17.
 */

var URL="/api/";

$(window).load(function(){
    var currentPid;
    var answer;
    var userName;

    getProblemList();
    $("#submit").click(function(){
        sendAnswer();
    });

    function getProblem(pid){
        currentPid = pid;
        $.ajax({
            url: URL + "prob/" + pid,
            type: "get",
            success: function(result){
                $("#title").innerText = result.title
                $("#problem").innerText = result.title
                $("#menu").empty();
                $.each(result, function(i, value) {
                    $("#menu").append('<div class=\"problem\" id=\"problem_' + value.pid + '\">' + value.title + '</div>');
                });
            }
        });
    }

    function getProblemList(){
        $.ajax({
            url: URL + "list",
            type: "get",
            success: function(result){
                $("#menu").empty();
                $.each(result, function(i, value) {
                    $("#menu").append('<div class=\"problem\" id=\"problem_' + value.pid + '\">' + value.title + '</div>');
                });
            },
            data: {
                id: userName
            },
            dataType: "json"
        });

        $(".problem").click(function(){
            getProblem(this.id.substring(7));
        });
    }

    function sendAnswer(){
        $.ajax({
            url: URL + "answer",
            type: "post",
            success: function(result){
                var correct = result.correct;
                var rate = result.rate;

                alert("Your answer is " + correct + ". Your score is " + rate);
                //
            },
            data: {
                id: 1,
                pid: currentPid,
                answer: $("answer").innerText
            },
            dataType: "json"
        });
    }
});

