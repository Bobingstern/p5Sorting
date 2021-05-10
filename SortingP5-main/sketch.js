let values;
let w = 10
let states = [];
let selection;
let runButton;
let upButton;
let downButton
let shuff
let canRun = true;
let delay = 1
let delUp
let delDown
var osc
let sorted
let shuffType


function mousePressed(){
  
}

function setup() {
  // put setup code here
  createCanvas(window.innerWidth, window.innerHeight);
  
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);


  selection = createSelect();
  selection.position(10, 10);
  selection.option('Quick Sort');
  selection.option('Merge Sort');
  //selection.option('Merge Sort In-Place');
  //selection.option('Tim Sort');
  selection.option('Radix Sort');

  selection.option('Insertion Sort');
  selection.option('Heap Sort');
  selection.option('Shell Sort');
  selection.option('Comb Sort');
  //selection.option("Introsort")
  //selection.option('IntroSort');
  selection.selected('Quick Sort');


  shuffType = createSelect();
  shuffType.position(150, 10);
  shuffType.option('Normal Shuffle');
  shuffType.option('Reverse Shuffle');
  shuffType.option("Heapifyed Shuffle")
  shuffType.option("Almost Sorted")
  shuffType.option("Sine Wave")
  shuffType.selected('Normal Shuffle');

  

  runButton = createButton("Start")
  runButton.position(10, 30)
  runButton.mousePressed(Run)

  upButton = createButton("+")
  upButton.position(100, 30)
  upButton.mousePressed(function(){w = round(w/1.5)
                                  makeSort()})
  downButton = createButton("-")
  downButton.position(70, 30)
  downButton.mousePressed(function(){w = round(w*1.5)
                                  makeSort()})

  delUp = createButton("+Delay")
  delUp.position(130, 60)
  delUp.mousePressed(function(){delay += 5})
  delDown = createButton("-Delay")
  delDown.position(70, 60)
  delDown.mousePressed(function(){if (delay > 5){delay -= 5}})


  shuff = createButton("Shuffle")
  shuff.position(130, 30)
  shuff.mousePressed(makeVals)
  
  makeVals()

}


function playNote(note, duration) {
  osc.freq(midiToFreq(note));

  // Fade it in
  osc.fade(0.5,0);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function makeSort(){
  for (var i=0;i<states.length;i++){
        states[i] = -1
      }
    values = new Array(floor(width/w));
    for (let i = 0; i < values.length; i++) {
      values[i] = round(i*height/values.length)
      //values[i] = height-i*height/values.length
      states[i] = -1;
    }
    //shuffleArr(values)
    values = shuffle(values)
}

function getBaseLog(x, y) {
  return log(y) / log(x);
}
async function shuffleArr(arr, e, x){
  if (!x){
    for (var i=0;i<e;i++){
      let a = i
      let b = round(random(0, arr.length-1))
      if (i % 3 == 0){
      await sleep(1);
      }

      let temp = arr[i];
      arr[a] = arr[b];
      arr[b] = temp;
    }
  }
  if (x){
    for (var i=0;i<e;i++){
        let a = round(random(0, arr.length-1))
        let b = round(random(0, arr.length-1))
        if (a != b){
          if (i % 3 == 0){
          await sleep(1);
          }
          let temp = arr[a];
          arr[a] = arr[b];
          arr[b] = temp;
        }
      }
  }
}

async function makeVals(){
  canRun = true
  for (var i=0;i<states.length;i++){
      states[i] = -1
    }
  osc.fade(0, 0.1)
  let item = shuffType.value()
  for (var i=0;i<states.length;i++){
        states[i] = -1
      }
    values = new Array(floor(width/w));
    for (let i = 0; i < values.length; i++) {
      values[i] = round(i*height/values.length)
      //values[i] = height-i*height/values.length
      states[i] = -1;
    }

    if (values.length % 2 != 0){
    values.splice(values.length-1, 1)
  }

  if (item == "Reverse Shuffle"){
    
    values = values.reverse()
  }

  if (item == "Normal Shuffle"){
    shuffleArr(values, values.length, false)
  }

  if (item == "Heapifyed Shuffle"){
    let n = values.length
    for (let i = n / 2 - 1; i >= 0; i--){
        heapify(values, n, i);
        await sleep(1)

    }
  }
  if (item == "Almost Sorted"){
    shuffleArr(values, round(values.length/10), true)
  }
  if (item == "Sine Wave"){
    console.log(values.length)
    for (var i=0;i<values.length;i++){
      values[i] = round(sin(i/(values.length/10)) * (height/3) + height/2)
      if (i % 3 == 0){
        await sleep(1)
      }
    }
  }
  osc.fade(0, 0.1)
}

function Run() {
  if (values.length % 2 != 0){
    values.splice(values.length-1, 1)
  }
  for (var i=0;i<states.length;i++){
      states[i] = -1
    }
  userStartAudio();
  let item = selection.value();
  if (canRun){
    canRun = false
    if (item == "Quick Sort"){
      quickSort(values, 0, values.length-1)
    }
    if (item == "Merge Sort"){
      mergeSort(values, 0, values.length-1)
    }
    if (item == "Tim Sort"){
      timSort(values, values.length-1)
    }

    if (item == "Radix Sort"){
      radixSort(values)
    }
    if (item == "Insertion Sort"){
      insertionSortRecursive(values, values.length)

    }
    if (item == "Heap Sort"){
      heapSort(values, values.length)

    }
    if (item == "Shell Sort"){
      ShellSort(values, values.length)

    }
    if (item == "Comb Sort"){
      combSort(values)

    }
    if (item == "Introsort"){
      Introsort(values, 0, values.length)

    }
    if (item == "Merge Sort In-Place"){
      mergeSort3Way(values, values.length)
    }

  }

}

function draw() {
  // put drawing code here
  
  background(56);
  textSize(30)
  text("Delay:"+delay, 200, 50)
  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#E0777D');
    } else if (states[i] == 1) {
      let key = (map(values[i], 1, height, 1, 41))
      playNote(key+40)  

      fill(255, 0, 0);
    } else {
      fill(255);
      //osc.fade(0, 1)
    }

    rect(i * w, height - values[i], w, values[i]);
    states[i] = -1
  }
  if (is_array_sorted(values)){
    osc.fade(0, 0.1)
  }

}
