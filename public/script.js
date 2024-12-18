// Add hover effect to images in Campaigns and Disaster sections
const hoverImages = document.querySelectorAll('.gallery img');

hoverImages.forEach(img => {
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.1)';
    img.style.transition = 'transform 0.3s ease';
  });

  img.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1)';
  });
});