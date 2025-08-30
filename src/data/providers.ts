export type Provider = {
  id: number;
  name: string;
  role: string;
  city: string;
  price: number;
  rating: number;
  tags: string[];
  image: string;
};

export const PROVIDERS: Provider[] = [
  {
    id: 1,
    name: "Batucada Casa",
    role: "فرقة إيقاع شارع (باتوكادا)",
    city: "الدار البيضاء",
    price: 3500,
    rating: 4.8,
    tags: ["إيقاع", "عرض حي"],
    image: "https://www.hespress.com/files/2018/06/mawzine_Groupe_Soleil_Farkat_Ashems4_315739424.jpg",
  },
  {
    id: 2,
    name: "Noor Light Design",
    role: "مصمم إضاءة مسرح",
    city: "الرباط",
    price: 2200,
    rating: 4.6,
    tags: ["إضاءة", "DMX"],
    image: "https://www.ledyilighting.com/wp-content/uploads/2024/06/Stage-Lighting-11.jpg",
  },
  {
    id: 3,
    name: "SawtPro FOH",
    role: "مهندس صوت مباشر",
    city: "مراكش",
    price: 2700,
    rating: 4.7,
    tags: ["صوت", "Mix"],
    image: "https://ampedstudio.com/wp-content/uploads/2021/12/sound-engineering.jpg",
  }, {
    id: 4,
    name: "SawtPro FOH",
    role: "مهندس صوت مباشر",
    city: "مراكش",
    price: 2700,
    rating: 4.7,
    tags: ["صوت", "Mix"],
    image: "https://ampedstudio.com/wp-content/uploads/2021/12/sound-engineering.jpg",
  }, {
    id: 5,
    name: "SawtPro FOH",
    role: "مهندس صوت مباشر",
    city: "مراكش",
    price: 2700,
    rating: 4.7,
    tags: ["صوت", "Mix"],
    image: "https://ampedstudio.com/wp-content/uploads/2021/12/sound-engineering.jpg",
  }, {
    id: 6,
    name: "SawtPro FOH",
    role: "مهندس صوت مباشر",
    city: "مراكش",
    price: 2700,
    rating: 4.7,
    tags: ["صوت", "Mix"],
    image: "https://ampedstudio.com/wp-content/uploads/2021/12/sound-engineering.jpg",
  },
];
