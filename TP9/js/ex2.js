const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const bac = document.getElementById("bac");
const btn = document.getElementById("btnAdd");
const tbody = document.getElementById("tbody");
const msg = document.getElementById("msg");

let n = 0;

function clean(s){
  return (s || "").trim();
}

btn.addEventListener("click", ()=>{
  const vNom = clean(nom.value);
  const vPrenom = clean(prenom.value);
  const vBac = bac.value;

  if(vNom.length === 0 || vPrenom.length === 0){
    msg.textContent = "Renseigne le nom et le prénom.";
    return;
  }

  n += 1;
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${n}</td><td>${vNom}</td><td>${vPrenom}</td><td>${vBac}</td>`;
  tbody.appendChild(tr);

  msg.textContent = "Ajouté.";
  nom.value = "";
  prenom.value = "";
  nom.focus();
});
