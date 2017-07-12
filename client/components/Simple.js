import React, {Component} from 'react'
import {render} from 'react-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from 'axios';

const MAP_CENTER_COORDINATES = [6.1751, 106.8650];
const MAP_ZOOM = 4;
const MAP_MAX_ZOOM = 18;
const logoQlue = L.icon({
  iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png',
  iconSize: [
    40, 40
  ],
  iconAnchor: [20, 40]
});

class Simple extends Component {
  doConvertToMapsFormat(param) {
    var results = [];
    for (var index = 0; index < param.length; index++) {
      var temp = {
        'tooltip': 'placemark_id:' + param[index].placemark_id + '<br>name:' + param[index].name + '<br>address:' + param[index].address,
        'lat': param[index].lat,
        'lng': param[index].lng,
        'options': {
          icon: logoQlue
        }
      }
      results.push(temp);
    }
    return (results);
  }
  componentDidMount() {
    this.setState({loading: true})
    axios
      .get('api/Maps/getdataexample')
      .then(res => {
        console.log(res)
        let results = this.doConvertToMapsFormat(res.data.response.message);
        this.setState({loading: false, markers: results})
      });
  }
  constructor(props) {
    super(props),
    this.state = {
      loading: true,
      markers: []
    }
  }
  render() {
    if (this.state.loading) 
      return <h1>LOADING</h1>
    else 
      return (< Map className = "markercluster-map" center = {
        MAP_CENTER_COORDINATES
      }
      zoom = {
        MAP_ZOOM
      }
      maxZoom = {
        MAP_MAX_ZOOM
      } > <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> < MarkerClusterGroup markers = {
        this.state.markers
      }
      wrapperOptions = {{
        enableDefaultStyle: true
      }}/>
      </Map >)
  };

}
export default Simple;