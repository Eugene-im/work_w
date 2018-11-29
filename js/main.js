$(document).on('ready', function () {
    $("#date").html(moment().format('dddd, D MMMM YYYY'));
    var now = moment().format("L");
    var zal = [];
    zal[0] = 0;
    zal[1] = 0;
    zal[2] = 0;
    zal[3] = 0;
    zal[4] = 0;

    function timedUpdate() {
        $("#time").html(moment().format('LTS'));
        setTimeout(timedUpdate, 1000);
    }

    function parseResp(a, b, j) {
        // for(){
        var dates = $(".date-" + b);
        // dates[j].html(a[0].date);
        var caseNumbers = $(".case_number-" + b);
        // caseNumbers[j].html(a[0].number);
        // }
        // console.log(a);
    };

    function countDate(a) {
        // var ctr = 1;

        for (var i = 0; i < a.length; i++) {
            var indexZ0 = [];
            var indexZ1 = [];
            var indexZ2 = [];
            var indexZ3 = [];
            var indexZ4 = [];
            var curDate = a[i].date.split(' ', 1);
            var curJudge = a[i].judge.split(' ', 2)[1];
            var checkJudge = [];
            if (now == curDate[0]) {
                if (curJudge == "Ватаманюк" || curJudge == "Залімський" || curJudge == "Сторчак" || curJudge == "Сушко" || curJudge == "Кузьмишин" || curJudge == "Мельник-Томенко" || curJudge == "Франовська" || curJudge == "Іваненко" || curJudge == "Кузьменко" || curJudge == "Шидловський") {
                    zal[1] += 1;
                    indexZ1.push(i);

                    console.log('zal1' + ' ' + 'json_key_index' + i);

                } else if (curJudge == "Совгира" || curJudge == "Курко" || curJudge == "Граб" || curJudge == "Загороднюк" || curJudge == "Біла" || curJudge == "Матохнюк" || curJudge == "Моніч" || curJudge == "Капустинський" || curJudge == "Охрімчук" || curJudge == "Мацький") {
                    console.log('zal2' + ' ' + 'json_key_index' + i);
                    zal[2] += 1;
                    indexZ2.push(i);

                } else if (curJudge == "Сапальова" || curJudge == "Гонтарук" || curJudge == "Драчук" || curJudge == "Боровицький" || curJudge == "Полотнянко" || curJudge == "Смілянець") {
                    console.log('zal3' + ' ' + 'json_key_index' + i);
                    indexZ3.push(i);
                    zal[3] += 1;
                } else {
                    zal[0] += 1;
                    indexZ0.push(i);
                    checkJudge.push(curJudge)
                    console.error("проверь наличие єтих судей в общем списке:" + checkJudge);
                }
            }
        }
        console.log(zal);
        console.log(indexZ0);
        console.log(indexZ1);
        console.log(indexZ2);
        console.log(indexZ3);
        console.log(indexZ4);
        for (var m = 1; m < zal.length; m++) {
            for (var j = 0; j < zal[m]; j++) {
                $('.vertical-' + m).append(
                    '<li><table><tr><td class="number-' + m + '"></td><td class="date-' + m + '"></td><td class="time-' + m + '"></td><td class="case_number-' + m + '"></td><td>who ask</td><td>who req</td><td>what</td><td><select><option>розглядається</option><option>затримується +5хв</option><option>затримується +15хв</option><option>затримується +30хв</option></select></td></tr></table></li>'
                );
                parseResp(a, m, j);
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