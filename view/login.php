<?php
session_start();
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) die("DB Connection failed");

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];
    // For demo: plain password check. In production, use password_hash!
    $res = $conn->query("SELECT * FROM users WHERE email='$email' AND password_hash='$password'");
    if ($user = $res->fetch_assoc()) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        header("Location: dashboard.html");
        exit;
    } else {    
        $error = "Invalid email or password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Online Learning Platform</title>
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
            <h2>Login to Your Account</h2>
            <?php if ($error): ?>
                <div style="color:red; margin-bottom:1rem;"><?=htmlspecialchars($error)?></div>
            <?php endif; ?>
            <form id="login-form" method="post" action="login.php" autocomplete="off">
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="cta">Login</button>
            </form>
            <p><a href="forgot-password.html">Forgot Password?</a></p>
            <p>Don't have an account? <a href="signup.php">Sign Up</a></p>
        </div>
    </section>
</body>
</html>