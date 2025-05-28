<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $issue = $_POST['issue'] ?? '';

    // In a real app, you'd store this in a database or send an email
    echo "<h2>Support Ticket Submitted</h2>";
    echo "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
    echo "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    echo "<p><strong>Issue:</strong> " . nl2br(htmlspecialchars($issue)) . "</p>";
} else {
    echo "Invalid request.";
}
?>
