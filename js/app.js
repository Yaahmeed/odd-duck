'use strict';


// ******* GLOBALS *******
let productArray = [];
let votingRounds = 25;


//  ****** DOM WINDOWS *******
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let canvasElem = document.getElementById('chart');

// ***** CONSTRUCTOR FUNCTION ******

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
  Product.productArray.push(this);
}

Product.productArray = [];

// ***** HELPER FUNCTIONS / UTILITIES *****


function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = [];

function renderImg() {



  // TODO: 3 unique images and populate the images

  while (indexArray.length < 6) {
    let randoNum = randomIndex();
    if (!indexArray.includes(randoNum)) {
      indexArray.push(randoNum);
    }
  }
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();



  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;



  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: '#b2e4f0'
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: '#d6b2f0'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElem, chartObj);
}

// **** EVENT HANDLERS *****

function handleClick(event) {



  let imgClicked = event.target.title;

  console.log(imgClicked);


  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }

  votingRounds--;


  renderImg();


  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);

    let stringifiedProducts = JSON.stringify(productArray);

    localStorage.setItem('myProducts', stringifiedProducts);

  }
}


function handleShowResults() {
  // TODO: Display the results once the there are no more votes
  if (votingRounds === 0) {
    resultsBtn.removeEventListener('click', handleShowResults);
    renderChart();
  }
}

let retrievedProducts = localStorage.getItem('myProducts');


let parsedProducts = JSON.parse(retrievedProducts);

if (retrievedProducts) {
  for(let i = 0; i < parsedProducts.length; i++) {
    if(parsedProducts[i].name === 'bag'){
      let reconstructedBag = new Product(parsedProducts[i].name, 'png');
      reconstructedBag.views = parsedProducts[i].views;
      reconstructedBag.votes = parsedProducts[i].votes;
      productArray.push(reconstructedBag);
    }else {
      let reconstructedProduct = new Product(parsedProducts[i].name);
      reconstructedProduct.views = parsedProducts[i].views;
      reconstructedProduct.votes = parsedProducts[i].votes;
      productArray.push(reconstructedProduct);
    }
  }
  productArray = parsedProducts;
} else {
  // **** EXECUTABLE CODE *****
  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petSweep = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('water-can');
  let wineGlass = new Product('wine-glass');

  productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}


renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

// console.log(productArray);
