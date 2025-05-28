<?php
session_start();
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) die("DB Connection failed");

// Handle new post
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
    $user = $_SESSION['user_name'] ?? 'Guest';
    $user_id = $_SESSION['user_id'] ?? 1; // fallback for demo
    $content = $conn->real_escape_string($_POST['message']);
    $thread_id = 1; // Single forum thread for demo
    $conn->query("INSERT INTO forum_posts (thread_id, user_id, content) VALUES ($thread_id, $user_id, '$content')");
    header("Location: discussion.php");
    exit;
}

// Fetch posts
$posts = [];
$res = $conn->query("SELECT forum_posts.*, users.name FROM forum_posts LEFT JOIN users ON forum_posts.user_id = users.id WHERE thread_id=1 ORDER BY created_at ASC");
while ($row = $res->fetch_assoc()) $posts[] = $row;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discussions</title>
    <link rel="stylesheet" href="discussionStyles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">LearnOnline</div>
        <ul class="nav-links">
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="course-catalog.html">Courses</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><button id="logout-btn" class="cta" style="border:none; background:#007bff; color:#fff; cursor:pointer;">Logout</button></li>
        </ul>
    </nav>
    <div class="forum-container">
        <div class="forum-header">
            <h2>Discussion Forum</h2>
        </div>
        <div class="forum-chat-box" id="forum-chat-box">
            <?php foreach ($posts as $post): ?>
                <div class="forum-message">
                    <img class="forum-avatar" src="https://ui-avatars.com/api/?name=<?=urlencode($post['name'] ?? 'User')?>" alt="avatar">
                    <div class="forum-msg-content">
                        <span class="forum-msg-user"><?=htmlspecialchars($post['name'] ?? 'User')?></span>
                        <span class="forum-msg-time"><?=date('M d, H:i', strtotime($post['created_at']))?></span>
                        <div><?=nl2br(htmlspecialchars($post['content']))?></div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <form class="forum-form" method="post" autocomplete="off">
            <input class="forum-input" type="text" name="message" placeholder="Type your message..." required maxlength="500" autofocus>
            <button class="forum-send-btn" type="submit">Send</button>
        </form>
    </div>
    <script>
        // Scroll chat to bottom on load
        window.onload = function() {
            var box = document.getElementById('forum-chat-box');
            box.scrollTop = box.scrollHeight;
        };
        // Logout button
        document.getElementById('logout-btn')?.addEventListener('click', function() {
            window.location.href = 'login.php';
        });
    </script>
</body>
</html>