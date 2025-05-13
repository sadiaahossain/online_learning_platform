document.addEventListener('DOMContentLoaded', function () {
    // Handle star selection
    document.querySelectorAll('.stars').forEach(starGroup => {
        const stars = starGroup.querySelectorAll('.star');
        const ratingInput = starGroup.querySelector('.rating-value');

        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                highlightStars(stars, index);
            });

            star.addEventListener('mouseout', () => {
                resetStars(stars);
            });

            star.addEventListener('click', () => {
                setRating(stars, index);
                ratingInput.value = index + 1;
            });
        });
    });

    function highlightStars(stars, index) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('hover');
        }
    }

    function resetStars(stars) {
        stars.forEach(star => star.classList.remove('hover'));
    }

    function setRating(stars, index) {
        stars.forEach(star => star.classList.remove('selected'));
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('selected');
        }
    }

    // Filter courses by rating
    const filter = document.getElementById('ratingFilter');
    const courses = document.querySelectorAll('.course-card');

    filter.addEventListener('change', function () {
        const minRating = parseFloat(this.value);
        courses.forEach(course => {
            const rating = parseFloat(course.getAttribute('data-rating'));
            if (rating >= minRating) {
                course.style.display = '';
            } else {
                course.style.display = 'none';
            }
        });
    });
});
