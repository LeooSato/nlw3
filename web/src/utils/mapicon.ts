import Leaflet from 'leaflet';
import MapMarker from '../images/map-marker.svg';


const mapIcon = Leaflet.icon({
  iconUrl: MapMarker,
  iconSize:[58,68],
  iconAnchor:[29,68],
  popupAnchor:[170,2]
})
export default mapIcon;