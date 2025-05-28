<?php
$conn = new mysqli("localhost", "root", "", "elearning");
if ($conn->connect_error) die("DB Connection failed");

$sql = "
    SELECT 
        c.id, 
        c.title AS name, 
        IFNULL(AVG(r.rating), 0) AS rating, 
        COUNT(r.id) AS reviews
    FROM courses c
    LEFT JOIN course_ratings r ON c.id = r.course_id
    GROUP BY c.id, c.title
";
$res = $conn->query($sql);
$courses = [];
while ($row = $res->fetch_assoc()) {
    $row['rating'] = round($row['rating'], 1); 
    $courses[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Course Ratings</title>
    <link rel="stylesheet" href="course-rating-styles.css">
</head>
<body>
    <div class="container">
        <h1>Course Ratings</h1>

        <!-- Filter -->
        <label for="ratingFilter">Show courses with rating at least:</label>
        <select id="ratingFilter">
            <option value="0">All</option>
            <option value="3">3 ★</option>
            <option value="4">4 ★</option>
            <option value="4.5">4.5 ★</option>
        </select>

        <!-- Courses -->
        <div id="courseList">
            <?php foreach ($courses as $course): ?>
                <div class="course-card" data-rating="<?= $course['rating'] ?>">
                    <h2><?= htmlspecialchars($course['name']) ?></h2>
                    <p>Average Rating: <?= $course['rating'] ?> ★ (<?= $course['reviews'] ?> reviews)</p>

                    <!-- Rating Form -->
                    <form action="..controller/courseRatingSupport.php" method="post">
                        <input type="hidden" name="course_id" value="<?= $course['id'] ?>">
                        <div class="stars">
                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                <span class="star" data-value="<?= $i ?>">&#9733;</span>
                            <?php endfor; ?>
                            <input type="hidden" name="rating" class="rating-value" required>
                        </div>
                        <textarea name="review" placeholder="Optional review..."></textarea>
                        <button type="submit">Submit Rating</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <script src="../rendering/main.js"></script> 
</body>
</html>