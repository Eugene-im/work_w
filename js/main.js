$(document).on('ready', function () {
    $("#date").html(moment().format('dddd, D MMMM YYYY'));
    var now = moment().format("L");
    var zal = [];
    zal[1] = 0;
    zal[2] = 0;
    zal[3] = 0;
    zal[4] = 0;

    function timedUpdate() {
        $("#time").html(moment().format('LTS'));
        setTimeout(timedUpdate, 1000);
    }

    function parseResp(a) {
        $("#date-1").html(a[0].date);
        $("#number-1").html(a[0].number);
        console.log(a);
        console.log(a[0].date);
        console.log(a[0].judge);
    };

    function countDate(a) {
        var ctr = 0;

        for (var i = 0; i < a.length; i++) {
            var curDate = a[i].date.split(' ', 1);
            var curJudge = a[i].judge.split(' ', 2)[1];
            if (now == curDate[0]) {
                if (curJudge == "Ватаманюк" || curJudge == "Залімський" || curJudge == "Сторчак" ||
                    curJudge == "Сушко" || curJudge == "Кузьмишин" || curJudge == "Мельник-Томенко" ||
                    curJudge == "Франовська" || curJudge == "Іваненко" || curJudge == "Кузьменко" ||
                    curJudge == "Шидловський") {
                    console.log('zal1' + '' + 'json_key_index' + i);
                    zal[1] = ctr++;
                }
                if (curJudge == "Совгира" || curJudge == "Курко" || curJudge == "Граб" || curJudge ==
                    "Загороднюк" || curJudge == "Біла" || curJudge == "Матохнюк" || curJudge == "Моніч" ||
                    curJudge == "Капустинський" || curJudge == "Охрімчук" || curJudge == "Мацький") {
                    console.log('zal2' + '' + 'json_key_index' + i);
                    zal[2] = ctr++;
                }
                if (curJudge == "Сапальова" || curJudge == "Гонтарук" || curJudge == "Драчук" || curJudge ==
                    "Боровицький" || curJudge == "Полотнянко" || curJudge == "Смілянець") {
                    console.log('zal3' + '' + 'json_key_index' + i);
                    zal[3] = ctr++;
                }
            }
        }
        for (var m = 0; m < 4; m++) {
            for (var j = 0; j < zal[m]; j++) {
                $('.vertical-' + m).append(
                    '<li><table><tr><td class="number">1</td><td id="date-1"></td><td class="time"></td><td class="case_number"></td><td>who ask</td><td>who req</td><td>what</td><td><select><option>розглядається</option><option>затримується +5хв</option><option>затримується +15хв</option><option>затримується +30хв</option></select></td></tr></table></li>'
                );
            }
        }

    }

    function failReport(a) {
        if (a.responseText !== "") {
            $("#error").removeClass('dnon').addClass('dfl').html("виникла помилка" + " " + a.responseText);
            console.log("помилка при завантаженні" + " " + a.responseText)
        } else {
            $("#error").removeClass('dnon').addClass('dfl').html(
                "При завантаженні строінки виникла помилка, будь ласка перевірте з'єднання з інтернетом та перезавантажте сторінку."
            );
            console.log(
                "При завантаженні строінки виникла помилка, будь ласка перевірте з'єднання з інтернетом та перезавантажте сторінку."
            );
        }
    };


    timedUpdate();

    $.ajax({
            url: "./file.json"
        })
        .done(function (response) {
            countDate(response);
            parseResp(response);
        })
        .fail(function (data) {
            failReport(data)
        });
    $(".vertical-1,.vertical-2,.vertical-3,.vertical-4").slick({
        dots: false,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 12000,
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 1
    });
});