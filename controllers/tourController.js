const fs = require("fs");


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);



exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
    var params = req.params;
    var id = 1 * params["id"];

    var tour = tours.find((t) => t.id == id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    console.log(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour,
                },
            });
            console.log("Completed");
        }
    );
};

exports.updateTour = (req, res) => {
    var body = req.body;
    console.log(body);
    var params = req.params;
    var id = 1 * params["id"];

    var tour = tours.find((t) => t.id == id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            message: "<Updated tour here...>",
        },
    });
};

exports.deleteTour = (req, res) => {
    var params = req.params;
    var id = 1 * params["id"];

    var tour = tours.find((t) => t.id == id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(204).json({
        status: "success",
        data: {
            message: "<Deleted tour here...>",
        },
    });
};
