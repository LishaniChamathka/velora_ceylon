import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InquireSection from "../HomePage/inquire-section";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  Clock,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Plus,
  Minus,
  Globe,
  Utensils,
  Wifi,
  Car,
  Camera,
  Mountain,
  Waves,
  Shield,
} from "lucide-react";
import Footer from "../Layout/footer";

/* ─────────────────────────── Types ─────────────────────────── */
interface Highlight {
  icon: string;
  title: string;
  desc: string;
}

interface AgendaDay {
  day: number;
  location: string;
  title: string;
  subtitle: string;
  image?: string;
}

interface InclusionItem {
  text: string;
}

interface TourData {
  id: number;
  title: string;
  days: number;
  price: string;
  priceRaw: number;
  rating: number;
  reviews: number;
  heroImage: string;
  galleryImages: string[];
  description: string;
  highlights: Highlight[];
  tourDates: { start: string; end: string };
  tourType: string;
  route: string[];
  agenda: AgendaDay[];
  included: InclusionItem[];
  notIncluded: InclusionItem[];
  relatedTours: number[];
}

/* ─────────────────────────── Icon map ─────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  mountain: <Mountain size={18} />,
  waves: <Waves size={18} />,
  camera: <Camera size={18} />,
  utensils: <Utensils size={18} />,
  wifi: <Wifi size={18} />,
  car: <Car size={18} />,
  shield: <Shield size={18} />,
  globe: <Globe size={18} />,
};

const INCLUSION_ICONS: Record<string, React.ReactNode> = {
  Accommodation: <Shield size={15} />,
  transportation: <Car size={15} />,
  meals: <Utensils size={15} />,
  Entrance: <Camera size={15} />,
  guide: <Globe size={15} />,
  safari: <Mountain size={15} />,
  watching: <Waves size={15} />,
  taxes: <Shield size={15} />,
  flights: <Globe size={15} />,
  Personal: <Shield size={15} />,
  Optional: <Star size={15} />,
  insurance: <Shield size={15} />,
  Tips: <Utensils size={15} />,
};

/* ─────────────────────────── All Tour Data ─────────────────────────── */
const ALL_TOURS: TourData[] = [
  {
    id: 1,
    title: "A Historical Journey",
    days: 6,
    price: "$845 P/P",
    priceRaw: 845,
    rating: 5,
    reviews: 126,
    heroImage: "/homepage/tour1.jpg",
    galleryImages: [
      "/tourspage/tour2.jpg",
      "/tourspage/tour3.jpg",
      "/tourspage/tour4.jpg",
    ],

    description:
      "Discover the timeless wonders of Sri Lanka's Cultural Triangle on a carefully curated six-day journey through ancient kingdoms, sacred temples, UNESCO World Heritage Sites, and vibrant cultural cities. Explore Anuradhapura, Sigiriya, Dambulla, Polonnaruwa, Kandy, and Colombo while experiencing the island's remarkable history, spirituality, and architectural brilliance.",

    highlights: [
      {
        icon: "mountain",
        title: "Sigiriya Rock Fortress",
        desc: "Climb Sri Lanka's most iconic UNESCO World Heritage Site and admire breathtaking panoramic views.",
      },
      {
        icon: "globe",
        title: "Ancient Kingdoms",
        desc: "Explore the historic capitals of Anuradhapura and Polonnaruwa, home to centuries of royal heritage.",
      },
      {
        icon: "shield",
        title: "Sacred Temples",
        desc: "Visit Dambulla Cave Temple and the revered Temple of the Sacred Tooth Relic in Kandy.",
      },
      {
        icon: "camera",
        title: "Cultural Experiences",
        desc: "Discover Sri Lanka's rich traditions, colonial landmarks, and local lifestyles throughout the journey.",
      },
    ],

    tourDates: {
      start: "January 12th",
      end: "17th, 2027",
    },

    tourType: "Private Chauffeur Guided Tour",

    route: [
      "Negombo",
      "Kandy",
      "Dambulla",
      "Sigiriya",
      "Polonnaruwa",
      "Colombo",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival in Sri Lanka",
        subtitle: "Airport welcome and leisure stay in Negombo",
        image: "/homepage/tour1.jpg",
      },
      {
        day: 2,
        location: "KANDY",
        title: "Sacred City of Kandy",
        subtitle: "Temple of the Sacred Tooth Relic and city exploration",
      },
      {
        day: 3,
        location: "DAMBULLA",
        title: "Dambulla & Sigiriya",
        subtitle: "Royal Cave Temple and Sigiriya Rock Fortress",
      },
      {
        day: 4,
        location: "POLONNARUWA",
        title: "Ancient Kingdom Exploration",
        subtitle:
          "Discover Polonnaruwa's royal ruins before returning to Sigiriya",
      },
      {
        day: 5,
        location: "COLOMBO",
        title: "Capital City Experience",
        subtitle: "Visit the Red Mosque, enjoy a city tour and shopping",
      },
      {
        day: 6,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Transfer to Bandaranaike International Airport",
      },
    ],

    included: [
      {
        text: "Accommodation in carefully selected hotels",
      },
      {
        text: "Private air-conditioned transportation",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Entrance tickets to all listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
      {
        text: "Airport pickup and departure transfers",
      },
    ],

    notIncluded: [
      {
        text: "International flights",
      },
      {
        text: "Visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Alcoholic beverages",
      },
      {
        text: "Meals and beverages not mentioned",
      },
      {
        text: "Early check-in & late check-out charges",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Tips for chauffeur guide and staff",
      },
    ],

    relatedTours: [2, 3, 5],
  },
  {
    id: 2,
    title: "Southern Sands Voyage",
    days: 10,
    price: "$1,395 P/P",
    priceRaw: 1395,
    rating: 5,
    reviews: 148,

    heroImage: "/Beach-04.jpg",

    galleryImages: [
      "/tourspage/tour3.jpg",
      "/tourspage/tour6.jpg",
      "/tourspage/tour7.jpg",
    ],

    description:
      "Discover the breathtaking southern coastline of Sri Lanka on this relaxing beach holiday. From the vibrant fishing town of Negombo to the golden shores of Tangalle, Mirissa, Galle, Hikkaduwa and Bentota, this unforgettable journey combines marine adventures, wildlife encounters, colonial heritage and luxurious coastal relaxation.",

    highlights: [
      {
        icon: "waves",
        title: "Sri Lanka's Best Beaches",
        desc: "Relax on some of the island's most beautiful beaches including Tangalle, Mirissa, Bentota and Hikkaduwa.",
      },
      {
        icon: "camera",
        title: "Whale & Dolphin Watching",
        desc: "Experience an unforgettable early morning whale and dolphin watching excursion off Mirissa.",
      },
      {
        icon: "globe",
        title: "Historic Galle Fort",
        desc: "Walk through the UNESCO-listed Dutch Fort while exploring colonial architecture and charming streets.",
      },
      {
        icon: "mountain",
        title: "Marine Adventures",
        desc: "Enjoy snorkeling, scuba diving, kayaking and glass-bottom boat rides across Sri Lanka's southern coast.",
      },
    ],

    tourDates: {
      start: "February 6th",
      end: "15th, 2027",
    },

    tourType: "Private Beach Holiday",

    route: [
      "Negombo",
      "Tangalle",
      "Mirissa",
      "Galle",
      "Hikkaduwa",
      "Bentota",
      "Airport",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival in Sri Lanka",
        subtitle: "Airport pickup, Negombo beach and lagoon experience",
        image: "/tourspage/tour2.jpg",
      },
      {
        day: 2,
        location: "TANGALLE",
        title: "Journey to Tangalle",
        subtitle: "Visit Hummanaya Blow Hole and Mulgirigala Temple",
      },
      {
        day: 3,
        location: "TANGALLE",
        title: "Southern Coastal Adventure",
        subtitle: "Bird Sanctuary visit, snorkeling and scuba diving",
      },
      {
        day: 4,
        location: "MIRISSA",
        title: "Mirissa Beach Escape",
        subtitle: "Visit Coconut Tree Hill and Dondra Head",
      },
      {
        day: 5,
        location: "MIRISSA",
        title: "Whale Watching Experience",
        subtitle: "Early morning whale & dolphin watching followed by surfing",
      },
      {
        day: 6,
        location: "GALLE",
        title: "Historic Galle",
        subtitle: "Visit Jungle Beach and explore the Dutch Fort",
      },
      {
        day: 7,
        location: "HIKKADUWA",
        title: "Marine Discovery",
        subtitle: "Coral reef snorkeling and glass-bottom boat ride",
      },
      {
        day: 8,
        location: "HIKKADUWA",
        title: "Mangrove Adventure",
        subtitle: "Kayaking through the lagoon and leisure by the beach",
      },
      {
        day: 9,
        location: "BENTOTA",
        title: "Bentota Leisure",
        subtitle: "Visit Kosgoda Turtle Hatchery and relax on Bentota Beach",
      },
      {
        day: 10,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Airport transfer for your onward flight",
      },
    ],

    included: [
      {
        text: "Accommodation in carefully selected beach hotels & resorts",
      },
      {
        text: "Private air-conditioned transportation",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Entrance tickets to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
      {
        text: "Airport arrival & departure transfers",
      },
    ],

    notIncluded: [
      {
        text: "International airfare",
      },
      {
        text: "Visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Alcoholic beverages",
      },
      {
        text: "Meals and drinks not specified",
      },
      {
        text: "Optional water sports activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Tips for chauffeur guide and hotel staff",
      },
    ],

    relatedTours: [1, 3, 8],
  },
  {
    id: 3,
    title: "Wildlife, Culture & Beach Adventure",
    days: 14,
    price: "$2,095 P/P",
    priceRaw: 2095,
    rating: 5,
    reviews: 214,

    heroImage: "/homepage/tour2.jpg",

    galleryImages: [
      "/tourspage/tour4.jpg",
      "/tourspage/tour5.jpg",
      "/tourspage/tour8.jpg",
      "/tourspage/tour9.jpg",
    ],

    description:
      "Experience the very best of Sri Lanka on this carefully crafted fourteen-day journey combining ancient heritage, breathtaking wildlife, misty hill country, scenic train rides and relaxing tropical beaches. Explore UNESCO World Heritage Sites, encounter elephants and leopards in their natural habitat, enjoy authentic Sri Lankan culture and unwind along the island's stunning southern coastline.",

    highlights: [
      {
        icon: "mountain",
        title: "Sigiriya Rock Fortress",
        desc: "Climb Sri Lanka's legendary rock fortress and admire spectacular panoramic views.",
      },
      {
        icon: "shield",
        title: "National Park Safaris",
        desc: "Experience exciting jeep safaris in Yala and Udawalawe National Parks.",
      },
      {
        icon: "globe",
        title: "Scenic Hill Country",
        desc: "Discover tea plantations, waterfalls and breathtaking mountain landscapes in Nuwara Eliya and Ella.",
      },
      {
        icon: "waves",
        title: "Southern Beach Escape",
        desc: "Relax on Sri Lanka's beautiful southern beaches while enjoying whale watching and coastal adventures.",
      },
    ],

    tourDates: {
      start: "March 8th",
      end: "21st, 2027",
    },

    tourType: "Private Grand Tour",

    route: [
      "Negombo",
      "Sigiriya",
      "Polonnaruwa",
      "Kandy",
      "Nuwara Eliya",
      "Ella",
      "Yala",
      "Mirissa",
      "Galle",
      "Bentota",
      "Colombo",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival in Sri Lanka",
        subtitle: "Airport welcome and overnight stay in Negombo.",
        image: "/tourspage/tour3.jpg",
      },
      {
        day: 2,
        location: "SIGIRIYA",
        title: "Journey to the Cultural Triangle",
        subtitle: "Visit Dambulla Cave Temple before checking into Sigiriya.",
      },
      {
        day: 3,
        location: "SIGIRIYA",
        title: "Sigiriya Rock Fortress",
        subtitle:
          "Explore the iconic UNESCO World Heritage Site and village surroundings.",
      },
      {
        day: 4,
        location: "POLONNARUWA",
        title: "Ancient Kingdom",
        subtitle:
          "Discover the magnificent ruins of Polonnaruwa and Minneriya National Park.",
      },
      {
        day: 5,
        location: "KANDY",
        title: "Sacred City of Kandy",
        subtitle:
          "Temple of the Tooth, Botanical Gardens and cultural performances.",
      },
      {
        day: 6,
        location: "NUWARA ELIYA",
        title: "Tea Country",
        subtitle: "Visit tea plantations, waterfalls and colonial landmarks.",
      },
      {
        day: 7,
        location: "ELLA",
        title: "Scenic Train Journey",
        subtitle:
          "Travel through Sri Lanka's most picturesque railway route to Ella.",
      },
      {
        day: 8,
        location: "ELLA",
        title: "Hill Country Adventure",
        subtitle: "Nine Arches Bridge, Little Adam's Peak and Ravana Falls.",
      },
      {
        day: 9,
        location: "YALA",
        title: "Wildlife Safari",
        subtitle: "Afternoon jeep safari in Yala National Park.",
      },
      {
        day: 10,
        location: "MIRISSA",
        title: "Beach Relaxation",
        subtitle:
          "Travel to Mirissa and enjoy the beautiful southern coastline.",
      },
      {
        day: 11,
        location: "MIRISSA",
        title: "Whale Watching",
        subtitle: "Early morning whale and dolphin watching excursion.",
      },
      {
        day: 12,
        location: "GALLE",
        title: "Historic Galle",
        subtitle: "Explore Galle Dutch Fort and nearby coastal attractions.",
      },
      {
        day: 13,
        location: "BENTOTA",
        title: "Leisure by the Beach",
        subtitle: "Visit Kosgoda Turtle Hatchery and enjoy Bentota Beach.",
      },
      {
        day: 14,
        location: "COLOMBO / AIRPORT",
        title: "Departure",
        subtitle: "Colombo city tour before airport transfer.",
      },
    ],

    included: [
      {
        text: "13 nights accommodation in quality hotels & resorts",
      },
      {
        text: "Daily breakfast throughout the tour",
      },
      {
        text: "Private air-conditioned vehicle",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport pickup and departure transfers",
      },
      {
        text: "Government taxes and service charges",
      },
      {
        text: "Entrance tickets to major attractions",
      },
      {
        text: "Yala National Park Jeep Safari",
      },
    ],

    notIncluded: [
      {
        text: "International airfare",
      },
      {
        text: "Sri Lanka visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches and dinners unless specified",
      },
      {
        text: "Optional activities and excursions",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Laundry and telephone charges",
      },
      {
        text: "Tips and gratuities",
      },
    ],

    relatedTours: [1, 2, 4],
  },
  {
    id: 4,
    title: "Sri Lanka Wildlife Tours",
    days: 10,
    price: "$1,695 P/P",
    priceRaw: 1695,
    rating: 5,
    reviews: 173,

    heroImage: "/Wildlife-01.avif",

    galleryImages: [
      "/tourspage/tour5.jpg",
      "/tourspage/tour6.jpg",
      "/tourspage/tour7.jpg",
      "/tourspage/tour8.jpg",
    ],

    description:
      "Embark on an unforgettable wildlife adventure across Sri Lanka's most spectacular national parks and nature reserves. Witness majestic elephants, elusive leopards, sloth bears, crocodiles, colorful birdlife and breathtaking landscapes while experiencing the island's rich biodiversity together with cultural heritage and scenic countryside.",

    highlights: [
      {
        icon: "shield",
        title: "Yala National Park Safari",
        desc: "Search for Sri Lankan leopards, elephants, crocodiles and countless bird species.",
      },
      {
        icon: "mountain",
        title: "Udawalawe National Park",
        desc: "Observe large elephant herds roaming freely in their natural habitat.",
      },
      {
        icon: "camera",
        title: "Minneriya Elephant Gathering",
        desc: "Witness one of Asia's largest gatherings of wild elephants during the season.",
      },
      {
        icon: "globe",
        title: "Nature & Culture",
        desc: "Combine wildlife experiences with ancient cities, temples and scenic landscapes.",
      },
    ],

    tourDates: {
      start: "April 5th",
      end: "14th, 2027",
    },

    tourType: "Private Wildlife Expedition",

    route: [
      "Negombo",
      "Wilpattu",
      "Sigiriya",
      "Minneriya",
      "Kandy",
      "Ella",
      "Udawalawe",
      "Yala",
      "Galle",
      "Colombo",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival",
        subtitle: "Meet your guide and relax after your international flight.",
        image: "/tourspage/tour4.jpg",
      },
      {
        day: 2,
        location: "WILPATTU",
        title: "Wilpattu National Park",
        subtitle: "Afternoon jeep safari in Sri Lanka's largest national park.",
      },
      {
        day: 3,
        location: "SIGIRIYA",
        title: "Journey to Sigiriya",
        subtitle:
          "Visit Dambulla Cave Temple and enjoy an evening village experience.",
      },
      {
        day: 4,
        location: "MINNERIYA",
        title: "Elephant Safari",
        subtitle:
          "Morning climb to Sigiriya followed by Minneriya National Park safari.",
      },
      {
        day: 5,
        location: "KANDY",
        title: "Sacred City",
        subtitle: "Temple of the Tooth and Royal Botanical Gardens.",
      },
      {
        day: 6,
        location: "ELLA",
        title: "Hill Country",
        subtitle:
          "Tea plantations, waterfalls and the famous scenic train experience.",
      },
      {
        day: 7,
        location: "UDAWALAWE",
        title: "Elephant Country",
        subtitle: "Udawalawe Jeep Safari and Elephant Transit Home visit.",
      },
      {
        day: 8,
        location: "YALA",
        title: "Leopard Safari",
        subtitle:
          "Explore Sri Lanka's premier wildlife reserve in search of leopards.",
      },
      {
        day: 9,
        location: "GALLE",
        title: "Southern Coast",
        subtitle: "Relax by the beach before visiting Galle Dutch Fort.",
      },
      {
        day: 10,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Transfer to Bandaranaike International Airport.",
      },
    ],

    included: [
      {
        text: "9 nights accommodation in carefully selected hotels",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private air-conditioned vehicle",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport transfers",
      },
      {
        text: "Jeep safaris in Wilpattu, Minneriya, Udawalawe and Yala",
      },
      {
        text: "Entrance fees to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
    ],

    notIncluded: [
      {
        text: "International flights",
      },
      {
        text: "Sri Lanka visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches and dinners",
      },
      {
        text: "Optional excursions",
      },
      {
        text: "Camera or video permit fees where applicable",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Tips and gratuities",
      },
    ],

    relatedTours: [3, 5, 6],
  },
  {
    id: 5,
    title: "Scenic Beauty of Sri Lanka",
    days: 10,
    price: "$1,545 P/P",
    priceRaw: 1545,
    rating: 5,
    reviews: 162,

    heroImage: "/Culture-04-scaled.jpg",

    galleryImages: [
      "/tourspage/tour6.jpg",
      "/tourspage/tour7.jpg",
      "/tourspage/tour8.jpg",
      "/tourspage/tour9.jpg",
    ],

    description:
      "Discover the breathtaking natural beauty of Sri Lanka on this unforgettable ten-day journey through misty mountains, cascading waterfalls, lush tea plantations, picturesque train routes and tranquil lakes. From the cool climate of Nuwara Eliya to the stunning viewpoints of Ella and the golden beaches of the south coast, this tour offers the perfect balance of nature, adventure and relaxation.",

    highlights: [
      {
        icon: "mountain",
        title: "Sri Lanka Hill Country",
        desc: "Explore breathtaking mountain landscapes, tea estates and cool-climate towns.",
      },
      {
        icon: "camera",
        title: "Scenic Train Journey",
        desc: "Experience one of the world's most beautiful railway journeys between Nanu Oya and Ella.",
      },
      {
        icon: "globe",
        title: "Tea Plantation Experience",
        desc: "Visit world-famous Ceylon tea factories and plantations while learning the tea-making process.",
      },
      {
        icon: "waves",
        title: "Southern Coast Escape",
        desc: "Relax along Sri Lanka's stunning southern beaches before returning to Colombo.",
      },
    ],

    tourDates: {
      start: "May 10th",
      end: "19th, 2027",
    },

    tourType: "Private Scenic Tour",

    route: [
      "Negombo",
      "Kandy",
      "Nuwara Eliya",
      "Ella",
      "Udawalawe",
      "Mirissa",
      "Bentota",
      "Colombo",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival in Sri Lanka",
        subtitle: "Airport pickup and overnight stay in Negombo.",
        image: "/tourspage/tour5.jpg",
      },
      {
        day: 2,
        location: "KANDY",
        title: "Journey to Kandy",
        subtitle:
          "Visit Pinnawala Elephant Orphanage and Temple of the Sacred Tooth Relic.",
      },
      {
        day: 3,
        location: "NUWARA ELIYA",
        title: "Tea Country",
        subtitle: "Explore Ramboda Falls, tea plantations and Gregory Lake.",
      },
      {
        day: 4,
        location: "ELLA",
        title: "Scenic Train Experience",
        subtitle:
          "Travel through spectacular mountain scenery before visiting Nine Arches Bridge.",
      },
      {
        day: 5,
        location: "ELLA",
        title: "Ella Adventure",
        subtitle:
          "Little Adam's Peak, Ravana Falls and surrounding viewpoints.",
      },
      {
        day: 6,
        location: "UDAWALAWE",
        title: "Wildlife Experience",
        subtitle: "Morning safari and visit to the Elephant Transit Home.",
      },
      {
        day: 7,
        location: "MIRISSA",
        title: "Southern Beaches",
        subtitle: "Relax on Mirissa Beach and enjoy optional whale watching.",
      },
      {
        day: 8,
        location: "BENTOTA",
        title: "Coastal Leisure",
        subtitle: "Bentota Beach, Madu River Boat Safari and Turtle Hatchery.",
      },
      {
        day: 9,
        location: "COLOMBO",
        title: "Capital Exploration",
        subtitle: "City tour, shopping and colonial landmarks.",
      },
      {
        day: 10,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Transfer to Bandaranaike International Airport.",
      },
    ],

    included: [
      {
        text: "9 nights accommodation in premium hotels",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private luxury air-conditioned vehicle",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport arrival & departure transfers",
      },
      {
        text: "Scenic train tickets (subject to availability)",
      },
      {
        text: "Entrance tickets to major attractions",
      },
      {
        text: "Government taxes & service charges",
      },
    ],

    notIncluded: [
      {
        text: "International airfare",
      },
      {
        text: "Sri Lanka tourist visa",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches & dinners",
      },
      {
        text: "Optional adventure activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Tips & gratuities",
      },
      {
        text: "Alcoholic beverages",
      },
    ],

    relatedTours: [3, 4, 6],
  },
  {
    id: 6,
    title: "A Quick Escape to the Hills",
    days: 5,
    price: "$895 P/P",
    priceRaw: 895,
    rating: 5,
    reviews: 94,

    heroImage: "/Ella-1.jpg",

    galleryImages: [
      "/tourspage/tour5.jpg",
      "/tourspage/tour7.jpg",
      "/tourspage/tour8.jpg",
      "/tourspage/tour9.jpg",
    ],

    description:
      "Escape to Sri Lanka's breathtaking hill country on this relaxing five-day getaway. Discover the cultural charm of Kandy, the lush tea plantations of Nuwara Eliya and the spectacular scenery of Ella while travelling through misty mountains, waterfalls and picturesque railway routes.",

    highlights: [
      {
        icon: "mountain",
        title: "Beautiful Hill Country",
        desc: "Experience cool weather, scenic mountains and lush tea plantations.",
      },
      {
        icon: "camera",
        title: "World Famous Train Ride",
        desc: "Travel through breathtaking landscapes on Sri Lanka's iconic hill country railway.",
      },
      {
        icon: "globe",
        title: "Tea Factory Visit",
        desc: "Learn how world-famous Ceylon Tea is produced while tasting fresh premium tea.",
      },
      {
        icon: "shield",
        title: "Cultural Heritage",
        desc: "Visit the Temple of the Sacred Tooth Relic and explore the historic city of Kandy.",
      },
    ],

    tourDates: {
      start: "June 12th",
      end: "16th, 2027",
    },

    tourType: "Private Hill Country Tour",

    route: ["Negombo", "Kandy", "Nuwara Eliya", "Ella", "Airport"],

    agenda: [
      {
        day: 1,
        location: "KANDY",
        title: "Journey to Kandy",
        subtitle:
          "Visit Pinnawala Elephant Orphanage before exploring Kandy and the Temple of the Sacred Tooth Relic.",
        image: "/tourspage/tour6.jpg",
      },
      {
        day: 2,
        location: "NUWARA ELIYA",
        title: "Tea Country",
        subtitle:
          "Visit Ramboda Falls, a working tea factory, Gregory Lake and Hakgala Botanical Garden.",
      },
      {
        day: 3,
        location: "ELLA",
        title: "Scenic Railway Adventure",
        subtitle:
          "Enjoy the spectacular train journey to Ella and visit Nine Arches Bridge and Little Adam's Peak.",
      },
      {
        day: 4,
        location: "ELLA",
        title: "Explore Ella",
        subtitle:
          "Visit Ravana Falls, Ella Gap viewpoint and spend a relaxing evening in the town.",
      },
      {
        day: 5,
        location: "AIRPORT",
        title: "Departure",
        subtitle:
          "Travel back to Colombo with optional city sightseeing before airport transfer.",
      },
    ],

    included: [
      {
        text: "4 nights accommodation in carefully selected hotels",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private air-conditioned vehicle",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport pickup & departure transfers",
      },
      {
        text: "Scenic train ticket (subject to availability)",
      },
      {
        text: "Entrance fees to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
    ],

    notIncluded: [
      {
        text: "International flights",
      },
      {
        text: "Sri Lanka visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches & dinners",
      },
      {
        text: "Optional adventure activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Laundry & telephone charges",
      },
      {
        text: "Tips for guides and drivers",
      },
    ],

    relatedTours: [5, 3, 7],
  },
  {
    id: 7,
    title: "Sunrise Shores Tour",
    days: 7,
    price: "$1,145 P/P",
    priceRaw: 1145,
    rating: 5,
    reviews: 118,

    heroImage: "/Bentota-2-scaled.avif",

    galleryImages: [
      "/tourspage/tour8.jpg",
      "/tourspage/tour9.jpg",
      "/tourspage/tour3.jpg",
    ],

    description:
      "Escape to Sri Lanka's spectacular eastern coastline where pristine beaches, crystal-clear waters and unforgettable marine experiences await. Discover the relaxed atmosphere of Trincomalee and Nilaveli while exploring historic temples, enjoying whale watching, snorkeling at Pigeon Island National Park and relaxing on some of the island's most beautiful beaches.",

    highlights: [
      {
        icon: "waves",
        title: "Nilaveli Beach",
        desc: "Relax on one of Sri Lanka's most beautiful white sandy beaches with crystal-clear waters.",
      },
      {
        icon: "camera",
        title: "Pigeon Island Marine Park",
        desc: "Snorkel among colorful coral reefs, tropical fish and sea turtles.",
      },
      {
        icon: "globe",
        title: "Trincomalee Heritage",
        desc: "Visit the sacred Koneswaram Temple and the famous Lover's Leap viewpoint.",
      },
      {
        icon: "mountain",
        title: "Whale Watching",
        desc: "Enjoy seasonal whale and dolphin watching in the Indian Ocean.",
      },
    ],

    tourDates: {
      start: "July 14th",
      end: "20th, 2027",
    },

    tourType: "Private Beach Holiday",

    route: ["Negombo", "Dambulla", "Trincomalee", "Nilaveli", "Colombo"],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival",
        subtitle: "Airport pickup and overnight stay in Negombo.",
        image: "/tourspage/tour7.jpg",
      },
      {
        day: 2,
        location: "DAMBULLA",
        title: "Journey to the East",
        subtitle:
          "Visit Dambulla Cave Temple before continuing to Trincomalee.",
      },
      {
        day: 3,
        location: "TRINCOMALEE",
        title: "Historic Trincomalee",
        subtitle: "Explore Koneswaram Temple, Fort Frederick and Lover's Leap.",
      },
      {
        day: 4,
        location: "NILAVELI",
        title: "Pigeon Island Adventure",
        subtitle: "Snorkeling, swimming and marine life exploration.",
      },
      {
        day: 5,
        location: "NILAVELI",
        title: "Beach Leisure",
        subtitle:
          "Relax on the beach with optional whale watching and water sports.",
      },
      {
        day: 6,
        location: "COLOMBO",
        title: "Return Journey",
        subtitle:
          "Travel back to Colombo with optional shopping and sightseeing.",
      },
      {
        day: 7,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Airport transfer for your onward flight.",
      },
    ],

    included: [
      {
        text: "6 nights accommodation in quality beach resorts",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private luxury transportation",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport arrival & departure transfers",
      },
      {
        text: "Entrance fees to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
    ],

    notIncluded: [
      {
        text: "International flights",
      },
      {
        text: "Sri Lanka visa fees",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches and dinners",
      },
      {
        text: "Snorkeling equipment rental",
      },
      {
        text: "Optional water sports activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Tips and gratuities",
      },
    ],

    relatedTours: [5, 8, 9],
  },
  {
    id: 8,
    title: "Hill Country Retreat",
    days: 6,
    price: "$995 P/P",
    priceRaw: 995,
    rating: 5,
    reviews: 108,

    heroImage: "/Waterfall-scaled.avif",

    galleryImages: [
      "/tourspage/tour6.jpg",
      "/tourspage/tour7.jpg",
      "/tourspage/tour9.jpg",
      "/tourspage/tour10.jpg",
    ],

    description:
      "Immerse yourself in the refreshing beauty of Sri Lanka's hill country on this six-day retreat through mist-covered mountains, lush tea estates, charming colonial towns and breathtaking viewpoints. Experience the peaceful atmosphere of Kandy, Nuwara Eliya and Ella while enjoying scenic train journeys, waterfalls and unforgettable natural landscapes.",

    highlights: [
      {
        icon: "mountain",
        title: "Beautiful Tea Country",
        desc: "Explore rolling tea plantations and experience the cool climate of Sri Lanka's central highlands.",
      },
      {
        icon: "camera",
        title: "Scenic Railway",
        desc: "Travel on one of the world's most beautiful train journeys through mountains and valleys.",
      },
      {
        icon: "globe",
        title: "Colonial Heritage",
        desc: "Visit charming colonial towns, historic buildings and beautiful botanical gardens.",
      },
      {
        icon: "waves",
        title: "Waterfalls & Viewpoints",
        desc: "Discover spectacular waterfalls, mountain viewpoints and peaceful lakes.",
      },
    ],

    tourDates: {
      start: "August 9th",
      end: "14th, 2027",
    },

    tourType: "Private Hill Country Escape",

    route: ["Negombo", "Kandy", "Nuwara Eliya", "Ella", "Colombo"],

    agenda: [
      {
        day: 1,
        location: "KANDY",
        title: "Journey to Kandy",
        subtitle:
          "Visit Pinnawala Elephant Orphanage before exploring Kandy city.",
        image: "/tourspage/tour8.jpg",
      },
      {
        day: 2,
        location: "KANDY",
        title: "Cultural Discovery",
        subtitle:
          "Temple of the Sacred Tooth Relic, Botanical Gardens and cultural dance performance.",
      },
      {
        day: 3,
        location: "NUWARA ELIYA",
        title: "Tea Plantation Experience",
        subtitle: "Visit Ramboda Falls, tea factories and Gregory Lake.",
      },
      {
        day: 4,
        location: "ELLA",
        title: "Scenic Train Journey",
        subtitle:
          "Travel through breathtaking mountain scenery before visiting Nine Arches Bridge.",
      },
      {
        day: 5,
        location: "ELLA",
        title: "Nature Adventure",
        subtitle: "Little Adam's Peak, Ravana Falls and Ella Gap viewpoint.",
      },
      {
        day: 6,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Return to Colombo with airport transfer.",
      },
    ],

    included: [
      {
        text: "5 nights accommodation in premium hill country hotels",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private air-conditioned transportation",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport pickup & departure transfers",
      },
      {
        text: "Scenic train ticket (subject to availability)",
      },
      {
        text: "Entrance fees to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
    ],

    notIncluded: [
      {
        text: "International airfare",
      },
      {
        text: "Sri Lanka tourist visa",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches & dinners",
      },
      {
        text: "Optional adventure activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Laundry services",
      },
      {
        text: "Tips and gratuities",
      },
    ],

    relatedTours: [5, 6, 9],
  },
  {
    id: 9,
    title: "Eastern Blue Bliss",
    days: 8,
    price: "$1,295 P/P",
    priceRaw: 1295,
    rating: 5,
    reviews: 136,

    heroImage: "/Mirissa-scaled.avif",

    galleryImages: [
      "/tourspage/tour3.jpg",
      "/tourspage/tour8.jpg",
      "/tourspage/tour7.jpg",
      "/tourspage/tour6.jpg",
    ],

    description:
      "Discover the untouched beauty of Sri Lanka's stunning eastern coastline on this relaxing eight-day beach holiday. From the cultural heritage of Trincomalee to the crystal-clear waters of Nilaveli and the peaceful shores of Pasikudah, this journey offers the perfect combination of relaxation, marine adventures, history and unforgettable tropical scenery.",

    highlights: [
      {
        icon: "waves",
        title: "Pristine East Coast Beaches",
        desc: "Relax on the white sandy beaches of Nilaveli and Pasikudah with calm turquoise waters.",
      },
      {
        icon: "camera",
        title: "Marine Adventures",
        desc: "Enjoy snorkeling, scuba diving and optional whale watching in the Indian Ocean.",
      },
      {
        icon: "globe",
        title: "Historic Trincomalee",
        desc: "Explore Fort Frederick, Koneswaram Temple and breathtaking coastal viewpoints.",
      },
      {
        icon: "mountain",
        title: "Island Relaxation",
        desc: "Experience peaceful beach resorts, fresh seafood and spectacular sunrises.",
      },
    ],

    tourDates: {
      start: "September 15th",
      end: "22nd, 2027",
    },

    tourType: "Private East Coast Beach Tour",

    route: [
      "Negombo",
      "Dambulla",
      "Trincomalee",
      "Nilaveli",
      "Pasikudah",
      "Colombo",
    ],

    agenda: [
      {
        day: 1,
        location: "NEGOMBO",
        title: "Arrival in Sri Lanka",
        subtitle: "Airport welcome and overnight stay in Negombo.",
        image: "/tourspage/tour9.jpg",
      },
      {
        day: 2,
        location: "TRINCOMALEE",
        title: "Journey to the East Coast",
        subtitle:
          "Travel through the Cultural Triangle with a visit to Dambulla Cave Temple.",
      },
      {
        day: 3,
        location: "TRINCOMALEE",
        title: "Historic Trincomalee",
        subtitle: "Visit Fort Frederick, Koneswaram Temple and Lover's Leap.",
      },
      {
        day: 4,
        location: "NILAVELI",
        title: "Pigeon Island Marine Park",
        subtitle:
          "Snorkeling among vibrant coral reefs and tropical marine life.",
      },
      {
        day: 5,
        location: "NILAVELI",
        title: "Beach Leisure",
        subtitle:
          "Relax by the beach or enjoy optional scuba diving and whale watching.",
      },
      {
        day: 6,
        location: "PASIKUDAH",
        title: "Pasikudah Beach",
        subtitle:
          "Spend the day enjoying calm shallow waters and beachside relaxation.",
      },
      {
        day: 7,
        location: "COLOMBO",
        title: "Return to Colombo",
        subtitle: "Enjoy a city tour and shopping before your final evening.",
      },
      {
        day: 8,
        location: "AIRPORT",
        title: "Departure",
        subtitle: "Transfer to Bandaranaike International Airport.",
      },
    ],

    included: [
      {
        text: "7 nights accommodation in premium beach resorts",
      },
      {
        text: "Daily breakfast",
      },
      {
        text: "Private luxury air-conditioned transportation",
      },
      {
        text: "Professional English-speaking chauffeur guide",
      },
      {
        text: "Airport pickup & departure transfers",
      },
      {
        text: "Entrance tickets to listed attractions",
      },
      {
        text: "Government taxes and service charges",
      },
    ],

    notIncluded: [
      {
        text: "International flights",
      },
      {
        text: "Sri Lanka tourist visa",
      },
      {
        text: "Travel insurance",
      },
      {
        text: "Lunches & dinners",
      },
      {
        text: "Optional water sports and diving activities",
      },
      {
        text: "Personal expenses",
      },
      {
        text: "Laundry and beverages",
      },
      {
        text: "Tips and gratuities",
      },
    ],

    relatedTours: [7, 8, 2],
  },
];

