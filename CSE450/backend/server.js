const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Students = require('./db/Student')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established")
})

const studentRouter = require('./api/Student');
app.use('/student', studentRouter);

const teacherRouter = require('./api/Teacher.js');
app.use('/teacher', teacherRouter);

const AdminRouter = require('./api/Admin.js');
app.use('/admin', AdminRouter);

const UAdminRouter = require('./api/Uadmin.js');
app.use('/university_admin', UAdminRouter);

const dheadRouter = require('./api/Dhead.js');
app.use('/department_head', dheadRouter);

const approveDhRouter = require('./api/ApprovalDh.js');
app.use('/approveDh', approveDhRouter);

const approveTRouter = require('./api/ApprovalT.js');
app.use('/approveT', approveTRouter);

const Approval = require('./api/Approval.js');
app.use('/approve', Approval);

const ApprovalS = require('./api/ApprovalS.js');
app.use('/approveS', ApprovalS);



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})