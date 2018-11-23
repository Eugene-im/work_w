const request = require('request');
const fs = require('fs');
const Transform = require("stream").Transform;
const zlib = require('zlib');

const options = {
    method: 'POST',
    url: 'https://7aa.court.gov.ua/new.php', 
    form: { q_court_id: 4856},
    headers :{
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding':'gzip, deflate, br',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Length': '15',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'DNT': '1',
      'Host': '7aa.court.gov.ua',
      'Origin': 'https://7aa.court.gov.ua',
      'Pragma': 'no-cache',
      'Referer': 'https://7aa.court.gov.ua/sud4856/gromadyanam/csz/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    }
};
// Запрос
const phpdata = request(options, function (err,response,body) {
  console.log(err,JSON.stringify(response.headers),body.length)
});
// Создание файла
const filename = new Date().toLocaleDateString()+'.json'
const output = fs.createWriteStream(filename)
.on('error', function (err) {
  console.log(err);
})
.on('close', function () {
  console.log('file save:',filename);
});
// Декодировка юникод символов: [{"date":"23.11.2018 09:00","judge":" \u041a\u0443\u0437\u044c\u043c\u0435\u043d\u043a\u043e \u041b.
const decode = new Transform({
  transform: (data, encoding, done) => {
      let str = data
      .toString('ascii')
      .replace(/\\u[\dA-F]{4}/gi, 
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        }
      );
    done(null, str);
  }
});
// :: ответ -> декомпрессия -> декодировка -> запись в файл.
phpdata
.pipe(zlib.createGunzip())
.pipe(decode)
.pipe(output);