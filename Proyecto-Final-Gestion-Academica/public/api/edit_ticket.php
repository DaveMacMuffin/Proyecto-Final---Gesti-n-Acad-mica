<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


$conn = new mysqli("localhost", "root", "", "gestion_academica");

$data = $_POST;


$id_ticket = intval($data["id_ticket"] ?? 0);
$estado = $data["estado"] ?? "";

if ($id_ticket <= 0) {
    echo json_encode(["success" => false, "error" => "ID inválido"]);
    exit;
}

$query = $conn->prepare("UPDATE tickets SET estado = ? WHERE id_ticket = ?");
$query->bind_param("si", $estado, $id_ticket);

if ($query->execute()) {
    echo json_encode(["success" => true, "message" => "Estado actualizado"]);
} else {
    echo json_encode(["success" => false, "error" => $query->error]);
}

$query->close();
$conn->close();
