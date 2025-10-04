export interface CardProps {
    title: string;
    image: string;
    individualIndex: number;
    rating: number;
    location: string;
    infrastructure: BadgeProps[];
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
