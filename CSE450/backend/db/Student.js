const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;


const studentSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    session: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamp: true
});

studentSchema.methods.toJSON = function() {
    const student = this.toObject()
    delete student.password
        /* delete userr.tokens */
    return student;
}

studentSchema.methods.generateAuthToken = async function() {
    const student = this
    const token = await jwt.sign({ _id: student._id.toString() }, 'thisisnewstudent')
    student.tokens = student.tokens.concat({ token });
    await student.save()
    return token;
}




studentSchema.statics.findByCredentials = async(user, password) => {
    try {
        const student = await Student.findOne({ user })
        if (!student) {
            return 'user not found'
        }
        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) {
            return 'pass not matched'
        }
        return student;
    } catch (e) {
        return "Can't log in"
    }
}

studentSchema.pre('save', async function(next) {
    const Student = this
    if (Student.isModified('password')) {
        Student.password = await bcrypt.hash(Student.password, 8);
    }
    next();
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;