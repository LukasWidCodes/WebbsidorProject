function rubrik(input) {
  //Function för att skriva ut en rubrik till de olika forms
  const utskrift = document.getElementById("utskrift");
  utskrift.insertAdjacentHTML(
    "afterbegin",
    `<h2>Du har skickat in ${input} </h2>`
  ); //insertAdjacentHTML("afterbegin") gör så att texten lägger sig över varandra så nyare text är längst upp
}
function rensa() {
  document.getElementById("utskrift").innerHTML = ""; //Rensar allt i utskrift's paragrafen
}
function submitForm() {
  let nummer = document.forms[0][4].value; //Hämtar värdet från inputfältet
  if (nummer < 0 || nummer > 4) {
    alert("Inte giltigt nummer!"); //Visar en varning vid ogiltigt värde
  } else {
    const Fält = document.forms[0][nummer - 1].value; //Hämtar värdet från det valda inputfältet
    const utskrift = document.getElementById("utskrift");
    utskrift.insertAdjacentHTML("afterbegin", `${Fält} <br>`); //Skriver ut fältets innehåll i utskriftsparagrafen
    rubrik("fält");
  }
}

function submitDivar() {
  let räknare = 1; //Räknare för numering av div-elementen
  const divar = document.getElementById("text").querySelectorAll("div"); //Samlar alla div-element i text-elementet
  const utskrift = document.getElementById("utskrift");
  let sortering = "";
  divar.forEach((div) => {
    sortering += `Nummer ${räknare} är `;
    sortering += div.textContent + "<br>"; //Läser textinnehållet i div-elementet
    räknare++;
  });
  utskrift.insertAdjacentHTML("afterbegin", `${sortering}  <br>`);
  rubrik("divar");
}

function submitAllEntries() {
  const entries = document.getElementById("nodes").childNodes.entries(); //Hämtar alla entries i childNodes
  const utskrift = document.getElementById("utskrift");
  let sträng = "";
  for (let x of entries) {
    sträng += x + "<br>"; //Läser av varje entry i childNodes
  }
  utskrift.insertAdjacentHTML("afterbegin", `${sträng}`);
  rubrik("entries");
}
function submitAllKeys() {
  const keys = document.getElementById("nodes").childNodes.keys(); //Hämtar alla keys i childNodes
  const utskrift = document.getElementById("utskrift");
  let sträng = "";
  for (let x of keys) {
    sträng += x + "<br>";
  }
  utskrift.insertAdjacentHTML("afterbegin", `${sträng}`);
  rubrik("keys");
}
function submitAllValues() {
  const values = document.getElementById("nodes").children; //Hämtar alla children i nodes
  const utskrift = document.getElementById("utskrift");
  let sträng = "";
  for (let x of values) {
    sträng += x.innerHTML + "<br>"; //Skriver ut innehållet i varje child
  }
  utskrift.insertAdjacentHTML("afterbegin", `${sträng}`);
  rubrik("values");
}
function submitParagraphValues() {
  const paragraphValues = document
    .getElementById("nodes")
    .querySelectorAll("p"); //Hämtar alla paragraf-element i nodes
  const utskrift = document.getElementById("utskrift");
  let sträng = "";
  for (let x of paragraphValues) {
    sträng += x.innerHTML + "<br>";
  }
  utskrift.insertAdjacentHTML("afterbegin", `${sträng}`);
  rubrik("paragraph values");
}
function submitHeader4Value() {
  const Header4Value = document.getElementById("nodes").querySelectorAll("h4");
  const utskrift = document.getElementById("utskrift");
  let sträng = "";
  for (let x of Header4Value) {
    sträng += x.innerHTML + "<br>"; //Skriver ut h4-elementens innehåll
  }
  utskrift.insertAdjacentHTML("afterbegin", `<h4>${sträng}</h4>`); //Omsluter resultatet i h4-rubriker
  rubrik("H4 values");
}
