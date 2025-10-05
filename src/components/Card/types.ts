export interface CardProps {
    id: number;
    title: string;
    image: string;
    individualIndex: number;
    rating: number;
    ratingCount: number
    address: string;
    infrastructure: BadgeProps[];
    coordinates: {
        lat: number
        lon: number
    }
}

export interface BadgeProps {
    type: BadgeType;
    count: number;
}

export const BadgeType = {
    school: 'Школ',
    kindergarten: 'Дет. садов',
    park: 'Парков',
    pickup_point: 'Пунктов выдачи',
    pharmacy: 'Аптек',
    shopping_mall: 'ТЦ',
    grocery_store: 'Магазинов',
    metro: 'Метро',
    clinic: 'Клиник',
    parking: 'Парковок',
};

export type BadgeType = typeof BadgeType[keyof typeof BadgeType];