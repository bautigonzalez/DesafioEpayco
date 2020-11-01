const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movementSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'Users' },
  to: { type: Schema.Types.ObjectId, ref: 'Users' },
  value: {
      type: Number,
      default: 0
  },
  isCharge: {
    type: Boolean,
    default: false
  }
});

const Movement = mongoose.model("Movements", movementSchema);

module.exports = Movement;