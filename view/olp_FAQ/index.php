<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Help Center - Online Learning Platform</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Help Center</h1>
        <input type="text" id="searchInput" placeholder="Type your question...">
        
        <div id="faqContainer">
            <h2>Enrollment</h2>
            <div class="faq-item" data-category="Enrollment">
                <h3>How do I enroll in a course?</h3>
                <p>Go to the course page and click "Enroll".</p>
            </div>
            <div class="faq-item" data-category="Enrollment">
                <h3>Can I unenroll from a course?</h3>
                <p>Yes, visit your dashboard and click "Unenroll".</p>
            </div>

            <h2>Technical</h2>
            <div class="faq-item" data-category="Technical">
                <h3>Video not playing?</h3>
                <p>Check your internet connection and browser compatibility.</p>
            </div>
            <div class="faq-item" data-category="Technical">
                <h3>Password reset not working?</h3>
                <p>Ensure your email is correct and check spam folder.</p>
            </div>

            <h2>Payments</h2>
            <div class="faq-item" data-category="Payments">
                <h3>How do I get a refund?</h3>
                <p>Contact support within 7 days of purchase.</p>
            </div>
            <div class="faq-item" data-category="Payments">
                <h3>Is there a payment plan?</h3>
                <p>Yes, we offer monthly installments.</p>
            </div>
        </div>

        <button onclick="toggleSupportForm()">Still need help?</button>

        <div id="supportForm" style="display: none;">
            <h2>Submit a Support Ticket</h2>
            <form action="../../controller/faqSupport.php" method="post">
                <input type="text" name="name" placeholder="Your Name" required><br>
                <input type="email" name="email" placeholder="Your Email" required><br>
                <textarea name="issue" placeholder="Describe your issue..." required></textarea><br>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
