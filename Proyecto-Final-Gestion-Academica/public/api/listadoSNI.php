<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { die(json_encode([])); }


// publicacion es simulado porque no existe la columna en la bd XD
$sql = "
    SELECT 
        nombre, 
        sni as nivel, 
        FLOOR(RAND()*(30-5)+5) as publicaciones 
    FROM docentes 
    WHERE sni != 'Sin SNI' AND status = 'Activo'
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>