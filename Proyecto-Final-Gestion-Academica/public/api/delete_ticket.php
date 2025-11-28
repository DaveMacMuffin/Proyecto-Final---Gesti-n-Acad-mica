<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Conexión
$conn = new mysqli("localhost", "root", "", "gestion_academica");

$data = $_POST;

$id_ticket = isset($data["id_ticket"]) ? intval($data["id_ticket"]) : 0;

if($id_ticket > 0) 
    {
    $query = $conn->prepare("DELETE FROM tickets WHERE id_ticket = ?");
    $query->bind_param("i", $id_ticket);

    if ($query->execute()) 
        {
        echo json_encode(["success" => true]);
    } else 
    {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
    $query->close();
} else {
    echo json_encode(["success" => false, "error" => "ID inválido"]);
}

$conn->close();
?>