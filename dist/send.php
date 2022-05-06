<?php
$spam = $_POST['spam']; // текст из поля спам
if (empty($spam)) { // Проверка на спам
  if ((isset($_POST['name']) && $_POST['vacancy'] && $_POST['tel'] && $_POST['email'] && $_POST['city'] && $_POST['salary'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'ivan.eremeev@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Резюме';
    $message = '
    <html>
      <head>
        <title>' . $subject . '</title>
      </head>
      <body>
        <p>Имя: ' . $_POST['name'] . '</p>
        <p>Вакансия: ' . $_POST['vacancy'] . '</p>
        <p>Телефон: ' . $_POST['tel'] . '</p>
        <p>Имейл: ' . $_POST['email'] . '</p>
        <p>Город: ' . $_POST['city'] . '</p>
        <p>Зарплата: ' . $_POST['salary'] . '</p>
        <p>Сообщение: ' . $_POST['message'] . '</p>
      </body>
    </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <".$_POST['email'].">\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
      echo 'success';
    } else {
      echo 'error';
    }
  }
} else exit;
?>
