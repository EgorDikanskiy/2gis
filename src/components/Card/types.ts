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
};

export type BadgeType = typeof BadgeType[keyof typeof BadgeType];