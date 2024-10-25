import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String },
    contrasena: { type: String },
    rol: { type: String, default: 'cliente' }
})

const User = model('user', userSchema);
export default User;