import React from 'react'
import { useEffect } from 'react';

const styles = {
    map: {
        height: '100%',
        position: 'inherit'
    }
}

export default function Maps({
    markers,
    ...props
}) {
    let map;
    useEffect(() => {
        let s1 = document.createElement('script');
        let s2 = document.createElement('script');
        s1.innerHTML = `
            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 52.503325, lng: 13.426746},
                    zoom: 7
                });

                return map;
            }
            function drawMarkers(markers) {
                markers.map(area => {
                    let marker = new google.maps.Marker({
                        position: area.position,
                        map: map
                    });
                });
            }
        `;
        s2.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDBbsuWC7X8v2Xxa92Vs15Xb-S4wENnxU&callback=initMap";
        s2.async = true;
        s2.defer = true;
        document.body.appendChild(s1);
        document.body.appendChild(s2);

        s2.addEventListener('load', function(){
            
        });
    }, []);

    useEffect(() => {
        if (document.querySelector('#map div'))
            document.querySelector('#map div').className = "wowowo"
    });

    

    return (
        <div>
            <div id="map"></div>
        </div>
    );
}