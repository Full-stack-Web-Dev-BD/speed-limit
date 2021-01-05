var express = require('express');
var app = express();
var axios = require('axios');
var cors = require('cors');
var bodyParser = require('body-parser');



app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = 3005;
const APIKEY = 'AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk'


app.post('/getSpeedLimit', (req, res) => {
  let placeId = req.body.placeId;
  let lat = req.body.lat;
  let lang = req.body.lang;

  let requestApi;
  if (placeId) {
    requestApi = `https://roads.googleapis.com/v1/speedLimits?placeId=${placeId}&key=${APIKEY}`;
  } else {
    requestApi = `https://roads.googleapis.com/v1/speedLimits?path=${lat},${lang}&key=${APIKEY}`;
  }

  axios.get(requestApi)
    .then(function (response) {
      // handle success
      console.log(response);
      let responseData = response['data'];
      let responseMessage = {
        "status": "OK",
        "data": responseData['speedLimits']
      }

      res.send(responseMessage)

    })
    .catch(function (error) {
      // handle error
      let responseData = error['response'];
      let responseMessage = {
        "status": "Error",
        "data": responseData['data']['error']['message']
      }

      res.send(responseMessage)
    })
})

app.post('/getPlaceId', (req, res) => {
  let lat = req.body.lat;
  let lang = req.body.lang;

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${APIKEY}`)
    .then(function (response) {

      // handle success
      let responseData = response['data'];
      let responseMessage = {
        "status": "OK",
        "place_id": responseData['results'][0]['place_id']
      }

      res.send(responseMessage)

    })
    .catch(function (error) {
      // handle error
      let responseData = error['response'];
      let responseMessage = {
        "status": "Error",
        "data": responseData['data']['error']['message']
      }

      res.send(responseMessage)
    })
})

app.listen(PORT, (err) => {
  console.log("The Server running in " + PORT)
})

