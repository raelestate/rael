document.addEventListener("DOMContentLoaded", () => {
    jarallax(document.querySelectorAll(".jarallax"), { speed: 0.2 });

    gsap.registerPlugin(ScrollTrigger);

    const textElements = gsap.utils.toArray('.description_holder div');
    gsap.set(textElements, { y: 100, opacity: 0 });
    textElements.forEach((text, index) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: index * 0.2,
        });
    });

    ScrollTrigger.create({
        trigger: "#description_section",
        start: "top top",
        end: "bottom top",
        scrub: 2,
    });

    const paragraph = document.querySelector(".about_us p");
    const wordsHTML = paragraph.textContent
        .split(" ")
        .map(word => `<span class="word">${word}&nbsp;</span>`)
        .join("");
    paragraph.innerHTML = wordsHTML;

    gsap.set(".word", { filter: "brightness(50%)", opacity: 0.5 });

    gsap.timeline({
        scrollTrigger: {
            trigger: "#about_section",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: true,
        }
    })
        .fromTo(
            ".word",
            { filter: "brightness(50%)", opacity: 0 },
            { filter: "brightness(100%)", opacity: 1, stagger: 0.1 }
        );

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
            trigger: ".industry_companies",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3
    });

    gsap.utils.toArray('.explore_holder div[class^="work"]').forEach((work) => {
        gsap.from(work, {
          scrollTrigger: {
            trigger: work,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          },
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "back.out(1.7)"
        });
    });

    document.getElementById("calculate_btn").addEventListener("click", function () {
        let total = 0;
        
        const websiteType = document.getElementById("website_type");
        const selectedOption = websiteType.options[websiteType.selectedIndex];
        total += parseInt(selectedOption.getAttribute("data-price"));
        
        const checkboxes = document.querySelectorAll('#pricing_form input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) {
            total += parseInt(cb.getAttribute("data-price"));
          }
        });
        
        const pages = document.getElementById("pages").value;
        total += pages * 50;
        
        gsap.to("#total_price", {
          innerText: total,
          duration: 1,
          snap: { innerText: 1 },
          ease: "power1.inOut",
        });
    });
  
    document.getElementById("print_btn").addEventListener("click", function () {
        const websiteTypeElement = document.getElementById("website_type");
        const websiteTypeText = websiteTypeElement.options[websiteTypeElement.selectedIndex].text;
        let details = "";
        details += "Website Estimate\n\n";
        details += "Website Type: " + websiteTypeText + "\n";
        
        document.querySelectorAll('input[name="features"]:checked').forEach(cb => {
          details += "Feature: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
        });
        
        details += "Additional Pages: " + document.getElementById("pages").value + "\n";
        
        document.querySelectorAll('input[name="design"]:checked').forEach(cb => {
          details += "Design Option: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
        });
        
        document.querySelectorAll('input[name="marketing"]:checked').forEach(cb => {
          details += "Marketing Option: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
        });
        
        document.querySelectorAll('input[name="technical"]:checked').forEach(cb => {
          details += "Technical Service: " + document.querySelector("label[for='" + cb.id + "']").innerText + "\n";
        });
        
        details += "Other Requirements: " + document.getElementById("requirements").value + "\n";
        details += "Name: " + document.getElementById("customer_name").value + "\n";
        details += "Email: " + document.getElementById("customer_email").value + "\n";
        
        details += "\nTotal Estimated Price: $" + document.getElementById("total_price").innerText + "\n";
        
        const subject = "Website Estimate";
        const mailtoLink = "mailto:nerirhel@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(details);
        
        window.location.href = mailtoLink;
    });
});
