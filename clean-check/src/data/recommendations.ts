export interface Recommendation {
    id: string;
    name: string;
    brand: string;
    image: string;
    score: number;
    link: string;
    price: string;
}

export const safeRecommendations: Recommendation[] = [
    {
        id: "rec_in_1",
        name: "Amla & Bhringraj Hair Cleanser",
        brand: "Khadi Natural",
        image: "https://m.media-amazon.com/images/I/51PLqSlC+AL._SL1100_.jpg", // Placeholder or generic bottle image
        score: 96,
        link: "https://www.amazon.in/s?k=khadi+natural+amla+bhringraj+shampoo",
        price: "₹349"
    },
    {
        id: "rec_in_2",
        name: "Bhringraj & Shikakai Hair Cleanser",
        brand: "Forest Essentials",
        image: "https://m.media-amazon.com/images/I/61i-sK-u7ZL._SL1100_.jpg",
        score: 98,
        link: "https://www.amazon.in/s?k=forest+essentials+hair+cleanser",
        price: "₹1,575"
    },
    {
        id: "rec_in_3",
        name: "Bringha Shampoo (Proprietary Medicine)",
        brand: "Indulekha",
        image: "https://m.media-amazon.com/images/I/61C2C-zLdSL._SL1500_.jpg",
        score: 94,
        link: "https://www.amazon.in/s?k=indulekha+bringha+shampoo",
        price: "₹234"
    }
];
