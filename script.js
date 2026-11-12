// Fecha de la fiesta (hora de Paraguay, UTC-3)
const FECHA = new Date('2026-12-26T21:00:00-03:00');

const musica = document.getElementById('musica');
const btnMusica = document.getElementById('musica-btn');

// Música: arranca al tocar "Abrir invitación" (el navegador no deja sonar sola)
document.getElementById('abrir').addEventListener('click', () => {
  document.body.classList.remove('cerrado');
  musica.play().catch(() => {});
});

btnMusica.addEventListener('click', () => {
  if (musica.paused) musica.play().catch(() => {});
  else musica.pause();
});

function actualizarBoton() {
  const suena = !musica.paused;
  btnMusica.textContent = suena ? 'Pausar música' : 'Dale play!';
  btnMusica.setAttribute('aria-pressed', suena);
}
musica.addEventListener('play', actualizarBoton);
musica.addEventListener('pause', actualizarBoton);

// Cuenta regresiva
function cuenta() {
  const r = Math.max(0, FECHA - Date.now());
  document.getElementById('d').textContent = Math.floor(r / 86400000);
  document.getElementById('h').textContent = Math.floor(r % 86400000 / 3600000);
  document.getElementById('m').textContent = Math.floor(r % 3600000 / 60000);
  document.getElementById('s').textContent = Math.floor(r % 60000 / 1000);
}
cuenta();
setInterval(cuenta, 1000);

// Copiar alias
const btnCopiar = document.getElementById('copiar');
btnCopiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('0981803546');
    btnCopiar.textContent = 'Alias copiado';
  } catch {
    btnCopiar.textContent = 'Copialo a mano';
  }
  setTimeout(() => (btnCopiar.textContent = 'Copiar alias'), 2000);
});

// Si falta una imagen de personaje, el bloque se acomoda sin dejar hueco
document.querySelectorAll('.marco img').forEach(img => {
  const marco = img.closest('.marco');
  const fig = img.closest('figure');
  const quitar = () => { fig.remove(); marco.classList.add('sin-img'); };
  if (img.complete && img.naturalWidth === 0) quitar();
  else img.addEventListener('error', quitar);
});
