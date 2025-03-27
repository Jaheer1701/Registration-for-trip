<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $file = fopen("registrations.csv", "a");
    fputcsv($file, $data);
    fclose($file);
    echo json_encode(["success" => true]);
}
?>
