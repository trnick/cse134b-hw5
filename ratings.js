document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('form_rating').style.display = 'none';
    document.querySelector('.ratings').style.display = 'flex';

    const form = document.querySelector("form");
    const numStars = document.querySelectorAll('.ratings span');
    var output = new FormData();

    numStars.forEach(star => {
        star.addEventListener('click', function (event) {
            const rating_attr = parseInt(this.getAttribute('data-rating'));
            sendRating(rating_attr);
            form.dispatchEvent(new Event('submit'));
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var vars = [];

        const question = document.querySelector('input[name="question"]').value;
        const rating = document.querySelector('input[name="rating"]').value;

        output.append('question', question);
        output.append('rating', rating);

        let data = JSON.stringify(vars);

        fetch('https://httpbin.org/post', {
          method: 'POST',
          body: output,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        output = new FormData();
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
    }
});