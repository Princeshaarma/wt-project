const container = document.getElementById("array-container");
const desc = document.getElementById("algo-desc");
let array = [];
const size = 40;

function generateArray() {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
  renderArray();
}

function renderArray(highlight = []) {
  container.innerHTML = "";
  array.forEach((val, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 3}px`;
    if (highlight.includes(i)) {
      bar.style.backgroundColor = "#f87171";
    }
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const algo = document.getElementById("algorithm-select").value;
  showDescription(algo);
  switch (algo) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "merge":
      await mergeSort(0, array.length - 1);
      break;
    case "quick":
      await quickSort(0, array.length - 1);
      break;
  }
}

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray([j, j + 1]);
        await sleep(50);
      }
    }
  }
}

// Selection Sort
async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j;
    }
    [array[i], array[min]] = [array[min], array[i]];
    renderArray([i, min]);
    await sleep(50);
  }
}

// Insertion Sort
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray([j + 1, j + 2]);
      await sleep(50);
    }
    array[j + 1] = key;
    renderArray([j + 1]);
    await sleep(50);
  }
}

// Merge Sort
async function mergeSort(left, right) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

async function merge(left, mid, right) {
  const L = array.slice(left, mid + 1);
  const R = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < L.length && j < R.length) {
    array[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    renderArray([k - 1]);
    await sleep(50);
  }

  while (i < L.length) {
    array[k++] = L[i++];
    renderArray([k - 1]);
    await sleep(50);
  }

  while (j < R.length) {
    array[k++] = R[j++];
    renderArray([k - 1]);
    await sleep(50);
  }
}

// Quick Sort
async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      renderArray([i, j]);
      await sleep(50);
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  renderArray([i + 1, high]);
  await sleep(50);
  return i + 1;
}

// Algorithm Descriptions
function showDescription(algo) {
  const descriptions = {
    bubble: "Bubble Sort compares adjacent elements and swaps them if they're in the wrong order. Time: O(n²)",
    selection: "Selection Sort finds the minimum element and moves it to the front. Time: O(n²)",
    insertion: "Insertion Sort builds the sorted array one element at a time. Time: O(n²)",
    merge: "Merge Sort divides the array into halves, sorts and merges them. Time: O(n log n)",
    quick: "Quick Sort picks a pivot and partitions the array around it. Time: O(n log n)"
  };
  desc.innerText = descriptions[algo];
}

// Initial load
generateArray();
