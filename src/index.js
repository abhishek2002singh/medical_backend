const express = require('express');
const app = express();
require('dotenv').config();
const dbconnection = require('./config/database'); 
const cookieParser = require('cookie-parser')


const cors = require('cors');
const corsOptions ={
     origin:'http://localhost:5173', 
    // origin:'https://gilded-otter-95714b.netlify.app',
    credentials:true,            //access-control-allow-credentials:true
  
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send("Namaste everyone");
});

// Handle routes
const authRouth = require('./router/auth');
const appointmentRouter = require('./router/appointmentment');
const checkupment = require('./router/checkupment');
const videoRouter = require('./router/video');
const doctorRouter = require('./router/doctorRoutes')

app.use('/', authRouth);
app.use('/', appointmentRouter);
app.use('/', checkupment);
app.use('/', videoRouter);
app.use('/', doctorRouter);

dbconnection().then(() => {
    console.log("database connection successufully")
    app.listen(process.env.PORT, () => {
        console.log(`App started on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect to DB, exiting...");
    console.log(err)
    process.exit(1);
    
});


// const express = require('express');
// const app = express();
// require('dotenv').config();
// const dbconnection = require('./config/database'); 
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());





// // Handle routes
// const authRouth = require('./router/auth');
// const appointmentRouter = require('./router/appointmentment');
// const checkupment = require('./router/checkupment');
// const videoRouter = require('./router/video');
// const doctorRouter = require('./router/doctorRoutes')

// app.use('/', authRouth);
// app.use('/', appointmentRouter);
// app.use('/', checkupment);
// app.use('/', videoRouter);
// app.use('/', doctorRouter);

// dbconnection().then(() => {
//   console.log("Database connection successful");
//   server.listen(process.env.PORT, () => {
//     console.log(`App started on port ${process.env.PORT}`);
//   });
// }).catch((err) => {
//   console.log("Failed to connect to DB, exiting...");
//   console.log(err);
//   process.exit(1);
// });