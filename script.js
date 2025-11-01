

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
  }else{
    alert("le nombre doit être au minimum 1")
  }

}





function errors_message(select ,message){
  document.querySelector(select).innerHTML=message;
}
    let count =document.getElementById("participant-count");
    let count1=parseInt(count.textContent);
const form = document.getElementById("formParticipant")
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const rgxemail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  const rgxtel =/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  const email =form.querySelector("#email");
  const nom = form.querySelector('#nom');
  const prenom = form.querySelector('#prenom');
  const tele = form.querySelector('#telephone');
  if(!rgxemail.test(email.value) ){
            email.style.border = "1px solid red";
        errors_message(".error-email","email n'est pas valide");
        return;
  }
    if(!rgxtel.test(tele.value) ){
            tele.style.border = "1px solid red";
        errors_message(".error-tele","tele n'est pas valide");
        return;
  }

const valeur = parseInt(document.getElementById("quantity").value);

    if(count1 < valeur){
        const afffichier = document.querySelector('.liste-participants');

    afffichier.innerHTML +=`
        <div class="afficher">
            <ul>
                <li>Nom : ${nom.value}</li>
                <li>Email : ${email.value}</li>
                <li>prenom : ${prenom.value}</li>
                <li>tele : ${tele.value}</li>
            </ul>
            <img src="images/Button.svg" onclick="supprimer()"/>
        </div>
    `
    // document.getElementById("submitdata").style.display="block";

    
    count1 ++;
    console.log(count1);
    count.textContent = count1;
        
    }else{
      document.getElementById("submitdata").style.display="none";
    }
    


});


