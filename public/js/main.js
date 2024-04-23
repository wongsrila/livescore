const shareBtn = document.getElementById('shareBtn');
const header = document.getElementById('header');

if (!navigator.share) {
  header.remove();
} else {
  shareBtn.addEventListener('click', async () => {
    try {
      // Get the current URL
      const currentURL = window.location.href;

      await navigator.share({
        title: 'Live Fixture',
        text: 'Check out this game. it’s awesome!',
        url: currentURL,
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  });
}
