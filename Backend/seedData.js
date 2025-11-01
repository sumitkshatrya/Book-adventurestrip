// backend/seedData.js
import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination.js';


dotenv.config();

const sampleDestinations = [
  {
    title: "Kayaking Adventure",
    slug: "kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    images: [
      {
        url: "/uploads/kayaking.jpg",
        public_id: "kayaking-1"
      }
    ],
    description: "Explore the serene backwaters of Udupi with a guided kayaking adventure, perfect for nature lovers.",
    longDescription: "Embark on an unforgettable kayaking journey through the pristine backwaters of Udupi. This guided adventure is designed for both beginners and experienced kayakers, offering a unique perspective of Karnataka's coastal ecosystem. Our expert guides will lead you through tranquil waterways, hidden creeks, and mangrove forests teeming with biodiversity.",
    duration: "4 hours",
    groupSize: "2-8 people",
    difficulty: "Beginner",
    rating: 4.8,
    reviews: 127,
    category: "Water Sports",
    season: "All Year",
    ageLimit: "8+ years",
    languages: ["English", "Kannada", "Hindi"],
    highlights: [
      { text: "Guided kayaking tour through scenic backwaters" },
      { text: "Safety equipment and briefings provided" },
      { text: "Opportunities for bird watching and photography" },
      { text: "Refreshments and water provided" }
    ],
    includes: [
      { item: "Kayak and paddle rental" },
      { item: "Life jacket and safety gear" },
      { item: "Experienced guide" },
      { item: "Bottled water and snacks" }
    ],
    excludes: [
      { item: "Transportation to meeting point" },
      { item: "Personal expenses" },
      { item: "Gratuities (optional)" }
    ],
    itinerary: [
      { time: "6:00 AM", activity: "Meet at designated starting point", description: "Welcome and introductions" },
      { time: "6:15 AM", activity: "Safety briefing and equipment distribution", description: "Learn basic kayaking techniques" },
      { time: "6:45 AM", activity: "Start kayaking through backwaters", description: "Begin your journey through serene waterways" },
      { time: "8:30 AM", activity: "Break at scenic spot", description: "Refreshments and photography opportunity" }
    ],
    whatToBring: [
      { item: "Comfortable clothing that can get wet" },
      { item: "Sun protection (hat, sunscreen)" },
      { item: "Water shoes or sandals" },
      { item: "Change of clothes" }
    ],
    safety: [
      { measure: "All guides are certified in CPR and first aid" },
      { measure: "Safety equipment regularly inspected" },
      { measure: "Weather monitoring system in place" }
    ],
    reviewsList: [
      {
        name: "Priya Sharma",
        rating: 5,
        date: new Date("2024-01-15"),
        comment: "Absolutely amazing experience! The guides were knowledgeable and made us feel safe throughout.",
        avatar: "PS"
      }
    ],
    host: {
      name: "Adventure Udupi",
      verified: true,
      rating: 4.9,
      experiences: 245,
      responseRate: 98,
      responseTime: "Within 1 hour"
    },
    featured: true,
    available: true
  },
  {
    title: "Nandi Hills Sunrise Trek",
    slug: "sunrise-trekking",
    location: "Bangalore, Karnataka",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    images: [
      {
        url: "/uploads/sunrise.jpg",
        public_id: "sunrise-trek-1"
      }
    ],
    description: "Experience the breathtaking sunrise from Nandi Hills with a guided trekking tour.",
    longDescription: "Begin your day with an exhilarating trek to the summit of Nandi Hills, one of Karnataka's most popular sunrise viewpoints. This early morning adventure takes you through well-maintained trails surrounded by lush greenery and historic sites. As you ascend, watch the sky transform through a spectrum of colors before the golden sun emerges over the horizon.",
    duration: "6 hours",
    groupSize: "4-15 people",
    difficulty: "Easy",
    rating: 4.6,
    reviews: 89,
    category: "Trekking",
    season: "All Year",
    ageLimit: "12+ years",
    languages: ["English", "Kannada", "Hindi", "Tamil"],
    highlights: [
      { text: "Spectacular sunrise viewing from summit" },
      { text: "Guided trek with historical insights" },
      { text: "Visit ancient temples and fortifications" },
      { text: "Breakfast at local restaurant included" }
    ],
    includes: [
      { item: "Experienced trek guide" },
      { item: "Breakfast at local restaurant" },
      { item: "Entry tickets to Nandi Hills" },
      { item: "First aid kit and safety equipment" }
    ],
    excludes: [
      { item: "Personal expenses" },
      { item: "Additional food and beverages" },
      { item: "Hotel pickup and drop" }
    ],
    itinerary: [
      { time: "4:00 AM", activity: "Pickup from designated point", description: "Meet your guide and group" },
      { time: "5:00 AM", activity: "Reach base and start trek", description: "Begin ascent with headlamps" },
      { time: "6:00 AM", activity: "Reach summit for sunrise", description: "Watch spectacular sunrise" },
      { time: "7:00 AM", activity: "Explore historical sites", description: "Visit temples and fort ruins" }
    ],
    whatToBring: [
      { item: "Comfortable trekking shoes" },
      { item: "Warm jacket (mornings can be cool)" },
      { item: "Water bottle" },
      { item: "Headlamp or flashlight" }
    ],
    safety: [
      { measure: "Experienced mountain guides" },
      { measure: "First aid certified leaders" },
      { measure: "Regular weather updates" }
    ],
    reviewsList: [
      {
        name: "Anita Desai",
        rating: 5,
        date: new Date("2024-01-12"),
        comment: "Worth waking up early! The sunrise was magical and our guide was fantastic.",
        avatar: "AD"
      }
    ],
    host: {
      name: "Bangalore Treks",
      verified: true,
      rating: 4.8,
      experiences: 189,
      responseRate: 95,
      responseTime: "Within 2 hours"
    },
    featured: true,
    available: true
  },
  {
    title: "Coffee Trail Experience",
    slug: "coffee-trail",
    location: "Coorg, Karnataka",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    images: [
      {
        url: "/uploads/coffeetrail.jpg",
        public_id: "coffee-trail-1"
      }
    ],
    description: "Discover the rich flavors of Coorg's coffee plantations with an immersive coffee trail tour.",
    longDescription: "Immerse yourself in the world of coffee with this exclusive tour through Coorg's famous coffee plantations. Known as the 'Scotland of India', Coorg offers not just stunning landscapes but also some of the finest coffee in the world. Your journey begins with a walk through lush coffee estates where you'll learn about different coffee varieties, cultivation techniques, and the journey from bean to cup.",
    duration: "5 hours",
    groupSize: "2-10 people",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 156,
    category: "Cultural Experience",
    season: "September to March",
    ageLimit: "All ages",
    languages: ["English", "Kannada", "Kodava"],
    highlights: [
      { text: "Guided plantation walk" },
      { text: "Coffee processing demonstration" },
      { text: "Coffee tasting session" },
      { text: "Traditional Coorgi lunch" }
    ],
    includes: [
      { item: "Plantation entry fees" },
      { item: "Coffee tasting session" },
      { item: "Traditional Coorgi lunch" },
      { item: "Expert guide" }
    ],
    excludes: [
      { item: "Transportation to plantation" },
      { item: "Additional purchases" },
      { item: "Alcoholic beverages" }
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Meet at plantation", description: "Welcome drink and introduction" },
      { time: "9:30 AM", activity: "Coffee plantation walk", description: "Learn about coffee cultivation" },
      { time: "11:00 AM", activity: "Processing demonstration", description: "See roasting and grinding" },
      { time: "12:00 PM", activity: "Coffee tasting session", description: "Sample different coffee varieties" }
    ],
    whatToBring: [
      { item: "Comfortable walking shoes" },
      { item: "Hat and sunscreen" },
      { item: "Camera" },
      { item: "Water bottle" }
    ],
    safety: [
      { measure: "Well-maintained walking paths" },
      { measure: "Experienced local guides" },
      { measure: "First aid available" }
    ],
    reviewsList: [
      {
        name: "Deepak Patel",
        rating: 5,
        date: new Date("2024-01-08"),
        comment: "As a coffee lover, this was paradise! Learned so much and the coffee samples were amazing.",
        avatar: "DP"
      }
    ],
    host: {
      name: "Coorg Plantation Tours",
      verified: true,
      rating: 4.9,
      experiences: 312,
      responseRate: 99,
      responseTime: "Within 1 hour"
    },
    featured: true,
    available: true
  },
  {
    title: "Sunderbans Boat Cruise",
    slug: "boat-cruise",
    location: "Sunderbans, West Bengal",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    images: [
      {
        url: "/uploads/boatcruise.jpg",
        public_id: "boat-cruise-1"
      }
    ],
    description: "Enjoy a relaxing boat cruise through the scenic waterways of the Sunderbans.",
    longDescription: "Embark on an unforgettable journey through the mystical mangrove forests of Sunderbans, a UNESCO World Heritage Site. This full-day boat cruise takes you deep into the largest tidal halophytic mangrove forest in the world, home to the famous Royal Bengal Tiger and countless other species.",
    duration: "8 hours",
    groupSize: "10-20 people",
    difficulty: "Easy",
    rating: 4.7,
    reviews: 203,
    category: "Wildlife",
    season: "October to March",
    ageLimit: "5+ years",
    languages: ["English", "Bengali", "Hindi"],
    highlights: [
      { text: "Wildlife spotting opportunities" },
      { text: "Mangrove forest exploration" },
      { text: "Bird watching paradise" },
      { text: "Comfortable boat with viewing deck" }
    ],
    includes: [
      { item: "Boat cruise with viewing deck" },
      { item: "Lunch and refreshments" },
      { item: "Expert naturalist guide" },
      { item: "Park entry fees and permits" }
    ],
    excludes: [
      { item: "Transportation to starting point" },
      { item: "Personal expenses" },
      { item: "Additional snacks" }
    ],
    itinerary: [
      { time: "6:00 AM", activity: "Board the cruise", description: "Safety briefing and introduction" },
      { time: "7:00 AM", activity: "Start wildlife spotting", description: "Cruise through main channels" },
      { time: "10:00 AM", activity: "Visit watchtower", description: "Elevated wildlife viewing" },
      { time: "12:00 PM", activity: "Lunch on board", description: "Traditional Bengali cuisine" }
    ],
    whatToBring: [
      { item: "Binoculars (optional)" },
      { item: "Camera with zoom lens" },
      { item: "Sun protection" },
      { item: "Light jacket" }
    ],
    safety: [
      { measure: "Experienced boat crew" },
      { measure: "Life jackets for all passengers" },
      { measure: "First aid certified guide" }
    ],
    reviewsList: [
      {
        name: "Sunita Roy",
        rating: 4,
        date: new Date("2024-01-05"),
        comment: "Amazing experience! Saw plenty of wildlife. The naturalist was very knowledgeable.",
        avatar: "SR"
      }
    ],
    host: {
      name: "Sunderbans Eco Tours",
      verified: true,
      rating: 4.7,
      experiences: 178,
      responseRate: 96,
      responseTime: "Within 3 hours"
    },
    featured: false,
    available: true
  },
  {
    title: "Bungy Jumping Adventure",
    slug: "bungy-jumping",
    location: "Manali, Himachal Pradesh",
    price: 2999,
    originalPrice: 3499,
    discount: 14,
    images: [
      {
        url: "/uploads/bungyjumping.jpg",
        public_id: "bungy-1"
      }
    ],
    description: "Experience the ultimate thrill of bungy jumping in the picturesque landscapes of Manali.",
    longDescription: "Take the leap of a lifetime with our professional bungy jumping experience in the breathtaking setting of Manali. This adrenaline-pumping adventure is conducted at one of India's highest bungy jumping platforms, offering stunning views of the mountains and valleys.",
    duration: "3 hours",
    groupSize: "1-6 people",
    difficulty: "Extreme",
    rating: 4.8,
    reviews: 342,
    category: "Adventure Sports",
    season: "March to November",
    ageLimit: "18-50 years",
    languages: ["English", "Hindi"],
    highlights: [
      { text: "One of highest bungy jumps in India" },
      { text: "Professional safety standards" },
      { text: "Stunning mountain backdrop" },
      { text: "Certificate of bravery" }
    ],
    includes: [
      { item: "Bungy jump equipment" },
      { item: "Safety harness and gear" },
      { item: "Professional instructors" },
      { item: "Certificate of participation" }
    ],
    excludes: [
      { item: "Transportation to site" },
      { item: "Additional video packages" },
      { item: "Meals and refreshments" }
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Registration and briefing", description: "Paperwork and safety video" },
      { time: "9:30 AM", activity: "Safety equipment fitting", description: "Harness fitting and weight check" },
      { time: "10:00 AM", activity: "Bungy jump session", description: "Your thrilling jump" },
      { time: "11:30 AM", activity: "Certificate distribution", description: "Receive your bravery certificate" }
    ],
    whatToBring: [
      { item: "Comfortable clothing" },
      { item: "Closed-toe shoes" },
      { item: "Camera (for non-jumping companions)" },
      { item: "Water bottle" }
    ],
    safety: [
      { measure: "International safety standards" },
      { measure: "Regular equipment inspection" },
      { measure: "Experienced jump masters" }
    ],
    reviewsList: [
      {
        name: "Vikram Singh",
        rating: 5,
        date: new Date("2024-01-03"),
        comment: "Most thrilling experience of my life! The team was professional and made me feel safe.",
        avatar: "VS"
      }
    ],
    host: {
      name: "Manali Adventure Zone",
      verified: true,
      rating: 4.9,
      experiences: 567,
      responseRate: 98,
      responseTime: "Within 1 hour"
    },
    featured: true,
    available: true
  },
  {
    title: "White Water Rafting",
    slug: "white-water-rafting",
    location: "Rishikesh, Uttarakhand",
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    images: [
      {
        url: "/uploads/kayaking1.jpg",
        public_id: "kayaking-1"
      }
    ],
    description: "Experience the thrill of white water rafting in the holy waters of Ganga in Rishikesh.",
    longDescription: "Get ready for an adrenaline-packed adventure as you navigate the rapids of the Ganges River in Rishikesh, the yoga capital of the world. This white water rafting experience offers the perfect blend of adventure and spiritual ambiance.",
    duration: "3 hours",
    groupSize: "4-8 people",
    difficulty: "Moderate",
    rating: 4.7,
    reviews: 289,
    category: "Water Sports",
    season: "September to June",
    ageLimit: "14+ years",
    languages: ["English", "Hindi"],
    highlights: [
      { text: "Grade 3-4 rapids" },
      { text: "Professional river guides" },
      { text: "Safety equipment provided" },
      { text: "Beautiful riverside scenery" }
    ],
    includes: [
      { item: "Rafting equipment" },
      { item: "Life jackets and helmets" },
      { item: "Professional guide" },
      { item: "Safety kayaker" }
    ],
    excludes: [
      { item: "Transportation to starting point" },
      { item: "Meals" },
      { item: "Personal expenses" }
    ],
    itinerary: [
      { time: "8:00 AM", activity: "Briefing and equipment", description: "Safety instructions and gear fitting" },
      { time: "8:30 AM", activity: "Start rafting", description: "Begin your river adventure" },
      { time: "10:30 AM", activity: "Mid-point break", description: "Rest and refresh" },
      { time: "11:00 AM", activity: "Continue rafting", description: "Navigate remaining rapids" }
    ],
    whatToBring: [
      { item: "Swimwear" },
      { item: "Change of clothes" },
      { item: "Waterproof camera" },
      { item: "Sunscreen" }
    ],
    safety: [
      { measure: "Certified river guides" },
      { measure: "Safety briefing before start" },
      { measure: "Rescue equipment on standby" }
    ],
    reviewsList: [
      {
        name: "Rajesh Kumar",
        rating: 5,
        date: new Date("2024-01-10"),
        comment: "Incredible experience! The rapids were thrilling and the guides were amazing.",
        avatar: "RK"
      }
    ],
    host: {
      name: "Rishikesh Adventure Camp",
      verified: true,
      rating: 4.8,
      experiences: 423,
      responseRate: 97,
      responseTime: "Within 2 hours"
    },
    featured: false,
    available: true
  },
  {
    title: "Ice Climbing Expedition",
    slug: "ice-climbing",
    location: "Gulmarg, Jammu & Kashmir",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    images: [
      {
        url: "/uploads/iceClimbing.jpg",
        public_id: "ice-Climbing"
      }
    ],
    description: "Challenge yourself with an exhilarating ice climbing expedition in the snowy terrains of Gulmarg.",
    longDescription: "Experience the thrill of ice climbing in the stunning winter landscapes of Gulmarg. This expedition is designed for adventure enthusiasts looking to test their skills on frozen waterfalls and ice formations under the guidance of experienced instructors.",
    duration: " 5 hours",
    groupSize: "6-15 people",
    difficulty: "Easy",
    rating: 4.5,
    reviews: 178,
    category: "Adventure Sports",
    season: "December to February",
    ageLimit: "All ages",
    languages: ["English", "Hindi", "Rajasthani"],
    highlights: [
      { text: "Guided ice climbing on frozen waterfalls" },
      { text: "All necessary climbing equipment provided" },
      { text: "Safety briefing and training session" },
      { text: "Stunning winter scenery" }
    ],
    includes: [
      { item: "Climbing gear (crampons, ice axes, harness)" },
      { item: "Safety equipment" },
      { item: "Experienced climbing instructors" },
      { item: "Hot beverages after climb" }
    ],
    excludes: [
      { item: "Hotel transfers" },
      { item: "Personal expenses" },
      { item: "Additional activities" }
    ],
    itinerary: [
      {
      day: "Day 1",
      title: "Arrival and Ice Climbing Session",
      details:
        "Meet at the Manali base camp early morning. After safety briefing and equipment check, begin the climb on a nearby frozen waterfall under instructor supervision. Post-climb, relax with hot beverages and local snacks."
    }
    ],
    whatToBring: [
      { item: "Warm layered clothing" },
    { item: "Waterproof gloves" },
    { item: "Sunglasses and sunscreen" },
    { item: "Camera/GoPro" },
    { item: "Thermal jacket (essential in evenings)" }
    ],
    safety: [
      { measure: "Certified mountaineering guides" },
    { measure: "First aid and oxygen support on site" },
    { measure: "Emergency evacuation plan" }
    ],
    reviewsList: [
      {
        name: "Meera Singh",
        rating: 4,
        date: new Date("2024-01-07"),
        comment: "Beautiful experience! The cultural performances and food were amazing.",
        avatar: "MS"
      }
    ],
    host: {
      name: "Himalayan Climb Adventures",
      verified: true,
      rating: 4.6,
      experiences: 234,
      responseRate: 94,
      responseTime: "Within 4 hours"
    },
    featured: false,
    available: true
  },
 {
  title: "Sunrise Hike at Bir Hills",
  slug: "sunrise-hike-bir",
  location: "Bir Billing, Himachal Pradesh",
  price: 1499,
  originalPrice: 1999,
  discount: 25,
  images: [
    {
      url: "/uploads/sunrise1.jpg",
      public_id: "Sunrise1"
    },
  ],
  description:
    "Witness a magical sunrise over the Himalayas with a guided morning hike in Bir Billing.",
  longDescription:
    "Start your day early and hike up to a serene viewpoint overlooking the Himalayan valleys of Bir Billing. Experience the golden sunrise lighting up the misty peaks while enjoying the calm of nature. Led by experienced local guides, this short trek offers the perfect blend of adventure and peace, ending with warm tea and breathtaking views.",
  duration: "3 hours",
  groupSize: "5-12 people",
  difficulty: "Easy",
  rating: 4.8,
  reviews: 276,
  category: "Nature & Hiking",
  season: "Throughout the year (best from October to April)",
  ageLimit: "10+ years",
  languages: ["English", "Hindi"],
  highlights: [
    { text: "Guided early morning hike" },
    { text: "Breathtaking Himalayan sunrise views" },
    { text: "Tea and snacks at the viewpoint" },
    { text: "Photography opportunities" }
  ],
  includes: [
    { item: "Local guide" },
    { item: "Morning tea and light snacks" },
    { item: "Basic first aid" },
    { item: "Trekking permit (if applicable)" }
  ],
  excludes: [
    { item: "Hotel pickup/drop-off" },
    { item: "Personal expenses" },
    { item: "Meals not mentioned" }
  ],
  itinerary: [
    {
      time: "4:30 AM",
      activity: "Assemble at meeting point",
      description: "Meet your guide and get a quick briefing before starting."
    },
    {
      time: "5:00 AM",
      activity: "Start the hike",
      description: "Walk through forest trails under starlight."
    },
    {
      time: "6:15 AM",
      activity: "Reach viewpoint and enjoy sunrise",
      description: "Watch the sky turn golden and enjoy tea with a view."
    },
    {
      time: "7:30 AM",
      activity: "Descend back to Bir",
      description: "Return to the starting point after the experience."
    }
  ],
  whatToBring: [
    { item: "Warm clothing" },
    { item: "Trekking shoes" },
    { item: "Water bottle" },
    { item: "Camera" },
    { item: "Cap or headlamp" }
  ],
  safety: [
    { measure: "Experienced local guides" },
    { measure: "First aid available" },
    { measure: "Small group size for safety" }
  ],
  reviewsList: [
    {
      name: "Priya Mehta",
      rating: 5,
      date: new Date("2024-02-10"),
      comment:
        "A peaceful and mesmerizing morning! The sunrise view was unforgettable.",
      avatar: "PM"
    },
    {
      name: "Rohit Sharma",
      rating: 4,
      date: new Date("2024-03-18"),
      comment:
        "Beautiful trail and great guide. Would recommend carrying gloves—it gets chilly!",
      avatar: "RS"
    }
  ],
  host: {
    name: "Bir Adventure Trails",
    verified: true,
    rating: 4.8,
    experiences: 312,
    responseRate: 96,
    responseTime: "Within 2 hours"
  },
  featured: true,
  available: true
}
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert sample destinations
    await Destination.insertMany(sampleDestinations);
    console.log(`Successfully seeded ${sampleDestinations.length} destinations`);

    // Display inserted destinations
    const insertedDestinations = await Destination.find({});
    console.log('\nInserted Destinations:');
    insertedDestinations.forEach(dest => {
      console.log(`- ${dest.title} (${dest.slug}) - ₹${dest.price}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    await disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeding function
seedDatabase();
