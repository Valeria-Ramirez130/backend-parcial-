import { model, Schema } from "mongoose";

const informacionUserSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    nombre: { type: String },
    fechaNacimiento: { type: Date },
    cedula: { type: String },
    ciudad: { type: String }
})

const InformacionUser = model('informacionUser', informacionUserSchema);
export default InformacionUser;