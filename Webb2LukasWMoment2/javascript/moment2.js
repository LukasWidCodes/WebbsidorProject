const städer = []; //Tom Array
const inputText = document.getElementById("input");
const knappen = document.getElementById("knapp");
const resetting = document.getElementById("reset");
const sorting = document.getElementById("sort");
let sammanText = document.getElementById("stadSammanhållandeText");
const stadText = [ //Array med textareas Id
document.getElementById("stad1"),
document.getElementById("stad2"),
document.getElementById("stad3"),
document.getElementById("stad4"),
document.getElementById("stad5")
];
//^^^ Flesta av mina olika variabler.
knappen.addEventListener("click", function(event) //När "knappen" (variabel som har element av Id knapp som finns i html) trycks såhänder allt nedan
{

    let text = inputText.value.trim(); //Det som är i min input text ger sitt value till text
    
    if (text === "") { //Kollar så att man har skrivit in något
        alert("Du måste skriva in en stad!");
        return;
    }
    if (städer.length >= 5) { //Ser till att man inte skriver fler städer än vad som får plats (5)
        alert("Max 5 städer!");
        return;
    }    
    text = text.charAt(0).toUpperCase() + text.slice(1) //Första bokstaven blir uppercase.
    städer.push(text); //Pushar text till array
    läggTillStäder(); //Kör function
    sammanhållandeText(text) //Function som tar in text
    inputText.value =""; //Så att input text rutan blir tom efter man tryckt på knappen ifall att man inte vill skriva in samma stad eller klickar av misstag flera gånger
});

function läggTillStäder() { //Function som skriver ut för användaren vad för städer man skrivit in. Namnet kanske kunnat vara bättre.
    for (let i = 0; i < stadText.length; i++) { //Loopar igenom så många textareas som finns
        if (städer[i]) {//Kollar om det finns en stad på den plats av arrayen ([i])
            stadText[i].value = städer[i]; //Ger stadText den staden och skrivs ut för användaren i textareas.
        } else {//Om arrayen[i] var tom så får textarean en tom sträng
            stadText[i].value = "";
        }
    }
}

sorting.addEventListener("click", function () { //För knappen sort
    städer.sort(); //Sorterar arrayen
    läggTillStäder(); //Skriver ut den nya sorterade arrayen
});
resetting.addEventListener("click", function () { //För knappen reset
    städer.length = 0; //Tar bort allt i arrayen för en clean slate
    sammanhållandeText("") //Så att det som skrivs av staden man senast skrev in försvinner./ Alltså paragrafen med text
    läggTillStäder(); //Uppdaterar arrayen användaren ser
});

function sammanhållandeText(text) //Paragrafens function
{
    let räkna = 0; //Räknare för hur många gånger en stad dyker upp i arrayen
    for (let x = 0; x < städer.length; x++){
        if(städer[x] === text){ //Så att den räknar för olika städer så dom har en varsin räknar
            räkna += 1;
        }
    }
    if (text != ""){ //Om text inte är tom (alltså användaren har skrivit minst en stad så skrivs det nedan, vilket är information om den staden användaren skrev.)
        sammanText.innerHTML = (text.toUpperCase()) + "<br>" + " Stadens första bokstav är: " + (text.charAt(0)) + "." + "<br>" + " Staden förekommer " + (räkna) + " gånger i listan." + "<br>" + " Stadens antal bokstäver är: " + text.length + ".";
        document.querySelector(".sammanTextKlass").style.display = "block"; //Den ändrar då min klass sammanTextKlass vilket är klassen jag har på min div, så att den är synlig.Något jag lärt mig på sidan då jag har haft små roliga webb project, vi har inte gått igenom detta än (om vi kommer gå igenom det, vilket jag hoppas)
    }
    else { //Om ingen text i text hittas så händer detta
        sammanText.innerHTML = ""; //Så att inget är kvar i paragrafen på webbsidan
        document.querySelector(".sammanTextKlass").style.display = "none"; // gör så att diven är inte synlig
    }
}