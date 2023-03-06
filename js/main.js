const output = document.querySelector('.output');
const durationTime = document.querySelector('#duration-range');
const selectVideo = document.querySelector('#select-video');
const titlePrice = document.querySelector('.title-price');
const radio = document.querySelectorAll('.unvisible-radio');
const switchOther = document.querySelectorAll('.calculator-form__other-parametres .switch input');
const hiddenInput = document.querySelector('input[type="hidden"]');
const fast = document.querySelector('.caclulation-form__fast .switch input');



const timeArr =  ['15 секунд', '30 секунд ','45 секунд', '1 минута', '2 минуты', '3 минуты', '5 минут', 'более 5 минут'];
const priceVideo = [0, 0, 0, 5000, 10000, 15000, 20000, 25000, 30000];
const priceAnimation = [0, 0, 0, 80000, 160000, 240000, 320000, 400000, 480000];





durationTime.addEventListener('input', function() {
    output.innerText = timeArr[this.value];
})


durationTime.addEventListener('input', function() {
    if (radio[0].checked) {
      hiddenInput.value = parseInt(priceVideo[this.value])
    }
    else {
      hiddenInput.value = parseInt(priceAnimation[this.value])
    }
    
    calc();

});

fast.addEventListener('change', function() {
  getFastPrice();
  calc();
});

function getFastPrice() {
  let price =0;
  if (fast.checked) {
    price = parseFloat(fast.dataset.price);
  }
  else {
    price = 1;
  }
  return price;
}

function getPriceForSelect() {

    switch(selectVideo.value) {
        case 'Рекламный ролик':
            selectVideo.dataset.price = 38000;
            break;
        case 'Презентационный ролик':
            selectVideo.dataset.price =38000;
            break;
        case 'Имиджевый ролик':
            selectVideo.dataset.price  = 33000;
            break;
        case 'Корпоративный ролик':
            selectVideo.dataset.price =26000;
            break;
        case 'Видеоинструкцию':
            selectVideo.dataset.price =38000;
            break;
        case 'Видеообзор':
            selectVideo.dataset.price = 33000;
            break;
        case 'Онлайн курс':
            selectVideo.dataset.price = 20000;
            break;
        case 'Промо ролик':
              selectVideo.dataset.price = 35000;
              break;
        default:
            selectVideo.dataset.price = 10000;
            break;
    }

};


function calc() {
  titlePrice.innerText = `Закажите ${selectVideo.value.toLowerCase()} за ${Math.ceil((parseInt(hiddenInput.value) + parseInt(selectVideo.dataset.price) + getPraisCheckbox())* getFastPrice())}₽`;
}


calc();


selectVideo.addEventListener('change', function () {
  getPriceForSelect();
  calc();
});


function getPraisCheckbox () {
  let sum = 0;
  switchOther.forEach(e => {
    if (e.checked) {
      sum += parseInt(e.dataset.price);
    } else {
      sum += 0;
    }
  });

  return sum;
}

switchOther.forEach(e => {
  e.addEventListener('change', function() {
    getPraisCheckbox();
    calc();
  });
});


radio.forEach(e => {
  e.addEventListener('change', function() {
    calc();
  });
});
