export interface Cervejaria {
    abv: number;
    ibu: number;
    name: string;
    description: string;
    category: string;
    country: string;
    city: string;
    address: string;
    coordinates: [
        number,
        number
        ],
    state: string;
    website: string;
}