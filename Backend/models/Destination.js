import { Schema, model } from 'mongoose';

const highlightSchema = new Schema({
  text: String
});

const includeSchema = new Schema({
  item: String
});

const excludeSchema = new Schema({
  item: String
});

const itinerarySchema = new Schema({
  time: String,
  activity: String,
  description: String
});

const whatToBringSchema = new Schema({
  item: String
});

const safetySchema = new Schema({
  measure: String
});

const reviewSchema = new Schema({
  name: String,
  rating: Number,
  date: Date,
  comment: String,
  avatar: String
});

const hostSchema = new Schema({
  name: String,
  verified: Boolean,
  rating: Number,
  experiences: Number,
  responseRate: Number,
  responseTime: String
});

const destinationSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  discount: Number,
  images: [{
    url: String,
    public_id: String
  }],
  description: String,
  longDescription: String,
  duration: String,
  groupSize: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Extreme']
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  season: String,
  ageLimit: String,
  languages: [String],
  highlights: [highlightSchema],
  includes: [includeSchema],
  excludes: [excludeSchema],
  itinerary: [itinerarySchema],
  whatToBring: [whatToBringSchema],
  safety: [safetySchema],
  reviewsList: [reviewSchema],
  host: hostSchema,
  featured: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
destinationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default model('Destination', destinationSchema);