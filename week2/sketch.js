
let video;
const knnClassifier = ml5.KNNClassifier();
const featureExtractor = ml5.featureExtractor('MobileNet', gotModel);


function setup(){
  video = createCapture(VIDEO);
  video.parent('#videoContainer')

  createButtons();
}

function gotModel(){
  console.log('Model Loaded!');
}

function createButtons(){
  buttonA = select('#addClassRock');
  buttonA.mousePressed(() => {
    addExample('Rock');
  })

  buttonB = select('#addClassPaper');
  buttonB.mousePressed(() => {
    addExample('Paper');
  })

  buttonC = select('#addClassScissor');
  buttonC.mousePressed(() => {
    addExample('Scissor');
  })

  buttonClassify = select('#buttonPredict');
  buttonClassify.mousePressed(() =>{
    classifyMyVideo();
  })
}

function addExample(label){
  const features = featureExtractor.infer(video);
  knnClassifier.addExample(features, label);
  console.log("added example: ", label);
}

function classifyMyVideo(){
  const features = featureExtractor.infer(video);
  knnClassifier.classify(features, gotResult);
}
function gotResult(err, results){
  console.log('results: ', results);
  classifyMyVideo();
}
