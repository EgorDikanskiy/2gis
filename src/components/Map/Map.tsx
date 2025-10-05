/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TileLayer, MapContainer, Marker, Popup} from "react-leaflet";
import type { CardProps } from "../Card/types";
import type { DetailObject } from '../../pages/DetailPage/types'
import { useNavigate } from "react-router-dom";
import { routerUrls } from "config/routerUrls";

interface MapProps {
    items: CardProps[] | DetailObject;
}

const Map = ({items}: MapProps) => {
    const navigate = useNavigate();

    const handleDetailsClick = (itemId: number) => {
        navigate(routerUrls.detail.create(itemId), { replace: true });
    };

    return (
        <div className='map-container'>
            {/* @ts-expect-error */}
            <MapContainer center={[55.792437, 37.662332]} zoom={9} scrollWheelZoom={true} attributionControl={false}>
              {/* @ts-expect-error */}
              <TileLayer attribution='&copy; <a href="https://dev.2gis.ae/">2GIS</a>'
                url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
              />
              {/* @ts-expect-error */}
              {items.map((item)  => {
                return (
                   <Marker key={item.id} position={[item.coordinates.lon, item.coordinates.lat]}>
                     <Popup>
                       <div style={{ padding: '10px', minWidth: '200px' }}>
                         <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                           {item.title}
                         </h3>
                         <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                           Индекс: {item.individualIndex}
                         </p>
                         <button 
                           onClick={() => handleDetailsClick(item.id)}
                           style={{
                             backgroundColor: '#63D72A',
                             color: 'white',
                             border: 'none',
                             padding: '8px 16px',
                             borderRadius: '4px',
                             cursor: 'pointer',
                             fontSize: '14px',
                             width: '100%'
                           }}
                         >
                           Подробнее
                         </button>
                       </div>
                     </Popup>
                   </Marker>
                )
              })}
             
          </MapContainer>
        </div>
    )
}

export default Map;