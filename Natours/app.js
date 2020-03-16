const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//Handlers

    //Tour Handlers
const getAllTours =  (request,reponse) => {
    reponse.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTour =  (request,response) => {
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

const createTour = (request,response) => {

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

const updateTour = (request,response) => {
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

const deleteTour = (request,response) => {
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

    //User Handlers

const getAllUsers = (request, response) => {
    response.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const getUser = (request, response) => {
    response.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const createUser = (request, response) => {
    response.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const updateUser = (request, response) => {
    response.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (request, response) => {
    response.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours' , tourRouter);
app.use('/api/v1/users', userRouter);


tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


//server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});