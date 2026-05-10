const defs = new Map([
  ["lorem", { title: "Lorem", text: "Texte factice utilisé pour tester une mise en page avant impression.", img: "assets/lorem.jpg" }],
  ["php", { title: "PHP", text: "Langage de script côté serveur utilisé pour générer des pages web dynamiques.", img: "assets/php.jpg" }],
  ["js", { title: "JavaScript", text: "Langage de programmation utilisé principalement dans le navigateur pour rendre les pages interactives.", img: "assets/js.jpg" }],
  ["css", { title: "CSS", text: "Langage de style qui permet de gérer la présentation des pages HTML (couleurs, mise en page, tailles).", img: "assets/css.jpg" }]
]);

const popup = document.getElementById("popup");

function renderPopup(data){
  const img = data.img ? `<img src="${data.img}" alt="">` : "";
  popup.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>${img}`;
}

function showAt(el){
  const term = el.getAttribute("data-term");
  const data = defs.get(term);
  if(!data) return;
  renderPopup(data);
  const rect = el.getBoundingClientRect();
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  popup.style.display = "block";
  popup.style.left = (rect.left + scrollX) + "px";
  popup.style.top = (rect.bottom + scrollY + 8) + "px";
}

function hide(){
  popup.style.display = "none";
}

document.querySelectorAll(".mark").forEach(el=>{
  el.addEventListener("mouseenter", ()=>showAt(el));
  el.addEventListener("click", (e)=>{ e.preventDefault(); showAt(el); });
  el.addEventListener("mouseleave", ()=>{ setTimeout(()=>{ if(!popup.matches(":hover")) hide(); }, 120); });
});

popup.addEventListener("mouseleave", hide);
document.addEventListener("scroll", hide, { passive: true });
document.addEventListener("click", (e)=>{
  if(e.target.closest(".mark")) return;
  if(e.target.closest("#popup")) return;
  hide();
});
