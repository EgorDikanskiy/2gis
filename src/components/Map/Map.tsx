import {TileLayer, MapContainer, Marker} from "react-leaflet";

const Map = ({items}) => {
    return (
        <div className='map-container'>
            <MapContainer  center={[55.792437, 37.662332, ]} zoom={9} scrollWheelZoom={true} attributionControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://dev.2gis.ae/">2GIS</a>'
                url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
              />
              {items.map((item)  => {
                return (
                   <Marker key={item.id} position={[item.coordinates.lon, item.coordinates.lat]}></Marker>
                )
              })}
             
          </MapContainer>
        </div>
    )
}

export default Map;