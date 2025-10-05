/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TileLayer, MapContainer, Marker, Popup} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "config/routerUrls";

interface MapItem {
    id: number;
    title: string;
    individualIndex?: number;
    rating?: number
    coordinates: { lat: number; lon: number };
}

interface MapProps {
    items: MapItem[];
    zoom: number;
    center: [number, number]
    isDetail: boolean;
}

const Map = ({items, zoom, center, isDetail }: MapProps) => {
    const navigate = useNavigate();

    const handleDetailsClick = (itemId: number, individualIndex?: number) => {
        // Сохраняем individualIndex в localStorage, если он есть
        if (individualIndex !== undefined) {
            localStorage.setItem('individualIndex', individualIndex.toString());
        }
        navigate(routerUrls.detail.create(itemId), { replace: true });
    };

    return (
        <div className='map-container'>
            {/* @ts-expect-error */}
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} attributionControl={false}>
              {/* @ts-expect-error react-leaflet types resolution in this setup */}
              <TileLayer attribution='&copy; <a href="https://dev.2gis.ae/">2GIS</a>'
                url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
              />
              {items.map((item, index)  => {
                const shouldShow = isDetail ? index === 0 : true;
                return (
                   <Marker key={item.id} position={[item.coordinates.lat, item.coordinates.lon]}>
                     (
                       <Popup>
                         <div style={{ padding: '10px', minWidth: '200px' }}>
                           <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                             {item.title}
                           </h3>
                           {shouldShow && <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                             Индекс: {item.individualIndex ? item.individualIndex.toFixed(2) : '0.00' }
                           </p>}
                           {!shouldShow && <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                             Рейтинг: {item.rating ? item.rating.toFixed(2) : '0.00' }
                           </p>}
                           {shouldShow &&
                           <button 
                             onClick={() => handleDetailsClick(item.id, item.individualIndex || 0)}
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
                           </button>}
                         </div>
                       </Popup>
                     )
                   </Marker>
                )
              })}
             
          </MapContainer>
        </div>
    )
}

export default Map;