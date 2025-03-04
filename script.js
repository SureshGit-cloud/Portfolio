// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    } else {
        console.error("Lucide is not loaded");
    }
  
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
  
    // Initialize animations and interactions
    initNavbar();
    initMobileMenu();
    initScrollButtons();
    initProjectFilters();
    initContactForm();
    initSkillBars();
  });
  
  // Navbar scroll effect
  function initNavbar() {
    const navbar = document.getElementById("navbar");
  
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
  
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
  
        // Toggle between menu and close icons
        const icon = menuToggle.querySelector("i");
        icon.setAttribute(
            "data-lucide",
            mobileMenu.classList.contains("active") ? "x" : "menu"
        );
        lucide.createIcons();
    });
  
    // Close mobile menu when a link is clicked
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });
  }
  
  // Scroll buttons
  function initScrollButtons() {
    const scrollToAboutBtn = document.getElementById("scrollToAbout");
    const scrollToTopBtn = document.getElementById("scrollToTop");
  
    if (scrollToAboutBtn) {
        scrollToAboutBtn.addEventListener("click", () => {
            document.getElementById("about").scrollIntoView({ behavior: "smooth" });
        });
    }
  
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
  
        window.addEventListener("scroll", () => {
            scrollToTopBtn.style.opacity = window.scrollY > 500 ? "1" : "0";
        });
    }
  }
  
  // Project filters
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
  
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
  
            const filter = btn.getAttribute("data-filter");
  
            projectCards.forEach((card) => {
                const tags = card.getAttribute("data-tags").split(",");
                if (filter === "all" || tags.includes(filter)) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 10);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("certificateModal");
      const modalImage = document.getElementById("certificateImage");
      const modalTitle = document.getElementById("certificateTitle");
      const closeModal = document.getElementById("closeModal");
    
      // Add event listeners to each "View Certificate" button
      document.querySelectorAll(".view-certificate-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const certificateCard = this.closest(".certification-card");
          const certificateImageUrl = certificateCard.getAttribute("data-image");
          const certificateTitle = certificateCard.querySelector("h3").textContent;
    
          modalImage.src = certificateImageUrl;
          modalTitle.textContent = certificateTitle;
          modal.classList.add("active");
        });
      });
    
      // Close modal when clicking the close button
      closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    
      // Close modal when clicking outside the modal content
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });
    
  
  // Contact form initialization (Updated for EmailJS Fix)
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");
  
    if (contactForm) {
        emailjs.init("A1cX-75gHwB16pXbA"); // Replace with your EmailJS User ID
  
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
  
            // Retrieve form values
            const fromName = document.getElementById("name").value;
            const userEmail = document.getElementById("email").value;
            const userMessage = document.getElementById("message").value;
  
            // Validate input fields
            if (!fromName || !userEmail || !userMessage) {
                formStatus.textContent = "Please fill in all fields.";
                formStatus.className = "form-status error";
                return;
            }
  
            // Show loading state
            const btnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span>`;
            submitBtn.disabled = true;
  
            // Send email using EmailJS
            emailjs
                .send("service_0skl14p", "template_65ds7bi", {
                    to_name: "Suresh Tammisetty", // Change this dynamically if needed
                    from_name: fromName,
                    message: userMessage,
                    reply_to: userEmail, // Optional: For reply-to email
                })
                .then((response) => {
                    console.log("Email sent successfully:", response);
  
                    // Reset button and show success message
                    submitBtn.innerHTML = btnText;
                    submitBtn.disabled = false;
                    formStatus.textContent = "Your message has been sent successfully!";
                    formStatus.className = "form-status success";
                    contactForm.reset();
  
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = "none";
                    }, 5000);
                })
                .catch((error) => {
                    console.error("Email sending failed:", error);
  
                    // Show error message
                    submitBtn.innerHTML = btnText;
                    submitBtn.disabled = false;
                    formStatus.textContent = "Failed to send message. Please try again.";
                    formStatus.className = "form-status error";
                });
        });
    }
  }
  
  // Animate skill bars on scroll
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress-bar");
  
    // Initial state - width 0
    skillBars.forEach((bar) => {
        bar.style.width = "0";
    });
  
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
    }
  
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach((bar) => {
            if (isInViewport(bar)) {
                const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = width;
            }
        });
    }
  
    // Animate on scroll
    window.addEventListener("scroll", animateSkillBars);
  
    // Initial check
    animateSkillBars();
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
  });
  