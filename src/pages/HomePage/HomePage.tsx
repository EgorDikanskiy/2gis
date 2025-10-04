import { useSearchParams } from 'react-router-dom';
import Map from '../../components/Map';
import CatalogBlock from '../../components/CatalogBlock';
import Filter from '../../components/Filter';
import type { CardProps } from '../../components/Card/types';


// Замоканные данные для карточек жилых комплексов
const mockCards: CardProps[] = [
    {
        title: "ЖК 'Солнечный берег'",
        image: "https://placehold.co/600x400",
        individualIndex: 1,
        rating: 4.7,
        address: "ул. Набережная, 15",
        infrastructure: [
            { type: 'park', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Зеленые холмы'",
        image: "https://placehold.co/600x400",
        individualIndex: 2,
        rating: 4.5,
        address: "пр. Центральный, 42",
        infrastructure: [
            { type: 'kindergarten', count: 2 },
            { type: 'park', count: 1 }
        ]
    },
    {
        title: "ЖК 'Городской парк'",
        image: "https://placehold.co/600x400",
        individualIndex: 3,
        rating: 4.8,
        address: "ул. Парковая, 8",
        infrastructure: [
            { type: 'park', count: 4 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный квартал'",
        image: "https://placehold.co/600x400",
        individualIndex: 4,
        rating: 4.6,
        address: "ул. Детская, 25",
        infrastructure: [
            { type: 'kindergarten', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Речной порт'",
        image: "https://placehold.co/600x400",
        individualIndex: 5,
        rating: 4.4,
        address: "наб. Речная, 67",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Спортивный комплекс'",
        image: "https://placehold.co/600x400",
        individualIndex: 6,
        rating: 4.9,
        address: "ул. Спортивная, 12",
        infrastructure: [
            { type: 'school', count: 1 },
            { type: 'park', count: 2 }
        ]
    },
    {
        title: "ЖК 'Лесная поляна'",
        image: "https://placehold.co/600x400",
        individualIndex: 7,
        rating: 4.3,
        address: "ул. Лесная, 33",
        infrastructure: [
            { type: 'park', count: 5 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Центральный'",
        image: "https://placehold.co/600x400",
        individualIndex: 8,
        rating: 4.7,
        address: "пл. Центральная, 1",
        infrastructure: [
            { type: 'school', count: 3 },
            { type: 'kindergarten', count: 2 }
        ]
    },
    {
        title: "ЖК 'Резиденция'",
        image: "https://placehold.co/600x400",
        individualIndex: 9,
        rating: 4.8,
        address: "ул. Престижная, 88",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный дом'",
        image: "https://placehold.co/600x400",
        individualIndex: 10,
        rating: 4.5,
        address: "ул. Семейная, 55",
        infrastructure: [
            { type: 'kindergarten', count: 4 },
            { type: 'park', count: 3 }
        ]
    },
    {
        title: "ЖК 'Городские ворота'",
        image: "https://placehold.co/600x400",
        individualIndex: 11,
        rating: 4.6,
        address: "пр. Входной, 77",
        infrastructure: [
            { type: 'school', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Парковая зона'",
        image: "https://placehold.co/600x400",
        individualIndex: 12,
        rating: 4.4,
        address: "ул. Парковая, 99",
        infrastructure: [
            { type: 'park', count: 6 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Солнечный берег'",
        image: "https://placehold.co/600x400",
        individualIndex: 1,
        rating: 4.7,
        address: "ул. Набережная, 15",
        infrastructure: [
            { type: 'park', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Зеленые холмы'",
        image: "https://placehold.co/600x400",
        individualIndex: 2,
        rating: 4.5,
        address: "пр. Центральный, 42",
        infrastructure: [
            { type: 'kindergarten', count: 2 },
            { type: 'park', count: 1 }
        ]
    },
    {
        title: "ЖК 'Городской парк'",
        image: "https://placehold.co/600x400",
        individualIndex: 3,
        rating: 4.8,
        address: "ул. Парковая, 8",
        infrastructure: [
            { type: 'park', count: 4 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный квартал'",
        image: "https://placehold.co/600x400",
        individualIndex: 4,
        rating: 4.6,
        address: "ул. Детская, 25",
        infrastructure: [
            { type: 'kindergarten', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Речной порт'",
        image: "https://placehold.co/600x400",
        individualIndex: 5,
        rating: 4.4,
        address: "наб. Речная, 67",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Спортивный комплекс'",
        image: "https://placehold.co/600x400",
        individualIndex: 6,
        rating: 4.9,
        address: "ул. Спортивная, 12",
        infrastructure: [
            { type: 'school', count: 1 },
            { type: 'park', count: 2 }
        ]
    },
    {
        title: "ЖК 'Лесная поляна'",
        image: "https://placehold.co/600x400",
        individualIndex: 7,
        rating: 4.3,
        address: "ул. Лесная, 33",
        infrastructure: [
            { type: 'park', count: 5 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Центральный'",
        image: "https://placehold.co/600x400",
        individualIndex: 8,
        rating: 4.7,
        address: "пл. Центральная, 1",
        infrastructure: [
            { type: 'school', count: 3 },
            { type: 'kindergarten', count: 2 }
        ]
    },
    {
        title: "ЖК 'Резиденция'",
        image: "https://placehold.co/600x400",
        individualIndex: 9,
        rating: 4.8,
        address: "ул. Престижная, 88",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный дом'",
        image: "https://placehold.co/600x400",
        individualIndex: 10,
        rating: 4.5,
        address: "ул. Семейная, 55",
        infrastructure: [
            { type: 'kindergarten', count: 4 },
            { type: 'park', count: 3 }
        ]
    },
    {
        title: "ЖК 'Городские ворота'",
        image: "https://placehold.co/600x400",
        individualIndex: 11,
        rating: 4.6,
        address: "пр. Входной, 77",
        infrastructure: [
            { type: 'school', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Парковая зона'",
        image: "https://placehold.co/600x400",
        individualIndex: 12,
        rating: 4.4,
        address: "ул. Парковая, 99",
        infrastructure: [
            { type: 'park', count: 6 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Солнечный берег'",
        image: "https://placehold.co/600x400",
        individualIndex: 1,
        rating: 4.7,
        address: "ул. Набережная, 15",
        infrastructure: [
            { type: 'park', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Зеленые холмы'",
        image: "https://placehold.co/600x400",
        individualIndex: 2,
        rating: 4.5,
        address: "пр. Центральный, 42",
        infrastructure: [
            { type: 'kindergarten', count: 2 },
            { type: 'park', count: 1 }
        ]
    },
    {
        title: "ЖК 'Городской парк'",
        image: "https://placehold.co/600x400",
        individualIndex: 3,
        rating: 4.8,
        address: "ул. Парковая, 8",
        infrastructure: [
            { type: 'park', count: 4 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный квартал'",
        image: "https://placehold.co/600x400",
        individualIndex: 4,
        rating: 4.6,
        address: "ул. Детская, 25",
        infrastructure: [
            { type: 'kindergarten', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Речной порт'",
        image: "https://placehold.co/600x400",
        individualIndex: 5,
        rating: 4.4,
        address: "наб. Речная, 67",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Спортивный комплекс'",
        image: "https://placehold.co/600x400",
        individualIndex: 6,
        rating: 4.9,
        address: "ул. Спортивная, 12",
        infrastructure: [
            { type: 'school', count: 1 },
            { type: 'park', count: 2 }
        ]
    },
    {
        title: "ЖК 'Лесная поляна'",
        image: "https://placehold.co/600x400",
        individualIndex: 7,
        rating: 4.3,
        address: "ул. Лесная, 33",
        infrastructure: [
            { type: 'park', count: 5 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Центральный'",
        image: "https://placehold.co/600x400",
        individualIndex: 8,
        rating: 4.7,
        address: "пл. Центральная, 1",
        infrastructure: [
            { type: 'school', count: 3 },
            { type: 'kindergarten', count: 2 }
        ]
    },
    {
        title: "ЖК 'Резиденция'",
        image: "https://placehold.co/600x400",
        individualIndex: 9,
        rating: 4.8,
        address: "ул. Престижная, 88",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный дом'",
        image: "https://placehold.co/600x400",
        individualIndex: 10,
        rating: 4.5,
        address: "ул. Семейная, 55",
        infrastructure: [
            { type: 'kindergarten', count: 4 },
            { type: 'park', count: 3 }
        ]
    },
    {
        title: "ЖК 'Городские ворота'",
        image: "https://placehold.co/600x400",
        individualIndex: 11,
        rating: 4.6,
        address: "пр. Входной, 77",
        infrastructure: [
            { type: 'school', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Парковая зона'",
        image: "https://placehold.co/600x400",
        individualIndex: 12,
        rating: 4.4,
        address: "ул. Парковая, 99",
        infrastructure: [
            { type: 'park', count: 6 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Солнечный берег'",
        image: "https://placehold.co/600x400",
        individualIndex: 1,
        rating: 4.7,
        address: "ул. Набережная, 15",
        infrastructure: [
            { type: 'park', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Зеленые холмы'",
        image: "https://placehold.co/600x400",
        individualIndex: 2,
        rating: 4.5,
        address: "пр. Центральный, 42",
        infrastructure: [
            { type: 'kindergarten', count: 2 },
            { type: 'park', count: 1 }
        ]
    },
    {
        title: "ЖК 'Городской парк'",
        image: "https://placehold.co/600x400",
        individualIndex: 3,
        rating: 4.8,
        address: "ул. Парковая, 8",
        infrastructure: [
            { type: 'park', count: 4 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный квартал'",
        image: "https://placehold.co/600x400",
        individualIndex: 4,
        rating: 4.6,
        address: "ул. Детская, 25",
        infrastructure: [
            { type: 'kindergarten', count: 3 },
            { type: 'school', count: 2 }
        ]
    },
    {
        title: "ЖК 'Речной порт'",
        image: "https://placehold.co/600x400",
        individualIndex: 5,
        rating: 4.4,
        address: "наб. Речная, 67",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Спортивный комплекс'",
        image: "https://placehold.co/600x400",
        individualIndex: 6,
        rating: 4.9,
        address: "ул. Спортивная, 12",
        infrastructure: [
            { type: 'school', count: 1 },
            { type: 'park', count: 2 }
        ]
    },
    {
        title: "ЖК 'Лесная поляна'",
        image: "https://placehold.co/600x400",
        individualIndex: 7,
        rating: 4.3,
        address: "ул. Лесная, 33",
        infrastructure: [
            { type: 'park', count: 5 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Центральный'",
        image: "https://placehold.co/600x400",
        individualIndex: 8,
        rating: 4.7,
        address: "пл. Центральная, 1",
        infrastructure: [
            { type: 'school', count: 3 },
            { type: 'kindergarten', count: 2 }
        ]
    },
    {
        title: "ЖК 'Резиденция'",
        image: "https://placehold.co/600x400",
        individualIndex: 9,
        rating: 4.8,
        address: "ул. Престижная, 88",
        infrastructure: [
            { type: 'park', count: 2 },
            { type: 'school', count: 1 }
        ]
    },
    {
        title: "ЖК 'Семейный дом'",
        image: "https://placehold.co/600x400",
        individualIndex: 10,
        rating: 4.5,
        address: "ул. Семейная, 55",
        infrastructure: [
            { type: 'kindergarten', count: 4 },
            { type: 'park', count: 3 }
        ]
    },
    {
        title: "ЖК 'Городские ворота'",
        image: "https://placehold.co/600x400",
        individualIndex: 11,
        rating: 4.6,
        address: "пр. Входной, 77",
        infrastructure: [
            { type: 'school', count: 2 },
            { type: 'kindergarten', count: 1 }
        ]
    },
    {
        title: "ЖК 'Парковая зона'",
        image: "https://placehold.co/600x400",
        individualIndex: 12,
        rating: 4.4,
        address: "ул. Парковая, 99",
        infrastructure: [
            { type: 'park', count: 6 },
            { type: 'school', count: 1 }
        ]
    }
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
                return <Map />;
            case 'catalog':
            default:
                return <CatalogBlock cards={mockCards} maxColumnCount={3} itemsPerPage={6} />;
        }
    };

    return (
        <div>
            <Filter onFilterChange={handleFilterChange} />
            <div style={{ marginLeft: '300px' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default HomePage;