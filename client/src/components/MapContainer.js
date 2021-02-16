import React, { useState, useEffect } from 'react'
import SimpleMap from './SimpleMap'
import axios from 'axios'


const MapContainer = () => {
    
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  // 23.801159894846236, 90.45213877376071
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [speedLimit, setSpeedLimit] = useState(0)
  const APIKEY = 'AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk'


  useEffect(() => {

    if (navigator.geolocation) {
      const setPosition = async (position) => {
        // console.log('position seted', position)
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        setCurrentSpeed(position.coords.speed)
        try {
          const resp = await axios.get(`https://roads.googleapis.com/v1/speedLimits?path=${position.coords.latitude},${position.coords.longitude}&key=${APIKEY}`);
          console.log(resp)

          if (resp.data.speedLimits) {
            setSpeedLimit(resp.data.speedLimits[0].speedLimit)
          }
          console.log('speed limit seted', resp.data.speedLimits)
        } catch (err) {
          console.error(err);
        }
      }
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(setPosition)
        // const sendRequest = async () => {
        //   if (lat && lon) {
        //     try {
        //       const resp = await axios.get(`https://roads.googleapis.com/v1/speedLimits?path=${lat},${lon}&key=${APIKEY}`);
        //       setSpeedLimit(resp.data.speedLimits[0].speedLimit)
        //       console.log('speed limit seted', resp.data.speedLimits[0].speedLimit)
        //     } catch (err) {
        //       console.error(err);
        //     }
        //   }
        // };
        // sendRequest()


      }, 1000);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }, [])


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
  const updateAdd = () => {
    const lat = 24.204615780835702, lon = 89.91187624103327

    const sendRequest = async () => {
      try {
        const resp = await axios.get(`https://roads.googleapis.com/v1/speedLimits?path=${lat},${lon}&key=${APIKEY}`);
        setSpeedLimit(resp.data.speedLimits[0].speedLimit)
        console.log('got this one', resp.data)
      } catch (err) {
        console.error(err);
      }
    };
    sendRequest()
  }
    return (
        <div>
            <SimpleMap position={{ lat: lat, lng: lon }} />
        </div>
    )
}

export default MapContainer
