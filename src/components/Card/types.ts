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
    school: 'school',
    kindergarten: 'kindergarten',
    park: 'park',
};

export type BadgeType = typeof BadgeType[keyof typeof BadgeType];
