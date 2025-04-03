document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll("nav .nav-section li");
  const sections = {
    about: document.querySelector(".about"),
    "my-portfolio": document.querySelector(".portfolio-section"),
    services: document.querySelector(".services-section"),
    insparations: document.querySelector(".gallery-container"),
    blog: document.querySelector(".blog-section"),
  };

  function handleScroll() {
    const scrollPosition = window.scrollY + 100;

    Object.entries(sections).forEach(([name, section]) => {
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          item.style.border = "";
          item.style.backgroundColor = "";
        });

        const correspondingNavItem = Array.from(navItems).find((item) => {
          return (
            item.textContent.trim().toLowerCase().replace(/\s+/g, "-") === name
          );
        });

        if (correspondingNavItem) {
          correspondingNavItem.classList.add("active");
          correspondingNavItem.style.border = "1px solid #060a26 ";
          correspondingNavItem.style.backgroundColor = "#060a26";
        }
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const sectionName = this.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      const targetSection = sections[sectionName];

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// ekranin ustunde pagein acilmasinin javascript kodu
document.addEventListener("DOMContentLoaded", function () {
  const projectButton = document.getElementById("projectButton");

  if (projectButton) {
    projectButton.addEventListener("click", function () {
      const projectDetailsPath = "/cards/index.html";

      openProjectWithBlurEffect(projectDetailsPath);
    });
  }

  function openProjectWithBlurEffect(htmlFilePath) {
    const overlay = document.createElement("div");
    overlay.className = "blur-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.backdropFilter = "blur(5px)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease";

    const contentContainer = document.createElement("div");
    contentContainer.className = "popup-content";
    contentContainer.style.backgroundColor = "white";
    contentContainer.style.borderRadius = "12px";
    contentContainer.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
    contentContainer.style.width = "90%";
    contentContainer.style.maxWidth = "1200px";
    contentContainer.style.maxHeight = "90vh";
    contentContainer.style.overflow = "auto";
    contentContainer.style.opacity = "0";
    contentContainer.style.transform = "scale(0.95)";
    contentContainer.style.transition =
      "opacity 0.4s ease, transform 0.4s ease";

    const closeButton = document.createElement("div");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.fontSize = "28px";
    closeButton.style.fontWeight = "bold";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "#333";
    closeButton.style.zIndex = "10001";
    closeButton.style.width = "40px";
    closeButton.style.height = "40px";
    closeButton.style.display = "flex";
    closeButton.style.alignItems = "center";
    closeButton.style.justifyContent = "center";
    closeButton.style.borderRadius = "50%";
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

    closeButton.onclick = function () {
      contentContainer.style.opacity = "0";
      contentContainer.style.transform = "scale(0.95)";
      overlay.style.opacity = "0";

      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300);
    };

    fetch(htmlFilePath)
      .then((response) => response.text())
      .then((html) => {
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "90vh";
        iframe.style.border = "none";
        iframe.style.borderRadius = "12px";

        contentContainer.appendChild(iframe);

        setTimeout(() => {
          const iframeDoc =
            iframe.contentDocument || iframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(html);
          iframeDoc.close();

          overlay.style.opacity = "1";
          setTimeout(() => {
            contentContainer.style.opacity = "1";
            contentContainer.style.transform = "scale(1)";
          }, 150);
        }, 0);
      })
      .catch((error) => {
        contentContainer.innerHTML = `<div style="padding:20px;"><p>Error loading content: ${error.message}</p></div>`;
        console.error("Error loading HTML file:", error);

        overlay.style.opacity = "1";
        setTimeout(() => {
          contentContainer.style.opacity = "1";
          contentContainer.style.transform = "scale(1)";
        }, 150);
      });

    overlay.appendChild(contentContainer);
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);
  }
});
