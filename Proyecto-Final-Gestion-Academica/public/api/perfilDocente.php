<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");

if ($conn->connect_error) { 
    die(json_encode(["error" => "Error de conexión BD"])); 
}

$idDocente = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($idDocente === 0) {
    die(json_encode(["error" => "ID no válido"]));
}

$sqlCV = "SELECT * FROM docentes WHERE id_docente = $idDocente";
$resultCV = $conn->query($sqlCV);

if (!$resultCV || $resultCV->num_rows === 0) {
    die(json_encode(["error" => "Docente no encontrado"]));
}

$resCV = $resultCV->fetch_assoc();

$sqlClases = "SELECT 
    nombre_materia as materia, 
    'Periodo Actual' as periodo, 
    promedio_general as promedio 
FROM materias 
WHERE id_docente = $idDocente";

$resClases = $conn->query($sqlClases);
$clasesData = [];
if ($resClases) {
    while($row = $resClases->fetch_assoc()) { 
        $clasesData[] = $row; 
    }
}


$promedio = isset($resCV['satisfaccion_alumnos']) ? (float)$resCV['satisfaccion_alumnos'] : 0;

$evaluacionData = [
    [
        "criterio" => "Satisfacción General de los Alumnos", 
        "calificacion" => $promedio
    ]
];


$sqlTickets = "SELECT 
    tipo, descripcion, fecha_creacion as fecha, estado 
FROM tickets 
WHERE id_docente = $idDocente 
ORDER BY fecha_creacion DESC";

$resTickets = $conn->query($sqlTickets);
$ticketsData = [];
if ($resTickets) {
    while($row = $resTickets->fetch_assoc()) { 
        $ticketsData[] = $row; 
    }
}


$response = [
    "cv" => [
        "nombre" => $resCV['nombre'],
        "correo" => $resCV['correo'],
        "academia" => $resCV['academia'],
        "grado" => $resCV['grado'],
        "idioma" => $resCV['idioma'],
        "sni" => $resCV['sni'],
        "status" => $resCV['status']
    ],
    "clases" => $clasesData,
    "evaluacion" => $evaluacionData,
    "incidencias" => $ticketsData
];

echo json_encode($response);
?>