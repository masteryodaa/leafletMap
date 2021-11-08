import { useState, useEffect, useRef } from 'react'
import { MapContainer, FeatureGroup, TileLayer, Marker, Popup, Circle, Rectangle, Polygon, LayerGroup, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
// import { Icon } from 'leaflet'
// import { GeoJSON } from 'react-leaflet'
import * as turf from '@turf/turf'



const center = [25.58341413206471, 85.09624567435982]


function App() {

  const [popupdata, setPopupdata] = useState('');
  const [area, setArea] = useState('');
 


  const _onCreate = e => {
    const { layer, layerType } = e;
    if (layerType === "polygon") {
      console.log(layer);

      let points=[]
      let data = [];
      layer._latlngs[0].map(
        latlng => {
          //   let data = document.getElementById('points').appendChild(
          //     document.createTextNode('Lat : ' + latlng.lat + '  ' + 'Lng : ' + latlng.lng + '\n\n')
          // )
          data = [...data,'Lat : ' + latlng.lat + '  ' + 'Lng : ' + latlng.lng + '\n']
          // console.log(data)
          setPopupdata(data)

          points.push(
            [latlng.lat, latlng.lng]
          )
        }
        )
        
        points.push(points[0])
        console.log(points)
        let area = turf.area(turf.polygon([points]));
        setArea('Area : '+area);
    }
  }


  return (
    <div className="App d-flex">


      <MapContainer
        className=''
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '60vw' }}>


        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="GMap">
            <TileLayer
              attribution='google'
              url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={center}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={center}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={center}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>



        </LayersControl>


        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            // onEdited={_onEdited}
            // onDeleted={_onDeleted}

            draw={{
              polygon: {

                feet: true,
                showArea: true,
                showLength: true,

                shapeOptions: {
                  fillColor: 'red',
                  color: 'black',
                  weight: 2,
                  opacity: 0.5,
                },

                allowIntersection: false,
                drawError: {
                  color: 'red',
                  fillColor: 'black',
                  timeout: 1000
                },

              },
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />

          <Popup>
              {popupdata.toString()}<br/>
              {area}
          </Popup>
        </FeatureGroup>


      </MapContainer>


      <div className='ms-3 mt-3'>
        <h2>Map Layers</h2>

        <p id='points' style={{ width: '150px' }}>
          {popupdata} <br/>
        
        </p>

        <p id="area">{area}</p>



        {/* <p id='points' style={{ width: '150px' }}>{dataRef.current}</p> */}

        {/* <pre>{JSON.stringify(mapLayers, null, 2)}</pre>
        lat: {popupdata[0] ? JSON.stringify(popupdata[0].latlngs[0].lat) : 'No data'}<br/>
        lng: {popupdata[0] ? JSON.stringify(popupdata[0].latlngs[0].lng) : 'No data'} */}

      </div>

    </div>
  );
}

export default App;