/* ─────────────────────────── Helper ─────────────────────────── */
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            fill={i <= rating ? "#65ABEA" : "none"}
            stroke="#65ABEA"
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          color: "#999",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {rating}.6 ({reviews} reviews)
      </span>
    </div>
  );
}

const Req = () => (
  <span style={{ color: "#E53E3E", marginLeft: "2px" }}>*</span>
);

/* ─────────────────────────── Inquiry Form ─────────────────────────── */
function InquiryForm({ tour }: { tour: TourData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [extra, setExtra] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const allCountries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const filteredCountries = allCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const nameInput =
    (s: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      s(e.target.value.replace(/[0-9]/g, ""));
  const phoneInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
  const clrErr = (k: string) =>
    setErrors((p) => {
      const n = { ...p };
      delete n[k];
      return n;
    });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (phone.length !== 10) e.phone = "Enter a valid 10-digit number.";
    return e;
  };

  const send = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_2utkl5v",
        "template_kzh1jvm",
        {
          to_email: "lishanichamathka2003@gmail.com",
          tour_title: tour.title,
          tour_days: tour.days,
          tour_price: tour.price,
          firstName,
          lastName,
          adults,
          kids,
          email,
          phone,
          country: country || "Not specified",
          extra: extra || "None",
        },
        "E15zjmQHovis0Upeb",
      );
      setShowSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setExtra("");
      setAdults(1);
      setKids(0);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  const err = (k: string) =>
    errors[k] ? (
      <div
        style={{
          color: "#E53E3E",
          fontSize: "0.72rem",
          marginTop: "4px",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {errors[k]}
      </div>
    ) : null;
  const ic = (k: string) => `td-input${errors[k] ? " td-input-err" : ""}`;

  return (
    <>
      {showSuccess && (
        <div
          className="td-success-overlay"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="td-success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="td-success-icon">
              <Check size={32} color="#fff" />
            </div>
            <h3 className="td-success-title">Inquiry Sent!</h3>
            <p className="td-success-msg">
              Thank you, {firstName || "there"}! Your inquiry has been sent
              successfully. Our team will get back to you within 24 hours.
            </p>
            <button
              className="td-success-btn"
              onClick={() => setShowSuccess(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="td-inquiry-form">
        <div className="td-form-card">
          <div className="td-form-grid">
            <div className="td-field">
              <label className="td-label">
                First Name <Req />
              </label>
              <input
                className={ic("firstName")}
                placeholder="John"
                value={firstName}
                onChange={nameInput(setFirstName)}
                onFocus={() => clrErr("firstName")}
              />
              {err("firstName")}
            </div>
            <div className="td-field">
              <label className="td-label">
                Last Name <Req />
              </label>
              <input
                className={ic("lastName")}
                placeholder="Doe"
                value={lastName}
                onChange={nameInput(setLastName)}
                onFocus={() => clrErr("lastName")}
              />
              {err("lastName")}
            </div>
            <div className="td-field">
              <label className="td-label">
                Number of Adults <Req />
              </label>
              <div className="td-counter">
                <button
                  className="td-counter-btn"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="td-counter-val">{adults}</span>
                <button
                  className="td-counter-btn"
                  onClick={() => setAdults(adults + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="td-field">
              <label className="td-label">Number of Kids</label>
              <div className="td-counter">
                <button
                  className="td-counter-btn"
                  onClick={() => setKids(Math.max(0, kids - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="td-counter-val">{kids}</span>
                <button
                  className="td-counter-btn"
                  onClick={() => setKids(kids + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="td-field">
              <label className="td-label">
                Email <Req />
              </label>
              <div className="td-input-wrap">
                <input
                  type="email"
                  className={ic("email")}
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clrErr("email");
                  }}
                />
                <Mail size={15} className="td-input-icon" />
              </div>
              {err("email")}
            </div>
            <div className="td-field">
              <label className="td-label">
                Contact Number <Req />
              </label>
              <div className="td-input-wrap">
                <input
                  type="tel"
                  className={ic("phone")}
                  placeholder="+1 234 567 890"
                  value={phone}
                  onChange={phoneInput}
                  onFocus={() => clrErr("phone")}
                  maxLength={10}
                />
                <Phone size={15} className="td-input-icon" />
              </div>
              {err("phone")}
            </div>
            <div className="td-field td-field-full">
              <label className="td-label">Country</label>
              <div className="td-input-wrap td-select-wrap">
                <div style={{ position: "relative" }}>
                  <div
                    className="td-select"
                    onClick={() => setCountryOpen(!countryOpen)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      userSelect: "none",
                    }}
                  >
                    <span>{country || "Select Country"}</span>
                  </div>
                  {countryOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        zIndex: 100,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "8px" }}>
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          autoFocus
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "13px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <ul
                        style={{
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((c) => (
                            <li
                              key={c}
                              onClick={() => {
                                setCountry(c);
                                setCountryOpen(false);
                                setCountrySearch("");
                              }}
                              style={{
                                padding: "8px 14px",
                                fontSize: "13px",
                                cursor: "pointer",
                                color: "#333",
                                backgroundColor:
                                  country === c ? "#f0f0f0" : "transparent",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLLIElement
                                ).style.backgroundColor = "#f5f5f5";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLLIElement
                                ).style.backgroundColor =
                                  country === c ? "#f0f0f0" : "transparent";
                              }}
                            >
                              {c}
                            </li>
                          ))
                        ) : (
                          <li
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              color: "#999",
                            }}
                          >
                            No results found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <ChevronDown size={15} className="td-input-icon" />
              </div>
            </div>
            <div className="td-field td-field-full">
              <label className="td-label">Additional Info</label>
              <textarea
                className="td-textarea"
                rows={3}
                placeholder="Any special requests, dietary needs, accessibility requirements or questions?"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
              />
            </div>
          </div>
          <button className="td-inquire-btn" onClick={send} disabled={sending}>
            {sending ? "Sending..." : "Inquire Now"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── Related Tour Card ─────────────────────────── */
function RelatedTourCard({
  tour,
  onNavigate,
}: {
  tour: TourData;
  onNavigate: (id: number) => void;
}) {
  return (
    <div className="td-related-card">
      <div className="td-related-img-wrap">
        <img src={tour.heroImage} alt={tour.title} className="td-related-img" />
        <div className="td-related-badge">
          <Clock size={11} />
          {tour.days} Days
        </div>
      </div>
      <div className="td-related-body">
        <StarRating rating={tour.rating} reviews={tour.reviews} />
        <h4 className="td-related-title">{tour.title}</h4>
        <p className="td-related-desc">{tour.description}</p>
        <div className="td-related-footer">
          <div>
            <div
              style={{
                fontSize: "0.68rem",
                color: "#aaa",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              From
            </div>
            <div className="td-related-price">{tour.price}</div>
          </div>
          <button
            className="td-related-btn"
            onClick={() => onNavigate(tour.id)}
          >
            View Details
            <span className="td-related-btn-icon">
              <ArrowUpRight size={13} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function getInclusionIcon(text: string): React.ReactNode {
  for (const [key, icon] of Object.entries(INCLUSION_ICONS)) {
    if (text.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return <Check size={15} />;
}

/* ─────────────────────────── Main Page ─────────────────────────── */
export default function TourDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tourId = parseInt(id || "1", 10);
  const tour = ALL_TOURS.find((t) => t.id === tourId) || ALL_TOURS[0];
  const relatedTours = ALL_TOURS.filter((t) =>
    tour.relatedTours.includes(t.id),
  );

  const [heroVisible, setHeroVisible] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, [tourId]);

  const handleNavigate = (newId: number) => {
    navigate(`/tours/${newId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactCards = [
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+1 234 567 890",
      note: "Mon–Sat, 9am–5pm",
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "info@veloraceylon@gmail.com",
      note: "We reply within 24 hours",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        :root {
          --blue: #65ABEA;
          --blue-light: #C3E1FB;
          --dark: #111111;
          --mid: #444;
          --soft: #999;
          --border: rgba(0,0,0,0.08);
          --bg: #F9F9F7;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .td-page { font-family: 'Clash Display', sans-serif; background: #fff; color: var(--dark); }

        /* ══════ HERO ══════ */
        .au-hero {
          position: relative; width: 100%; min-height: 650px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
        }
        .au-hero-bg {
          position: absolute; inset: 0;
          background: url('/tourspage/tour-detail-bg.jpg') center / cover no-repeat;
          transform: scale(1.06); transition: transform 9s ease;
        }
        .au-hero-bg.visible { transform: scale(1); }
        .au-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.62) 100%);
        }
        .au-hero-content {
          position: relative; z-index: 2; padding: 0 24px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .au-hero-content.visible { opacity: 1; transform: translateY(0); }
        .au-hero-title {
          font-size: clamp(2.8rem, 7.5vw, 5rem); font-weight: 500;
          color: #fff; line-height: 1.04; letter-spacing: -0.03em;
          margin-bottom: 16px; max-width: 600px;
        }
        .au-hero-sub {
          font-size: clamp(0.82rem, 1.8vw, 1rem); color: #C7C7C7;
          font-weight: 400; letter-spacing: 0.04em; margin-bottom: 36px;
          max-width: 670px; margin-left: auto; margin-right: auto;
        }

        /* ── OVERVIEW SECTION ── */
        .td-overview {
          padding: clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px);
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 56px); align-items: start;
        }
        .td-overview-left { display: flex; flex-direction: column; gap: 24px; }
        .td-overview-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 500;
          color: #111; line-height: 1.1; letter-spacing: -0.025em;
        }
        .td-overview-desc {
          font-size: clamp(0.8rem, 1.4vw, 0.9rem); color: #999;
          line-height: 1.8; font-weight: 400;
        }
        .td-overview-right {
          display: flex; flex-direction: column; gap: 14px;
          position: sticky; top: 90px;
        }
        .td-gallery-desc {
          font-size: clamp(0.8rem, 1.3vw, 0.88rem); color: #999;
          line-height: 1.8; font-weight: 400;
        }
        .td-gallery-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          grid-template-rows: auto; gap: 10px; align-items: start;
        }
        .td-gallery-col { display: flex; flex-direction: column; gap: 10px; }
        .td-gallery-img { border-radius: 16px; overflow: hidden; width: 100%; }
        .td-gallery-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .td-gallery-img:hover img { transform: scale(1.05); }
        .td-gallery-col:first-child .td-gallery-img:nth-child(1) { height: 300px; margin-top: 60px; border-radius: 30px; }
        .td-gallery-col:first-child .td-gallery-img:nth-child(2) { height: 200px; border-radius: 30px; }
        .td-gallery-col:last-child .td-gallery-img:nth-child(1)  { height: 200px; border-radius: 30px; }
        .td-gallery-col:last-child .td-gallery-img:nth-child(2)  { height: 300px; border-radius: 30px; }

        /* Highlights grid */
        .td-highlights { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 4px; }
        .td-highlight-card {
          background: #F9F9F7; border: 1px solid #eee; border-radius: 14px; padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .td-highlight-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .td-highlight-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--blue-light); color: #000000;
          display: flex; align-items: center; justify-content: center;
        }
        .td-highlight-title { font-size: 0.86rem; font-weight: 600; color: #111; }
        .td-highlight-desc  { font-size: 0.75rem; color: #999; line-height: 1.6; }

        /* Tour dates card */
        .td-dates-card {
          background: #C3E1FB9D; border-radius: 16px; padding: 20px 22px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .td-dates-label { font-size: 0.72rem; font-weight: 400; color: #212121; text-transform: uppercase; letter-spacing: 0.08em; }
        .td-dates-range { font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 600; color: #111; }
        .td-dates-route { display: flex; flex-wrap: wrap; gap: 6px; }
        .td-route-pill {
          background: #65ABEA2E; border: 1px solid #C3E1FB;
          border-radius: 9999px; padding: 4px 12px;
          font-size: 0.72rem; color: #555; font-weight: 400;
        }
        .td-dates-meta {
          display: inline-flex; align-items: center; border-radius: 9999px;
          font-size: 0.78rem; font-weight: 400; color: #212121;
          width: fit-content; backdrop-filter: blur(4px);
        }
        .td-contact-card {
          background: #fff; border: 1px solid #eee; border-radius: 18px;
          padding: 24px; display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .td-contact-card-title { font-size: 1rem; font-weight: 600; color: #111; }
        .td-contact-row { display: flex; align-items: flex-start; gap: 12px; }
        .td-contact-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--blue-light); color: var(--blue);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .td-contact-label { font-size: 1.05rem; font-weight: 500; color: #111; margin-bottom: 6px; }
        .td-contact-value { font-size: 1rem; color: #212121; font-weight: 400; margin-bottom: 6px; }
        .td-contact-note  { font-size: 0.84rem; color: #999; font-weight: 400; }
        .td-qr-wrap {
          width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;
          padding: 16px; background: #F9F9F7; border-radius: 12px; border: 1px solid #eee;
        }
        .td-qr-label { font-size: 0.72rem; color: #aaa; }
        .td-qr-img { width: 110px; height: 110px; border-radius: 8px; border: 1px solid #eee; }

        /* ── AGENDA ── */
        .td-agenda-section {
          padding: clamp(40px, 5vw, 0px) clamp(24px, 6vw, 80px);
          background: #fff;
        }
        .td-section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 500;
          color: #111; line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 8px;
        }
        .td-section-sub {
          font-size: clamp(0.78rem, 1.3vw, 0.86rem); color: #aaa;
          margin-bottom: clamp(24px, 4vw, 36px); line-height: 1.65;
        }
        .td-agenda-layout {
          display: grid; grid-template-columns: 1fr 380px;
          gap: clamp(24px, 4vw, 48px); align-items: start;
        }
        .td-agenda-list { display: flex; flex-direction: column; gap: 8px; }
        .td-agenda-item {
          border: none; border-radius: 14px; overflow: hidden;
          background: #F8F8F8; cursor: pointer; height: 70px; padding: 8px 0;
          transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
        }
        .td-agenda-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .td-agenda-item.open {
          border: none; background: #fff;
          box-shadow: 0 4px 20px rgba(101,171,234,0.15);
          height: auto; padding: 0;
        }
        .td-agenda-header { display: flex; align-items: center; gap: 14px; padding: 14px 18px; }
        .td-agenda-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #C7C7C7; border: none;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 600; color: #fff; flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .td-agenda-item.open .td-agenda-dot { background: var(--blue); color: #fff; }
        .td-agenda-day-label { font-size: 0.65rem; font-weight: 400; color: #212121; text-transform: uppercase; letter-spacing: 0.08em; }
        .td-agenda-day-title { font-size: 0.92rem; font-weight: 600; color: #111; margin-top: 1px; }
        .td-agenda-day-sub   { font-size: 0.75rem; color: #aaa; margin-top: 1px; }
        .td-agenda-chevron   { margin-left: auto; color: #bbb; flex-shrink: 0; transition: color 0.2s; }
        .td-agenda-item.open .td-agenda-chevron { color: var(--blue); }
        .td-agenda-img-wrap {
          position: sticky; top: 90px; border-radius: 20px; overflow: hidden;
          height: clamp(240px, 30vw, 380px);
        }
        .td-agenda-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .td-agenda-body-wrap {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 18px 10px 64px;
        }
        .td-agenda-check-icon {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; min-width: 20px;
          background-color: #65ABEA; border-radius: 50%; color: #fff;
        }
        .td-agenda-body {
          font-size: clamp(0.8rem, 1.3vw, 0.88rem);
          color: #555; line-height: 1; margin: 0;
        }

        /* ── PACKAGE INCLUSIONS ── */
        .td-inclusions-section {
          padding: clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px);
          background: #fff;
        }
        .td-inclusions-section .td-section-title { text-align: center; }
        .td-inclusions-section .td-section-sub {
          text-align: center; margin-left: auto; margin-right: auto; max-width: 480px;
        }
        .td-inclusions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 8px; }
        .td-incl-card {
          background: #F8F8F8; border: 1px solid #F8F8F8; border-radius: 18px;
          padding: 24px 20px; display: flex; flex-direction: column; gap: 14px;
        }
        .td-incl-col { display: flex; flex-direction: column; gap: 10px; }
        .td-incl-col-title {
          font-size: 1rem; font-weight: 600; color: #111;
          display: flex; align-items: center; gap: 8px; margin-bottom: 4px;
        }
        .td-incl-item {
          display: flex; align-items: center; gap: 12px;
          background: #ECFDF5; border: 1px solid #ECFDF5;
          border-radius: 10px; padding: 10px 14px;
          font-size: 0.8rem; color: #333; font-weight: 400;
        }
        .td-incl-item.no { border-color: #FFF1F2; background: #FFF1F2; }
        .td-incl-icon-left {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .td-incl-icon-green { background: #F8F8F8; color: #10B981; border: 1px solid #10B9814D; }
        .td-incl-icon-red   { background: #F8F8F8; color: #FB7185; border: 1px solid #FB71854D; }
        .td-incl-text { flex: 1; }
        .td-incl-check-right { color: #10B981; flex-shrink: 0; }
        .td-incl-x-right     { color: #FB7185; flex-shrink: 0; }

        /* ── INQUIRY FORM ── */
        .td-inquiry-section {
          padding: clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px);
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .td-inquiry-header { display: flex; flex-direction: column; gap: 8px; }
        .td-inquiry-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: clamp(32px, 4vw, 56px);
          align-items: start;
        }
        .td-inquiry-form { display: flex; flex-direction: column; gap: 0; }
        .td-inquiry-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 500;
          color: #111; letter-spacing: -0.025em; margin-bottom: 0;
        }
        .td-inquiry-sub {
          font-size: 0.82rem; color: #aaa;
          line-height: 1.65; margin-bottom: 0; max-width: 520px;
        }
        .td-form-card {
          background: #F8F8F8; border: 1px solid #F8F8F8;
          border-radius: 18px; padding: 24px;
          display: flex; flex-direction: column; gap: 0;
        }
        .td-form-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 14px;
        }
        .td-field { display: flex; flex-direction: column; gap: 5px; }
        .td-field-full { grid-column: 1 / -1; }
        .td-label { font-size: 0.75rem; color: #555; font-weight: 500; }
        .td-input {
          width: 100%; background: #fff; border: 1px solid #e5e5e5;
          border-radius: 10px; padding: 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .td-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(101,171,234,0.12); }
        .td-input::placeholder { color: #bbb; }
        .td-input-err { border-color: #E53E3E !important; }
        .td-input-wrap { position: relative; }
        .td-input-icon { position: absolute; right: 11px; top: 50%; transform: translateY(-50%); color: #bbb; pointer-events: none; }
        .td-select-wrap { position: relative; }
        .td-select {
          width: 100%; background: #fff; border: 1px solid #e5e5e5;
          border-radius: 10px; padding: 10px 36px 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none; appearance: none; cursor: pointer;
          transition: border-color 0.2s;
        }
        .td-select:focus { border-color: var(--blue); }
        .td-textarea {
          width: 100%; background: #fff; border: 1px solid #e5e5e5;
          border-radius: 10px; padding: 10px 14px;
          font-size: 0.82rem; font-family: 'Clash Display', sans-serif;
          color: #333; outline: none; resize: vertical;
          transition: border-color 0.2s;
        }
        .td-textarea:focus { border-color: var(--blue); }
        .td-textarea::placeholder { color: #bbb; }
        .td-counter {
          display: flex; align-items: center; background: #fff;
          border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;
        }
        .td-counter-btn {
          width: 40px; height: 40px; border: none; background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #555;
        }
        .td-counter-btn:hover { background: #F0F0F0; }
        .td-counter-val { flex: 1; text-align: center; font-size: 0.86rem; color: #333; font-weight: 500; }
        .td-inquire-btn {
          width: 100%; background: var(--blue); border: none; border-radius: 76px;
          padding: 14px; color: #fff; font-size: 0.92rem;
          font-family: 'Clash Display', sans-serif; font-weight: 500;
          cursor: pointer; transition: background 0.22s, transform 0.18s;
        }
        .td-inquire-btn:hover { background: #4a9add; transform: translateY(-1px); }
        .td-inquire-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Side contact */
        .td-inquiry-side { display: flex; flex-direction: column; gap: 14px; overflow: hidden; }
        .td-side-card {
          background: #F5F5F5; border: none; border-radius: 18px;
          padding: 28px 24px; display: flex; align-items: flex-start; gap: 18px;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .td-side-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .td-side-icon {
          width: 38px; height: 38px; border-radius: 14px;
          background: #C3E1FB; color: #000000;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .td-side-wa-card {
          background: #F8F8F8; border: 1px solid #F8F8F8; border-radius: 18px;
          padding: 18px; display: flex; flex-direction: column;
          align-items: center; gap: 14px; text-align: center;
        }
        .td-side-wa-header { display: flex; align-items: center; gap: 10px; width: 100%; }
        .td-side-wa-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: #E8F8EF; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .td-side-wa-title { font-size: 0.92rem; font-weight: 600; color: #111; }
        .td-side-qr { width: 50%; aspect-ratio: 1; border: 1px solid #eee; object-fit: cover; }
        .td-side-wa-scan-text { font-size: 0.75rem; color: #aaa; margin: 0; }
        .td-wa-btn {
          width: 100%; background: #25D366; border: none; border-radius: 9999px;
          padding: 13px; color: #fff; font-size: 0.88rem;
          font-family: 'Clash Display', sans-serif; font-weight: 600;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.18s;
        }
        .td-wa-btn:hover { background: #1ebe5a; transform: translateY(-1px); }

        /* ── SUCCESS POPUP ── */
        .td-success-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .td-success-modal {
          background: #fff; border-radius: 20px; padding: 40px 36px;
          max-width: 420px; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; text-align: center; animation: td-pop 0.3s ease;
        }
        @keyframes td-pop {
          from { transform: scale(0.88); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .td-success-icon {
          width: 64px; height: 64px; border-radius: 50%; background: #10B981;
          display: flex; align-items: center; justify-content: center;
        }
        .td-success-title { font-size: 1.4rem; font-weight: 600; color: #111; }
        .td-success-msg { font-size: 0.84rem; color: #777; line-height: 1.65; max-width: 320px; }
        .td-success-btn {
          margin-top: 8px; background: var(--blue); border: none;
          border-radius: 12px; padding: 12px 40px; color: #fff; font-size: 0.9rem;
          font-family: 'Clash Display', sans-serif; font-weight: 600;
          cursor: pointer; transition: background 0.2s;
        }
        .td-success-btn:hover { background: #4a9add; }

        /* ── RELATED TOURS ── */
        .td-related-section {
          padding: clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px);
          background: #fff;
        }
        .td-related-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 24px; margin-bottom: clamp(24px, 4vw, 36px); flex-wrap: wrap;
        }
        .td-related-sub { font-size: 0.84rem; color: #aaa; max-width: 380px; line-height: 1.65; padding-top: 24px; }
        .td-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .td-related-card {
          border: 1px solid #eee; border-radius: 16px; overflow: hidden;
          background: #fff; transition: box-shadow 0.28s, transform 0.28s;
        }
        .td-related-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.09); transform: translateY(-4px); }
        .td-related-img-wrap { position: relative; height: clamp(140px, 16vw, 220px); overflow: hidden; }
        .td-related-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .td-related-card:hover .td-related-img { transform: scale(1.05); }
        .td-related-badge {
          position: absolute; top: 12px; right: 12px;
          background: var(--blue); color: #fff; border-radius: 9999px;
          padding: 4px 10px; font-size: 0.68rem; font-weight: 500;
          display: flex; align-items: center; gap: 4px;
        }
        .td-related-body { padding: 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .td-related-title { font-size: 0.88rem; font-weight: 600; color: #111; line-height: 1.3; }
        .td-related-desc  { font-size: 0.73rem; color: #999; line-height: 1.6; flex: 1; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; margin-bottom: 10px; }
        .td-related-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .td-related-price { font-size: 0.84rem; color: var(--blue); font-weight: 600; }
        .td-related-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--blue); border: none; border-radius: 9999px;
          padding: 7px 9px 7px 14px; color: #fff; font-size: 0.72rem;
          font-family: 'Clash Display', sans-serif; font-weight: 500;
          cursor: pointer; transition: background 0.22s, transform 0.22s;
        }
        .td-related-btn:hover { background: #4a9add; transform: translateX(2px); }
        .td-related-btn-icon {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .td-overview        { grid-template-columns: 1fr; }
          .td-overview-right  { position: static; }
          .td-agenda-layout   { grid-template-columns: 1fr; }
          .td-agenda-img-wrap { position: static; height: clamp(180px, 40vw, 280px); }
          .td-inquiry-body    { grid-template-columns: 1fr; }
          .td-inquiry-side    { position: static; }
        }
        @media (max-width: 768px) {
          .td-highlights      { grid-template-columns: 1fr; }
          .td-inclusions-grid { grid-template-columns: 1fr; }
          .td-related-grid    { grid-template-columns: repeat(2, 1fr); }
          .td-related-sub     { padding-top: 0; }
          .td-inquiry-body    { grid-template-columns: 1fr; gap: 24px; }
          .td-form-grid       { grid-template-columns: 1fr 1fr; }
          .td-inquiry-side    { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          .td-side-wa-card    { grid-column: 1 / -1; }
          .td-side-card       { padding: 20px 18px; }
        }
        @media (max-width: 580px) {
          .td-form-grid       { grid-template-columns: 1fr; }
          .td-field-full      { grid-column: 1; }
          .td-related-grid    { grid-template-columns: 1fr; }
          .au-hero            { min-height: 400px; }
          .au-hero-content    { padding: 0 12px; margin-top: 60px; }
          .td-gallery-col:first-child .td-gallery-img:nth-child(1) { height: 220px; margin-top: 40px; }
          .td-gallery-col:first-child .td-gallery-img:nth-child(2) { height: 160px; }
          .td-gallery-col:last-child .td-gallery-img:nth-child(1)  { height: 160px; }
          .td-gallery-col:last-child .td-gallery-img:nth-child(2)  { height: 220px; }
          .td-inquiry-body    { grid-template-columns: 1fr; gap: 16px; }
          .td-inquiry-section { padding: 24px clamp(12px, 4vw, 24px); }
          .td-inquiry-side    { display: flex; flex-direction: column; gap: 12px; }
          .td-side-card       { padding: 20px 18px; }
          .td-inclusions-grid { grid-template-columns: 1fr; }
          .td-agenda-layout   { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="td-page">
        {/* ── HERO ── */}
        <section className="au-hero">
          <div className={`au-hero-bg ${heroVisible ? "visible" : ""}`} />
          <div className="au-hero-overlay" />
          <div className={`au-hero-content ${heroVisible ? "visible" : ""}`}>
            <h1 className="au-hero-title">Discover the Pearl of Asia</h1>
            <p className="au-hero-sub">
              A 12-day immersive journey through Sri Lanka's ancient temples,
              lush tea gardens, wildlife safaris, and pristine beaches - crafted
              for unforgettable memories.
            </p>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="td-overview">
          <div className="td-overview-left">
            <h2 className="td-overview-title">
              Sri Lanka in {tour.days}
              <br />
              Unforgettable Days
            </h2>
            <div className="td-highlights">
              {tour.highlights.map((h, i) => (
                <div key={i} className="td-highlight-card">
                  <div className="td-highlight-icon">{ICON_MAP[h.icon]}</div>
                  <div className="td-highlight-title">{h.title}</div>
                  <div className="td-highlight-desc">{h.desc}</div>
                </div>
              ))}
            </div>
            <div className="td-dates-card">
              <div className="td-dates-label">Tour Dates</div>
              <div className="td-dates-range">
                {tour.tourDates.start} – {tour.tourDates.end}
              </div>
              <div className="td-dates-meta">
                {tour.days} days&nbsp;|&nbsp;{tour.days - 1} nights&nbsp;|&nbsp;
                {tour.tourType}
              </div>
              <div className="td-dates-route">
                {tour.route.map((r, i) => (
                  <span key={i} className="td-route-pill">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="td-overview-right">
            <p className="td-gallery-desc">{tour.description}</p>
            <div className="td-gallery-grid">
              <div className="td-gallery-col">
                <div className="td-gallery-img">
                  <img src={tour.heroImage} alt={tour.title} />
                </div>
                <div className="td-gallery-img">
                  <img src={tour.galleryImages[0]} alt={tour.title} />
                </div>
              </div>
              <div className="td-gallery-col">
                <div className="td-gallery-img">
                  <img src={tour.galleryImages[1]} alt={tour.title} />
                </div>
                <div className="td-gallery-img">
                  <img src={tour.galleryImages[2]} alt={tour.title} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AGENDA ── */}
        <section className="td-agenda-section">
          <h2 className="td-section-title">
            Your Tour
            <br />
            Agenda
          </h2>
          <p className="td-section-sub">
            {tour.tourDates.start} to {tour.tourDates.end} – every day is
            planned to take you across Sri Lanka's most iconic destinations.
          </p>
          <div className="td-agenda-layout">
            <div className="td-agenda-list">
              {tour.agenda.map((day) => (
                <div
                  key={day.day}
                  className={`td-agenda-item ${openDay === day.day ? "open" : ""}`}
                  onClick={() =>
                    setOpenDay(openDay === day.day ? null : day.day)
                  }
                >
                  <div className="td-agenda-header">
                    <div className="td-agenda-dot">{day.day}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="td-agenda-day-label">
                        Day {day.day} – {day.location}
                      </div>
                      <div className="td-agenda-day-title">{day.title}</div>
                    </div>
                    <div className="td-agenda-chevron">
                      {openDay === day.day ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>
                  {openDay === day.day && (
                    <div className="td-agenda-body-wrap">
                      <div className="td-agenda-check-icon">
                        <Check size={12} />
                      </div>
                      <div className="td-agenda-body">{day.subtitle}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="td-agenda-img-wrap">
              <img
                src={
                  tour.agenda.find((d) => d.day === openDay && d.image)
                    ?.image ||
                  tour.agenda.find((d) => d.image)?.image ||
                  tour.heroImage
                }
                alt="Tour destination"
              />
            </div>
          </div>
        </section>

        {/* ── PACKAGE INCLUSIONS ── */}
        <section className="td-inclusions-section">
          <h2 className="td-section-title">Package Inclusions</h2>
          <p className="td-section-sub">
            Everything you need for a seamless journey through Sri Lanka –
            clearly laid out so you know exactly what's included.
          </p>
          <div className="td-inclusions-grid">
            <div className="td-incl-card">
              <div className="td-incl-col-title">What's Included</div>
              <div className="td-incl-col">
                {tour.included.map((item, i) => (
                  <div key={i} className="td-incl-item">
                    <div className="td-incl-icon-left td-incl-icon-green">
                      {getInclusionIcon(item.text)}
                    </div>
                    <span className="td-incl-text">{item.text}</span>
                    <div className="td-incl-check-right">
                      <Check size={13} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="td-incl-card">
              <div className="td-incl-col-title">Not Included</div>
              <div className="td-incl-col">
                {tour.notIncluded.map((item, i) => (
                  <div key={i} className="td-incl-item no">
                    <div className="td-incl-icon-left td-incl-icon-red">
                      {getInclusionIcon(item.text)}
                    </div>
                    <span className="td-incl-text">{item.text}</span>
                    <div className="td-incl-x-right">
                      <X size={13} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section className="td-inquiry-section">
          <div className="td-inquiry-header">
            <h3 className="td-inquiry-title">Inquire Now</h3>
            <p className="td-inquiry-sub">
              Ready to embark on your Sri Lanka adventure? Fill in your details
              and our team will get back to you within 24 hours.
            </p>
          </div>
          <div className="td-inquiry-body">
            <InquiryForm tour={tour} />
            <div className="td-inquiry-side">
              {contactCards.map((c, i) => (
                <div key={i} className="td-side-card">
                  <div className="td-side-icon">{c.icon}</div>
                  <div>
                    <div className="td-contact-label">{c.label}</div>
                    <div className="td-contact-value">{c.value}</div>
                    <div className="td-contact-note">{c.note}</div>
                  </div>
                </div>
              ))}
              <div className="td-side-wa-card">
                <div className="td-side-wa-header">
                  <div className="td-side-wa-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                  <span className="td-side-wa-title">Whatsapp</span>
                </div>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=148x148&data=https://wa.me/94703272582"
                  alt="WhatsApp QR Code"
                  className="td-side-qr"
                />
                <p className="td-side-wa-scan-text">Scan to chat on Whatsapp</p>
                <button
                  className="td-wa-btn"
                  onClick={() =>
                    window.open("https://wa.me/94703272582", "_blank")
                  }
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED TOURS ── */}
        <section className="td-related-section">
          <div className="td-related-header">
            <h2 className="td-section-title" style={{ marginBottom: 0 }}>
              Explore More
              <br />
              Tours
            </h2>
            <p className="td-related-sub">
              Looking for other adventures? Check out our other hand-picked
              tours across Sri Lanka.
            </p>
          </div>
          <div className="td-related-grid">
            {relatedTours.map((t) => (
              <RelatedTourCard
                key={t.id}
                tour={t}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </section>

        {/* ── INQUIRE SECTION ── */}
        <InquireSection />
        <Footer />
      </div>
    </>
  );
}
