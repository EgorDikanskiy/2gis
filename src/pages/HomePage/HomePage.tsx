import { useSearchParams } from 'react-router-dom';
import Map from '../../components/Map';
import CatalogBlock from '../../components/CatalogBlock';
import Filter from '../../components/Filter';
import type { CardProps } from '../../components/Card/types';


// Замоканные данные для карточек жилых комплексов
const mockCards: CardProps[] = [
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
    },
    {
        id: 3,
        title: "ЖК 'Городской парк'",
        image: "https://placehold.co/600x400",
        individualIndex: 3,
        rating: 4.8,
        ratingCount: 5,
        address: "ул. Парковая, 8",
        infrastructure: [
            { type: 'park', count: 4 },
            { type: 'school', count: 1 }
        ],
        coordinates: {
            lat: 37.640497,
            lon: 55.902530,
        }
    },
    {
        id: 4,
        title: "ЖК 'Семейный квартал'",
        image: "https://placehold.co/600x400",
        individualIndex: 4,
        rating: 4.6,
        ratingCount: 5,
        address: "ул. Детская, 25",
        infrastructure: [
            { type: 'kindergarten', count: 3 },
            { type: 'school', count: 2 }
        ],
         coordinates: {
            lat: 37.729115,
            lon: 55.914059,
        }
    },
];

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') || 'catalog';

    const handleFilterChange = (filters: { filters: Array<{ type: string; priority: number }> }) => {
        console.log('Filter data:', filters);
        // Здесь можно добавить логику фильтрации карточек
    };

    const renderContent = () => {
        switch (currentTab) {
            case 'map':
                return <div className='map-container'><Map items={mockCards} /></div>;
            case 'catalog':
            default:
                return <div><CatalogBlock cards={mockCards} maxColumnCount={3} itemsPerPage={6} /></div>;
        }
    };

    return (
        <div >
            <Filter onFilterChange={handleFilterChange} />
                {renderContent()}
        </div>
    );
};

export default HomePage;
