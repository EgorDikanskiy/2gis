import Badge from 'components/Card/Badge/Badge';
import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import type { DetailObject } from './types';
import Map from '../../components/Map';
import styles from './DetailPage.module.scss'
import { Text } from "components/Text/Text";

const detailObject: DetailObject = {
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

const extractMapItems = (detailObject: DetailObject) => {
    const items = [];
    
    items.push({
        id: detailObject.id,
        title: detailObject.title,
        rating: detailObject.rating,
        coordinates: detailObject.coordinates,
        individualIndex: detailObject.individualIndex
    });
    
    detailObject.infrastructure.forEach(infrastructureType => {
        infrastructureType.objects.forEach(object => {
            items.push({
                id: object.id,
                title: object.title,
                rating: parseFloat(object.rating),
                coordinates: {lat: object.coordinates.lat, lon: object.coordinates.lon}
            });
        });
    });
    
    return items;
};

const DetailPage = () => {
    const [, setSearchParams] = useSearchParams();
    const { id } = useParams<{ id: string }>();
    const [detailData, setDetailData] = useState<DetailObject | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = 'https://twomatch-backend.where-pizza.ru/api';

    useEffect(() => {
        setSearchParams({}, { replace: true });
        if (id) {
            loadDetailData();
        }
    }, [setSearchParams, id]);

    const loadDetailData = async () => {
        if (!id) return;
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Получаем individualIndex из localStorage
            const storedIndividualIndex = localStorage.getItem('individualIndex');
            const individualIndex = storedIndividualIndex ? parseFloat(storedIndividualIndex) : 0;
            
            const Savedfilters = localStorage.getItem('filters');

            const data = await fetchDetailData({
                id: id,
                individualIndex: individualIndex,
                filters: Savedfilters
            });
            setDetailData(data);
        } catch (err) {
            console.error('Error loading detail data:', err);
            setError('Ошибка загрузки данных');
            // В случае ошибки используем mock данные
            setDetailData(detailObject);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDetailData = async (requestData: { id: string; individualIndex: number, filters: any }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/buildings/detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error text:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            
            // Преобразуем данные API в формат DetailObject
            if (result) {
                return {
                    id: result.id,
                    title: result.name || result.title,
                    image: result.image,
                    individualIndex: result.individualIndex,
                    rating: result.rating,
                    ratingCount: result.ratingCount || 5,
                    address: result.address || 'Адрес не указан',
                    infrastructure: result.infrastructure || result.infrastructure_data || [],
                    coordinates: {
                        lat: result.coordinates?.lat || result.lat || 55.7558,
                        lon: result.coordinates?.lon || result.lon || 37.6176
                    }
                };
            }
            
            throw new Error('No data received from API');
        } catch (error) {
            console.error('Error fetching detail data:', error);
            throw error;
        }
    };

    const mapItems = detailData ? extractMapItems(detailData) : [];

    if (isLoading) {
        return <div className='container'>Загрузка...</div>;
    }

    if (error && !detailData) {
        return <div className='container'>Ошибка: {error}</div>;
    }

    const currentData = detailData || detailObject;

    return (
        <div className='container'>
            <section className={styles.root_info}>
                <img src={currentData.image} className={styles.image} />
                <div className={styles['info-container']}>
                    <div>
                        <h2 className={styles.title}>{currentData.title}</h2>
                        <div className="">
                          <Text tag="div" view="p-18" color="primary" weight="medium">
                            Подходит вам
                          </Text>
                          <Text tag="div" view="p-18" color="primary" weight="medium">
                            {"на "}
                            <Text tag="span" view="p-18" color="green" weight="medium">
                              {currentData.individualIndex.toFixed(2)}
                            </Text>
                          </Text>
                        </div>
                    </div>
                    <p className={styles.address}>{currentData.address}</p>
                    <div className={styles.badges}>
                        {currentData.infrastructure.map((infrastructureType, index) => (
                            <Badge 
                                key={index}
                                type={infrastructureType.type}
                                count={infrastructureType.count}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {(() => {
                const defaultCenter: [number, number] = [55.792437, 37.662332];
                const first = mapItems && mapItems.length > 0 ? mapItems[0] : undefined;
                const safeCenter: [number, number] = first && first.coordinates
                    ? [first.coordinates.lat, first.coordinates.lon]
                    : defaultCenter;
                return (
                    <div className={'map-container'}>
                        <Map items={mapItems} zoom={15} center={safeCenter} isDetail={true} />
                    </div>
                );
            })()}
        </div>
    )
}

export default DetailPage;