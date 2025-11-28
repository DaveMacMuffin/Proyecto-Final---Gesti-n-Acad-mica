<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { 
  die(json_encode(["error" => $conn->connect_error]));
}
$sql = "
  SELECT
    COUNT(*) AS total_docentes,
    SUM(CASE WHEN status = 'Activo' THEN 1 ELSE 0 END) AS activos,
    SUM(CASE WHEN status = 'Inactivo' THEN 1 ELSE 0 END) AS inactivos,
    SUM(CASE WHEN sni <> 'Sin SNI' THEN 1 ELSE 0 END) AS sni_activos
  FROM docentes
  -- aquí después puedes meter WHERE según filtros
";

$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([$row]);  // igual que en museos: devolvemos array con 1 fila
} else {
    echo json_encode([]);
}
