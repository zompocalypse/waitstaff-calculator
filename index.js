'use strict';

let store = {
  meals: [
    { subtotal: '0.00', tip: '0.00', total: '0.00' }
  ],
  mealNumber: 0,
  tipTotal: '0.00',
  averageTip: '0.00'
};

function renderHTML(){
  let num = store.meals[store.mealNumber];
  return (
    `
    <div class = 'main'>
      <form class = 'meal-details row'>
        <div>
          <h2>Enter the Meal Details</h2>
          <div class = 'item'>
            <label for="meal-price">Base Meal Price: $</label>
            <input type="text" name="meal-price" id="meal-price" class='price'>
          </div>
          <div class = 'item'>  
            <label for="tax-rate">Tax Rate: %</label>
            <input type="text" name='tax-rate' id='tax-rate' class='rate'>
          </div>
          <div class = 'item'>
            <label for="tip-percent">Tip Percentage: %</label>
            <input type="text" name='tip-percent' id='tip-percent' class='percent'>
          </div>
          <div class = 'details-buttons'>
            <button type= 'submit' class = 'calc'>Submit</button>
            <button class= 'cancel'>Cancel</button>
          </div>
        </div>  
      </form>
      <div class ='column'>
        <div class = 'box1'>
          <h2>Customer Charges</h2>
          <h3 class = 'subtotal'>Subtotal <span class = 'subtotal'>${num.subtotal}</span></h3>
          <h3 class = 'tip'>Tip <span class = 'tip'>${num.tip}</span></h3>
          <h3 class = 'total'>Total <span class = 'total'>${num.total}</span></h3>
        </div>
        <div class = 'box2'>
          <h2>My Earnings Info</h2>
          <h3 class = ''>Tip Total ${store.tipTotal} </h3>
          <h3 class = ''>Meal Count ${store.mealNumber}</h3>
          <h3 class = ''> Average Tip ${store.averageTip}</h3>
        </div>
      </div>
    </div>
    <div class ='bot'>
      <button class = 'reset'>Reset</button>
    </div>
    `
  );
}

let cancel = $('main').on('click', '.cancel', function (event){
  event.preventDefault();
  $('#meal-price').val('');
  $('#tax-rate').val('');
  $('#tip-percent').val('');
  render();
});

function calculatePrice() {
  $('main').on('click', '.calc', function (event) {
    event.preventDefault();
    let price = $('#meal-price').val();
    let tax = ($('#tax-rate').val() / 100 + 1);
    let tipPercent = ($('#tip-percent').val() / 100 + 1);

    let subtotal = price * tax;
    let tip = (price * tipPercent) - price;
    let total = subtotal + tip;

    store.meals.push({ subtotal: subtotal.toFixed(2), tip: tip.toFixed(2), total: total.toFixed(2) });
    store.tipTotal = 0;
    store.averageTip = 0;
    store.mealNumber++;
    for (let i = 0; i < store.meals.length; i++) {
      
      store.tipTotal += Number(store.meals[i].tip);
      store.tipTotal = Number(store.tipTotal.toFixed(2));
      store.averageTip = (parseFloat(store.tipTotal / store.mealNumber)).toFixed(2);
      //store.averageTip = parseFloat(store.averageTip).toFixed(2);
      
    }
    //console.log(`MEALS # ${typeof store.averageTip} `);
    render();
  });
}

function reset(){
  $('main').on('click', '.reset', function (event){
    store = {
      meals: [
        { subtotal: '0.00', tip: '0.00', total: '0.00' }
      ],
      mealNumber: 0,
      tipTotal: '0.00',
      averageTip: '0.00'
    };
    render();
  });
}

function render() {
  let html = renderHTML();
  $('main').html(html);
}

function main() {
  render();
  calculatePrice();
  reset();
}


$(main());