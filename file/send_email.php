<?php
$data = json_decode(file_get_contents("php://input"), true);
$to = "jaheeruddeenmogal04@gmail.com";
$subject = "New Registration for Koiken Half Trip";
$message = "A new user has registered with email: " . $data['email'];
$headers = "From: noreply@yourwebsite.com";

mail($to, $subject, $message, $headers);
?>
