import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema(
    {
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        fromBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        toBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    },
    { timestamps: true }
);

const Exchange = mongoose.model('Exchange', exchangeSchema);
export default Exchange;
