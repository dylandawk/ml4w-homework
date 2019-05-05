// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the json file (model topology) has a reference to the bin file (model weights)
const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/DylanDawkinsFinalModel01/model.json';
let model;
let video;
let canvas;
const maxPredictions = 4;
const size = 400;

load();

async function load() {
    model = await tm.mobilenet.load(checkpoint);
    // use loadFromFiles() function to support files from a file picker or files from your local hard drive
    // you need to create File objects, like with file input elements (<input type="file" ...>)
    // const uploadJSONInput = document.getElementById('upload-json');
    // const uploadWeightsInput = document.getElementById('upload-weights');
    // model = await tm.mobilenet.loadFromFiles(uploadJSONInput.files[0], uploadWeightsInput.files[0])
    // one way to get the total number of classes
    const totalClasses = model.model.outputShape[1];
    console.log("Number of classes, ", totalClasses);
}

// the main tensorflow.js object is available through window
console.log(window.tf);

async function setup() {
  // Call the load function, wait util it finishes loading
  await load();

  setupVideo();

  canvas = createCanvas(size, size);
}

function setupVideo() {
  // has to be a square video and image feed
  let constraints = {
    video: {
      width: size,
      height: size,
      aspectRatio: 1
    }
  };

  // Get videos from webcam
  video = createCapture(VIDEO, constraints);

  // Hide the video
  video.hide()
}

function draw() {
  if (video) {
    // We need to flip the webcam view
    translate(size, 0); // move to far corner
    scale(-1.0, 1.0); // flip x-axis backwards

    // Draw the image from the video
    image(video, 0, 0);

    // Make a prediction from square canvas
    predictVideo(canvas.elt);
  }
}

async function predictVideo(image) {
  const prediction = await model.predict(image, maxPredictions);

  // Show the result
  showPrediction(prediction)
  // const res = select('#res'); // select <span id="res">
  // res.html(prediction[0].className);

  // Show the probability
  // const prob = select('#prob'); // select <span id="prob">
  // prob.html(prediction[0].probability);
}


function showResult(prediction){
  console.log('prediction: ', prediction);
  console.log('prediction[0].probability', prediction[0].probability)
  console.log('prediction[1].probability', prediction[1].probability)
  console.log('prediction[2].probability', prediction[2].probability)
  console.log('prediction[3].probability', prediction[3].probability)
  console.log('prediction[4].probability', prediction[4].probability)
  // // Show the probability for class 0 (neutral)
  // prob0.innerHTML = result.scores[0];
  //
  // // Show the probability for class 1 (up)
  // prob1.innerHTML = result.scores[1];
  //
  // // Show the probability for class 2 (down)
  // prob2.innerHTML = result.scores[2];
  //
  // // Show the probability for class 3 (left)
  // prob3.innerHTML = result.scores[3];
  //
  // // Show the probability for class 4 (right)
  // prob4.innerHTML = result.scores[4];

}


// Stop the recognition in 10 seconds.
// setTimeout(() => recognizer.stopListening(), 10e3);
