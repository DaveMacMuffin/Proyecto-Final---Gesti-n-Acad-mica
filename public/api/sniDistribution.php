<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); // tu Angular
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { 
  die(json_encode(["error" => $conn->connect_error]));
}

$sql = "
    SELECT sni, COUNT(*) AS total
    FROM docentes
    GROUP BY sni
";

$result = $conn->query($sql);

$datos = [];

while ($row = $result->fetch_assoc()) {
    $sni = $row['sni'];   // Doctorado / Maestría / Licenciatura
    $datos[$sni] = intval($row['total']);
}

echo json_encode($datos);
