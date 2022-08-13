let timeFrame = "weekly";
const container = document.querySelector(".container");
let regularCards; //Card base de todas las cards(work,play,study)

// Menu Card
const menu = document.querySelectorAll(".menu-link");
// console.log(menu)

menu.forEach(element =>{
  element.addEventListener('click',  menuOnClick);

});

//tomar el valor del json  y crear card
let data = {};


fetch('assets/js/data.json')
  .then(resp => resp.json())
  .then(jsonData =>{
    // console.log(jsonData);
    //Creando el Card
    jsonData.forEach(element =>{
      container.insertAdjacentHTML('beforeend',
        createRegularCard (element,timeFrame));
    });

    //2 cards eliminar el card del html

    jsonData.forEach(element =>{
      data[element.title] = element.timeframes;

      //buscando la referencia
      regularCards = document.querySelectorAll('.regular-card');
      // console.log(regularCards)
    })
  });

// Funciones

function menuOnClick(event){
  // console.log('click')
  //  console.log('click',event.target.innerText.toLowerCase());

   menu.forEach(element =>{
    element.classList.remove('menu-active');
   })
   event.target.classList.add('menu-active');
   timeFrame = event.target.innerText.toLowerCase();


   updateCards(timeFrame);
}

function updateCards(timeFrame){

  regularCards.forEach( card =>{
    updateCard(card , timeFrame);
  });
}

function updateCard(card, timeframe) {
  const title = card.querySelector('.title').innerText;
  const current = data[title][timeframe]['current'];
  const previous = data[title][timeframe]['previous'];

  const timeframeMsg = {
      'daily': 'Yesterday',
      'weekly': 'Last Week',
      'monthly': 'Last Month'
  };

  const hoursElement = card.querySelector('.hours');
  hoursElement.innerText = `${current}hrs`;
  const msgElement = card.querySelector('.description');
  msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element,timeFrame){
  let title = element['title'];
  let current = element['timeframes'][timeFrame]['current'];
  let previous = element['timeframes'][timeFrame]['previous']
  // console.log(title , current , previous);


  const timeFrameMsg = {
    'daily' : 'Yestarday',
    'weekly': 'Last Weel',
    'monthly': 'Last Month'
  }

  return `
<div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
  <div class="property-card">
      <div class="row">
          <div class="title">${title}</div>
          <div class="points">
              <div class="point"></div>
              <div class="point"></div>
              <div class="point"></div>
          </div>
      </div>
      <div class="row-2">
          <div class="hours">${current}hrs</div>
          <div class="description">${timeFrameMsg[timeFrame]} - ${previous}hrs</div>
      </div>
  </div>
</div>`
}