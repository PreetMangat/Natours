const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours =  (request,reponse) => {
    reponse.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

exports.getTour =  (request,response) => {
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
};

exports.createTour = (request,response) => {

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
};

exports.updateTour = (request,response) => {
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
};

exports.deleteTour = (request,response) => {
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
};