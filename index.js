var random_arr = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 7;
let speedFactor = 500;
let unsorted_arr = new Array(numOfBars);


slider.addEventListener("input", function () {
    numOfBars = slider.value;
    maxRange = slider.value;
    bars_container.innerHTML = "";
    unsorted_arr = createRandomArr();
    renderBars(unsorted_arr);
});

speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algoToUse = "";

select_algo.addEventListener("change", function () {
    algoToUse = select_algo.value;
});

document.addEventListener("DOMContentLoaded", function () {
    unsorted_arr = createRandomArr();
    renderBars(unsorted_arr);
});

random_arr.addEventListener("click", function () {
    unsorted_arr = createRandomArr();
    bars_container.innerHTML = "";
    renderBars(unsorted_arr);
});

sort_btn.addEventListener("click", function () {
    switch(algoToUse){
        case "bubble":
            bubbleSort(unsorted_arr);
            break;
        case "selection":
            selectionSort(unsorted_arr);
            break;    
        case "insertion":
            insertionSort(unsorted_arr);
            break;
        case "heap":
            heapSort(unsorted_arr);
            break;  
        case "merge":
            mergeSort(unsorted_arr);
            break;
        case "quick":
            quickSort(unsorted_arr);
            break;          
        default:
            bubbleSort(unsorted_arr);
            break;   
    }
});




function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArr(){
    let arr = new Array(numOfBars);
    for(let i = 0; i < numOfBars; i++){
        arr[i] = randomNum(minRange, maxRange);
    }
    return arr;
}

