<?php

// Инициализируем собственно подключение, если что то не так вывод ошибки 33 строка
if($curl = curl_init()) {
	// Ссылка на сайт куда отправлять запрос
	curl_setopt($curl, CURLOPT_URL, "https://7aa.court.gov.ua/new.php");
	// Ставим User Agent
	curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36' );
	// Установка заголовков
	curl_setopt($curl, CURLOPT_HTTPHEADER, [
		'Referer: https://7aa.court.gov.ua/sud4856/gromadyanam/csz/', // Говорим что нас отправил сайт
		'X-Requested-With: XMLHttpRequest' // Говорим тип запроса
	]);
	// Передача в строку в место вывода в браузер
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	// Говорим что не будем проверять сертификат
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	// Указываем что отправляем пост запрос
	curl_setopt($curl, CURLOPT_POST, true);
	// Пост данные в масиве
	curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query([
		'q_court_id' => 4856
	]));
	// Получаем данные
	$data = curl_exec($curl);
	// Закрываем соединение
	curl_close($curl);
	file_put_contents(__DIR__.'/file.json', $data);
	// Выводим данные
	die($data);
} else {
	// Если ошибка (Нету модуля url) выводим сообщение что не можем получить данные
	die(json_encode(['status' => 'error', 'message' => 'don`t create curl connect']));
}