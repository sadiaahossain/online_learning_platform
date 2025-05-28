<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB Connection failed']);
    exit;
}
$result = $conn->query("SELECT id, title, category, syllabus, duration, difficulty, preview_link, price, is_paid FROM courses");
$courses = [];
while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}
echo json_encode($courses);
?>