function renderBars(arr){
    for(let i = 0; i < numOfBars; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//----------------Disable----------------------//
function disable(){
    random_arr.disabled = true;
    sort_btn.disabled = true;
    select_algo.disabled = true;
    slider.disabled = true;
}

//----------------Disable----------------------//

//----------------Enable---------------------//
function enable(){
    random_arr.disabled = false;
    sort_btn.disabled = false;
    select_algo.disabled = false;
    slider.disabled = false;
}
//----------------Enable---------------------//

async function bubbleSort(arr){
    let bars = document.getElementsByClassName("bar");
    disable();
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(arr[j] > arr[j+1]){
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;

                bars[j].style.height = arr[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "red";

                bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "red";

                await sleep(speedFactor);

                bars[j].style.backgroundColor = "white";
                bars[j + 1].style.backgroundColor = "white";
            }
        }
        bars[arr.length - i - 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        bars[arr.length - i - 1].style.backgroundColor = "white";
    }
    enable();
}

async function selectionSort(arr){
    let bars = document.getElementsByClassName("bar");
    disable();
    for(let i = 0; i < arr.length - 1; i++){
        let min = arr[i], minIndex = i;
        bars[i].style.backgroundColor = "red";
        for(let j = i + 1; j < arr.length; j++){
            bars[j].style.backgroundColor = "red";
            await sleep(speedFactor);
            if(arr[j] < min){
                min = arr[j];
                minIndex = j;
            }
            bars[j].style.backgroundColor = "white";
        }
        arr[minIndex] = arr[i];
        arr[i] = min;
        bars[i].style.backgroundColor = "yellow";
        bars[minIndex].style.backgroundColor = "yellow";
        await sleep(speedFactor);
        bars[i].style.height = arr[i] * heightFactor + "px";
        bars[minIndex].style.height = arr[minIndex] * heightFactor + "px";
        bars[i].style.backgroundColor = "lightgreen";
        bars[minIndex].style.backgroundColor = "white";
        await sleep(speedFactor);
        bars[i].style.backgroundColor = "white";
    }
    enable();
}

//----------------------------Insertion-Sort-----------------------------------//

async function insertionSort(arr){
    let bars = document.getElementsByClassName("bar");
    disable();
    for(let i = 1; i < numOfBars; i++){
        let j, tmp = arr[i];
        for(j = i - 1; j >= 0; j--){
            if(tmp < arr[j]){
                let tmp = arr[j + 1]
                arr[j + 1] = arr[j];
                arr[j] = tmp;
                bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
                bars[j].style.height = arr[j] * heightFactor + "px";

                bars[j + 1].style.backgroundColor = "red";
                bars[j].style.backgroundColor = "red";
                await sleep(speedFactor);
                bars[j + 1].style.backgroundColor = "white";
                bars[j].style.backgroundColor = "white";
            }else{
                break;
            }
        }
        arr[j + 1] = tmp;
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        bars[j + 1].style.backgroundColor = "white";
    }
    enable();
}

//----------------------------Insertion-Sort-----------------------------------//


//---------------------------Heap-Sort-----------------------------------//


async function heapSort(arr){
    let bars = document.getElementsByClassName("bar");
    disable();
    for(let i = Math.floor(arr.length / 2); i >= 0; i--){
        await heapify(arr, arr.length, i);
    }
    for(let i = arr.length - 1; i >= 0; i--){
        await swap(arr, 0, i, bars);
        await heapify(arr, i, 0);
        bars[i].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        bars[i].style.backgroundColor = "white";
    }
    enable();
}

async function heapify(arr, n, i){
    let bars = document.getElementsByClassName("bar");
    let parent = i;
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    if(leftChild < n && arr[leftChild] > arr[parent]){
        parent = leftChild;
    }
    if(rightChild < n && arr[rightChild] > arr[parent]){
        parent = rightChild;
    }
    if(parent != i){
        await swap(arr, i, parent, bars);
        await heapify(arr, n, parent);
    }
}

async function swap(arr, i, j, bars){
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    
    bars[i].style.height = arr[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "red";

    bars[j].style.height = arr[j] * heightFactor + "px";
    bars[j].style.backgroundColor = "red";
    
    await sleep(speedFactor);

    bars[i].style.backgroundColor = "white";
    bars[j].style.backgroundColor = "white";
}

//----------------------------Heap-Sort-----------------------------------//

//----------------------------Merge-Sort-----------------------------------//

async function mergeSort(arr){
    disable();
    await helperMergeSort(arr, 0, arr.length - 1);
    enable();
}

async function helperMergeSort(arr, start, end){
    if(start >= end){
        return;
    }
    let mid = Math.floor((start + end) / 2);
    await helperMergeSort(arr, start, mid);
    await helperMergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end){
    let i = start, j = (mid + 1), k = 0, trackI = start;
    let size = (end - start + 1);
    let helpArr = new Array(size);
    let bars = document.getElementsByClassName("bar");
    while(i <= mid && j <= end){
        bars[trackI].style.backgroundColor = "red";
        bars[j].style.backgroundColor = "red";
        await sleep(speedFactor);
        if(arr[i] < arr[j]){
          helpArr[k] = arr[i];
          bars[start + k].style.height = arr[i] * heightFactor + "px";
          bars[start + k].style.backgroundColor = "lightgreen";
          await sleep(speedFactor);
          bars[trackI].style.backgroundColor = "white";
          bars[j].style.backgroundColor = "white";
          bars[start + k].style.backgroundColor = "white";
          i++;
        }else{
          helpArr[k] = arr[j];
          bars[start + k].style.height = arr[j] * heightFactor + "px";
          bars[start + k].style.backgroundColor = "lightgreen";
          await sleep(speedFactor);
          //--------------------------------------//
          
          let l = j, m = mid;
          while(l > (start + k)){
            bars[l].style.height = arr[m] * heightFactor + "px";
            m--;
            l--;
          }
          
          bars[trackI].style.backgroundColor = "white";
          bars[j].style.backgroundColor = "white";
          bars[start + k].style.backgroundColor = "white";
          j++;
        }
        k++;
        trackI++;
    }
    while(i <= mid){
        helpArr[k] = arr[i];
        bars[start + k].style.height = arr[i] * heightFactor + "px";
        bars[start + k].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        bars[start + k].style.backgroundColor = "white";
        i++;
        k++;
    }
    while(j <= end){
        helpArr[k] = arr[j];
        bars[start + k].style.height = arr[j] * heightFactor + "px";
        bars[start + k].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        
        let l = j, m = mid;
          while(l > (start + k)){
            bars[l].style.height = arr[m] * heightFactor + "px";
            m--;
            l--;
        }
        
        bars[start + k].style.backgroundColor = "white";
        j++;
        k++;
    }
    let m = 0;
    for(let a = start; a <= end; a++){
        arr[a] = helpArr[m];
        m++;
    }
}

//----------------------------Merge-Sort-----------------------------------//

//----------------------------Quick-Sort-----------------------------------//

async function quickSort(arr){
    disable();
    await helperQuickSort(arr, 0, arr.length - 1);
    enable();
}

async function helperQuickSort(arr, start, end){
    if(start >= end){
        return;
    }
    let c = await partition(arr, start, end);
    await helperQuickSort(arr, start, (c-1));
    await helperQuickSort(arr, (c + 1), end);
}

async function partition(arr, start, end){
    let countSmall = 0;
    let pivot = arr[start];
    for(let i = (start + 1); i <= end; i++){
      if(arr[i] <= pivot){
        countSmall++;
      }
    }
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = start + countSmall;

    bars[start].style.backgroundColor = "red";
    bars[pivotIndex].style.backgroundColor = "red";
    await sleep(speedFactor);
    arr[start] = arr[pivotIndex];
    arr[pivotIndex] = pivot;

    //-----------------//
    bars[start].style.height = arr[start] * heightFactor + "px";
    bars[pivotIndex].style.height = arr[pivotIndex] * heightFactor + "px";
    bars[pivotIndex].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);

    bars[start].style.backgroundColor = "white";
    bars[pivotIndex].style.backgroundColor = "white";
    //-----------------//
    let i = start, j = end;
    while(i < pivotIndex && j > pivotIndex){
      if(arr[i] <= pivot){
        i++;
      }else if(arr[j] > pivot){
        j--;
      }else{
        bars[i].style.backgroundColor = "red";
        bars[j].style.backgroundColor = "red";

        await sleep(speedFactor);

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        bars[i].style.height = arr[i] * heightFactor + "px";
        bars[j].style.height = arr[j] * heightFactor + "px";
        bars[i].style.backgroundColor = "white";
        bars[j].style.backgroundColor = "white";
        await sleep(speedFactor);
        i++;
        j--;
      }
    }
    return pivotIndex;
}

//----------------------------Quick-Sort-----------------------------------//

