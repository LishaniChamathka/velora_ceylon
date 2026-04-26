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
    title: "Classic Sri Lanka Tour",
    days: 7,
    price: "$899 P/P",
    priceRaw: 899,
    rating: 4,
    reviews: 110,
    heroImage: "/homepage/tour1.jpg",
    galleryImages: [
      "/tourspage/tour2.jpg",
      "/tourspage/tour3.jpg",
      "/tourspage/tour4.jpg",
    ],
    description:
      "From the ancient rock fortress of Sigiriya to the golden shores of Mirissa, this carefully curated journey takes you through the very best Sri Lanka has to offer – culture, wildlife, nature and relaxation all in one seamless adventure.",
    highlights: [
      {
        icon: "mountain",
        title: "Ancient Wonders",
        desc: "Explore UNESCO World Heritage Sites including Sigiriya Rock and Dambulla Cave Temple.",
      },
      {
        icon: "waves",
        title: "Nature & Wildlife",
        desc: "See elephants while watching sea turtles and stunning sunrises await you.",
      },
      {
        icon: "utensils",
        title: "Authentic Cuisine",
        desc: "Savour authentic Sri Lankan dishes featuring authentic aromas across the island's specialities.",
      },
      {
        icon: "shield",
        title: "Comfort & Style",
        desc: "Stay in carefully selected hotels with modern amenities throughout the journey.",
      },
    ],
    tourDates: { start: "April 2nd", end: "10th, 2026" },
    tourType: "Private Group Tour",
    route: ["Sigiriya", "Dambulla", "Ella", "Yala", "Galle", "Mirissa"],
    agenda: [
      {
        day: 1,
        location: "SIGIRIYA",
        title: "Airport to Sigiriya",
        subtitle: "Village tour and village – style lunch",
        image: "/tourspage/tour4.jpg",
      },
      {
        day: 2,
        location: "SIGIRIYA",
        title: "Sigiriya Exploration",
        subtitle: "Rock fortress climb and museum visit",
      },
      {
        day: 3,
        location: "DAMBULLA",
        title: "Sigiriya to Dambulla",
        subtitle: "Cave temple tour and spice garden",
      },
      {
        day: 4,
        location: "KANDY",
        title: "Sigiriya to Kandy",
        subtitle: "Temple of the Tooth and cultural show",
      },
      {
        day: 5,
        location: "NUWARA ELIYA",
        title: "Kandy to Nuwara Eliya",
        subtitle: "Tea plantation and scenic train ride",
      },
      {
        day: 6,
        location: "NUWARA ELIYA",
        title: "Nuwara Eliya",
        subtitle: "Gregory Lake and local market",
      },
      {
        day: 7,
        location: "ELLA",
        title: "Nuwara Eliya to Ella by Train",
        subtitle: "Nine Arch Bridge and Little Adam's Peak",
      },
      {
        day: 8,
        location: "YALA",
        title: "Ella Adventure",
        subtitle: "Ravana Falls and Ella Rock trek",
      },
      {
        day: 9,
        location: "YALA",
        title: "Ella to Yala",
        subtitle: "Jeep safari – leopards & elephants",
      },
      {
        day: 10,
        location: "MIRISSA",
        title: "Yala to Mirissa",
        subtitle: "Beach relaxation and whale watching",
      },
      {
        day: 11,
        location: "GALLE",
        title: "Mirissa to Galle",
        subtitle: "Dutch Fort and colonial old town",
      },
      {
        day: 12,
        location: "COLOMBO",
        title: "Back to Airport",
        subtitle: "Departure transfer and farewell",
      },
    ],
    included: [
      { text: "Accommodation in 3–4 star Hotels" },
      { text: "All transportation (private vehicle & train)" },
      { text: "Daily meals (breakfast, lunch & dinner)" },
      { text: "Entrance fees to attractions and temples" },
      { text: "Experienced professional tour guide" },
      { text: "Wildlife safaris (Yala & Udawalawa)" },
      { text: "Whale watching & snorkelling activities" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [2, 3, 5],
  },
  {
    id: 2,
    title: "Sri Lanka Adventure & Wildlife Safari",
    days: 9,
    price: "$1,199 P/P",
    priceRaw: 1199,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour2.jpg",
    galleryImages: [
      "/homepage/tour1.jpg",
      "/tourspage/tour5.jpg",
      "/tourspage/tour6.jpg",
    ],
    description:
      "An action-packed adventure through Sri Lanka's wildest landscapes. From thrilling Yala safaris to rainforest treks in Sinharaja, this tour is built for those who crave adrenaline and authentic wildlife encounters.",
    highlights: [
      {
        icon: "mountain",
        title: "Thrilling Safaris",
        desc: "Spot leopards, elephants and crocodiles on expert-led Yala & Udawalawe safaris.",
      },
      {
        icon: "waves",
        title: "Rainforest Treks",
        desc: "Explore the UNESCO Sinharaja Biosphere Reserve with an experienced naturalist guide.",
      },
      {
        icon: "camera",
        title: "Wildlife Photography",
        desc: "Golden-hour game drives give you the perfect light to capture Sri Lanka's Big 5.",
      },
      {
        icon: "car",
        title: "Off-Road Expedition",
        desc: "4×4 transfers through rugged terrain connect remote lodges and national parks.",
      },
    ],
    tourDates: { start: "May 5th", end: "14th, 2026" },
    tourType: "Private Group Tour",
    route: ["Colombo", "Dambulla", "Kandy", "Sinharaja", "Yala", "Mirissa"],
    agenda: [
      {
        day: 1,
        location: "COLOMBO",
        title: "Arrival & City Tour",
        subtitle: "Airport pickup and Colombo highlights",
        image: "/tourspage/tour2.jpg",
      },
      {
        day: 2,
        location: "DAMBULLA",
        title: "Colombo to Dambulla",
        subtitle: "Pinnawala Elephant Orphanage en-route",
      },
      {
        day: 3,
        location: "DAMBULLA",
        title: "Dambulla Exploration",
        subtitle: "Cave temples and Minneriya safari",
      },
      {
        day: 4,
        location: "KANDY",
        title: "Dambulla to Kandy",
        subtitle: "Spice gardens and cultural performance",
      },
      {
        day: 5,
        location: "SINHARAJA",
        title: "Kandy to Sinharaja",
        subtitle: "Rainforest trekking & birdwatching",
      },
      {
        day: 6,
        location: "SINHARAJA",
        title: "Sinharaja Deep Trek",
        subtitle: "Full-day guided rainforest expedition",
      },
      {
        day: 7,
        location: "YALA",
        title: "Sinharaja to Yala",
        subtitle: "Afternoon game drive at dusk",
      },
      {
        day: 8,
        location: "YALA",
        title: "Yala Full-Day Safari",
        subtitle: "Morning & evening jeep safaris",
      },
      {
        day: 9,
        location: "MIRISSA",
        title: "Yala to Mirissa",
        subtitle: "Whale watching and beach farewell",
      },
    ],
    included: [
      { text: "Accommodation in eco-lodges & boutique hotels" },
      { text: "All safari jeep transfers and national park fees" },
      { text: "Daily meals (breakfast, lunch & dinner)" },
      { text: "Expert wildlife guide and naturalist" },
      { text: "Rainforest guided trek in Sinharaja" },
      { text: "Whale watching excursion in Mirissa" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [1, 4, 9],
  },
  {
    id: 3,
    title: "Luxury Beach Getaway",
    days: 5,
    price: "$1,499 P/P",
    priceRaw: 1499,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour3.jpg",
    galleryImages: [
      "/tourspage/tour7.jpg",
      "/tourspage/tour8.jpg",
      "/homepage/tour1.jpg",
    ],
    description:
      "Indulge in Sri Lanka's most pristine coastal stretches. From the colonial charm of Galle Fort to a private yacht sunset off Mirissa and world-class whale watching, this is the ultimate luxury beach retreat.",
    highlights: [
      {
        icon: "waves",
        title: "Pristine Beaches",
        desc: "Unwind on exclusive stretches of golden sand along the southern and western coasts.",
      },
      {
        icon: "shield",
        title: "Luxury Resorts",
        desc: "Hand-picked 5-star properties with infinity pools, spa facilities and butler service.",
      },
      {
        icon: "camera",
        title: "Private Yacht Sunset",
        desc: "Enjoy sundowners on a private catamaran sailing along Mirissa's turquoise waters.",
      },
      {
        icon: "globe",
        title: "Colonial Heritage",
        desc: "Stroll through Galle Fort's cobblestone streets and 17th-century Dutch architecture.",
      },
    ],
    tourDates: { start: "June 1st", end: "6th, 2026" },
    tourType: "Private Group Tour",
    route: ["Colombo", "Bentota", "Galle", "Mirissa", "Tangalle"],
    agenda: [
      {
        day: 1,
        location: "BENTOTA",
        title: "Arrival & Bentota",
        subtitle: "Luxury water villa check-in and beach sunset",
        image: "/tourspage/tour3.jpg",
      },
      {
        day: 2,
        location: "BENTOTA",
        title: "Bentota Beach Day",
        subtitle: "Water sports and Ayurvedic spa session",
      },
      {
        day: 3,
        location: "GALLE",
        title: "Bentota to Galle",
        subtitle: "Galle Fort tour and lighthouse walk",
      },
      {
        day: 4,
        location: "MIRISSA",
        title: "Galle to Mirissa",
        subtitle: "Private yacht sunset and seafood dinner",
      },
      {
        day: 5,
        location: "MIRISSA",
        title: "Whale Watching & Departure",
        subtitle: "Early morning whale watching, airport transfer",
      },
    ],
    included: [
      { text: "5-star luxury resort accommodation" },
      { text: "Private air-conditioned transfers" },
      { text: "Daily breakfast and selected dinners" },
      { text: "Private yacht sunset cruise" },
      { text: "Whale watching excursion" },
      { text: "Ayurvedic spa session (60 min)" },
      { text: "Galle Fort guided tour" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [6, 7, 1],
  },
  {
    id: 4,
    title: "Adventure Trekking Expedition",
    days: 8,
    price: "$1,099 P/P",
    priceRaw: 1099,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour4.jpg",
    galleryImages: [
      "/tourspage/tour2.jpg",
      "/tourspage/tour9.jpg",
      "/tourspage/tour5.jpg",
    ],
    description:
      "Strap on your boots and tackle Sri Lanka's most dramatic mountain terrain. From the mist-draped peaks of Horton Plains to the sunrise at Adam's Peak, this trek-focused journey rewards every step with jaw-dropping scenery.",
    highlights: [
      {
        icon: "mountain",
        title: "Adam's Peak Sunrise",
        desc: "Undertake the sacred pilgrimage climb to Sri Pada and watch dawn break over the island.",
      },
      {
        icon: "waves",
        title: "Horton Plains Trek",
        desc: "Hike to World's End cliff for vertigo-inducing views over the southern lowlands.",
      },
      {
        icon: "camera",
        title: "Waterfall Wonders",
        desc: "Discover Diyaluma, Bambarakanda and Ravana Falls along the trekking routes.",
      },
      {
        icon: "car",
        title: "Scenic Train Rides",
        desc: "Journey on the world-famous Kandy–Ella railway through cloud-forest and tea estates.",
      },
    ],
    tourDates: { start: "July 3rd", end: "11th, 2026" },
    tourType: "Private Group Tour",
    route: ["Kandy", "Nuwara Eliya", "Horton Plains", "Ella", "Adam's Peak"],
    agenda: [
      {
        day: 1,
        location: "KANDY",
        title: "Arrival & Kandy",
        subtitle: "Temple of the Tooth and city orientation",
        image: "/tourspage/tour4.jpg",
      },
      {
        day: 2,
        location: "NUWARA ELIYA",
        title: "Kandy to Nuwara Eliya",
        subtitle: "Tea estates and Gregory Lake walk",
      },
      {
        day: 3,
        location: "HORTON PLAINS",
        title: "Horton Plains Trek",
        subtitle: "World's End and Baker's Falls",
      },
      {
        day: 4,
        location: "ELLA",
        title: "Nuwara Eliya to Ella",
        subtitle: "Scenic train journey through hill country",
      },
      {
        day: 5,
        location: "ELLA",
        title: "Ella Rock Trek",
        subtitle: "Full-day mountain ridge hike",
      },
      {
        day: 6,
        location: "ELLA",
        title: "Ravana Falls & Nine Arches",
        subtitle: "Waterfall swim and bridge photography",
      },
      {
        day: 7,
        location: "ADAM'S PEAK",
        title: "Ella to Adam's Peak",
        subtitle: "Afternoon transfer and pre-climb rest",
      },
      {
        day: 8,
        location: "COLOMBO",
        title: "Summit Climb & Departure",
        subtitle: "2 AM ascent for sunrise, then airport transfer",
      },
    ],
    included: [
      { text: "Boutique mountain guesthouse stays" },
      { text: "All transfers including scenic train" },
      { text: "Daily meals (breakfast, lunch & dinner)" },
      { text: "Expert trekking guide throughout" },
      { text: "Adam's Peak and Horton Plains entry fees" },
      { text: "Waterfall excursions and permits" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [2, 8, 9],
  },
  {
    id: 5,
    title: "Cultural Heritage Tour",
    days: 6,
    price: "$749 P/P",
    priceRaw: 749,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour5.jpg",
    galleryImages: [
      "/homepage/tour1.jpg",
      "/tourspage/tour6.jpg",
      "/tourspage/tour3.jpg",
    ],
    description:
      "Dive into 2,500 years of civilisation on a tour that threads through the Cultural Triangle, ancient kingdoms and living Buddhist traditions. See the island's greatest UNESCO sites in their full glory.",
    highlights: [
      {
        icon: "globe",
        title: "UNESCO Heritage",
        desc: "Visit five UNESCO World Heritage Sites including Sigiriya, Polonnaruwa and Anuradhapura.",
      },
      {
        icon: "utensils",
        title: "Traditional Cuisine",
        desc: "Join cooking classes and temple-side rice & curry lunches with local families.",
      },
      {
        icon: "camera",
        title: "Ancient Frescoes",
        desc: "Witness the famous Sigiriya frescoes and Dambulla Cave temple paintings up close.",
      },
      {
        icon: "shield",
        title: "Expert Guides",
        desc: "Archaeologist-led tours provide context and stories that guidebooks can't capture.",
      },
    ],
    tourDates: { start: "August 8th", end: "14th, 2026" },
    tourType: "Private Group Tour",
    route: ["Anuradhapura", "Sigiriya", "Dambulla", "Polonnaruwa", "Kandy"],
    agenda: [
      {
        day: 1,
        location: "ANURADHAPURA",
        title: "Arrival & Anuradhapura",
        subtitle: "Sacred Bo Tree and Ruwanwelisaya stupa",
        image: "/tourspage/tour5.jpg",
      },
      {
        day: 2,
        location: "ANURADHAPURA",
        title: "Ancient City Exploration",
        subtitle: "Jetavanarama and moonstone carvings",
      },
      {
        day: 3,
        location: "SIGIRIYA",
        title: "Sigiriya Rock Fortress",
        subtitle: "Mirror Wall frescoes and water gardens",
      },
      {
        day: 4,
        location: "DAMBULLA",
        title: "Dambulla Cave Temples",
        subtitle: "Five royal caves and gold Buddha statues",
      },
      {
        day: 5,
        location: "POLONNARUWA",
        title: "Polonnaruwa Kingdom",
        subtitle: "Gal Vihara and mediaeval palace ruins",
      },
      {
        day: 6,
        location: "KANDY",
        title: "Kandy & Departure",
        subtitle: "Tooth Temple and Perahera cultural show",
      },
    ],
    included: [
      { text: "Accommodation in heritage boutique hotels" },
      { text: "All transfers with air-conditioned vehicle" },
      { text: "Daily breakfast and selected lunches" },
      { text: "Archaeologist-led guided tours" },
      { text: "All entrance fees to UNESCO sites" },
      { text: "Traditional cooking class" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [1, 4, 9],
  },
  {
    id: 6,
    title: "Sri Lanka Family Gateway",
    days: 7,
    price: "$899 P/P",
    priceRaw: 899,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour6.jpg",
    galleryImages: [
      "/tourspage/tour3.jpg",
      "/homepage/tour1.jpg",
      "/tourspage/tour5.jpg",
    ],
    description:
      "Designed for families with children of all ages, this perfectly paced tour blends wildlife encounters, beach time and gentle cultural experiences — creating memories the whole family will treasure for a lifetime.",
    highlights: [
      {
        icon: "mountain",
        title: "Elephant Encounters",
        desc: "Visit Pinnawala Elephant Orphanage and watch gentle giants bathe in the river.",
      },
      {
        icon: "waves",
        title: "Beach Family Fun",
        desc: "Safe swimming beaches on the west coast with calm waters and water sports.",
      },
      {
        icon: "camera",
        title: "Wildlife Safaris",
        desc: "Family-friendly jeep safaris at Yala with a specialist guide keeping kids engaged.",
      },
      {
        icon: "utensils",
        title: "Kid-Friendly Meals",
        desc: "Every meal planned with children in mind — familiar flavours alongside local tastes.",
      },
    ],
    tourDates: { start: "July 18th", end: "25th, 2026" },
    tourType: "Private Group Tour",
    route: ["Colombo", "Pinnawala", "Kandy", "Yala", "Bentota"],
    agenda: [
      {
        day: 1,
        location: "COLOMBO",
        title: "Arrival in Colombo",
        subtitle: "Airport transfer and hotel check-in",
        image: "/tourspage/tour6.jpg",
      },
      {
        day: 2,
        location: "PINNAWALA",
        title: "Elephant Orphanage",
        subtitle: "Feeding and bathing session with elephants",
      },
      {
        day: 3,
        location: "KANDY",
        title: "Kandy Cultural Day",
        subtitle: "Cultural show and Botanic Gardens",
      },
      {
        day: 4,
        location: "YALA",
        title: "Kandy to Yala",
        subtitle: "Afternoon settle in and sunset safari",
      },
      {
        day: 5,
        location: "YALA",
        title: "Full-Day Yala Safari",
        subtitle: "Morning & evening family jeep safaris",
      },
      {
        day: 6,
        location: "BENTOTA",
        title: "Yala to Bentota Beach",
        subtitle: "Beach resort check-in and water sports",
      },
      {
        day: 7,
        location: "COLOMBO",
        title: "Bentota & Departure",
        subtitle: "Leisure morning and airport transfer",
      },
    ],
    included: [
      { text: "Family-friendly hotel & resort accommodation" },
      { text: "All private transfers with child seats" },
      { text: "Daily breakfast and selected dinners" },
      { text: "Pinnawala Elephant Orphanage entry" },
      { text: "Yala family safari with specialist guide" },
      { text: "Bentota beach water sports session" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [1, 3, 5],
  },
  {
    id: 7,
    title: "Sri Lanka Wellness Retreat",
    days: 7,
    price: "$1,099 P/P",
    priceRaw: 1099,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour7.jpg",
    galleryImages: [
      "/tourspage/tour3.jpg",
      "/tourspage/tour5.jpg",
      "/homepage/tour1.jpg",
    ],
    description:
      "Restore your body and mind in some of Sri Lanka's most serene settings. From Ayurvedic treatments in Kandy to sunrise yoga on Unawatuna beach, every moment is crafted to bring deep renewal.",
    highlights: [
      {
        icon: "shield",
        title: "Ayurvedic Healing",
        desc: "Receive authentic treatments at NABH-certified Ayurvedic centres in Kandy and the south.",
      },
      {
        icon: "mountain",
        title: "Sunrise Yoga",
        desc: "Daily dawn yoga sessions overlooking misty hills, rice paddies and the Indian Ocean.",
      },
      {
        icon: "utensils",
        title: "Wellness Cuisine",
        desc: "Plant-based, nutritionist-curated menus using organic locally sourced ingredients.",
      },
      {
        icon: "waves",
        title: "Nature Meditations",
        desc: "Guided forest bathing and silent meditation walks through botanical gardens.",
      },
    ],
    tourDates: { start: "September 3rd", end: "10th, 2026" },
    tourType: "Private Group Tour",
    route: ["Kandy", "Nuwara Eliya", "Ella", "Unawatuna", "Tangalle"],
    agenda: [
      {
        day: 1,
        location: "KANDY",
        title: "Arrival & Kandy",
        subtitle: "Ayurvedic consultation and initial treatments",
        image: "/tourspage/tour7.jpg",
      },
      {
        day: 2,
        location: "KANDY",
        title: "Ayurvedic Immersion",
        subtitle: "Full-day Panchakarma and herbal bath",
      },
      {
        day: 3,
        location: "NUWARA ELIYA",
        title: "Kandy to Nuwara Eliya",
        subtitle: "Yoga at dawn, tea-estate walk",
      },
      {
        day: 4,
        location: "ELLA",
        title: "Nuwara Eliya to Ella",
        subtitle: "Meditation and scenic train to Ella",
      },
      {
        day: 5,
        location: "UNAWATUNA",
        title: "Ella to Unawatuna",
        subtitle: "Beach yoga and snorkelling",
      },
      {
        day: 6,
        location: "TANGALLE",
        title: "Unawatuna to Tangalle",
        subtitle: "Silent beach walk and sunset meditation",
      },
      {
        day: 7,
        location: "COLOMBO",
        title: "Tangalle & Departure",
        subtitle: "Morning wellness breakfast and airport transfer",
      },
    ],
    included: [
      { text: "Ayurvedic resort and wellness lodge stays" },
      { text: "Daily wellness cuisine (breakfast & dinner)" },
      { text: "Ayurvedic treatments (2 full sessions)" },
      { text: "Daily yoga and meditation classes" },
      { text: "All transfers with private vehicle" },
      { text: "Guided forest bathing and nature walks" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [3, 5, 6],
  },
  {
    id: 8,
    title: "Ultimate Adventure Tour",
    days: 10,
    price: "$1,399 P/P",
    priceRaw: 1399,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour8.jpg",
    galleryImages: [
      "/tourspage/tour2.jpg",
      "/tourspage/tour4.jpg",
      "/tourspage/tour9.jpg",
    ],
    description:
      "The most action-packed Sri Lanka experience available — white-water rafting in Kitulgala, surfing at Arugam Bay, scaling Adam's Peak, Yala safari, and cliff diving at Mirissa. Not for the faint-hearted.",
    highlights: [
      {
        icon: "waves",
        title: "White-Water Rafting",
        desc: "Tackle Grade 3–4 rapids on the Kelani River in Kitulgala, Sri Lanka's rafting capital.",
      },
      {
        icon: "mountain",
        title: "Surfing at Arugam",
        desc: "Ride world-class waves at Arugam Bay, ranked among Asia's top 10 surf spots.",
      },
      {
        icon: "camera",
        title: "Yala Night Safari",
        desc: "Exclusive nocturnal game drive to spot leopards and sloth bears after dark.",
      },
      {
        icon: "car",
        title: "Cliff Diving",
        desc: "Leap from the dramatic sea cliffs of Mirissa into the deep blue Indian Ocean.",
      },
    ],
    tourDates: { start: "October 5th", end: "15th, 2026" },
    tourType: "Private Group Tour",
    route: [
      "Colombo",
      "Kitulgala",
      "Adam's Peak",
      "Arugam Bay",
      "Yala",
      "Mirissa",
    ],
    agenda: [
      {
        day: 1,
        location: "COLOMBO",
        title: "Arrival & Briefing",
        subtitle: "Airport transfer and adventure kit fitting",
        image: "/tourspage/tour8.jpg",
      },
      {
        day: 2,
        location: "KITULGALA",
        title: "White-Water Rafting Day",
        subtitle: "Grade 3–4 rapids and cliff jumping",
      },
      {
        day: 3,
        location: "KITULGALA",
        title: "Kelani River Kayaking",
        subtitle: "Morning kayak and jungle waterfall hike",
      },
      {
        day: 4,
        location: "ADAM'S PEAK",
        title: "Sacred Climb",
        subtitle: "Midnight ascent for spectacular sunrise",
      },
      {
        day: 5,
        location: "ELLA",
        title: "Adam's Peak to Ella",
        subtitle: "Recovery day and Ella Rock gentle hike",
      },
      {
        day: 6,
        location: "ARUGAM BAY",
        title: "Ella to Arugam Bay",
        subtitle: "East coast transfer and evening surf",
      },
      {
        day: 7,
        location: "ARUGAM BAY",
        title: "Surf Day",
        subtitle: "Full-day surf lessons and open ocean swim",
      },
      {
        day: 8,
        location: "YALA",
        title: "Arugam Bay to Yala",
        subtitle: "Afternoon arrival and dusk game drive",
      },
      {
        day: 9,
        location: "YALA",
        title: "Yala Night Safari",
        subtitle: "Exclusive nocturnal leopard-spotting drive",
      },
      {
        day: 10,
        location: "MIRISSA",
        title: "Yala to Mirissa & Departure",
        subtitle: "Cliff diving, whale watching, airport transfer",
      },
    ],
    included: [
      { text: "Adventure lodges and boutique hotel stays" },
      { text: "All activity equipment and safety gear" },
      { text: "Daily breakfast and post-activity meals" },
      { text: "Certified rafting and surf instructors" },
      { text: "Yala night safari with specialist tracker" },
      { text: "All national park and activity entry fees" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Travel insurance (mandatory for this tour)" },
      { text: "Optional activities" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [2, 4, 9],
  },
  {
    id: 9,
    title: "Wildlife & Nature Explorer",
    days: 7,
    price: "$899 P/P",
    priceRaw: 899,
    rating: 4,
    reviews: 110,
    heroImage: "/tourspage/tour9.jpg",
    galleryImages: [
      "/tourspage/tour2.jpg",
      "/tourspage/tour8.jpg",
      "/tourspage/tour4.jpg",
    ],
    description:
      "Discover Sri Lanka's wild side on a nature-first expedition. From birdwatching in Bundala to elephant herds at Minneriya and leopard-spotting in Yala, this tour is a wildlife photographer's paradise.",
    highlights: [
      {
        icon: "camera",
        title: "Bird Photography",
        desc: "Spot 250+ species including the Sri Lanka blue magpie and painted stork in Bundala.",
      },
      {
        icon: "mountain",
        title: "Elephant Gathering",
        desc: "Witness hundreds of wild elephants at Minneriya during the world's greatest elephant gathering.",
      },
      {
        icon: "waves",
        title: "Marine Wildlife",
        desc: "Snorkel Hikkaduwa's coral reefs and spot sea turtles nesting on Rekawa beach at night.",
      },
      {
        icon: "globe",
        title: "Expert Naturalists",
        desc: "All guides are certified naturalists who share deep ecological knowledge throughout.",
      },
    ],
    tourDates: { start: "November 6th", end: "13th, 2026" },
    tourType: "Private Group Tour",
    route: ["Minneriya", "Sigiriya", "Sinharaja", "Bundala", "Yala"],
    agenda: [
      {
        day: 1,
        location: "MINNERIYA",
        title: "Arrival & Minneriya",
        subtitle: "The Gathering – hundreds of wild elephants",
        image: "/tourspage/tour9.jpg",
      },
      {
        day: 2,
        location: "SIGIRIYA",
        title: "Minneriya to Sigiriya",
        subtitle: "Morning birdwatching and rock fortress",
      },
      {
        day: 3,
        location: "SINHARAJA",
        title: "Sigiriya to Sinharaja",
        subtitle: "Rainforest birdwatching with naturalist",
      },
      {
        day: 4,
        location: "SINHARAJA",
        title: "Sinharaja Deep Forest",
        subtitle: "Endemic species trail and waterfall pool",
      },
      {
        day: 5,
        location: "BUNDALA",
        title: "Sinharaja to Bundala",
        subtitle: "Wetland bird safari and flamingo sighting",
      },
      {
        day: 6,
        location: "YALA",
        title: "Bundala to Yala",
        subtitle: "Afternoon game drive – leopard tracking",
      },
      {
        day: 7,
        location: "COLOMBO",
        title: "Yala Full Safari & Departure",
        subtitle: "Dawn game drive and airport transfer",
      },
    ],
    included: [
      { text: "Nature lodges and eco-resort accommodation" },
      { text: "All transfers with wildlife-specialist guide" },
      { text: "Daily meals (breakfast, lunch & dinner)" },
      { text: "Minneriya, Yala and Bundala safari fees" },
      { text: "Sinharaja guided rainforest trek" },
      { text: "Turtle nesting beach night tour" },
      { text: "All local taxes and service charges" },
    ],
    notIncluded: [
      { text: "International flights" },
      { text: "Personal expenses" },
      { text: "Optional activities" },
      { text: "Travel insurance" },
      { text: "Tips for guides and drivers" },
    ],
    relatedTours: [2, 4, 8],
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
        "YOUR_SERVICE_ID", // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // replace with your EmailJS template ID
        {
          to_email: "lishanichamathka2003@gmail.com",
          tour_title: tour.title,
          tour_days: tour.days,
          tour_price: tour.price,
          first_name: firstName,
          last_name: lastName,
          adults: adults,
          kids: kids,
          email: email,
          phone: phone,
          country: country || "Not specified",
          extra: extra || "None",
        },
        "YOUR_PUBLIC_KEY", // replace with your EmailJS public key
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
      {/* ── Success Popup ── */}
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
        <h3 className="td-inquiry-title">Inquire Now</h3>
        <p className="td-inquiry-sub">
          Ready to embark on your Sri Lanka adventure? Fill in your details and
          our team will get back to you within 24 hours.
        </p>

        {/* Form Card */}
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
                <select
                  className="td-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Canada</option>
                  <option>Japan</option>
                  <option>India</option>
                  <option>Singapore</option>
                  <option>Other</option>
                </select>
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
      icon: <Phone size={18}/>,
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
          position: relative;
          width: 100%;
          min-height: 650px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .au-hero-bg {
          position: absolute; inset: 0;
          background: url('/tourspage/tour-detail-bg.jpg') center / cover no-repeat;
          transform: scale(1.06);
          transition: transform 9s ease;
        }
        .au-hero-bg.visible { transform: scale(1); }
        .au-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.62) 100%);
        }
        .au-hero-content {
          position: relative; z-index: 2;
          padding: 0 24px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .au-hero-content.visible { opacity: 1; transform: translateY(0); }
        .au-hero-title {
          font-size: clamp(2.8rem, 7.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          max-width: 600px;
        }
        .au-hero-sub {
          font-size: clamp(0.82rem, 1.8vw, 1rem);
          color: #C7C7C7;
          font-weight: 400;
          letter-spacing: 0.04em;
          margin-bottom: 36px;
          max-width: 670px;
          margin-left: auto; margin-right: auto;
        }
          
        /* ── OVERVIEW SECTION ── */
        .td-overview {
        padding: clamp(48px, 6vw, 0px) clamp(24px, 6vw, 80px);
        display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 4vw, 56px);
        align-items: start;
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

        /* Gallery right column */
        .td-overview-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .td-gallery-desc {
          font-size: clamp(0.8rem, 1.3vw, 0.88rem);
          color: #999;
          line-height: 1.8;
          font-weight: 400;
        }

        .td-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          gap: 10px;
          align-items: start;
        }

        /* Left column wrapper */
        .td-gallery-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .td-gallery-img {
          border-radius: 16px;
          overflow: hidden;
          width: 100%;
        }

        .td-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .td-gallery-img:hover img {
          transform: scale(1.05);
        }

        /* Left column - image 1 (tall top) */
        .td-gallery-col:first-child .td-gallery-img:nth-child(1) {
          height: 300px;
          margin-top: 60px;
          border-radius: 30px;
        }

        /* Left column - image 2 (short bottom) */
        .td-gallery-col:first-child .td-gallery-img:nth-child(2) {
          height: 200px;
          border-radius: 30px;
        }

        /* Right column - image 1 (short top) */
        .td-gallery-col:last-child .td-gallery-img:nth-child(1) {
          height: 200px;
          border-radius: 30px;
        }

        /* Right column - image 2 (tall bottom) */
        .td-gallery-col:last-child .td-gallery-img:nth-child(2) {
          height: 300px;
          border-radius: 30px;
        }

        /* Highlights grid */
        .td-highlights {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 14px; margin-top: 4px;
        }
        .td-highlight-card {
          background: #F9F9F7; border: 1px solid #eee;
          border-radius: 14px; padding: 16px;
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
          background: #C3E1FB9D; border: 1.5px solid #C3E1FB9D;
          border-radius: 16px; padding: 20px 22px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .td-dates-label { font-size: 0.72rem; font-weight: 400; color: #212121; text-transform: uppercase; letter-spacing: 0.08em; }
        .td-dates-range {
          font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 600; color: #111;
        }
        .td-dates-route { display: flex; flex-wrap: wrap; gap: 6px; }
        .td-route-pill {
          background: #65ABEA2E; border: 1px solid #C3E1FB;
          border-radius: 9999px; padding: 4px 12px;
          font-size: 0.72rem; color: #555; font-weight: 400;
        }
        .td-dates-meta {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        font-size: 0.78rem;
        font-weight: 400;
        color: #212121;
        width: fit-content;
        backdrop-filter: blur(4px);
        }

        /* Right sticky card */
        .td-overview-right { position: sticky; top: 90px; }
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
        .td-contact-label { font-size: 0.75rem; font-weight: 600; color: #111; }
        .td-contact-value { font-size: 0.78rem; color: #555; }
        .td-contact-note  { font-size: 0.68rem; color: #aaa; }
        .td-wa-btn {
          width: 100%; background: #25D366; border: none; border-radius: 12px;
          padding: 13px; color: #fff; font-size: 0.86rem;
          font-family: 'Clash Display', sans-serif; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: background 0.22s, transform 0.18s; margin-top: 4px;
        }
        .td-wa-btn:hover { background: #1ebe5a; transform: translateY(-1px); }
        .td-qr-wrap {
          width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;
          padding: 16px; background: #F9F9F7; border-radius: 12px; border: 1px solid #eee;
        }
        .td-qr-label { font-size: 0.72rem; color: #aaa; }
        .td-qr-img { width: 110px; height: 110px; border-radius: 8px; border: 1px solid #eee; }

        /* ── AGENDA ── */
        .td-agenda-section {
          padding: clamp(40px, 5vw, 0px) clamp(24px, 6vw, 80px);
          background: #F9F9F7;
        }
        .td-section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 500;
          color: #111; line-height: 1.1; letter-spacing: -0.025em;
          margin-bottom: 8px;
        }
        .td-section-sub {
          font-size: clamp(0.78rem, 1.3vw, 0.86rem); color: #aaa;
          margin-bottom: clamp(24px, 4vw, 36px); line-height: 1.65;
        }
        .td-agenda-layout {
          display: grid; grid-template-columns: 1fr 380px; gap: clamp(24px, 4vw, 48px);
          align-items: start;
        }
        .td-agenda-list { display: flex; flex-direction: column; gap: 8px; }
        .td-agenda-item {
          border: 1px solid #C3E1FB4D; border-radius: 14px; overflow: hidden;
          background: #C3E1FB4D; cursor: pointer;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .td-agenda-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .td-agenda-item.open { border-color: var(--blue); box-shadow: 0 4px 20px rgba(101,171,234,0.15); }
        .td-agenda-header {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px;
        }
        .td-agenda-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #F0F0F0; border: 2px solid #e0e0e0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 600; color: #888; flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .td-agenda-item.open .td-agenda-dot {
          background: var(--blue); border-color: var(--blue); color: #fff;
        }
        .td-agenda-day-label { font-size: 0.65rem; font-weight: 400; color: #212121; text-transform: uppercase; letter-spacing: 0.08em; }
        .td-agenda-day-title { font-size: 0.92rem; font-weight: 600; color: #111; margin-top: 1px; }
        .td-agenda-day-sub   { font-size: 0.75rem; color: #aaa; margin-top: 1px; }
        .td-agenda-chevron   { margin-left: auto; color: #bbb; flex-shrink: 0; }
        .td-agenda-body {
          padding: 0;  /* remove the old padding */
          font-size: clamp(0.8rem, 1.3vw, 0.88rem);
          color: #555;
          line-height: 1;
          margin: 0;
        }
        /* Sticky image */
        .td-agenda-img-wrap {
          position: sticky; top: 90px;
          border-radius: 20px; overflow: hidden;
          height: clamp(240px, 30vw, 380px);
        }
        .td-agenda-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .td-agenda-body-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px 10px 64px;
        }

        .td-agenda-check-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          min-width: 20px;
          background-color: #65ABEA;
          border-radius: 50%;
          color: #fff;
        }

        .td-agenda-body {
          font-size: clamp(0.8rem, 1.3vw, 0.88rem);
          color: #555;
          line-height: 1;
          margin: 0;
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
        .td-inclusions-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 8px;
        }

        /* Each column is now a card */
        .td-incl-card {
          background: #F8F8F8;
          border: 1px solid #F8F8F8;
          border-radius: 18px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .td-incl-col { display: flex; flex-direction: column; gap: 10px; }

        .td-incl-col-title {
          font-size: 1rem; font-weight: 600; color: #111;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 4px;
        }

        /* Each row item */
        .td-incl-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ECFDF5;
          border: 1px solid #ECFDF5;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.8rem;
          color: #333;
          font-weight: 400;
        }
        .td-incl-item.no {
          border-color: #FFF1F2;
          background: #FFF1F2;
        }

        /* Left icon box */
        .td-incl-icon-left {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .td-incl-icon-green {
          background: #F8F8F8;
          color: #10B981;
          border: 1px solid #10B9814D;
        }
        .td-incl-icon-red {
          background: #F8F8F8;
          color: #FB7185;
          border: 1px solid #FB71854D;
        }

        /* Text fills middle */
        .td-incl-text { flex: 1; }

        /* Right check/x */
        .td-incl-check-right {
          color: #10B981; flex-shrink: 0;
        }
        .td-incl-x-right {
          color: #FB7185; flex-shrink: 0;
        }

       /* ── INQUIRY FORM ── */
      .td-inquiry-section {
        padding: clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px);
        background: #fff;
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: clamp(32px, 4vw, 56px);
        align-items: start;
      }
      .td-inquiry-form {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .td-inquiry-title {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        font-weight: 500; color: #111;
        letter-spacing: -0.025em; margin-bottom: 8px;
      }
      .td-inquiry-sub {
        font-size: 0.82rem; color: #aaa;
        line-height: 1.65; margin-bottom: 20px; max-width: 420px;
      }

      /* White form card wrapping the fields */
      .td-form-card {
        background: #F8F8F8;
        border: 1px solid #F8F8F8;
        border-radius: 18px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .td-form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 14px;
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
      .td-inquiry-side { display: flex; flex-direction: column; gap: 14px; position: sticky; top: 90px; }
      .td-side-card {
        background: #F8F8F8; border: 1px solid #F8F8F8; border-radius: 14px;
        padding: 16px 18px; display: flex; align-items: flex-start; gap: 12px;
        transition: box-shadow 0.22s, transform 0.22s;
      }
      .td-side-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
      .td-side-icon {
        width: 38px; height: 38px; border-radius: 10px;
        background: #C3E1FB; color: #000000;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .td-side-wa-card {
        background: #F8F8F8;
        border: 1px solid #F8F8F8;
        border-radius: 18px;
        padding: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        text-align: center;
      }

      /* Top row: icon + label side by side */
      .td-side-wa-header {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
      }

      .td-side-wa-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #E8F8EF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .td-side-wa-title {
        font-size: 0.92rem;
        font-weight: 600;
        color: #111;
      }

      /* QR image - large and square */
      .td-side-qr {
        width: 50%;
        aspect-ratio: 1;
        border: 1px solid #eee;
        object-fit: cover;
      }

      .td-side-wa-scan-text {
        font-size: 0.75rem;
        color: #aaa;
        margin: 0;
      }

      /* Chat Now button */
      .td-wa-btn {
        width: 100%;
        background: #25D366;
        border: none;
        border-radius: 9999px;
        padding: 13px;
        color: #fff;
        font-size: 0.88rem;
        font-family: 'Clash Display', sans-serif;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background 0.22s, transform 0.18s;
      }
      .td-wa-btn:hover {
        background: #1ebe5a;
        transform: translateY(-1px);
      }

      /* ── SUCCESS POPUP ── */
      .td-success-overlay {
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.45);
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
      }
      .td-success-modal {
        background: #fff; border-radius: 20px;
        padding: 40px 36px; max-width: 420px; width: 100%;
        display: flex; flex-direction: column; align-items: center;
        gap: 14px; text-align: center;
        animation: td-pop 0.3s ease;
      }
      @keyframes td-pop {
        from { transform: scale(0.88); opacity: 0; }
        to   { transform: scale(1);    opacity: 1; }
      }
      .td-success-icon {
        width: 64px; height: 64px; border-radius: 50%;
        background: #10B981;
        display: flex; align-items: center; justify-content: center;
      }
      .td-success-title {
        font-size: 1.4rem; font-weight: 600; color: #111;
      }
      .td-success-msg {
        font-size: 0.84rem; color: #777; line-height: 1.65; max-width: 320px;
      }
      .td-success-btn {
        margin-top: 8px; background: var(--blue); border: none;
        border-radius: 12px; padding: 12px 40px;
        color: #fff; font-size: 0.9rem;
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
        .td-related-card { border: 1px solid #eee; border-radius: 16px; overflow: hidden; background: #fff; transition: box-shadow 0.28s, transform 0.28s; }
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
        .td-related-desc  { font-size: 0.73rem; color: #999; line-height: 1.6; flex: 1; }
        .td-related-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
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
          .td-inquiry-section { grid-template-columns: 1fr; }
          .td-inquiry-side    { position: static; }
        }
        @media (max-width: 768px) {
          .td-highlights      { grid-template-columns: 1fr; }
          .td-inclusions-grid { grid-template-columns: 1fr; }
          .td-related-grid    { grid-template-columns: repeat(2, 1fr); }
          .td-related-sub     { padding-top: 0; }
        }
        @media (max-width: 580px) {
          .td-form-grid       { grid-template-columns: 1fr; }
          .td-field-full      { grid-column: 1; }
          .td-related-grid    { grid-template-columns: 1fr; }
          .au-hero { min-height: 400px; }
          .au-hero-content { padding: 0 12px; margin-top: 60px; }
          .td-gallery-col:first-child .td-gallery-img:nth-child(1) { height: 220px; margin-top: 40px; }
          .td-gallery-col:first-child .td-gallery-img:nth-child(2) { height: 160px; }
          .td-gallery-col:last-child .td-gallery-img:nth-child(1) { height: 160px; }
          .td-gallery-col:last-child .td-gallery-img:nth-child(2) { height: 220px; }
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

          {/* Right: description + photo gallery */}
          <div className="td-overview-right">
            <p className="td-gallery-desc">{tour.description}</p>
            <div className="td-gallery-grid">
              {/* Left column: tall top, short bottom */}
              <div className="td-gallery-col">
                <div className="td-gallery-img">
                  <img src={tour.heroImage} alt={tour.title} />
                </div>
                <div className="td-gallery-img">
                  <img src={tour.galleryImages[0]} alt={tour.title} />
                </div>
              </div>
              {/* Right column: short top, tall bottom */}
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

            {/* Sticky image showing active day's image or first available */}
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
            {/* What's Included card */}
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

            {/* Not Included card */}
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
