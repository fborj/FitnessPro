import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    level: {  
        type: String,
        required: true,
    },
    place: {  
        type: String,
        required: true,
    },
    days: { 
        type: String,  
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("UserPreference", userPreferenceSchema);

