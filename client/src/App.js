import React, { useEffect, useState,useRef } from 'react'
import HomeNavbar from './components/HomeNavbar'
import axios from 'axios'

// scss connect
import './assets/scss/main.scss'
import SimpleMap from './components/SimpleMap'
// import SimpleMap from './components/SimpleMap'

const App = () => {
  const [lat, setLat] = useState(47.081793767428586)
  const [lon, setLon] = useState(15.427020461926652)
  const APIKEY = 'AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk'
  
  
  // useEffect(() => {
    
    // if (navigator.geolocation) {
    //   const setPosition = (position) => {
    //     // setLat(position.coords.latitude)
    //     // setLon(position.coords.longitude)
    //   }
    //   // navigator.geolocation.getCurrentPosition(showPosition);
    //   navigator.geolocation.getCurrentPosition(setPosition)
    // } else {
    //   alert("Geolocation is not supported by this browser.")
    // }
  // }, [])


  const getSpeedLimit = (req, res) => {


    let placeId = req.body.placeId;
    let lat = req.body.lat;
    let long = req.body.long;

    let requestApi;
    if (placeId) {
      requestApi = `https://roads.googleapis.com/v1/speedLimits?placeId=${placeId}&key=${APIKEY}`;
    } else {
      requestApi = `https://roads.googleapis.com/v1/speedLimits?path=${lat},${long}&key=${APIKEY}`;
    }

    axios.get(requestApi)
      .then(function (response) {
        // handle success
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
  }
  const updateAdd=()=>{
    setLat(23.810185587383454)
    setLon(90.41228937013848)
  }
  return (
    <div>
      <HomeNavbar />
      {/* <button onClick={()=>updateAdd()}>update</button> */}
      <SimpleMap lat={lat} lon={lon} />
     
    </div>
  )
}

export default App

