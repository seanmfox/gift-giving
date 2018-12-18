const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
    fname: String,
    lname: String,
    email: {type: String, sparse: true, lowercase: true},
    password: {type: String },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);