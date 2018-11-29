$(document).on("ready", function() {
    $("#date").html(moment().format("dddd, D MMMM YYYY"));
    var now = moment().format("L");
    var zal = [];
    zal[0] = 0;
    zal[1] = 0;
    zal[2] = 0;
    zal[3] = 0;
    zal[4] = 0;
  
    function timedUpdate() {
      $("#time").html(moment().format("LTS"));
      setTimeout(timedUpdate, 1000);
    }
  
    function slickInit() {
      $(".vertical-1,.vertical-2,.vertical-3,.vertical-4").slick({
        dots: false,
        arrows: false,
        centerMode: true,
      //   rows:3,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 12000,
      //   infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }
  
    function countDate(a) {
  
      var indexZ = [];
      indexZ[0] = [];
      indexZ[1] = [];
      indexZ[2] = [];
      indexZ[3] = [];
      indexZ[4] = [];
      for (var i = 0; i < a.length; i++) {
        var curDate = a[i].date.split(" ", 2)[0];
        var curJudge = a[i].judge.split(" ", 2)[1];
        var checkJudge = [];
        if (now == curDate) {
          if (
            curJudge == "Ватаманюк" ||
            curJudge == "Залімський" ||
            curJudge == "Сторчак" ||
            curJudge == "Сушко" ||
            curJudge == "Кузьмишин" ||
            curJudge == "Мельник-Томенко" ||
            curJudge == "Франовська" ||
            curJudge == "Іваненко" ||
            curJudge == "Кузьменко" ||
            curJudge == "Шидловський"
          ) {
            zal[1] += 1;
            indexZ[1].push(i);
          } else if (
            curJudge == "Совгира" ||
            curJudge == "Курко" ||
            curJudge == "Граб" ||
            curJudge == "Загороднюк" ||
            curJudge == "Біла" ||
            curJudge == "Матохнюк" ||
            curJudge == "Моніч" ||
            curJudge == "Капустинський" ||
            curJudge == "Охрімчук" ||
            curJudge == "Мацький"
          ) {
            zal[2] += 1;
            indexZ[2].push(i);
          } else if (
            curJudge == "Сапальова" ||
            curJudge == "Гонтарук" ||
            curJudge == "Драчук" ||
            curJudge == "Боровицький" ||
            curJudge == "Полотнянко" ||
            curJudge == "Смілянець"
          ) {
            indexZ[3].push(i);
            zal[3] += 1;
          } else if (curJudge == "Пахомов" || curJudge == "Пахомова") {
            indexZ[4].push(i);
            zal[4] += 1;
          } else {
            zal[0] += 1;
            indexZ[0].push(i);
            checkJudge.push(curJudge);
            console.error(
              "проверь наличие єтих судей в общем списке:" + checkJudge
            );
          }
        }
      }
      for (var m = 1; m < zal.length; m++) {
        for (var j = 0; j < zal[m]; j++) {
          $(".vertical-" + m).append(
            '<li><table><tr><td class="date-' +
              m +
              '"></td><td class="time-' +
              m +
              '"></td><td class="case_number-' +
              m +
              '"></td><td class="sides-' +
              m +
              '"></td><td class="judges-' +
              m +
              '"></td><td class="essence-' +
              m +
              '"></td><td><select><option>розглядається</option><option>затримується +5хв</option><option>затримується +15хв</option><option>затримується +30хв</option></select></td></tr></table></li>'
          );
  
          // ("<td>дата</td>\
          // <td>година розгляду</td>\
          // <td>номер справи</td>\
          // <td>сторони</td>\
          // <td>колегія</td>\
          // <td>Суть позову</td>\
          // <td>Стан справи</td>\");
  
          parseResp(a, m, j, indexZ);
        }
      }
    }
  
    function parseResp(resp, countZal, countCase, indexOfCaseFromResp) {
      var dates = $(".date-" + countZal);
      var time = $(".time-" + countZal);
      var number = $(".number-" + countZal);
      var caseNumbers = $(".case_number-" + countZal);
      var sides = $(".sides-" + countZal);
      var judges = $(".judges-" + countZal);
      var essence = $(".essence-" + countZal);
      // var state = $(".state-" + countZal);
      
      for (var i = 0; i < countCase; i++) {
        var ind = indexOfCaseFromResp[countZal][i];
        number.eq(i).html(i + 1);
        dates.eq(i).html(resp[ind].date.split(" ", 2)[0]);
        caseNumbers.eq(i).html(resp[ind].number);
        time.eq(i).html(resp[ind].date.split(" ", 2)[1]);
        sides.eq(i).html(resp[ind].involved);
        judges.eq(i).html(resp[ind].judge);
        essence.eq(i).html(resp[ind].description);
      }
    }
  
    function failReport(a) {
      if (a.responseText !== "") {
        $("#error")
          .removeClass("dnon")
          .addClass("dfl")
          .html("виникла помилка" + " " + a.responseText);
        console.log("помилка при завантаженні" + " " + a.responseText);
      } else {
        $("#error")
          .removeClass("dnon")
          .addClass("dfl")
          .html(
            "При завантаженні строінки виникла помилка, будь ласка перевірте з'єднання з інтернетом та перезавантажте сторінку."
          );
        console.log(
          "При завантаженні строінки виникла помилка, будь ласка перевірте з'єднання з інтернетом та перезавантажте сторінку."
        );
      }
    }
  
    timedUpdate();
  
    $.ajax({
      url: "./file.json"
    })
      .done(function(response) {
        countDate(response);
        parseResp(response);
        slickInit();
      })
      .fail(function(data) {
        failReport(data);
      });
  });
  