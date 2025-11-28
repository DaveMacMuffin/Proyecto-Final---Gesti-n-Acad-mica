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
  INSERT INTO docentes (nombre, correo, academia, grado, idioma, sni, status)
  VALUES (?, ?, ?, ?, '', ?, ?)
");

$query->bind_param(
  "ssssss",
  $nombre, $correo, $academia, $grado, $sni, $status
);

$nombre   = $_POST["nombre"];
$correo   = $_POST["correo"];
$academia = $_POST["academia"];
$grado    = $_POST["grado"];
$sni      = $_POST["sni"];
$status   = $_POST["status"];

if ($query->execute()) {
  echo json_encode(["mensaje" => "Docente insertado correctamente"]);
} else {
  echo json_encode(["error" => $query->error]);
}

$query->close();
$conn->close();
?>