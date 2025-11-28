<?php
header("Access-Control-Allow-Origin: http://localhost:4200");  
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { 
  die(json_encode(["error" => $conn->connect_error]));
}

// Consulta simple de todos los docentes
$sql = "
    SELECT id_docente, nombre, correo, academia, grado, idioma, sni, status
    FROM docentes
";

$result = $conn->query($sql);

$datos = [];

while ($row = $result->fetch_assoc()) {
    $datos[] = $row; 
}

echo json_encode($datos, JSON_UNESCAPED_UNICODE);

$conn->close();
