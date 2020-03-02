const express = require('express');
const fs = require('fs');

const app = express();

//middleware
app.use(express.json());

//data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//routes
app.get('/api/v1/tours', (request,reponse) => {
    reponse.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
})

app.post('/api/v1/tours', (request,response) => {

    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, request.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {
        response.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

//server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});