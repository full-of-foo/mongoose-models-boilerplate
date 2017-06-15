import mongoose from './../utils/mongoose';
import {schemaOpts, addHelperFns} from './base';

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, index: {unique: true}},
}, schemaOpts);

UserSchema.set('toJSON', {getters: true, virtual: true});
addHelperFns(UserSchema);

export default mongoose.model('User', UserSchema);
