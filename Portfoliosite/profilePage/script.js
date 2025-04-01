document.addEventListener('DOMContentLoaded', function() {
       const navItems = document.querySelectorAll('nav .nav-section li');
       const sections = {
           'about': document.querySelector('.about'),
           'my-portfolio': document.querySelector('.portfolio-section'),
           'services': document.querySelector('.services-section'),
           'insparations': document.querySelector('.gallery-container'),
           'blog': document.querySelector('.blog-section')
       };
   
       function handleScroll() {
           const scrollPosition = window.scrollY + 100;
           
           Object.entries(sections).forEach(([name, section]) => {
               if (!section) return;
               
               const sectionTop = section.offsetTop;
               const sectionHeight = section.offsetHeight;
               const sectionBottom = sectionTop + sectionHeight;
               
               if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                   navItems.forEach(item => {
                       item.classList.remove('active');
                       item.style.border= '';
                       item.style.backgroundColor = '';
                   });
                   
                   const correspondingNavItem = Array.from(navItems).find(item => {
                       return item.textContent.trim().toLowerCase().replace(/\s+/g, '-') === name;
                   });
                   
                   if (correspondingNavItem) {
                       correspondingNavItem.classList.add('active');
                       correspondingNavItem.style.border = '1px solid #060a26 ';
                       correspondingNavItem.style.backgroundColor = '#060a26';
                   }
               }
           });
       }
   
       window.addEventListener('scroll', handleScroll);
       window.addEventListener('load', handleScroll);
   
       navItems.forEach(item => {
           item.addEventListener('click', function() {
               const sectionName = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
               const targetSection = sections[sectionName];
               
               if (targetSection) {
                   targetSection.scrollIntoView({
                       behavior: 'smooth',
                       block: 'start'
                   });
               }
           });
       });
   });