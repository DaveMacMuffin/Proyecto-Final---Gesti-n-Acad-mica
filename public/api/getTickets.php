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
  SELECT 
      t.id_ticket        AS id,
      t.tipo,
      t.descripcion,
      t.prioridad,
      t.estado           AS status,
      t.fecha_creacion   AS fecha,
      d.nombre           AS profesor,
      d.academia
  FROM tickets t
  LEFT JOIN docentes d ON t.id_docente = d.id_docente
  ORDER BY t.fecha_creacion DESC
";


$result = $conn->query($sql);

$datos = [];

while ($row = $result->fetch_assoc()) {
    $datos[] = $row; 
}

echo json_encode($datos, JSON_UNESCAPED_UNICODE);

$conn->close();
