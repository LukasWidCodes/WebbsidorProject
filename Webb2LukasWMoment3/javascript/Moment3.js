//Kommenterat det flesta det är bara väldigt mycket "repeats" av liknande js.
//Kommenterar när något nytt dyker upp för att visa att jag förstår min kod för annars är det nästan 500 rader med kod + kommentarer.

// Get the data from each element on the form.
  const userName = document.getElementById('txtName');
  const email = document.getElementById('txtEmail');
  const city = document.getElementById('selCity');
  const msg = document.getElementById('msg');
  // Id som innehåller bilderna please och thankyou
  const pleaseImg = document.getElementById('show');
  const thanksImg = document.getElementById('hide');
  // Vit bakgrundsbild bakom "Thanks"-bilden
  const whiteImg = document.getElementById('white');
  const whiteArray = [
    "img/LongWhiteImage1.png"
  ];
  // Felmeddelanden som sedan visas för användaren
  const errorText1 = document.getElementById('errorText1');
  const errorText2 = document.getElementById('errorText2');
  const errorText3 = document.getElementById('errorText3');
  const errorText4 = document.getElementById('errorText4');
// Behåller ursprunglig src för vit bild (för återställning)
  let originalWhite = whiteImg.src;
  // Variabler för animations interval och positioner
  let pleaseInterval;
  let pleasePosX = 0;
  let whiteInterval;
  let whitePosX = 0;
  // Startposition för stickman-figuren
  let posX = 389;
  let posY = 13;
  // Används för att loopa genom bild-arrayer
  let index = 0;

  let changingInProgress = false;
  let doneTheForm = false;

  const stickChangerImage = document.getElementById('imageStickChanger');

  let peekInterval;
  const stickPeekArray = [
    "img/StickPeek1.png",
    "img/StickPeek2.png",
    "img/StickPeek3.png",
    "img/StickPeek4.png",
    "img/StickPeek5.png"
  ];

  let walkInterval;
  const stickWalkArray = [
    "img/StickWalk1.png",
    "img/StickWalk2.png",
    "img/StickWalk3.png",
    "img/StickWalk4.png",
    "img/StickWalk5.png"
  ];
  
  let dragInterval;
  const stickDragArray = [
    "img/StickDrag1.png",
    "img/StickDrag2.png",
    "img/StickDrag3.png",
    "img/StickDrag4.png",
    "img/StickDrag5.png"
  ];
  
  function peeking() { // Funktion som kör en animation där min figur kollar fram
    if (changingInProgress){
      return // Om animationen redan är igång så kan den inte köras igen
    }
    changingInProgress = true;
    stickChangerImage.src = stickPeekArray[0]; // Startar med första bilden i arrayen
    stickChangerImage.style.display = "block"; // Visar bilden för den är display:none
    index = 0;
    stickChangerImage.style.left = posX + "px";
    stickChangerImage.style.top = posY + "px";
    peekInterval = setInterval(() =>{
      stickChangerImage.src = stickPeekArray[index];
      if (index >= stickPeekArray.length - 1){ // När den har kört igenom alla bilder i arrayen så händer detta:
        clearInterval (peekInterval) //Stoppar animationen
        walking() //Startar nästa function
      }
      index++;
    },200)
  }

  function walking() { //Funktion som kör igenom bilder och flyttar på figuren som får det se ut att den "går"
    stickChangerImage.src = stickWalkArray[0];
    let newPos = 0 + posX;
    index = 0;
    walkInterval = setInterval(()=>{
      stickChangerImage.src = stickWalkArray[index];
      stickChangerImage.style.left = newPos + "px";  // Flyttar figuren
      index = (index + 1) % stickWalkArray.length;  // Loopar igenom bilderna
      newPos -=2; // Gå två pixlar åt vänster varje frame
      if(newPos == -142 + posX){
        clearInterval(walkInterval); //Stoppar animationen
        //Startar nya funktioner:
        drag();
        pleaseMove();
        whiteMove();
      }
    }, 60)
  }

  function drag(){ //Funktion som kör igenom bilder och flyttar på figuren som gör att det ser ut att den drar i please img 
    stickChangerImage.src = stickDragArray[0]
    index = 0;
    newPos = -142 + posX
    dragInterval = setInterval(() =>{
      stickChangerImage.src = stickDragArray[index];
      stickChangerImage.style.left = newPos + "px";
      index = (index + 1) % stickDragArray.length; // Loopar igenom bilderna
      newPos +=2; // Gå två pixlar åt höger varje frame
      if(newPos == 20 + posX){
        clearInterval(dragInterval); //Stoppar animationen
      }
    }, 60)
  }

  function pleaseMove(){ //Funktion för att flytta på Please Img och flyttas ihop med drag()
    pleasePosX = 0;

    pleaseInterval = setInterval(()=>{
    pleaseImg.style.left = pleasePosX + "px";
    pleasePosX += 2;
    if (pleasePosX == 442){
      clearInterval(pleaseInterval);
      changingInProgress = false;
    }
    }, 60)
  }

  function whiteMove(){  // Flytta vit bakgrund för att dölja “thank you” tills rätt läge
    whiteImg.src = originalWhite;
    whitePosX = 0;
    whiteInterval = setInterval(()=>{
      whiteImg.style.left =whitePosX + "px";
      whitePosX +=2;
      if(whitePosX == 150){ //Ändrar den vita bilden för annars så gick den över andra element, fortfarande en vit bild men inte lika lång
        whiteImg.src = whiteArray[0];
      }
      if(whitePosX == 260){
        clearInterval(whiteInterval);
      }
    }, 60)
  }

  function saveFile() {
    errorText1.style.display = "none";
    errorText2.style.display = "none";
    errorText3.style.display = "none";
    errorText4.style.display = "none";
    if (doneTheForm){ //Gjorde så man bara kan göra formuläret en gång om man inte laddar om sidan
      return;
    }
      if (!noEmptyField()){ //Kollar att alla fält är korrekt ifyllda
        return;
      }        
        // This variable stores all the data.
        let data = '\r Name: ' + userName.value + ' \r\n ' +
            'Email: ' + email.value + ' \r\n ' +
            'City: ' + city.value + ' \r\n ' +
            'Message: ' + msg.value;

        // Convert the text to BLOB.
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'formData.txt'; // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }
        doneTheForm = true;
          peeking(); // Startar animation
          newLink.click();
    }
