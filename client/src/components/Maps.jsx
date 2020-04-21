import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

export default function Maps() {
    return (
        <div>
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyDDBbsuWC7X8v2Xxa92Vs15Xb-S4wENnxU"
            >
                <GoogleMap
                    id='example-map'
                    mapContainerStyle={{
                        height: "400px",
                        width: "800px"
                    }}
                    zoom={7}
                    center={{
                        lat: 20.985,
                        lng: 105.95
                    }}
                >
               

                </GoogleMap>
            </LoadScript>
        </div>
    )
}
