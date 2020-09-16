// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); // поле с минимальной массой
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с максимальной массой


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 15},
  {"kind": "Личи", "color": "красный", "weight": 7},
  {"kind": "Ананас", "color": "желтый", "weight": 3},
  {"kind": "Карамбола", "color": "зеленый", "weight": 10},
  {"kind": "Манго", "color": "желтый", "weight": 6},
  {"kind": "Лонган", "color": "желтый", "weight": 2}
  
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    var myNewLi = CreateNewFruitLi(i, fruits[i]);
    fruitsList.appendChild(myNewLi);
  }
};

function CreateNewFruitLi(index, fruit) {
  var myNewLi = document.createElement('li');
  var InfoDiv = document.createElement('div');

  InfoDiv.className = "fruit__info";
  switch (fruit.color) {
    case "желтый":
      myNewLi.className = "fruit__item fruit_yellow";
      break;
    case "красный":
      myNewLi.className = "fruit__item fruit_red";
      break;
    case "оранжевый":
      myNewLi.className = "fruit__item fruit_orange";
      break;
    case "зеленый":
      myNewLi.className = "fruit__item fruit_green";
      break;
    case "голубой":
      myNewLi.className = "fruit__item fruit_cyan";
      break;
    case "фиолетовый":
      myNewLi.className = "fruit__item fruit_violet";
      break;
    case "белый":
      myNewLi.className = "fruit__item fruit_white";
      break;
    default:
      myNewLi.className = "fruit__item fruit_carmazin";
      break;
  }
  InfoDiv.innerHTML = `<div>index: ${index}</div><div>kind: ${fruit.kind}</div><div>color: ${fruit.color}</div><div>weight (кг): ${fruit.weight}</div>`;
  myNewLi.appendChild(InfoDiv);
  return myNewLi;
}

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  for (let i = 0; i < fruits.length; i++) {
    let rnd = getRandomInt(0, fruits.length - 1);
    result.push(fruits[rnd]);
  }
  fruits = result;
 
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/
// фильтрация массива

const filterFruits = (arr) => {
  var arr2 = arr.filter((item) => {
  const minWeight = minWeightInput.value;
  const maxWeight = maxWeightInput.value;
  const val = item["weight"];
    if (val >=  minWeight && val <= maxWeight) {
      return true;
    } else {
      return false;
    }
  });
  return arr2;
};

filterButton.addEventListener('click', () => {
    fruits = filterFruits(fruits);
  display();
});



/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
    if (kindInput.value == "" || colorInput.value == "" || weightInput.value == "") {
      alert("Введите корректные данные!");
      return;
    }
    var newFruit = { "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value };
    var myNewLi = CreateNewFruitLi(fruits.length, newFruit);
    fruits.push(newFruit);
    fruitsList.appendChild(myNewLi);
     display();
});
