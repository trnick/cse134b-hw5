document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector("form");
    const numStars = document.querySelectorAll('.ratings span');

    numStars.forEach(star => {
        star.addEventListener('click', function (event) {
            event.preventDefault();
            const rating_attr = parseInt(this.getAttribute('data-rating'));
            sendRating(rating_attr);
            form.dispatchEvent(new Event('submit'));
        });
    });

    function sendRating(rating) {

        const infoOutput = document.getElementById('infoOutput');
        const formRating = document.getElementById('rating');

        if (rating >= 4) {
           infoOutput.textContent = 'Thanks for the ' + rating + ' stars rating!';
        } else if (rating <= 2) {
            infoOutput.textContent = 'Thanks for the feedback of ' + rating + ' stars. We will try to do better!';
        } else {
            infoOutput.textContent = '';
        }

        formRating.value = rating;
        
        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rating),
        })
        .then(response => response.json())
        .then(rating => console.log(rating))
        .catch(error => console.error(error));
    }
});