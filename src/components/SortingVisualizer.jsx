import './SortingVisualizer.css'
import React, {useContext, useEffect, useState} from 'react';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: "60",
      speed: "200",
      algo: "bubble",
      array: [],
      disableBtn: false,
    }
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray(length = this.state.slider) {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(randomNum(1, 77));
    }
    this.setState({array});
  }

  //--------------------------Sorting-Algorithm-------------------------------//

  async selectAlgo(algoName){
    this.setState({disableBtn: true});
    switch(algoName){
      case "bubble":
        await this.bubbleSort(this.state.array, this.state.speed);
        break;
      case "selection":
        await this.selectionSort(this.state.array, this.state.speed);
        break;    
      case "insertion":
        await this.insertionSort(this.state.array, this.state.speed);
        break;
      case "heap":
        await this.heapSort(this.state.array, this.state.speed);
        break;  
      case "merge":
        await this.mergeSort(this.state.array, this.state.speed);
        break;
      case "quick":
        await this.quickSort(this.state.array, this.state.speed);
        break;          
      default:
        await this.bubbleSort(this.state.array, this.state.speed);
        break;
    }
    this.setState({disableBtn: false});
  }

  //-------------------------------Bubble-Sort--------------------------------//
  
  async bubbleSort(arr, speedFactor){
    let bars = document.getElementsByClassName("bar");
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr.length-i-1; j++){
        if(arr[j] > arr[j+1]){
          swap(j, j+1, arr);
          
          reSizeBar(j, arr, bars);
          reColorBar(j, bars, "red");
          
          reSizeBar(j+1, arr, bars);
          reColorBar(j+1, bars, "red");
          
          await sleep(speedFactor);
          
          reColorBar(j, bars, "white");
          reColorBar(j+1, bars, "white");
        }
      }
      reColorBar(arr.length-i-1, bars, "lightgreen");
      await sleep(speedFactor);
      reColorBar(arr.length-i-1, bars, "white");
    }
  }
  
  //-------------------------------Bubble-Sort--------------------------------//

  
  //-------------------------------Selection-Sort--------------------------------//

  async selectionSort(arr, speedFactor){
    let bars = document.getElementsByClassName("bar");
    for(let i = 0; i < arr.length - 1; i++){
      let min = arr[i], minIndex = i;
      reColorBar(i, bars, "red");
      for(let j = i + 1; j < arr.length; j++){
        reColorBar(j, bars, "red");
        await sleep(speedFactor);
        if(arr[j] < min){
          min = arr[j];
          minIndex = j;
        }
        reColorBar(j, bars, "white");
      }
      arr[minIndex] = arr[i];
      arr[i] = min;
      reColorBar(i, bars, "yellow");
      reColorBar(minIndex, bars, "yellow");
     
      await sleep(speedFactor);
      reSizeBar(i, arr, bars);
      reSizeBar(minIndex, arr, bars);
      
      reColorBar(i, bars, "lightgreen");
      reColorBar(minIndex, bars, "white");
      await sleep(speedFactor);
      reColorBar(i, bars, "white");
    }
  }

  //-------------------------------Selection-Sort--------------------------------//

  //----------------------------Insertion-Sort-----------------------------------//
  
  async insertionSort(arr, speedFactor){
    let bars = document.getElementsByClassName("bar");
    for(let i = 1; i < arr.length; i++){
      let j, tmp = arr[i];
      for(j = i - 1; j >= 0; j--){
        if(tmp < arr[j]){
          swap(j, j+1, arr);

          reSizeBar(j, arr, bars);
          reSizeBar(j+1, arr, bars);

          reColorBar(j, bars, "red");
          reColorBar(j+1, bars, "red");
              
          await sleep(speedFactor);

          reColorBar(j, bars, "white");
          reColorBar(j+1, bars, "white");
        }else{
          break;
        }
      }
      arr[j + 1] = tmp;
      reSizeBar(j+1, arr, bars);
      reColorBar(j+1, bars, "lightgreen");

      await sleep(speedFactor);
      reColorBar(j+1, bars, "white");
    }
  }
  //----------------------------Insertion-Sort-----------------------------------//
  
  //------------------------------Heap-Sort-------------------------------------//
  
  async heapSort(arr, speedFactor){
    let bars = document.getElementsByClassName("bar");
    for(let i = Math.floor(arr.length / 2); i >= 0; i--){
      await this.heapify(arr, arr.length, i);
    }
    for(let i = arr.length - 1; i >= 0; i--){
      await this.heapSwap(arr, 0, i, bars, speedFactor);
      await this.heapify(arr, i, 0, speedFactor);
      reColorBar(i, bars, "lightgreen");

      await sleep(speedFactor);
      reColorBar(i, bars, "white");
    }
  }
  
  async heapify(arr, n, i, speedFactor){
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
      await this.heapSwap(arr, i, parent, bars, speedFactor);
      await this.heapify(arr, n, parent, speedFactor);
    }
  }
  
  async heapSwap(arr, i, j, bars, speedFactor){
    swap(i, j, arr);
    reSizeBar(i, arr, bars);
    reColorBar(i, bars, "red");
    
    reSizeBar(j, arr, bars);
    reColorBar(j, bars, "red");
    await sleep(speedFactor);
    
    reColorBar(i, bars, "white");
    reColorBar(j, bars, "white");
  }

  //------------------------------Heap-Sort-------------------------------------//
  
  //-------------------------------Merge-Sort-----------------------------------//
  
  async mergeSort(arr, speedFactor){
    await this.helperMergeSort(arr, 0, arr.length - 1, speedFactor);
  }
  
  async helperMergeSort(arr, start, end, speedFactor){
    if(start >= end){
      return;
    }
    
    let mid = Math.floor((start + end) / 2);
    await this.helperMergeSort(arr, start, mid, speedFactor);
    await this.helperMergeSort(arr, mid + 1, end, speedFactor);
    await this.merge(arr, start, mid, end, speedFactor);
  }
  
  async merge(arr, start, mid, end, speedFactor){
    let i = start, j = (mid + 1), k = 0, trackI = start;
    let size = (end - start + 1);
    let helpArr = new Array(size);
    let bars = document.getElementsByClassName("bar");
    while(i <= mid && j <= end){
      reColorBar(trackI, bars, "red");
      reColorBar(j, bars, "red");
      await sleep(speedFactor);
      
      if(arr[i] < arr[j]){
        helpArr[k] = arr[i];
        bars[start + k].style.height = `${arr[i]}vh`;
        reColorBar(start+k, bars, "lightgreen");
        await sleep(speedFactor);
        reColorBar(trackI, bars, "white");
        reColorBar(j, bars, "white");
        reColorBar(start+k, bars, "white");
        i++;
      }else{
        helpArr[k] = arr[j];
        bars[start + k].style.height = `${arr[j]}vh`;
        reColorBar(start+k, bars, "lightgreen");
        await sleep(speedFactor);
        
        let l = j, m = mid;
        while(l > (start + k)){
          bars[l].style.height = `${arr[m]}vh`;
          m--;
          l--;
        }
        reColorBar(trackI, bars, "white");
        reColorBar(j, bars, "white");
        reColorBar(start+k, bars, "white");
        j++;
      }
      k++;
      trackI++;
    }
    
    while(i <= mid){
      helpArr[k] = arr[i];
      bars[start+k].style.height = `${arr[i]}vh`;
      reColorBar(start+k, bars, "lightgreen");
      await sleep(speedFactor);
      reColorBar(start+k, bars, "white");
      i++;
      k++;
    }
    while(j <= end){
      helpArr[k] = arr[j];
      bars[start + k].style.height = `${arr[j]}vh`;
      reColorBar(start+k, bars, "lightgreen");
      await sleep(speedFactor);  
      let l = j, m = mid;
      while(l > (start + k)){
        bars[l].style.height = `${arr[m]}vh`;
        m--;
        l--;
      }
      
      reColorBar(start+k, bars, "white");
      j++;
      k++;
    }
    
    let m = 0;
    for(let a = start; a <= end; a++){
      arr[a] = helpArr[m];
      m++;
    }
  }

  //-------------------------------Merge-Sort-----------------------------------//


  //-------------------------------Quick-Sort-----------------------------------//

  async quickSort(arr, speedFactor){
    await this.helperQuickSort(arr, 0, arr.length - 1, speedFactor);
  }
  
  async helperQuickSort(arr, start, end, speedFactor){
    if(start >= end){
      return;
    }
    
    let c = await this.partition(arr, start, end, speedFactor);
    await this.helperQuickSort(arr, start, (c-1), speedFactor);
    await this.helperQuickSort(arr, (c + 1), end, speedFactor);
  }
  
  async partition(arr, start, end, speedFactor){
    let countSmall = 0;
    let pivot = arr[start];
    for(let i = (start + 1); i <= end; i++){
      if(arr[i] <= pivot){
        countSmall++;
      }
    }
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = start + countSmall;
    
    reColorBar(start, bars, "red");
    reColorBar(pivotIndex, bars, "red");
    await sleep(speedFactor);
    arr[start] = arr[pivotIndex];
    arr[pivotIndex] = pivot;
    
    reSizeBar(start, arr, bars);
    reSizeBar(pivotIndex, arr, bars);
    reColorBar(pivotIndex, bars, "lightgreen");
    await sleep(speedFactor);
    reColorBar(start, bars, "white");
    reColorBar(pivotIndex, bars, "white");
    
    let i = start, j = end;
    while(i < pivotIndex && j > pivotIndex){
      if(arr[i] <= pivot){
        i++;
      }else if(arr[j] > pivot){
        j--;
      }else{
        reColorBar(i, bars, "red");
        reColorBar(j, bars, "red");      
        await sleep(speedFactor);
        swap(i, j, arr);
        reSizeBar(i, arr, bars);
        reSizeBar(j, arr, bars);
        reColorBar(i, bars, "white");
        reColorBar(j, bars, "white");
        await sleep(speedFactor);
        i++;
        j--;
      }
    }
    return pivotIndex;
  }

  //-------------------------------Quick-Sort-----------------------------------//


  //--------------------------Sorting-Algorithm-------------------------------//

  render () {
    const {array} = this.state;
    return (
      <div className="container">
        <div className="bars_container" id="bars_container">
          {array.map((value, idx) => (
            <div 
              className="bar" 
              key={idx}
              style={{
                backgroundColor: 'white',
                height: `${value}vh`,
                width: `${200/this.state.slider}vh`
              }}
              ></div>
          ))}
        </div>

        <div className="buttons_container">
          <input
            type="range"
            className="slider"
            min="20"
            max="120"
            step="10"
            value={this.state.slider}
            disabled={this.state.disableBtn}
            onChange={e => {
                             this.setState({slider: e.target.value});
                             this.resetArray(e.target.value);
                            }}
          />
    
          <select name="" className="speed" value={this.state.speed} disabled={this.state.disableBtn} onChange={e => this.setState({speed: e.target.value})}>
            <option value="500">Slow</option>
            <option value="200">Medium</option>
            <option value="50">Fast</option>
            <option value="10">Super Fast</option>
          </select>

          <select name="" className="algo" value={this.state.algo} disabled={this.state.disableBtn} onChange={e => this.setState({algo: e.target.value})}>
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>

          <button className="randomize_array_btn" disabled={this.state.disableBtn} onClick={() => this.resetArray()}>Randomize Array</button>

          <button className="sort_btn" disabled={this.state.disableBtn} onClick={(e) => {this.selectAlgo(this.state.algo)}}>Sort Array</button>
        </div>
      </div>
    );
  }
}

//----------------------------Helper-Functions-----------------------------------------//

function randomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swap(i, j, arr){
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function reSizeBar(i, arr, bar){
  bar[i].style.height = `${arr[i]}vh`;
}

function reColorBar(i, bar, color) {
  bar[i].style.backgroundColor = color;
}

//----------------------------Helper-Functions-----------------------------------------//
