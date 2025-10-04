export interface CardProps {
    title: string;
    image: string;
    individualIndex: number;
    rating: number;
    address: string;
    infrastructure: BadgeProps[];
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
