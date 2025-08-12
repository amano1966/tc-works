import path from 'path';
import express from 'express';

const app = express(),
            DIST_DIR = __dirname,
            HTML_NDX = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))

app.get('*', (req,res)=>{
    console.log(`Request for ${req.url}`);
    res.sendFile(HTML_NDX)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(HTML_NDX)
    console.log(`App listening to ${PORT}....`)
})
