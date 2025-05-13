<?php
// Dummy course data with ratings
$courses = [
    ["id" => 1, "name" => "Python Basics", "rating" => 4.3, "reviews" => 12],
    ["id" => 2, "name" => "Web Development", "rating" => 4.8, "reviews" => 18],
    ["id" => 3, "name" => "Data Science", "rating" => 3.9, "reviews" => 9],
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Course Ratings</title>
    <link rel="stylesheet" href="styles.css">
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
                    <h2><?= $course['name'] ?></h2>
                    <p>Average Rating: <?= $course['rating'] ?> ★ (<?= $course['reviews'] ?> reviews)</p>

                    <!-- Rating Form -->
                    <form action="../../controller/courseRatingSupport.php" method="post">
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

    <script src="script.js"></script>
</body>
</html>
