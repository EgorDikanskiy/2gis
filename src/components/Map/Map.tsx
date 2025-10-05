/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TileLayer, MapContainer, Marker, Popup} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "config/routerUrls";
import L from "leaflet";
import redPin from '../../../css/images/marker-icon-red.png'

// Define the default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Define the larger marker icon (doubled size)
const largeIcon = L.icon({
  iconUrl: redPin,
   iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

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
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} attributionControl={false}>
              <TileLayer attribution='&copy; <a href="https://dev.2gis.ae/">2GIS</a>'
                url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
              />
              {items.map((item, index)  => {
                const shouldShow = isDetail ? index === 0 : true;
                const markerIcon = isDetail && index === 0 ? largeIcon : defaultIcon;
                return (
                   <Marker key={item.id} position={[item.coordinates.lat, item.coordinates.lon]} icon={markerIcon}>
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