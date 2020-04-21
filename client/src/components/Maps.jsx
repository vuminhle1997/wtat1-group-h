import React, { Component, createRef } from 'react';
import Axios from 'axios';
class Maps extends Component {
    googleMapRef = React.createRef()
    markedCountries = [
        {
            country: "United States of America",
            lat: 38.171526,
            lng: -101.211448
        },
        {
            country: "Viet Nam",
            lat: 21.164367,
            lng: 105.238347
        },
        {
            country: "Germany",
            lat: 51.488458,
            lng: 10.297640
        },
        {
            country: "korea (south)",
            lat: 36.604946,
            lng: 127.948234
        },
        {
            country: "France",
            lat: 47.380787,
            lng: 2.2890001
        },
        {
            country: "Cuba",
            lat: 22.179434,
            lng: -79.843747
        },
        {
            country: "peru",
            lat: -8.064251,
            lng: -76.109381
        }, 
    ];

    constructor(props) {
        super(props);
        this.state = {
            googleMap: null,
            global: {},
            countries: [],
            markOnMap: [],
            infectedAreas: []
        }
    }

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDBbsuWC7X8v2Xxa92Vs15Xb-S4wENnxU&callback=initMap`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load',() => {
            this.state.googleMap = this.createGoogleMap()
            this.props.markers.map(obj => {
                this.createCircle(obj.position)
            });
            this.onMapChange();
            this.fetchData();
        });    
    }

    componentDidUpdate() {
        if (this.state.countries.length > 0) {
            this.markedCountries.forEach(obj => {
                this.state.countries.some(country => {
                    if (country.Country.toLowerCase() === obj.country.toLowerCase()) {
                        this.state.markOnMap.push(country)
                        this.drawInfectedArea({lat: obj.lat, lng: obj.lng}, country.TotalConfirmed, country);
                    }
                })
                
            });
        }
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

    fetchAreasByBounds = async(latBounds, lngBounds) => {
        await Axios.get(`http://localhost:4040/api/v1.0/areas?minLat=${latBounds.min}&maxLat=${latBounds.max}&minLng=${lngBounds.min}&maxLng=${lngBounds.max}`)
            .then(res => {
                if(res.data.length > 0) {
                    console.log(res.data);
                    this.state.infectedAreas.some(IA => {
                        
                    })
                    res.data.forEach(area => {
                        console.log(area);
                        this.setState({
                            infectedAreas: this.state.infectedAreas.push(area)
                        })
                    })
                }
            })
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

            this.fetchAreasByBounds(latBounds, lngBounds)
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
            this.fetchAreasByBounds(latBounds, lngBounds)
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
            radius: 15000 // r = 150m
        }); 
        return circle;
    }

    drawInfectedArea = (area, population, country) => {
        const radius = Math.sqrt(population) * 100;
        let circle =  new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.state.googleMap,
            center: area,
            radius: radius // r = 150m
        }); 
        return circle;
    }

    fetchData = async() => {
        await Axios.get('https://api.covid19api.com/summary')
            .then(results => {
                console.log(results);
                this.setState({
                    global: results.data.Global,
                    countries: results.data.Countries
                }, () => {
                    console.log(this.state.countries);
                });
            })
            .catch(err => {
                console.error(err);
            });
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