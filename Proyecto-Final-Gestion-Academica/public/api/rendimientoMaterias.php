<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { die(json_encode([])); }


$sql = "
    SELECT 
        nombre_materia as materia,
        AVG(promedio_general) as promedio,
        AVG(tasa_aprobacion) as aprobados
    FROM materias 
    GROUP BY nombre_materia
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $row['promedio'] = round((float)$row['promedio'], 1);
    $row['aprobados'] = round((float)$row['aprobados'], 1);
    $row['reprobados'] = round(100 - $row['aprobados'], 1);
    $data[] = $row;
}

echo json_encode($data);
?>