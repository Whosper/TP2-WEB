const out = document.getElementById("out");
const firstDay = document.getElementById("firstDay");
const month = document.getElementById("month");
const year = document.getElementById("year");
const size = document.getElementById("size");
const colHead = document.getElementById("colHead");
const colWeekend = document.getElementById("colWeekend");
const btn = document.getElementById("btnCal");

const monthNames = ["","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const dayNames = ["Lu","Ma","Me","Je","Ve","Sa","Di"];

function daysInMonth(m, y){
  return new Date(y, m, 0).getDate();
}

function calendrier(premierJour, mois, annee, opt){
  const nDays = daysInMonth(mois, annee);
  const start = Number(premierJour);
  const pad = (start - 1);
  const cells = [];
  for(let i=0;i<pad;i++) cells.push("");
  for(let d=1; d<=nDays; d++) cells.push(String(d));
  while(cells.length % 7 !== 0) cells.push("");

  const rows = [];
  for(let i=0;i<cells.length;i+=7) rows.push(cells.slice(i,i+7));

  const sz = (opt && opt.size) || "moyen";
  let font = "14px";
  let padCell = "8px";
  if(sz === "petit"){ font="12px"; padCell="6px"; }
  if(sz === "grand"){ font="16px"; padCell="10px"; }

  const headBg = (opt && opt.headBg) || "#eef2ff";
  const weekendBg = (opt && opt.weekendBg) || "#fff0f0";

  const caption = monthNames[mois] + " " + annee;

  let html = `<table style="font-size:${font};">`;
  html += `<caption>${caption}</caption>`;
  html += "<thead><tr>";
  for(const dn of dayNames) html += `<th style="background:${headBg};padding:${padCell};">${dn}</th>`;
  html += "</tr></thead><tbody>";

  for(const r of rows){
    html += "<tr>";
    for(let i=0;i<7;i++){
      const v = r[i];
      const isWeekend = (i===5 || i===6);
      const cls = v === "" ? "off" : "";
      const bg = v === "" ? "" : (isWeekend ? `background:${weekendBg};` : "");
      html += `<td class="${cls}" style="padding:${padCell};${bg}">${v}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

function apply(){
  const pj = Number(firstDay.value);
  const m = Number(month.value);
  const y = Number((year.value || "").trim());
  if(!Number.isFinite(y) || y < 1){
    out.innerHTML = "<div style='padding:12px;'>Année invalide.</div>";
    return;
  }
  out.innerHTML = calendrier(pj, m, y, { size: size.value, headBg: colHead.value.trim(), weekendBg: colWeekend.value.trim() });
}

btn.addEventListener("click", apply);
apply();
