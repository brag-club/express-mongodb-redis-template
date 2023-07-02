import mongoose, { Schema } from "mongoose";

import { IUser } from "@/interfaces/user.interface";

const UserSchema: Schema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
}, {
    timestamps: true,
});

UserSchema.methods = {
  view(full: boolean) {
    const view = {
      id: this.id,
      name: this.name,
      email: this.email,
    };

    return full
      ? {
          ...view,
          hash: this.hash,
          salt: this.salt,
        }
      : view;
  },
};

export default mongoose.model<IUser>("User", UserSchema);
