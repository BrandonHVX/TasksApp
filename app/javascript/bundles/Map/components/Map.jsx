import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Map extends Component {

  fetchTasks = () => {
    const map = this.map;
    const { lat, lng } = map.getCenter();
    axios.get(`/map.json?lat=${lat}&lng=${lng}`)
      .then((response) => { map.getSource('tasks').setData(response.data) })
      .catch((error) => { console.log(error) });
  }

  createMap = (mapOptions, geolocationOptions) => {
    this.map = new mapboxgl.Map(mapOptions);
    const { map } = this;
    const { lat, lng } = map.getCenter();
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: geolocationOptions,
        trackUserLocation: true
      })
    );
    map.on('load', (event) => {
      map.addSource(
        'tasks',
        {
          type: 'geojson',
          data: `/map.json?lat=${lat}&lng=${lng}`
        }
      );
      map.addLayer({
        id: 'tasks',
        type: 'circle',
        source: 'tasks'
      })
      map.on('click', 'tasks', (e) => {
       var coordinates = e.features[0].geometry.coordinates.slice();
       var description = e.features[0].properties.description;
       var id = e.features[0].properties.id;
       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
           coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
       }
       new mapboxgl.Popup()
           .setLngLat(coordinates)
           .setHTML(`<a href="/tasks/${id}/sub_tasks">${description}</a>`)
           .addTo(map);
       });
       map.on('mouseenter', 'tasks', () => {
         map.getCanvas().style.cursor = 'pointer';
       });
       map.on('mouseleave', 'tasks', () => {
         map.getCanvas().style.cursor = '';
       });
       map.on('moveend', () => { this.fetchTasks() });
    })
  }

  render(){
    const style = {
      width:            '100%',
      height:           '500px',
      backgroundColor:  'azure'
    }
    return(
      <div
        style={style}
        ref={ el => this.mapContainer = el}
      />
    );
  }

  componentDidMount(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'
    let { coordinates, centerOnUser } = this.props;
    const mapOptions = {
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v9`,
      zoom: 12,
      center: coordinates
    }
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };
    if ("geolocation" in navigator && centerOnUser) {
      navigator.geolocation.getCurrentPosition(
        // success callback
        (position) => {
          coordinates = [
                          position.coords.longitude,
                          position.coords.latitude
                        ];
          document.getElementById("long").innerHTML = coordinates[0];
          document.getElementById("lat").innerHTML = coordinates[1];
          mapOptions.center = coordinates;
          this.createMap(mapOptions, geolocationOptions);
        },
        // failure callback
        () => { this.createMap(mapOptions, geolocationOptions); },
        // options
        geolocationOptions
      );
    }else{
      this.createMap(mapOptions, geolocationOptions);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

}
