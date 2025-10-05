import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Map from '../../components/Map';
import CatalogBlock from '../../components/CatalogBlock';
import Filter from '../../components/Filter';
import type { CardProps } from '../../components/Card/types';


const HomePage = () => {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') || 'catalog';
    const [cards, setCards] = useState<CardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = 'http://localhost:8000/api';

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchCards({ filters: [
                {
                    "type": "school",
                    "priority": 5
                },
                {
                    "type": "kindergarten",
                    "priority": 5
                },
                {
                    "type": "parking",
                    "priority": 5
                },
                {
                    "type": "park",
                    "priority": 5
                },
                {
                    "type": "clinic",
                    "priority": 5
                }
            ] });
            setCards(data);
        } catch (err) {
            console.error('Error loading initial data:', err);
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCards = async (filters: { filters: Array<{ type: string; priority: number }> }) => {
        try {
            
            const response = await fetch(`${API_BASE_URL}/buildings/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error text:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            
            if (Array.isArray(result)) {
                return result.map((item: any) => ({
                    id: item.id,
                    title: item.name,
                    image: item.image,
                    individualIndex: item.individualIndex,
                    rating: item.rating,
                    ratingCount: item.ratingCount || 5,
                    address: item.address || 'Адрес не указан',
                    infrastructure: item.infrastructure || item.infrastructure_data || [],
                    coordinates: {
                        lat: item.coordinates?.lat || item.lat || 55.7558, // Москва по умолчанию
                        lon: item.coordinates?.lon || item.lon || 37.6176
                    }
                }));
            }
            
            if (result.success === false) {
                throw new Error(result.message || 'API request failed');
            }

            if (result.data) {
                return result.data;
            }

            return result;
        } catch (error) {
            console.error('Error fetching cards:', error);
            throw error;
        }
    };

    const handleFilterChange = async (filters: { filters: Array<{ type: string; priority: number }> }) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const data = await fetchCards(filters);
            setCards(data);
        } catch (err) {
            console.error('Error filtering cards:', err);
            setError('Ошибка применения фильтров');
            
            const fallbackData: CardProps[] = [
                {
                    id: 1,
                    title: "ЖК 'Солнечный берег'",
                    image: "https://placehold.co/600x400",
                    individualIndex: 1,
                    rating: 4.7,
                    ratingCount: 5,
                    address: "ул. Набережная, 15",
                    infrastructure: [
                        { type: 'park', count: 3 },
                        { type: 'school', count: 2 }
                    ],
                    coordinates: {
                        lat: 37.584402,
                        lon: 55.778004,
                    }
                },
                {
                    id: 2,
                    title: "ЖК 'Зеленые холмы'",
                    image: "https://placehold.co/600x400",
                    individualIndex: 2,
                    rating: 4.5,
                    ratingCount: 5,
                    address: "пр. Центральный, 42",
                    infrastructure: [
                        { type: 'kindergarten', count: 2 },
                        { type: 'park', count: 1 }
                    ],
                    coordinates: {
                        lat: 37.59991,
                        lon: 55.849446,
                    }
                }
            ];
            setCards(fallbackData);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div>Загрузка...</div>;
        }

        if (error) {
            return <div>Ошибка: {error}</div>;
        }

        switch (currentTab) {
            case 'map':
                return <div className='map-container'><Map items={cards} /></div>;
            case 'catalog':
            default:
                return <div><CatalogBlock cards={cards} maxColumnCount={3} itemsPerPage={6} /></div>;
        }
    };

  return (
    <div className={styles.homepage}>
      <Filter onFilterChange={handleFilterChange} />
      {renderContent()}
    </div>
  );
};

export default HomePage;
