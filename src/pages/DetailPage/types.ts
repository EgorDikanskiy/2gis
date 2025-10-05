export interface DetailObject {
  id: number;
  title: string;
  image: string;
  individualIndex: number;
  rating: number;
  ratingCount: number;
  address: string;
  infrastructure: {
    type: string;
    count: number;
    objects: {
      id: number
      title: string;
      rating: string;
      ratingCount: number;
      coordinates: {
        lat: number;
        lon: number;
      };
      info: {
        time: string;
        distance: string;
      };
    }[];
  }[];
  coordinates: {
    lat: number;
    lon: number;
  };
}