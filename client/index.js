/**
 * Created by Alchemist on 2014/10/17.
 */

var URL="/api/";

$(window).load(function(){
    var currentPid;
    var answer;
    var userName;

    getProblemList(1);
    $("#submit").click(function(){
        sendAnswer();
    });

    function getProblem(pid){
        currentPid = pid;
        $.ajax({
            url: URL + "prob/" + pid,
            type: "get",
            success: function(result){
                $("#question").html(result.description);
                $("#operators").empty();
                $.each(result.operators, function(key, value) {
                    $("#operators").append('<button type="Button" class="operator-btn inline-button btn btn-default">' + key +'</button>')
                });
                $(".operator-btn").click(function(){
                    $("#answer").val( $("#answer").val() + $(this).text());
                });
                if (typeof(result.rate) != "undefined") {
                    if (result.rate >= 0) {
                        $("#result").html("You have solved this problem.<br/> Your highest score is " + result.rate + " on " + result.date);
                    } else {
                        $("#result").html("You failed on this problem<br/> Your incorrect answer is" + result.answer + ".");
                    }
                } else
                    $("#result").html("You never try this problem");
            },
            dataType: "json"
        });
    }

    function getProblemList(isfresh){
        $.ajax({
            url: URL + "list",
            type: "get",
            success: function(result){
                $("#problems").empty();
                $.each(result, function(i, value) {
                    var correct = "";
                    if (typeof(value.rate) != "undefined" && value.rate >= 0)
                        correct = " correct";
                    $("#problems").append('<div class=\"problem' + correct + '\" id=\"problem_' + value.pid + '\">' + value.title + '</div>');
                });
                $(".problem").click(function(){
                    getProblem(this.id.substring(8));
                });
                if (isfresh == 1)
                    getProblem($(".problem").first().attr("id").substring(8));
            },
            data: {
                id: userName
            },
            dataType: "json"
        });
    }

    function sendAnswer(){
        alert($("#answer").val());
        $.ajax({
            url: URL + "answer",
            type: "post",
            success: function(result){
                var rate = result.rate;
                if (rate >= 0)
                    alert("Your score is " + rate);
                else
                    alert("Your answer is incorrect");
                getProblemList(0);
                getProblem(currentPid);
            },
            data: {
                id: 1,
                pid: currentPid,
                answer: $("#answer").val()
            },
            dataType: "json"
        });
    }
});

