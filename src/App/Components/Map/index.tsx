import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import fetch from 'node-fetch';
import { Marker } from '@app/src/App/Components/Marker';

type Position = {
  lat: number,
  lng: number,
}

interface IMapProps {
  zoom: number;
}

interface IMapState {
  position: Position;
}

export class Map extends React.Component<IMapProps, IMapState> {

  private uri: string;
  private triangleCoords: object[];

  constructor(props: IMapProps) {
    super(props);
    this.uri = 'http://api.open-notify.org/iss-now.json';
    this.state = {
      position: {
        lat: 59.95,
        lng: 30.33
      },
    }
    this.triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757}
    ];
  }

  static defaultProps = {
    zoom: 11
  };

  async getData() {
    const response = await fetch(this.uri);
    return response.json();
  };

  private init() {
    this.getData().then((data) => {
      const position = {
        lat: parseInt(data.iss_position.latitude, 10),
        lng: parseInt(data.iss_position.longitude, 10),
      }
      this.showAlert(position);
      this.updatePosition(position);
    });
  }

  updatePosition(position: Position) {
    setTimeout(() => {
      this.setState({ position });
    }, 3000);
  }

  private showAlert(currentPosition: Position) {
    this.triangleCoords.map((position: Position) => {
      if(position.lat === currentPosition.lat && position.lng === currentPosition.lng) {
        alert('Mensaje');
      }
    });
  }

  componentDidMount() {
    this.init();
  }

  componentWillUpdate() {
    this.init();
  }

  render() {
    const { position } = this.state;

    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAKCet6nX7j2RJfjDnHpV0VW-a9sNMTE7g' }}
          defaultCenter={position}
          center={position}
          defaultZoom={this.props.zoom}
        >
          <Marker text={'Mi Ubicación'}/>
        </GoogleMapReact>
      </div>
    );
  }
}
