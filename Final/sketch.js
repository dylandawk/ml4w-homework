// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the json file (model topology) has a reference to the bin file (model weights)
const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/DylanDawkinsFinalModel01/model.json';
//const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/DylanDawkinsFinalModel02/model.json';
//const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
const maxPredictions = 5;

let model;
let video;

// A function that loads the model
async function load() {
  model = await tm.mobilenet.load(checkpoint);
}

async function setup() {
  // Call the load function, wait util it finishes loading
  await load();

  // Get videos from webcam
  video = createCapture(VIDEO);
  video.size(400, 300);

  noCanvas();

  // Make a prediction on video
  predictVideo(video.elt);
}


async function predictVideo(image) {
  const prediction = await model.predict(image);
  console.log('prediction[0].className: ', prediction[0].className)

  // Show the result
  // const res = select('#res'); // select <span id="res">
  // res.html(prediction[0].className);

  // Show the probability
  // const prob = select('#prob'); // select <span id="prob">
  // prob.html(prediction[0].probability);

  // Continue to predict the video
  predictVideo(video.elt);
  showPrediction(prediction);
}

function showPrediction(prediction){
  //console.log('prediction: ', prediction);

  // // Show the probability for class 0 (neutral)
  // prob0.innerHTML = prediction[0].probability;
  //
  // // Show the probability for class 1 (up)
  // prob1.innerHTML = prediction[1].probability;
  //
  // // Show the probability for class 2 (down)
  // prob2.innerHTML = prediction[2].probability;
  //
  // // Show the probability for class 3 (left)
  // prob3.innerHTML = prediction[3].probability;
  //
  // // Show the probability for class 4 (right)
  // prob4.innerHTML = prediction[4].probability;

}


// Stop the recognition in 10 seconds.
// setTimeout(() => recognizer.stopListening(), 10e3);
