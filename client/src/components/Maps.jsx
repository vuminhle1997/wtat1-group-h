import React, { Component, createRef } from 'react';
import Axios from 'axios';
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
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDBbsuWC7X8v2Xxa92Vs15Xb-S4wENnxU&callback=initMap`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load',() => {
            this.state.googleMap = this.createGoogleMap()
            this.onMapChange();
            this.fetchData();
        });    
    }

    componentDidUpdate() {
        
    }

    createGoogleMap = () => {
        return new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 10,
            center: {
                lat: 52.503325,
                lng: 13.426746,
            },
        })
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
        await Axios.get(`http://localhost:4040/api/v1.0/areas?minLat=${latBounds.min}&maxLat=${latBounds.max}&minLng=${lngBounds.min}&maxLng=${lngBounds.max}`)
            .then(res => {
                if(res.data.length > 0) {
                    console.log(res.data);
                    res.data.forEach(area => {  
                        let temp = [...this.state.infectedAreas];

                        if (temp.length === 0) temp.push(area);
                        temp.some(ia => {
                            if (area._id !== ia._id) {
                                temp.push(area);
                            } 
                        });
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
            fillOpacity: 0.05,
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
        console.log(circle);
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
                console.log(results);
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