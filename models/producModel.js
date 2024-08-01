import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [15, "Title must be atleast 15 characters"],
    },

    brand: {
      type: String,
      required: [true, "brand is required"],
    },

    gender: {
      type: String,
      required: [true, "Please select gender"],
    },

    category: {
      type: String,
      required: [true, "Please select category"],
    },

    action: {
      type: String,
      required: [true, "Please select action"],
    },

    color: {
      type: String,
      required: [true, "Please select color"],
    },

    description: {
      type: String,
      required: [true, "Please enter description"],
    },

    features: [
      {
        key: {
          type: String,
          required: [true, "Please enter key"],
        },
        value: {
          type: String,
          required: [true, "Please enter value"],
        },
      },
    ],

    mrp: {
      type: Number,
      required: [true, "Please select mrp"],
    },

    price: {
      type: Number,
      required: [true, "Please select price"],
    },

    discount: {
      type: Number,
      required: true,
    },

    sizes: [
      {
        size: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          maxLength: [4, "stock cannotb exceed from 4 characters"],
          required: true,
        },
      },
    ],

    moreColors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "products",
      },
    ],

    numOfOrders: {
      type: Number,
      default: 0,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.products ||
  mongoose.model("products", productSchema);
