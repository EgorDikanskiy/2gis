import Badge from 'components/Card/Badge/Badge';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DetailObject } from './types';
import Map from '../../components/Map';
import styles from './DetailPage.module.scss'

const detailObject = {
    id: 1,
    title: "ЖК «Современный»",
    image: "https://placehold.co/600x400",
    individualIndex: 85,
    rating: 4.7,
    ratingCount: 234,
    address: "г. Москва, ул. Ленина, д. 15",
    infrastructure: [
      {
        type: "school",
        count: 5,
        objects: [
          {
            id: 7,
            title: "Школа №1254",
            rating: "4.8",
            ratingCount: 156,
            coordinates: {
              lat: 55.7558,
              lon: 37.6173
            },
            info: {
              time: "15 мин",
              distance: "850 м"
            }
          },
          {
            id: 8,
            title: "Детский сад «Солнышко»",
            rating: "4.9",
            ratingCount: 89,
            coordinates: {
              lat: 55.7560,
              lon: 37.6175
            },
            info: {
              time: "8 мин",
              distance: "400 м"
            }
          }
        ]
      },
      {
        type: "park",
        count: 8,
        objects: [
          {
            id: 9,
            title: "Супермаркет «Продукты»",
            rating: "4.6",
            ratingCount: 178,
            coordinates: {
              lat: 55.7559,
              lon: 37.6172
            },
            info: {
              time: "5 мин",
              distance: "250 м"
            }
          },
          {
            id: 10,
            title: "ТЦ «Город»",
            rating: "4.4",
            ratingCount: 312,
            coordinates: {
              lat: 55.7562,
              lon: 37.6178
            },
            info: {
              time: "18 мин",
              distance: "1.2 км"
            }
          }
        ]
      }
    ],
    coordinates: {
      lat: 55.7558,
      lon: 37.6173
    }
  };

// Функция для извлечения объектов инфраструктуры для отображения на карте
const extractMapItems = (detailObject: DetailObject) => {
    const items = [];
    
    // Добавляем сам detailObject в начало массива
    items.push({
        id: detailObject.id,
        title: detailObject.title,
        rating: detailObject.rating,
        coordinates: detailObject.coordinates,
        individualIndex: detailObject.individualIndex
    });
    
    // Проходим по всем типам инфраструктуры
    detailObject.infrastructure.forEach(infrastructureType => {
        // Проходим по всем объектам в каждом типе инфраструктуры
        infrastructureType.objects.forEach(object => {
            items.push({
                id: object.id,
                title: object.title,
                rating: parseFloat(object.rating), // Преобразуем строку в число
                coordinates: {lat: object.coordinates.lon, lon: object.coordinates.lat}
            });
        });
    });
    
    return items;
};

const DetailPage = () => {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    // Получаем объекты для карты
    const mapItems = extractMapItems(detailObject);

    return (
        <div className='container'>
            <section className={styles.root_info}>
                <img src={detailObject.image}></img>
                <div>
                    <h2>{detailObject.title}</h2> | <h2>{detailObject.individualIndex}</h2>
                    <p>{detailObject.address}</p>
                    {detailObject.infrastructure.map((infrastructureType, index) => (
                        <Badge 
                            key={index}
                            type={infrastructureType.type}
                            count={infrastructureType.count}
                        />
                    ))}
                </div>
            </section>
            <div className='map-container'><Map items={mapItems} /></div>
        </div>
    )
}

export default DetailPage;