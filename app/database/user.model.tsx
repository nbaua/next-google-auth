import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'E-mail exists already.'],
        required: [true, 'E-mail is required.'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], //this is required only if there is a form based authentication - google provides valid email already 
    },
    username: {
        type: String,
        unique: [true, 'Username exists already.'],
        required: [true, 'Username is required.']
    },
    image: {
        type: String,
    }
},
)

const User = models.User || model("User", userSchema); //use the existing model || create a new model (i.e. database collection)

export default User;