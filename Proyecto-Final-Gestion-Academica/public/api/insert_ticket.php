<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { 
  die(json_encode(["error" => $conn->connect_error]));
}

$query = $conn->prepare("
INSERT INTO tickets (tipo, descripcion, prioridad, id_docente) VALUES (?, ?, ?, ?)
");

$query->bind_param(
  "sssi",
  $tipo, $descripcion, $prioridad, $id_docente
);

$tipo        = $_POST['tipo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$prioridad   = $_POST['prioridad'] ?? '';
$id_docente  = $_POST['id_docente'] ?? null;

if ($query->execute()) {
  echo json_encode(["mensaje" => "Docente insertado correctamente"]);
} else {
  echo json_encode(["error" => $query->error]);
}

$query->close();
$conn->close();
?>
