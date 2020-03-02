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

app.get('/api/v1/tours/:id', (request,response) => {
    const id = request.params.id * 1;
    const tour = tours.find(element => element.id === id);

    if (!tour) {
        return response.status(404).json({
            status: 'fail', 
            message: 'invalid id'
        });
    }
    response.status(200).json({
        status: 'success',
        data: {
            tour: tour
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

app.patch('/api/v1/tours/:id', (request,response) => {
    if (request.params.id * 1 > tours.length) {
        return response.status(404).json({
            status: 'fail', 
            message: 'invalid id'
        });
    }
    response.status(200).json({
        status: 'success',
        data: {
            tour: "<Updated Tour here>"
        }
    })
})

app.delete('/api/v1/tours/:id', (request,response) => {
    if (request.params.id * 1 > tours.length) {
        return response.status(404).json({
            status: 'fail', 
            message: 'invalid id'
        });
    }
    response.status(204).json({
        status: 'success',
        data: null
    })
})

//server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});