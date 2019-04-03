

// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let places_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
let geo_url = "https://www.googleapis.com/geolocation/v1/geolocate?key=";
let api_Key = "AIzaSyCadjdkTrogN4OsE1LH8V1_-q4JQc1TCCQ";
let locate_url;
let find_url;
let lat = 40.7296929;
let lng = -73.9934697;
let result_input;
let last_input;
let result_prob;
let input_type = "&inputtype=textquery&fields=name&locationbias=circle:"
let search_rad = 10000;
var map;
var service;
var infowindow;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  video.class("video");

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.

  // displays the result with the highest probability
  select('#result').html(results[0].className);
  result_input = results[0].className;

  // displays the result's probability
  select('#probability').html(nf(results[0].probability, 0, 2));
  result_prob = results[0].probability;

  // if high probability and a new Object find the place
  if(result_prob > .7 /*&& last_input != result_input*/) findPlace();
  //store current object as last object
  last_input = result_input;

  classifyVideo();
}

function findPlace() {

  console.log(result_input);

  searchPlace(result_input);

}

function gotData(data){
  console.log(data.candidates[0].name);



}

function initMap() {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {center: new google.maps.LatLng(40.730610, -73.935242), zoom: 1});
  service = new google.maps.places.PlacesService(map);
}

function searchPlace(name) {
  var request = {
  location: new google.maps.LatLng(40.730610, -73.935242),
  radius: '50000',
  query: name
  };
  service.textSearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK)
    {
      console.log('results: ',  results);
      select('#big_place').html(results[0].name);
      select('#place').html("");
    }
  });
}
