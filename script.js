let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
 let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
 let speed = document.getElementById("speed");
 let slider = document.getElementById("slider");
let minRange = 1;
 let maxRange = slider.value;
 let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

function reLoad(){
  location.reload();
}

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//generating random array
function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});
//  adding bars 
function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
     bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}
//randomize button 
randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});
//to see the animation one by one
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//bubble sort
async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#400552";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
          array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
         bars[j].style.backgroundColor = "lightgreen";
          bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
         await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}
//selection sort
async function selectionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minindex=i;
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[minindex]) {
        minindex=j;
       for (let k = 0; k < bars.length; k++) {
          if (k !== minindex && k !== j ) {
            bars[k].style.backgroundColor = "#400552";
          }
          
       }
       bars[minindex].style.height = array[minindex] * heightFactor + "px";
        bars[minindex].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
      
    }
        let temp = array[i];
        array[i] = array[minindex];
          array[minindex] = temp;
          bars[i].style.height = array[i] * heightFactor + "px";
         bars[i].style.backgroundColor = "lightgreen";
        
        
      
    
    await sleep(speedFactor);
  }
  
  return array;
}

//quick sort
async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  
    bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
}

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "lightgreen";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "#400552";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#400552";
  }
  return items;
}

//insertion sort
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "red";
      
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "#400552";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#400552";
  }
  return array;
}




sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
      case "Selection":
        selectionSort(unsorted_array);
        break;
        case "quick":
      

      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      case "insertion":
        InsertionSort(unsorted_array);
        break;
      
      default:
        bubbleSort(unsorted_array);
      break;

  }
});