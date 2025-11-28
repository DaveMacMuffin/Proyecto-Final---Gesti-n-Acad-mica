<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}


$sql = "
    SELECT
        SUM(CASE WHEN idioma = 'Inglés Avanzado'   THEN 1 ELSE 0 END) AS ingles_avanzado,
        SUM(CASE WHEN idioma = 'Inglés Intermedio' THEN 1 ELSE 0 END) AS ingles_intermedio,
        SUM(CASE WHEN idioma NOT IN ('Inglés Avanzado', 'Inglés Intermedio') THEN 1 ELSE 0 END) AS otros_idiomas
    FROM docentes
";

$result = $conn->query($sql);

$datos = $result->fetch_assoc();

echo json_encode($datos, JSON_UNESCAPED_UNICODE);
$conn->close();