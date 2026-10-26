// Eye styles for the horned critter. The palette itself lives in style.css (:root).
window.EYE_STYLES = [
  { id: 'pixel', name: 'Pixel', note: 'Blocky 2×3 eyes with one highlight pixel, like a game sprite.' },
  { id: 'bean', name: 'Bean', note: 'Solid dark ovals with a catchlight and no whites.' },
  { id: 'stare', name: 'Stare', note: 'The original: big whites, small pupils. Kept as the control.' },
];

window.applyEyes = function (id, { persist = false } = {}) {
  const style = window.EYE_STYLES.find(e => e.id === id) || window.EYE_STYLES[0];
  document.documentElement.dataset.eyes = style.id;
  if (persist) {
    try { localStorage.setItem('eyes', style.id); } catch (e) {}
  }
  return style;
};

// Apply before first paint: a URL param wins, then the visitor's last pick.
if (!window.NO_SETTINGS_APPLY) {
  let eyes = new URLSearchParams(location.search).get('eyes');
  if (!eyes) {
    try { eyes = localStorage.getItem('eyes'); } catch (e) {}
  }
  window.applyEyes(eyes);
}
