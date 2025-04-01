


// Badges elave etmek yeri

const saveButton = document.querySelector('.save-button');
const addBadge = document.querySelector('.add-badge img');
const addButtons = document.querySelectorAll('.add-button');
const container= document.querySelector('.container')
console.log(
       container
);

let activeButton = null;
let selectedBadge = null;

// Check which page we're on
const isProfilePage = window.location.pathname.includes('myprofilePage');
const isSelectBadgePage = window.location.pathname.includes('select-badges');

// Load previously selected badge
function loadSavedBadge() {
  try {
    const savedBadge = localStorage.getItem('selectedBadge');
    if (savedBadge && savedBadge !== 'null') {
      console.log('Found saved badge:', savedBadge);
      
      // If we're on the select badges page, highlight the selected badge
      if (isSelectBadgePage) {
        const badgeElements = document.querySelectorAll('.badge-icon img');
        badgeElements.forEach(img => {
          if (img.src === savedBadge || savedBadge.endsWith(img.getAttribute('src'))) {
            const badgeCard = img.closest('.badge-card');
            const addButton = badgeCard.querySelector('.add-button');
            if (addButton && !badgeCard.classList.contains('locked')) {
              // Simulate a click to select this badge
              addButton.click();
            }
          }
        });
      }
      
      // If we're on the profile page, update the badge display
      if (isProfilePage && addBadge) {
        console.log('Updating profile badge to:', savedBadge);
        addBadge.src = savedBadge;
      }
    }
  } catch (error) {
    console.error('Error loading saved badge:', error);
  }
}

// Initialize badge buttons
if (addButtons.length > 0) {
  addButtons.forEach(button => {
    const originalContent = button.innerHTML;
    const badgeCard = button.closest('.badge-card');
    
    if (!badgeCard) return;
    
    const badgeImg = badgeCard.querySelector('.badge-icon img');
    
    if (!badgeImg) return;

    button.addEventListener('click', function() {
      if (badgeCard.classList.contains('locked')) return;

      if (activeButton === this) {
        // Second click - deselect
        this.innerHTML = originalContent;
        this.classList.remove('added');
        activeButton = null;
        selectedBadge = null;
      } else {
        // New selection
        if (activeButton) {
          const prevOriginal = activeButton.dataset.original || '';
          activeButton.innerHTML = prevOriginal;
          activeButton.classList.remove('added');
        }

        this.innerHTML = '<span class="check-icon">✓</span> Added';
        this.classList.add('added');
        activeButton = this;
        this.dataset.original = originalContent;
        selectedBadge = badgeImg.src;
        console.log('Selected badge:', selectedBadge);
      }
    });
  });
}

// Handle save button
// Handle save button
if (saveButton) {
       saveButton.addEventListener('click', function(e) {
         e.preventDefault();
         try {
           console.log('1. Save button clicked');
           localStorage.setItem('selectedBadge', selectedBadge || '');
     
           // Loading overlay yaradın
           const loadingOverlay = document.createElement('div');
           loadingOverlay.className = 'loading-overlay';
           loadingOverlay.textContent = 'Loading...';
           document.body.appendChild(loadingOverlay);
     
           if (addBadge && selectedBadge) {
             addBadge.src = selectedBadge;
             console.log('2. Badge updated, waiting for redirect...');
             
             // 2 saniyə gözlə və yönləndir
             setTimeout(() => {
               console.log('3. Redirecting now...');
               const targetUrl = window.location.href.includes('localhost') 
                 ? 'http://localhost:5500/myprofilePage/index.html'
                 : '../myprofilePage/index.html';
               
               console.log('4. Target URL:', targetUrl);
               window.location.href = targetUrl;
             }, 2000);
           } else {
             setTimeout(() => {
               window.location.href = '../myprofilePage/index.html';
             }, 2000);
           }
         } catch (error) {
           console.error('Error:', error);
           // Xəta halında da loading göstər və yönləndir
           if (loadingOverlay) loadingOverlay.textContent = 'Error, redirecting...';
           setTimeout(() => {
             window.location.href = '../myprofilePage/index.html';
           }, 2000);
         }
       });
     }

// Load saved badge when the page is ready
loadSavedBadge();

// Debug helper - show what's in localStorage
console.log('Current localStorage badge:', localStorage.getItem('selectedBadge'));