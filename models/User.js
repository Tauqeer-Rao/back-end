const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: {type: String, required: true, default:"user"},
  addresses: { type: [String] },
  // TODO: We can make separate schema for this   
  name:{type: String},
  orders:{type: [String]} 
});

// Turning _id to id
const virtual = userSchema.virtual("id");
virtual.get(()=>{
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {delete ret._id}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
