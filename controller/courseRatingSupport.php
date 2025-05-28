<?php
session_start();
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'DB Connection failed']);
    exit;
}

$courseId = intval($_POST['course_id'] ?? 0);
$rating = intval($_POST['rating'] ?? 0);
$review = $conn->real_escape_string($_POST['review'] ?? '');
$user_id = $_SESSION['user_id'] ?? 1; // fallback for demo

if ($courseId && $rating >= 1 && $rating <= 5 && $user_id) {
    $result = $conn->query("INSERT INTO course_ratings (course_id, user_id, rating, review) VALUES ($courseId, $user_id, $rating, '$review')");
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your rating!']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database insert failed.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>