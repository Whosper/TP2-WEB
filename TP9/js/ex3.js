const titreEvt = document.getElementById("titreEvt");
const dateEvt = document.getElementById("dateEvt");
const btnStart = document.getElementById("btnStart");
const hEvt = document.getElementById("hEvt");
const state = document.getElementById("state");

const outD = document.getElementById("d");
const outH = document.getElementById("h");
const outM = document.getElementById("m");
const outS = document.getElementById("s");

let target = null;
let timer = null;

function parseDate(s){
  const v = (s || "").trim();
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
  if(!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const hh = Number(m[4]);
  const mm = Number(m[5]);
  const dt = new Date(y, mo, d, hh, mm, 0);
  if(Number.isNaN(dt.getTime())) return null;
  return dt;
}

function tick(){
  if(!target) return;
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if(diff <= 0){
    outD.textContent = "0";
    outH.textContent = "0";
    outM.textContent = "0";
    outS.textContent = "0";
    state.textContent = "Évènement atteint.";
    timer = setTimeout(tick, 1000);
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  outD.textContent = String(days);
  outH.textContent = String(hours).padStart(2,"0");
  outM.textContent = String(mins).padStart(2,"0");
  outS.textContent = String(secs).padStart(2,"0");

  state.textContent = "Mise à jour chaque seconde (setTimeout).";
  timer = setTimeout(tick, 1000);
}

btnStart.addEventListener("click", ()=>{
  const dt = parseDate(dateEvt.value);
  if(!dt){
    state.textContent = "Date invalide. Exemple : 2026-06-18 16:00";
    return;
  }
  target = dt;
  hEvt.textContent = "Compte à rebours : " + (titreEvt.value || "Évènement");
  if(timer) clearTimeout(timer);
  tick();
});

btnStart.click();
