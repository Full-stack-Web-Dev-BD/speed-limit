import * as React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import { Button } from '@material-ui/core';
interface IMapState {
  position: LatLng;
}

interface LatLng {
  lat: number;
  lng: number;
}

export class Mapa extends React.Component<{}, IMapState>{
  constructor(props) {
    super(props);
    this.state = {

    }
    this.onMapClicked = this.onMapClicked.bind(this);
  }
  onMapClicked(props, map, e) {
    // let location = this.state.position;
    // location.lat = e.latLng.lat();
    // location.lng = e.latLng.lng();

    // this.setState({
    //   position: location
    // })
    console.log(this.state.position);
  }
  dragEnd(map) {
    console.log(map)

  }

  render() {
    return (
      <div className="map-container">
        <div className="container">
          <Button onClick={() => window.location.reload()} variant="contained" color="default" endIcon={<CenterFocusWeakIcon>send</CenterFocusWeakIcon>} >Recenter</Button>
        </div>
        <Map google={(window).google} zoom={20} className={'map'} initialCenter={{ lat: this.props.position.lat, lng: this.props.position.lng }} onClick={this.onMapClicked}>
          <Marker position={{ lat: this.props.position.lat, lng: this.props.position.lng }} name={'Current location'} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk')
})(Mapa)