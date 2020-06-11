import React, { Component, createRef } from 'react';
import Axios from 'axios';

const styles = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
];

class Maps extends Component {
    googleMapRef = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            googleMap: null,
            infectedAreas: [],
            infectedCountries: []
        }
    }

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlcik1-nD4XiC1ryjEF6JjZO39hsrHP84`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load',() => {
            this.state.googleMap = this.createGoogleMap()
            this.onMapChange();
            this.fetchData();
        });    
    }

    componentDidUpdate() {
        this.drawCircles();
    }

    createGoogleMap = () => {
        const { lat , lng } = this.props;
        return new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 10,
            center: {
                lat: lat || 52.503325,
                lng: lng || 13.426746,
            },
            styles: styles
        });
    }

    drawCircles = () => {
        const { infectedAreas, infectedCountries } = this.state;
        if (infectedAreas.length > 0) {
            infectedAreas.map(area => {
                this.drawInfectedAreaCircle(area)
            });
        }

        if (infectedCountries.length > 0) {
            infectedCountries.map(country => {
                const {
                    active,
                    countryInfo
                } = country;
                this.drawInfectedArea({lat: countryInfo.lat, lng: countryInfo.long}, active);
            });
        }
    }

    fetchAreasByBounds = async(latBounds, lngBounds) => {
        await Axios.get(`http://localhost:5000/api/v1.0/areas?minLat=${latBounds.min}&maxLat=${latBounds.max}&minLng=${lngBounds.min}&maxLng=${lngBounds.max}`)
            .then(res => {
                if(res.data.length > 0) {
                    console.log(res.data);
                    res.data.forEach(area => {  
                        let temp = [...this.state.infectedAreas];                     

                        const found = temp.some(ia => ia._id === area._id);
                        if (!found) temp.push(area);
                        this.setState({
                            infectedAreas: temp
                        });
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    deleteCirclesOutOfBounds = (latBounds, lngBounds) => {
        let temp = [];
        this.state.infectedAreas.forEach((ia, idx) => {
            if ((ia.latitude >= latBounds.min && ia.latitude <= latBounds.max) &&
                (ia.longitude >= lngBounds.min && ia.longitude <= lngBounds.max)) {
                    temp.push(ia);
            }
        });

        this.setState({infectedAreas: temp});
    }

    onMapChange = () => {
        const { googleMap } = this.state;
        
        // i = BreitenGrad (lat), j = Längengrad (lng)
        // Y = south west, U = north east
        googleMap.addListener('dragend', () => {
            const latBounds = {
                min: googleMap.getBounds().Ya.i,
                max: googleMap.getBounds().Ya.j
            }
            const lngBounds = {
                min: googleMap.getBounds().Ua.i,
                max: googleMap.getBounds().Ua.j
            }
            this.deleteCirclesOutOfBounds(latBounds, lngBounds);
            this.fetchAreasByBounds(latBounds, lngBounds)
            // this.drawCircles();
        });
        googleMap.addListener('zoom_changed', () =>  {
            const latBounds = {
                min: googleMap.getBounds().Ya.i,
                max: googleMap.getBounds().Ya.j
            }
            const lngBounds = {
                min: googleMap.getBounds().Ua.i,
                max: googleMap.getBounds().Ua.j
            }
            this.deleteCirclesOutOfBounds(latBounds, lngBounds);
            this.fetchAreasByBounds(latBounds, lngBounds);
            // this.drawCircles();
        });
    }
        
    createMarker = (sample) => {
        return new window.google.maps.Marker({
            position: sample,
            map: this.state.googleMap,
         })
    }

    createCircle = (area) => {
        let circle =  new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.state.googleMap,
            center: area,
            radius: 15000000 // r = 150m
        }); 
        return circle;
    }

    drawInfectedArea = (area, population, country) => {
        const radius = Math.sqrt(population) * 1100;
        let circle =  new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.05,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.state.googleMap,
            center: area,
            radius: radius // r = 150m
        }); 
        return circle;
    }

    drawInfectedAreaCircle = (area) => {
        let circle =  new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.state.googleMap,
            center: {
                lat: area.latitude,
                lng: area.longitude
            },
            radius: 15000 // r = 150m
        }); 
        return circle;
    }

    fetchData = async() => {
        let COVIDAPI = "https://corona.lmao.ninja/v2/countries/";
        const COUNTRIES = ["Vietnam", "Germany", "USA", "FR", "Thailand", ];
        
        COUNTRIES.forEach((country) => {
            COVIDAPI += country + "%2C";
        });

        await Axios.get(COVIDAPI)
            .then(results => {
                // console.log(results);
                this.setState({infectedCountries: results.data}, () => console.log(this.state.infectedCountries));
            })
            .catch(err => {
                console.error(err);
            });

        this.drawCircles();
    }

    render() {
        return (
            <div
                id="map"
                ref={this.googleMapRef}
                style={{ width: '400px', height: '300px' }}
            />
        )
    }
}

export default Maps;