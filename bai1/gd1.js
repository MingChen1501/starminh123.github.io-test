var slideIndex = 0;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length - 1) slideIndex = 0
    if (n < 0) slideIndex = slides.length - 1
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    document.getElementById("numbertext").innerHTML = `${slideIndex + 1} / ${slides.length}`
}
showSlides(slideIndex);