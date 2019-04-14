// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
const modelJson = 'https://storage.googleapis.com/tm-speech-commands/Baby-its-cold-outside-01/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/Baby-its-cold-outside-01/metadata.json';

const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    modelJson,
    metaDataJson);

const prob0 = document.getElementById('prob0'); // select <span id="prob0">
const prob1 = document.getElementById('prob1'); // select <span id="prob1">
const prob2 = document.getElementById('prob2'); // select <span id="prob0">
const prob3 = document.getElementById('prob3'); // select <span id="prob1">
const prob4 = document.getElementById('prob4'); // select <span id="prob1">



async function loadMyModel(){

  // Make sure that the underlying model and metadata are loaded via HTTPS
  // requests.
  await recognizer.ensureModelLoaded();

  // See the array of words that the recognizer is trained to recognize.
  console.log(recognizer.wordLabels());

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields such a
  //    - includeSpectrogram
  //    - probabilityThreshold
  //    - includeEmbedding
  recognizer.listen(result => {
    showResult(result);
  // - result.scores contains the probability scores that correspond to
  //   recognizer.wordLabels().
  // - result.spectrogram contains the spectrogram of the recognized word.
  }, {
  includeSpectrogram: true,
  probabilityThreshold: 0.75
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
  prob0.innerHTML = result.scores[4];

}

// Stop the recognition in 10 seconds.
// setTimeout(() => recognizer.stopListening(), 10e3);
