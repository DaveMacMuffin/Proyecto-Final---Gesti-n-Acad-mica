<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


// Conexión
$conn = new mysqli("localhost", "root", "", "gestion_academica");
if ($conn->connect_error) { 
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Error de conexión BD"]);
    exit;
}

$data = $_POST;

$id_docente   = isset($data["id_docente"])   ? intval($data["id_docente"]): 0; 
//si existe en lo que devolvió angular entonces isset devuelve true de otra manera false, 
// si da true entonces asigna el valor despues del "?" sino entonces asigna 0
$nombre   = isset($data["nombre"])   ? $data["nombre"]   : 0;
$correo   = isset($data["correo"])   ? $data["correo"]   : "";
$academia = isset($data["academia"]) ? $data["academia"] : "";
$grado    = isset($data["grado"])    ? $data["grado"]    : "";
$idioma   = isset($data["idioma"])   ? $data["idioma"]   : "";
$sni      = isset($data["sni"])      ? $data["sni"]      : "";
$status   = isset($data["status"])   ? $data["status"]   : "";


$query = $conn->prepare("
    UPDATE docentes 
    SET nombre = ?, correo = ?, academia = ?, grado = ?, idioma = ?, sni = ?, status = ?
    WHERE id_docente = ?
");



$query->bind_param(
    "sssssssi", 
    $nombre, 
    $correo, 
    $academia, 
    $grado, 
    $idioma, 
    $sni, 
    $status, 
    $id_docente
);

if ($query->execute()) {
    echo json_encode(["success" => true, "message" => "Docente actualizado correctamente"]);
} else {
    echo "Error: " . $query->error;
}

$query->close();
$conn->close();
