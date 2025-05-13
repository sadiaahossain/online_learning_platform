<?php
// This is where you'd normally insert into a database
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $courseId = $_POST['course_id'] ?? '';
    $rating = $_POST['rating'] ?? '';
    $review = $_POST['review'] ?? '';

    echo "<h2>Thank you for rating!</h2>";
    echo "<p>Course ID: $courseId</p>";
    echo "<p>Your Rating: $rating ★</p>";
    echo "<p>Your Review: " . htmlspecialchars($review) . "</p>";
    echo '<p><a href="index.php">Back to courses</a></p>';
} else {
    echo "Invalid request.";
}
?>