// Validering: ser till att inga fält är tomma + korrekt e-post
// och om något inte är korrekt ifyllt så startas stickmanAnimation och ger den en position till figuren som passar till det fältet
    function noEmptyField() {
      const name = document.getElementById('txtName');
      const email = document.getElementById('txtEmail');
      const city = document.getElementById('selCity');
      const msg = document.getElementById('msg');

      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
      if (msg.value.trim() === '') {
        extraPosY = -50;
        stickmanAnimation();
        return false;
      }
    
      if (city.value.trim() === '') {
        extraPosY = 50;
        stickmanAnimation();
        return false;
      }

      if (!emailPattern.test(email.value)){
        extraPosY = 100;
        stickmanAnimation();
        return false;
      }

      if (email.value.trim() === '') {
        extraPosY = 100;
        stickmanAnimation();
        return false;
      }
    
      if (name.value.trim() === '') {
        extraPosY = 150;
        stickmanAnimation();
        return false;
      }
    
      return true;
    }
    
    const stickRunArray = [
        "img/StickOne.png",
        "img/StickTwo.png",
        "img/StickThree.png",
        "img/StickFour.png",
        "img/StickFive.png",
      ];
    const stickJumpArray = [
      "img/StickJumpOne.png",
      "img/StickJumpTwo.png"
    ];
    const stickMadArray = [
      "img/StickMad.png",
      "img/StickMad2A.png",
      "img/StickMad3.png",
      "img/StickMad4.png",
      "img/StickMad5.png",
      "img/StickMad6.png",
      "img/StickMad7.png",
      "img/StickMad8.png",
      "img/StickMad9.png",
      "img/StickMad10.png"
    ];
    const stickCombineArray = [
      "img/StickCombine1.png",
      "img/StickCombine2.png",
      "img/StickCombine3.png",
      "img/StickCombine4.png",
      "img/StickCombine5.png"
    ];
    const stickShootArray = [
      "img/StickShoot1.png",
      "img/StickShoot2.png"
    ];
    const stickRecoilArray = [
      "img/StickRecoil1.png",
      "img/StickRecoil2.png"
    ];
    const stickBulletArray = [
      "img/StickBullet1.png",
      "img/StickBullet2.png",
      "img/StickBullet3.png"
    ];
    const stickFlyingArray = [
      "img/StickFlying1.png",
      "img/StickFlying2.png",
      "img/StickFlying3.png",
      "img/StickFlying4.png"
    ];
    
      let pos = 0;
      let stickIndex = 0;
      let stickInterval;
      let jumpUpInterval;
      let madInterval;
      let animationInProgress = false;
      let combiningInterval;
      let shootingInterval;
      let recoilInterval;
      let bulletInterval;
      let flyingInterval;
      let extraPosY; //message -50 / city 50 / email 100 / name 150
      let extraPosX = -200; //-200 on all

    const elem = document.getElementById("sticks");
    const stickImage = document.querySelector("#sticks");
    let container = document.querySelector(".stickcontainer");

    const bulletImage = document.getElementById("bulletImage");
    const flyingtImage = document.getElementById("flyingImage");
      
      function stickmanAnimation() //Funktion som körs om man inte klarat av att fylla i formuläret, en figur som "springer"
    {
      if (animationInProgress) return; //Stoppar att animationen startar om den redan pågår
      animationInProgress = true;

      let numberSave = extraPosY;
      
        stickImage.style.display = "block";
        bulletImage.style.display = "none";
        flyingtImage.style.display = "none";
        stickIndex = 0;
        pos = 0 + extraPosX;
      
        elem.style.bottom = extraPosY + "px";
        
        stickInterval = setInterval(() => {
          stickImage.src = stickRunArray[stickIndex];
          stickIndex = (stickIndex + 1) % stickRunArray.length;
          position();
        }, 30);
      
        function position() //Denna funktion var helt onödig att göra till en egen funktion, skulle bara kunnat laggt in det i stickmanAnimation()
      {
          if (pos == 50 + extraPosX) {
            clearInterval(stickInterval);
            jump()
        } 
        else {
            pos++;
            elem.style.left = pos + "px";
        }
      }
        function jump() //Animerar så att det ser ut att figuren hoppar
      {
          let jumpHeight = extraPosY;
          stickImage.src = stickJumpArray[0];
          setTimeout(() =>{ //Så att den stannar en liten stund för att ge hoppet lite mer "kraft?"
            jumpUpInterval = setInterval (() => {
              jumpHeight += 5;
              elem.style.bottom = jumpHeight + "px";
              stickImage.src = stickJumpArray[1];
              if (jumpHeight == 100 + extraPosY){
                clearInterval (jumpUpInterval);
                mad();
              }
            },20);
          },300);

      }
        function mad() //Figuren stannar i "luften" och blir ARG för du inte fyllt i formuläret korrekt
      {
        stickIndex = 0;

        madInterval = setInterval(() => {
          stickImage.src = stickMadArray[stickIndex];
          
          if (stickIndex >= stickMadArray.length - 1){
            clearInterval (madInterval)
            combining()
          }
          stickIndex++;
        }, 70);
      }
      function combining() //Laddar upp sin attack
      {
        stickIndex = 0;

        combiningInterval = setInterval(() => {
          stickImage.src = stickCombineArray[stickIndex]
          
          if (stickIndex == stickCombineArray.length - 1){
            clearInterval (combiningInterval);
            shoot()
          }
          stickIndex++;
        },100);
      }
      function shoot() //Redo att skjuta
      {
        stickIndex = 0;

        shootingInterval = setInterval(() =>{
          stickImage.src = stickShootArray[stickIndex]
          
          if(stickIndex == stickShootArray.length - 1){
            clearInterval(shootingInterval);
            recoil()
          }
          stickIndex++;
        },100);
      }
      function recoil() //Skjuter sin attack
      {
        stickIndex = 0;
        recoilInterval = setInterval(function() {
          stickImage.src = stickRecoilArray[stickIndex];
      
          if (stickIndex == stickRecoilArray.length - 1) {
            clearInterval(recoilInterval);
            
            var finalLeft = parseInt(stickImage.style.left) || extraPosX;
            var finalBottom = parseInt(stickImage.style.bottom) || extraPosY;
            
            stickImage.style.display = "none";
            
            bullet(finalLeft, finalBottom);
            flying(finalLeft, finalBottom);
          }
          stickIndex++;
        }, 50);
      }
      
      function bullet(startLeft, startBottom) //Attacken en boll av blå och röd som flyger höger och slutar när den träffat det fält som var inkorrekt ifyllt
      {
        var bulletIndex = 0;
        var bulletPosX = startLeft;

        bulletImage.src = stickBulletArray[0];
        bulletImage.style.display = "block";
        bulletImage.style.position = "absolute";
        bulletImage.style.left = bulletPosX + "px";
        bulletImage.style.bottom = startBottom + "px";
      
        bulletInterval = setInterval(function() 
        {
          if (bulletIndex < stickBulletArray.length - 1) 
          {
            bulletImage.src = stickBulletArray[bulletIndex];
            bulletIndex++;

          }

          bulletPosX+=30;
          bulletImage.style.left = bulletPosX + "px";

          if (bulletPosX >= startLeft + 100) {
            clearInterval(bulletInterval);
            animationInProgress = false;
            bulletImage.style.display = "none";
            bulletHit();
          }
        }, 300);
      }
      
      function flying(startLeft, startBottom) //Figuren flyger långt och snabbt åt vänster pågrund av recoil från sin egna attack
      {
        var flyingIndex = 0;
        var flyingPosX = startLeft;
        flyingtImage.style.display = "block";
        flyingtImage.style.position = "absolute";
        flyingtImage.style.left = flyingPosX + "px";
        flyingtImage.style.bottom = startBottom + "px";
      
        flyingInterval = setInterval(function() {
          flyingtImage.src = stickFlyingArray[flyingIndex];
          flyingIndex = (flyingIndex + 1) % stickFlyingArray.length;
      
          if (flyingPosX <= startLeft - 4000) {
            clearInterval(flyingInterval);
            flyingtImage.style.display = "none";
          } else {
            flyingPosX -= 10;
            flyingtImage.style.left = flyingPosX + "px";
          }
        }, 10);
      }
      function bulletHit() // Visar ett felmeddelande och ger en klass till det fält som var ifyllt inkorrekt och klassen innehåller en keyframe animation
      {
        if (numberSave == -50){
          errorText4.style.display = "block";
          msg.classList.add('messageHighligh');
          msg.style.animation = 'none';
          msg.offsetHeight;
          msg.style.animation = null;
        }
        if (numberSave == 50){
          errorText3.style.display = "block";
          city.classList.add('cityHighligh');
          city.style.animation = 'none';
          city.offsetHeight;
          city.style.animation = null;
        }
        if (numberSave == 100){
          errorText2.style.display = "block";
          email.classList.add('emailHighligh');
          email.style.animation = 'none';
          email.offsetHeight;
          email.style.animation = null;
        }
        if (numberSave == 150){
          errorText1.style.display = "block";
          userName.classList.add('nameHighligh');
          userName.style.animation = 'none';
          userName.offsetHeight;
          userName.style.animation = null;
        }
      }
    }      
