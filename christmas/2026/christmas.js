(() => {
  const audio = document.getElementById('santaAudio');
  const mainButton = document.getElementById('santaPlay');
  const trackButton = document.getElementById('trackPreview');
  const audioStatus = document.getElementById('santaAudioStatus');
  const panel = audio.closest('.audio-panel');
  const cinema = document.getElementById('holidayCinema');
  const video = document.getElementById('christmasVideo');
  const openFilm = document.getElementById('openFilm');
  let filmTrigger = openFilm;

  document.querySelector('.christmas-2026 meta[name="theme-color"]').content = '#133c31';
  const releaseLink = document.querySelector('.single-link');
  const releaseDate = Date.parse('2026-11-27T00:00:00Z');
  function showReleaseLink() {
    releaseLink.textContent = Date.now() < releaseDate ? 'Pre-save the single' : 'Listen to the single';
  }
  showReleaseLink();
  window.addEventListener('pageshow', showReleaseLink);
  document.addEventListener('visibilitychange', showReleaseLink);
  const untilRelease = releaseDate - Date.now();
  if (untilRelease > 0) setTimeout(showReleaseLink, untilRelease);
  function reflectPlayback() {
    const playing = !audio.paused && !audio.ended;
    document.getElementById('santaPlayLabel').textContent = playing ? 'Pause the chorus' : 'Play the chorus';
    mainButton.classList.toggle('playing', playing);
    trackButton.querySelector('small').textContent = playing ? 'Pause the chorus' : 'Hear the chorus · 26 sec';
  }
  function togglePreview() {
    panel.hidden = false;
    audioStatus.textContent = '';
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.ended) audio.currentTime = 0;
    video.pause();
    audio.play().catch(() => {
      audioStatus.textContent = 'Use the audio player to try the preview again.';
      audio.scrollIntoView({ block: 'center' });
    });
  }
  mainButton.addEventListener('click', togglePreview);
  trackButton.addEventListener('click', togglePreview);
  ['play', 'pause', 'ended'].forEach(name => audio.addEventListener(name, reflectPlayback));
  function showFilm(event) {
    event.preventDefault();
    filmTrigger = event.currentTarget;
    audio.pause();
    cinema.showModal();
    video.play().catch(() => { /* Native controls remain available. */ });
  }
  openFilm.addEventListener('click', showFilm);
  document.getElementById('closeFilm').addEventListener('click', () => cinema.close());
  cinema.addEventListener('click', event => {
    if (event.target !== cinema) return;
    const rect = cinema.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) cinema.close();
  });
  cinema.addEventListener('close', () => {
    video.pause();
    filmTrigger.focus({ preventScroll: true });
  });
})();
