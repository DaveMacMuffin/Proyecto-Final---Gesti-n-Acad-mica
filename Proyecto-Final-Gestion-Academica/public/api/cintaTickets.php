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
        SUM(CASE WHEN estado = 'Pendiente'   THEN 1 ELSE 0 END) AS pendientes,
        SUM(CASE WHEN estado = 'En Proceso'  THEN 1 ELSE 0 END) AS en_proceso,
        SUM(CASE WHEN estado = 'Resuelto'
                  AND MONTH(fecha_cierre) = MONTH(CURDATE())
                  AND YEAR(fecha_cierre)  = YEAR(CURDATE())
             THEN 1 ELSE 0 END) AS resueltos_mes
    FROM tickets
";

$result = $conn->query($sql);

$fila = $result->fetch_assoc(); 

echo json_encode($fila, JSON_UNESCAPED_UNICODE);
$conn->close();