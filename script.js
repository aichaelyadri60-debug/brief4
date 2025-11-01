

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
    document.getElementById("leprix").textContent="";
   document.getElementById("total").textContent ="";
   document.getElementById("ticket-count").textContent="1";

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



const btnprecedent =document.querySelector("#precedent");
const etapes =document.querySelectorAll(".etapes > div > div");
let etp = 0;
console.log(etapes);
const Sections =document.querySelectorAll("section");
console.log(Sections);

let index =0;
function suivre(){
    Sections[index].classList.remove("active")
     if (index < Sections.length - 1) {
    index++;
    etp++;
  }

    Sections[index].classList.add("active");
    if (Sections[index].classList.contains("section2")) {
    affichage();
  }
    const suivant = document.querySelector(".suivant");
  suivant.disabled = true; 

    btnprecedent.disabled = false;
    
    mettreAJourEtapes();
}


console.log(btnprecedent);
function allerPrecedent() {
  if (index > 0) {
    Sections[index].classList.remove("active"); 
    index--;
    etp--;
    etapes[etp].textContent=etp+1;
    Sections[index].classList.add("active");
    btnprecedent.disabled = false;
  }
  if (index === 0) {
    btnprecedent.disabled = true;
  }
  mettreAJourEtapes();
}




function mettreAJourEtapes(){

  for(const etape of etapes ){
    etape.style =  `
    border:solid 1px var(--gray) ;
    background-color:var(--gray) ;
    width: 50px;
    height: 50px;
    border-radius: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    `
  }
    for (let i = 0; i < etp; i++) {
    etapes[i].style=`
    background-color:#22C55E ;
    color :white;
    
    `
    etapes[i].textContent="✓";
    
    
  }
  etapes[etp].style.backgroundColor= "#3B82F6" ;

}










function increment(){
  let input =document.getElementById("quantity");
  let prix = document.getElementById("leprix");
   let price = parseFloat(prix.textContent.replace(/[^\d.]/, ""));

let valeur =parseInt(input.value);
let maxx =parseInt(input.max);
  if(valeur<maxx){

    valeur++;
    document.getElementById("quantity").value=valeur;
    document.getElementById("ticket-count").textContent=valeur;
    document.getElementById("total").textContent=price * valeur +'$';
    document.getElementById("participant-numero").textContent=valeur;
      const suivant = document.querySelector(".suivant");
  suivant.disabled = false; 
    // console.log(valeur);
  }else{
    alert("le nombre maximum de biellet disponible est :"+  maxx)
  }
  


}
function decrement(){
  
  let input =document.getElementById("quantity");
    let prix = document.getElementById("leprix");
   let price = parseFloat(prix.textContent.replace(/[^\d.]/, ""));
  
  // console.log(input);
  let valeur =parseInt(input.value);
  let min = parseInt(input.min) || 1;
  if(valeur > min){
    valeur --;
    document.getElementById("quantity").value=valeur;
    document.getElementById("ticket-count").textContent=valeur;
    document.getElementById("total").textContent=price * valeur +'$';
    document.getElementById("participant-numero").textContent=valeur;
  }else{
    alert("le nombre doit être au minimum 1")
  }

}




function errors_message(select, message) {
  document.querySelector(select).innerHTML = message;
}

const form = document.getElementById("formParticipant");
const btninput = document.querySelector("#submitdata");
const count = document.getElementById("participant-count");
// const btnsuiv =document.getElementById("suivant");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const rgxemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const rgxtel = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

  const email = form.querySelector("#email");
  const nom = form.querySelector("#nom");
  const prenom = form.querySelector("#prenom");
  const tele = form.querySelector("#telephone");


  const valeur = parseInt(document.getElementById("quantity").value);
  let count1 = parseInt(count.textContent);

  document.querySelector(".error-email").textContent = "";
  document.querySelector(".error-telephone").textContent = "";
  document.querySelector(".error-prenom").textContent = "";
  document.querySelector(".error-nom").textContent = "";

  if (prenom.value.trim() === "") {
    errors_message(".error-prenom", "Veuillez entrer un prénom");
    prenom.style.border = "1px solid red";
    return;
  }
  if (nom.value.trim() === "") {
    errors_message(".error-nom", "Veuillez entrer un nom");
    nom.style.border = "1px solid red";
    return;
  }
  if (!rgxemail.test(email.value)) {
    email.style.border = "1px solid red";
    errors_message(".error-email", "Email non valide");
    return;
  }
  if (!rgxtel.test(tele.value)) {
    tele.style.border = "1px solid red";
    errors_message(".error-telephone", "Téléphone non valide");
    return;
  }

  
  if (count1 < valeur) {
    const affichier = document.querySelector(".liste-participants");

    affichier.innerHTML += `
      <div class="afficher">
        <ul>
          <li><strong>Nom :</strong> ${nom.value}</li>
          <li><strong>Prénom :</strong> ${prenom.value}</li>
          <li><strong>Email :</strong> ${email.value}</li>
          <li><strong>Téléphone :</strong> ${tele.value}</li>
        </ul>
        <img src="images/Button.svg" onclick="supprimer(this)" alt="Supprimer" />
      </div>
    `;

    count1++;
    count.textContent = count1;

    
    form.reset();
    // btnsuiv.disabled=false;
    if (count1 === valeur) {
      btninput.disabled = true;
      setTimeout(() => {
    alert("Tous les participants ont été enregistrés !");
        const suivant = document.querySelector(".suivant");
    suivant.disabled = false; 
    // btnsuiv.disabled=false;
  }, 100);
      
    }
  } else {

    btninput.disabled = true;
    // btnsuiv.disabled=false;

    
  }
  
});




function supprimer(element) {
  element.parentElement.remove();


  const count = document.getElementById("participant-count");
  let current = parseInt(count.textContent);
  count.textContent = current - 1;


  document.querySelector("#submitdata").disabled = false;
      const suivant = document.querySelector(".suivant");
    suivant.disabled = true; 
}
