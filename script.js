document.querySelector('button').addEventListener('click', function() {
        html2canvas(document.querySelector('.specific'), {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);
            }
        });
    });