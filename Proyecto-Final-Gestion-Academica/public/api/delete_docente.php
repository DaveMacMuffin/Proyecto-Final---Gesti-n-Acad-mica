<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Conexión
$conn = new mysqli("localhost", "root", "", "gestion_academica");

$data = $_POST;

$id_docente = isset($data["id_docente"]) ? intval($data["id_docente"]) : 0;

if($id_docente > 0) {
    $query = $conn->prepare("DELETE FROM docentes WHERE id_docente = ?");
    $query->bind_param("i", $id_docente);

    if ($query->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
    $query->close();
} else {
    echo json_encode(["success" => false, "error" => "ID inválido"]);
}

$conn->close();
?>