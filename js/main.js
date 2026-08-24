/* NABES — meccanica del prototipo.
   Volutamente minima: zero librerie, zero jQuery. Il sito vecchio ne
   caricava 627 KB (jQuery UI due volte) per mostrare tre prodotti. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  /* anno nel footer */
  var anno = document.getElementById('anno');
  if (anno) anno.textContent = String(new Date().getFullYear());

  /* menu mobile: lo stato vive su aria-expanded, il CSS lo legge da lì */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var chiudi = function () {
      nav.classList.remove('aperta');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var aperto = nav.classList.toggle('aperta');
      burger.setAttribute('aria-expanded', aperto ? 'true' : 'false');
      if (aperto) { var a = nav.querySelector('a'); if (a) a.focus(); }
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', chiudi); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('aperta')) { chiudi(); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) chiudi(); });
  }

  /* filtri di categoria — nessun ricaricamento, solo hidden sulle card */
  var filtri = document.querySelectorAll('[data-filtro]');
  var griglia = document.getElementById('griglia');
  if (filtri.length && griglia) {
    var cards = griglia.querySelectorAll('.card');
    filtri.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filtro');
        filtri.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        cards.forEach(function (c) {
          c.hidden = !(f === 'tutti' || c.getAttribute('data-cat') === f);
        });
      });
    });
  }

  /* galleria della scheda prodotto */
  var main = document.getElementById('fotoMain');
  var mini = document.querySelectorAll('[data-foto]');
  if (main && mini.length) {
    mini.forEach(function (b) {
      b.addEventListener('click', function () {
        main.src = b.getAttribute('data-foto');
        mini.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
  }

  /* selettore quantità */
  document.querySelectorAll('.qta').forEach(function (q) {
    var input = q.querySelector('input');
    var bottoni = q.querySelectorAll('button');
    if (!input || bottoni.length < 2) return;
    bottoni[0].addEventListener('click', function () {
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
    });
    bottoni[1].addEventListener('click', function () {
      input.value = (parseInt(input.value, 10) || 1) + 1;
    });
  });
})();
