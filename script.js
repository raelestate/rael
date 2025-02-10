document.addEventListener("DOMContentLoaded", () => {
    /**
     * Initialize Jarallax for a parallax effect.
     * - Applies a subtle parallax effect (speed: 0.2) to all elements with the class "jarallax".
     */
    jarallax(document.querySelectorAll(".jarallax"), { speed: 0.2 });

    /**
     * Register GSAP's ScrollTrigger plugin.
     * - Enables scroll-based animations throughout the site.
     */
    gsap.registerPlugin(ScrollTrigger);

    /**
     * Animate description elements as they come into view.
     * 
     * 1. Select all div elements within the ".description_holder" container.
     * 2. Set their initial state: 100px below their final position (y: 100) and fully transparent (opacity: 0).
     * 3. As the user scrolls, animate each element into view by moving them up (y: 0) and fading them in (opacity: 1).
     * 4. A staggered delay (based on index) creates a cascading effect.
     */
    const textElements = gsap.utils.toArray('.description_holder div');
    gsap.set(textElements, { y: 100, opacity: 0 });
    textElements.forEach((text, index) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%", // Begins when the element is near the center of the viewport
                end: "top 30%",
                scrub: 1,       // Ties the animation progress to the scroll position for a smooth effect
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: index * 0.2, // Stagger the animation for each element
        });
    });

    /**
     * Pin the "#description_section" while scrolling.
     * - This creates a fixed view for the section until the user scrolls past it.
     */
    ScrollTrigger.create({
        trigger: "#description_section",
        start: "top top",
        end: "bottom top",
        scrub: 2,
    });
    /**
   * Animate the About Section text word-by-word.
   * 
   * 1. Split the paragraph text inside ".about_us p" into individual words.
   *    - Each word is wrapped in a span with the class "word".
   *    - A non-breaking space (&nbsp;) is appended to preserve proper spacing.
   * 
   * 2. Set an initial state for each word:
   *    - 50% brightness (dim) and 50% opacity.
   * 
   * 3. Create a pinned timeline for "#about_section":
   *    - The section is pinned (fixed) for a scroll distance of 2000 pixels.
   *    - While pinned, each word animates sequentially (stagger: 0.1 seconds) from
   *      dim (brightness: 50%, opacity: 0) to full brightness and opacity.
   *    - Once the animation completes, the section unpins and normal scrolling resumes.
   */
    const paragraph = document.querySelector(".about_us p");
    const wordsHTML = paragraph.textContent
        .split(" ")
        .map(word => `<span class="word">${word}&nbsp;</span>`)
        .join("");
    paragraph.innerHTML = wordsHTML;

    // Set the initial dim state for each word
    gsap.set(".word", { filter: "brightness(50%)", opacity: 0.5 });

    // Create the timeline for the pinned word-by-word animation
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about_section",  // The section to be pinned during animation
            start: "top top",           // When the top of #about_section reaches the top of the viewport
            end: "+=2000",              // Pin the section for an additional 2000px of scrolling (adjust as needed)
            pin: true,                  // Pin the section during the animation
            scrub: true,                // Sync the timeline's progress with the scroll position
        }
    })
        .fromTo(
            ".word",
            { filter: "brightness(50%)", opacity: 0 },
            { filter: "brightness(100%)", opacity: 1, stagger: 0.1 }
        );
    /**
     * Horizontal text movement effects for the industry info.
     * 
     * - Elements ".text1" and ".text3" move 20% to the right.
     * - Elements ".text2" and ".text4" move 20% to the left.
     * - The animation is synchronized with the scroll progress over the ".industry_info" section.
     */
    gsap.utils.toArray([".text1", ".text3"]).forEach((el) => {
        gsap.to(el, {
            x: "20%",
            ease: "none",
            scrollTrigger: {
                trigger: ".industry_info",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });
    });

    gsap.utils.toArray([".text2", ".text4"]).forEach((el) => {
        gsap.to(el, {
            x: "-20%",
            ease: "none",
            scrollTrigger: {
                trigger: ".industry_info",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });
    });
    
    gsap.from(".industry_companies .company", {
        scrollTrigger: {
            trigger: ".industry_companies", // The container for all company elements
            start: "top 80%",                // When the container's top is at 80% of the viewport
            end: "bottom 60%",               // When the container's bottom is at 60% of the viewport
            scrub: 1                       // Smoothly scrubs the animation based on scroll position
        },
        opacity: 0,      // Start fully transparent
        y: 50,           // Start 50px below the final position
        duration: 1,     // Animation duration of 1 second (its progress is tied to scroll)
        ease: "power2.out",
        stagger: 0.3     // Each company element animates 0.3 seconds after the previous one
    });

    gsap.utils.toArray('.explore_holder div[class^="work"]').forEach((work) => {
        gsap.from(work, {
          scrollTrigger: {
            trigger: work,              // Each work element triggers its own animation
            start: "top 80%",           // When the top of the work element reaches 80% of the viewport
            end: "bottom 60%",          // When the bottom of the work element reaches 60% of the viewport
            scrub: 1                    // Ties the animation progress to the scroll position
          },
          opacity: 0,                   // Start fully transparent
          y: 50,                        // Start 50px below its final position
          duration: 1.5,                // Duration of the animation (scrubbed to scroll)
          ease: "back.out(1.7)"         // Easing with a slight overshoot for a more dynamic feel
        });
      });

// Calculate price on button click
document.getElementById("calculate_btn").addEventListener("click", function () {
    let total = 0;
    
    // Website type
    const websiteType = document.getElementById("website_type");
    const selectedOption = websiteType.options[websiteType.selectedIndex];
    total += parseInt(selectedOption.getAttribute("data-price"));
    
    // All checked checkboxes (including the disabled Hosting option)
    const checkboxes = document.querySelectorAll('#pricing_form input[type="checkbox"]');
    checkboxes.forEach((cb) => {
      if (cb.checked) {
        total += parseInt(cb.getAttribute("data-price"));
      }
    });
    
    // Additional pages cost ($50 per page)
    const pages = document.getElementById("pages").value;
    total += pages * 50;
    
    // Animate the total price update using GSAP
    gsap.to("#total_price", {
      innerText: total,
      duration: 1,
      snap: { innerText: 1 },
      ease: "power1.inOut",
    });
  });
  
  // Send estimate via email instead of printing or downloading
  document.getElementById("print_btn").addEventListener("click", function () {
    // Gather details for the email body
    const websiteTypeElement = document.getElementById("website_type");
    const websiteTypeText = websiteTypeElement.options[websiteTypeElement.selectedIndex].text;
    let details = "";
    details += "Website Estimate\n\n";
    details += "Website Type: " + websiteTypeText + "\n";
    
    // Extra Features
    document.querySelectorAll('input[name="features"]:checked').forEach(cb => {
      details += "Feature: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
    });
    
    // Additional Pages
    details += "Additional Pages: " + document.getElementById("pages").value + "\n";
    
    // Design & Branding
    document.querySelectorAll('input[name="design"]:checked').forEach(cb => {
      details += "Design Option: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
    });
    
    // Content & Marketing
    document.querySelectorAll('input[name="marketing"]:checked').forEach(cb => {
      details += "Marketing Option: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
    });
    
    // Technical Services
    document.querySelectorAll('input[name="technical"]:checked').forEach(cb => {
      details += "Technical Service: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
    });
    
    // Other Requirements & Contact Info
    details += "Other Requirements: " + document.getElementById("requirements").value + "\n";
    details += "Name: " + document.getElementById("customer_name").value + "\n";
    details += "Email: " + document.getElementById("customer_email").value + "\n";
    
    // Estimated Price
    details += "\nTotal Estimated Price: $" + document.getElementById("total_price").innerText + "\n";
    
    // Build mailto link with subject and body
    const subject = "Website Estimate";
    const mailtoLink = "mailto:nerirhel@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(details);
    
    // Redirect to the mailto link
    window.location.href = mailtoLink;
  });
});