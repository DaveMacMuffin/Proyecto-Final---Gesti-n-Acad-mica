<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "gestion_academica");
if ($conn->connect_error) { die(json_encode([])); }

$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : 'todo';
$condicionFecha = "";

// filtrao
switch ($filtro) {
    case 'semanal':
        $condicionFecha = "WHERE YEARWEEK(fecha_creacion, 1) = YEARWEEK(CURDATE(), 1)";
        break;
    case 'mensual':
        $condicionFecha = "WHERE MONTH(fecha_creacion) = MONTH(CURDATE()) AND YEAR(fecha_creacion) = YEAR(CURDATE())";
        break;
    case 'anual':
        $condicionFecha = "WHERE YEAR(fecha_creacion) = YEAR(CURDATE())";
        break;
    default:
        $condicionFecha = "";
        break;
}

// 2. KPIS DE TICKETS (Afectados por fecha)
$sqlTickets = "SELECT 
    SUM(CASE WHEN estado != 'Resuelto' THEN 1 ELSE 0 END) as abiertos,
    SUM(CASE WHEN estado = 'Resuelto' THEN 1 ELSE 0 END) as cerrados,
    COUNT(DISTINCT id_docente) as docentes_con_incidencia
FROM tickets $condicionFecha"; 
$resTickets = $conn->query($sqlTickets)->fetch_assoc();

// por tipos
$sqlTipos = "SELECT 
    tipo,
    COUNT(*) as total,
    SUM(CASE WHEN estado = 'Resuelto' THEN 1 ELSE 0 END) as resueltos,
    SUM(CASE WHEN estado = 'En Proceso' THEN 1 ELSE 0 END) as proceso,
    SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) as pendientes
FROM tickets 
$condicionFecha
GROUP BY tipo";
$resTipos = $conn->query($sqlTipos);
$tiposData = [];
while($row = $resTipos->fetch_assoc()) { $tiposData[] = $row; }

// tabla de tickets
$sqlLista = "SELECT id_ticket, tipo, descripcion, prioridad, estado, fecha_creacion 
             FROM tickets 
             $condicionFecha 
             ORDER BY fecha_creacion DESC";
$resLista = $conn->query($sqlLista);
$listaTickets = [];
while($row = $resLista->fetch_assoc()) { $listaTickets[] = $row; }

// datos actuales
$sqlDocentes = "SELECT 
    COUNT(*) as total_activos,
    SUM(CASE WHEN grado = 'Maestría' THEN 1 ELSE 0 END) as con_maestria,
    SUM(CASE WHEN sni != 'Sin SNI' THEN 1 ELSE 0 END) as con_sni
FROM docentes WHERE status = 'Activo'";
$resDocentes = $conn->query($sqlDocentes)->fetch_assoc();

$sqlMaterias = "SELECT COUNT(*) as total_clases FROM materias";
$resMaterias = $conn->query($sqlMaterias)->fetch_assoc();
$promedioClases = ($resDocentes['total_activos'] > 0) ? round($resMaterias['total_clases'] / $resDocentes['total_activos'], 1) : 0;

$response = [
    "reportes" => [
        "abiertos" => $resTickets['abiertos'] ?? 0,
        "cerrados" => $resTickets['cerrados'] ?? 0,
        "docentes_afectados" => $resTickets['docentes_con_incidencia'] ?? 0
    ],
    "tipos_detalle" => $tiposData,
    "lista_tickets" => $listaTickets,
    "academia" => [
        "maestrias" => $resDocentes['con_maestria'],
        "sni" => $resDocentes['con_sni'],
        "clases_promedio" => $promedioClases
    ]
];

echo json_encode($response);
?>