

function reservations(boutonClique) {
  let tousLesBoutons = document.querySelectorAll(".btn-reserver");
  for(button of tousLesBoutons){
    button.classList.remove("selected")
    button.textContent ="Reserver";
  }
  boutonClique.classList.add("selected");
  boutonClique.textContent = "Sélectionné";



  const suivant = document.querySelector(".suivant");
    stockagedecontenu(boutonClique);
  suivant.disabled = false; 

  
}



function stockagedecontenu(boutonClique){
  const parent =boutonClique.closest(".evenement >div")
  const image = parent.querySelector("img").src;
  const titre = parent.querySelector(".info > h4").textContent;
  const date = parent.querySelector(".info >h6").textContent;
  const ville = parent.querySelector(".info > .ville").textContent;
  const prix = parent.querySelector(".reserve >p").textContent;
  const placess=parent.querySelector(".info > .places >span").textContent;

  const evenement = {
  image,
  titre,
  date,
  ville,
  prix,
  placess
};
  localStorage.setItem("evenementSelectionne", JSON.stringify(evenement));
  const input = document.getElementById("quantity");
  if (input) {
    input.value = 1;
    
  }
}
function affichage(){
  const data = JSON.parse(localStorage.getItem("evenementSelectionne"));
   if (data) {
     document.querySelector(".details > h2").textContent = data.titre;
  document.querySelector(".details > .price >span").textContent = data.prix;
  document.querySelector(".details > .place >span").textContent= data.placess;
  document.getElementById("quantity").max =data.placess;
  document.getElementById("leprix").textContent =data.prix;
   document.getElementById("total").textContent =data.prix;


  
  }

}


