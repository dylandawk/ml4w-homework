// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
let clip01;
let clip02;
let clip03;
let clip04;
const modelJson = 'https://storage.googleapis.com/tm-speech-commands/Baby-its-cold-outside-01/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/Baby-its-cold-outside-01/metadata.json';

const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    modelJson,
    metadataJson);

const prob0 = document.getElementById('prob0'); // select <span id="prob0">
const prob1 = document.getElementById('prob1'); // select <span id="prob1">
const prob2 = document.getElementById('prob2'); // select <span id="prob0">
const prob3 = document.getElementById('prob3'); // select <span id="prob1">
const prob4 = document.getElementById('prob4'); // select <span id="prob1">

function preload(){
  clip01 = loadSound("I_really_cant_stay.mp3", function(){
    console.log('loaded clip1');
  });
  clip02 = loadSound("Ive_gotta_go_away.mp3");
  clip03 = loadSound("This_evening_has_been.mp3");
  clip04 = loadSound("So_very_nice.mp3");
  console.log("sounds loaded");
}

function setup(){

}

function draw(){
}


loadMyModel();

async function loadMyModel(){

  // Make sure that the underlying model and metadata are loaded via HTTPS
  // requests.
  await recognizer.ensureModelLoaded();

  // See the array of words that the recognizer is trained to recognize.
  //console.log(recognizer.wordLabels());

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields such a
  //    - includeSpectrogram
  //    - probabilityThreshold
  //    - includeEmbedding
  recognizer.listen(result => {
    showResult(result);
    playResult(result);
  // - result.scores contains the probability scores that correspond to
  //   recognizer.wordLabels().
  // - result.spectrogram contains the spectrogram of the recognized word.
  }, {
  //includeSpectrogram: true,
  //probabilityThreshold: 0.75
  });

}

function showResult(result){
  console.log('result: ', result);
  console.log('result.scores[0]', result.scores[0])
  console.log('result.scores[1]', result.scores[1])
  // Show the probability for class 0 (noise)
  prob0.innerHTML = result.scores[0];

  // Show the probability for class 1 (I really cant stay)
  prob1.innerHTML = result.scores[1];

  // Show the probability for class 2 (I've gotta go away)
  prob2.innerHTML = result.scores[2];

  // Show the probability for class 3 (This evening has been)
  prob3.innerHTML = result.scores[3];

  // Show the probability for class 4 (So very nice)
  prob4.innerHTML = result.scores[4];

}

function playResult(result){
  if(result.scores[1] > 0.85 && !clip01.isPlaying()){
    clip01.play();
    console.log("play clip01");
  }
  else if(result.scores[2] > 0.85 && !clip02.isPlaying()){
    clip02.play();
    console.log("play clip02");
  }
  else if(result.scores[3] > 0.85 && !clip03.isPlaying()){
    clip03.play();
    console.log("play clip03");
  }
  else if(result.scores[4] > 0.85 && !clip04.isPlaying()){
    clip04.play();
    console.log("play clip04");
  }
}

// Stop the recognition in 10 seconds.
// setTimeout(() => recognizer.stopListening(), 10e3);
