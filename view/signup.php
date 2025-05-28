<?php
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) die("DB Connection failed");

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];
    // Check if email exists
    $exists = $conn->query("SELECT id FROM users WHERE email='$email'")->num_rows;
    if ($exists) {
        $error = "Email already registered.";
    } else {
        // For demo: store plain password. Use password_hash() for real apps!
        $conn->query("INSERT INTO users (name, email, password_hash, role) VALUES ('$name', '$email', '$password', 'student')");
        header("Location: login.php?signup=success");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up - Online Learning Platform</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">LearnOnline</div>
        <ul class="nav-links">
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#features">Features</a></li>
            <li><a href="index.html#testimonials">Testimonials</a></li>
            <li><a href="signup.php" class="cta">Sign Up</a></li>
        </ul>
    </nav>
    <section class="auth-section">
        <div class="auth-container">
            <h2>Create Your Account</h2>
            <?php if ($error): ?>
                <div style="color:red; margin-bottom:1rem;"><?=htmlspecialchars($error)?></div>
            <?php endif; ?>
            <form method="post" action="signup.php" autocomplete="off">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                <button type="submit" class="cta">Sign Up</button>
            </form>
            <p>Already have an account? <a href="login.php">Login</a></p>
        </div>
    </section>
</body>
</html>