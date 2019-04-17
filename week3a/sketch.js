// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
let clip01;
let clip02;
let clip03;
let clip04;
let isClip01Played = false;
let isClip02Played = false;
let isClip03Played = false;
let isClip04Played = false;


const modelJson = 'https://storage.googleapis.com/tm-speech-commands/Can You Feel the Love Tonight 02/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/Can You Feel the Love Tonight 02/metadata.json';
// let modelJson;
// let metadataJson;

function preload(){
  clip01 = loadSound("I_can_see_whats_happening.mp3", function(){
    console.log('loaded clip1');
  });
  clip02 = loadSound("And_they_dont_have_a_clue.mp3");
  clip03 = loadSound("Theyll_fall_in_love.mp3");
  clip04 = loadSound("Rest_of_song.mp3");
  // modelJson = loadJSON("model.json")
  // metadataJson = loadJSON("metadata.json")
  console.log("sounds loaded");

}

const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    modelJson,
    metadataJson);

const prob0 = document.getElementById('prob0'); // select <span id="prob0">
const prob1 = document.getElementById('prob1'); // select <span id="prob1">
const prob2 = document.getElementById('prob2'); // select <span id="prob0">
const prob3 = document.getElementById('prob3'); // select <span id="prob1">


// function preload(){
//   clip01 = loadSound("I_can_see_whats_happening.mp3", function(){
//     console.log('loaded clip1');
//   });
//   clip02 = loadSound("And_they_dont_have_a_clue.mp3");
//   clip03 = loadSound("Theyll_fall_in_love.mp3");
//   clip04 = loadSound("Rest_of_song.mp3");
//   console.log("sounds loaded");
// }

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
  // probabilityThreshold: 0.75
  });

}

function showResult(result){
  console.log('result: ', result);
  console.log('result.scores[0]', result.scores[0])
  console.log('result.scores[1]', result.scores[1])
  // Show the probability for class 0 (noise)
  prob0.innerHTML = result.scores[0];

  // Show the probability for class 1 (what?)
  prob1.innerHTML = result.scores[1];

  // Show the probability for class 2 (who?)
  prob2.innerHTML = result.scores[2];

  // Show the probability for class 3 (oh.)
  prob3.innerHTML = result.scores[3];


}

function playResult(result){
  if(!clip01.isPlaying() && !isClip01Played){
    clip01.play();
    isClip01Played = true;
    console.log("play clip01");
  }
  else if(result.scores[1] > 0.90 && !clip02.isPlaying()  && !isClip02Played){
    clip02.play();
    isClip02Played = true;
    console.log("play clip02");
  }
  else if(result.scores[2] > 0.90 && !clip03.isPlaying() &&!isClip03Played){
    clip03.play();
    isClip03Played = true;
    console.log("play clip03");
  }
  else if(result.scores[3] > 0.90 && !clip04.isPlaying() && !isClip04Played){
    clip04.play();
    isClip04Played = true;
    console.log("play clip04");
  }
}

// Stop the recognition in 10 seconds.
// setTimeout(() => recognizer.stopListening(), 10e3);
