import mongoose from 'mongoose';

const BMIprogressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  bmiValue: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BMIprogress = mongoose.model('BMIprogress', BMIprogressSchema);
export default BMIprogress; 