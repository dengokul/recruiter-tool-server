import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    mobile: { type: String },
    instituteType: { type: String },
    instituteName: { type: String },
    otpCode: { type: String },
    orgId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['active', 'pending'], default: "pending" },
    userRole: { type: String },
    userRoleAccess: { type: Object, default: {} },
    userDetails: { type: Object, default: {} },
    documents: { type: Array, default: [] },
    healthRecordDetails: { type: Object, default: {} },
    profileImageUrl: { type: String, default: "" },
    sdName: { type: String, default: "" },
}, {
    timestamps: true,
    collection: "users"
});

const User = mongoose.model("User", userSchema);

export default User;
