function n2(x){return Number.isFinite(x)?x.toFixed(2):"0.00";}
function ceilTo(x,step){return Math.ceil(x/step)*step;}
function uid(){
  const a = String(Date.now()).slice(-6);
  const b = String(Math.floor(Math.random()*900)+100);
  return a + b;
}
function addMonth(d){
  const nd = new Date(d.getTime());
  nd.setMonth(nd.getMonth()+1);
  return nd;
}
function readNum(id){
  const v = document.getElementById(id).value.trim().replace(",",".");
  const n = Number(v);
  return Number.isFinite(n)?n:NaN;
}

const form = document.getElementById("form");
const err = document.getElementById("err");
const blocDevis = document.getElementById("blocDevis");

function setText(id, value){
  document.getElementById(id).textContent = value;
}

function compute(){
  err.textContent = "";
  const clientNom = document.getElementById("clientNom").value.trim();
  const clientAdresse = document.getElementById("clientAdresse").value.trim();
  const clientTel = document.getElementById("clientTel").value.trim();
  const clientMail = document.getElementById("clientMail").value.trim();

  const surface = readNum("surface");
  const epCm = readNum("epaisseur");
  const tva = readNum("tva");

  if(!clientNom || !clientAdresse){
    err.textContent = "Renseigne au minimum le nom et l’adresse du client.";
    return;
  }
  if(!Number.isFinite(surface) || surface<=0){
    err.textContent = "Surface invalide.";
    return;
  }
  if(!Number.isFinite(epCm) || epCm<15 || epCm>35){
    err.textContent = "Épaisseur invalide (entre 15 et 35 cm).";
    return;
  }
  if(!Number.isFinite(tva) || tva<0){
    err.textContent = "TVA invalide.";
    return;
  }

  const epM = epCm/100;
  const vol = surface * epM;
  const camions = Math.ceil(vol / 9);
  const volLivre = camions * 9;

  const cimentKg = volLivre * 350;
  const cimentT = cimentKg / 1000;

  const prixBetonM3 = 91;
  const prixTransport = 140;

  const htBeton = volLivre * prixBetonM3;
  const htTransport = camions * prixTransport;
  const htTotal = htBeton + htTransport;

  const tvaMontant = htTotal * (tva/100);
  const ttc = htTotal + tvaMontant;

  const now = new Date();
  const valid = addMonth(now);

  setText("devisNo", uid());
  setText("devisDate", now.toLocaleDateString("fr-FR"));
  setText("devisValid", "1 mois (jusqu’au " + valid.toLocaleDateString("fr-FR") + ")");

  setText("socNom", "Cimenterie Lafarge");
  setText("socAdr", "Service Devis — Béton prêt à l’emploi");
  setText("socMail", "contact@lafarge-beton.fr");
  setText("socTel", "04 00 00 00 00");

  setText("cliNom", clientNom);
  setText("cliAdr", clientAdresse);
  setText("cliMail", clientMail || "—");
  setText("cliTel", clientTel || "—");

  setText("surfOut", n2(surface) + " m²");
  setText("epOut", n2(epCm) + " cm");
  setText("volOut", n2(vol) + " m³");
  setText("camOut", String(camions));
  setText("volLivOut", n2(volLivre) + " m³");
  setText("cimentOut", n2(cimentT) + " t");

  setText("qteBeton", n2(volLivre) + " m³");
  setText("puBeton", n2(prixBetonM3) + " €");
  setText("totBeton", n2(htBeton) + " €");

  setText("qteTr", String(camions));
  setText("puTr", n2(prixTransport) + " €");
  setText("totTr", n2(htTransport) + " €");

  setText("sousTotal", n2(htTotal) + " €");
  setText("tvaLine", n2(tva) + " %");
  setText("tvaTotal", n2(tvaMontant) + " €");
  setText("ttcTotal", n2(ttc) + " €");

  blocDevis.classList.remove("hidden");
  blocDevis.scrollIntoView({behavior:"smooth", block:"start"});
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  compute();
});

document.getElementById("btnReset").addEventListener("click", ()=>{
  err.textContent = "";
  blocDevis.classList.add("hidden");
  form.reset();
});
