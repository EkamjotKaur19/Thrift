const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' }, // User ID of sender
  receiver: { type: Schema.Types.ObjectId, ref: 'User' }, // User ID of receiver (seller)
  content: String, // Message content
  timestamp: { type: Date, default: Date.now },
  order: { type: Schema.Types.ObjectId, ref: 'Order' }, // Reference to the related order
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
