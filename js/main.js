document.addEventListener("DOMContentLoaded", function () {
  // Typing Effect
  var words = ["Designer ", "Developer ", "Freelancer ", "Photographer "];
  var typingSpeed = 100;
  var erasingSpeed = 50;
  var delayAfterTyping = 1000;

  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var targetElement = document.getElementById("auto-type");

  function typeEffect() {
    var currentWord = words[wordIndex];

    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex--);
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex++);
    }

    var nextSpeed = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, delayAfterTyping);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, nextSpeed);
  }

  if (targetElement) {
    typeEffect();
  }

  var scrollToTopBtn = document.getElementById("scrollToTop");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var animateOnScroll = () => {
    var elements = document.querySelectorAll(".scroll-animate");
    if (elements.length === 0) return;

    elements.forEach((el, index) => {
      if (
        !el.classList.contains("delay-1") &&
        !el.classList.contains("delay-2") &&
        !el.classList.contains("delay-3") &&
        !el.classList.contains("delay-4") &&
        !el.classList.contains("delay-5") &&
        !el.classList.contains("delay-6")
      ) {
        var delayClass = `delay-${(index % 6) + 1}`;
        el.classList.add(delayClass);
      }
    });

    var observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    var observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((el) => {
      observer.observe(el);
    });
  };

  animateOnScroll();

  window.addEventListener("load", animateOnScroll);
});
