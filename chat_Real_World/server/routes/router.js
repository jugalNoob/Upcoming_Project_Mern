const express = require("express");
const router = express.Router();


const get_io=require('../controller/Chat_Data')



// ✅ Your GET route to fetch data from MongoDB
router.get('/api/chat' ,  get_io.Get_Chat)


module.exports = router;