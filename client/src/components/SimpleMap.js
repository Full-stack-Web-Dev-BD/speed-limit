import * as React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

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
      position: { lat: 18.486278764986732, lng: 69.92786525735443 }
    }
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMapClicked(props, map, e) {
    let location = this.state.position;
    location.lat = e.latLng.lat();
    location.lng = e.latLng.lng();

    this.setState({
      position: location
    })
    console.log(this.state.position);
  }

  render() {
    return (
      <Map google={(window).google} zoom={14} className={'map'} initialCenter={this.state.position} onClick={this.onMapClicked}>
        <Marker position={{ lat: this.state.position.lat, lng: this.state.position.lng }} name={'Current location'} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk')
})(Mapa)