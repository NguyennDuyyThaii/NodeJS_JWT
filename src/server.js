const express = require('express');
const app = express();
const initRoutes = require('./routes/web')
app.use(express.json())
initRoutes(app)
app.listen(8017, (req, res) => {
    console.log("listening on port 8017")
})