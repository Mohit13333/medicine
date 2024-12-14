import { model, Schema } from "mongoose";

const medicineSchema = new Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  scheduleTime: [
    {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Schedule time must be today or a future date.",
      },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Medicine = model("Medicine", medicineSchema);
export default Medicine;
