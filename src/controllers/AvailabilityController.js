const { application } = require("express");
const GetAvailability = require("../application/use-cases/AvailabilityUseCases/GetAvailability");
const GetAvailabilityByDate = require("../application/use-cases/AvailabilityUseCases/GetAvailabilityByDate");
const GetAllAvailabilities = require("../application/use-cases/AvailabilityUseCases/GetAllAvailabilities");
const AddAvailability = require("../application/use-cases/AvailabilityUseCases/AddAvailability");
const UpdateAvailability = require("../application/use-cases/AvailabilityUseCases/UpdateAvailability");
const DeleteAvailability = require("../application/use-cases/AvailabilityUseCases/DeleteAvailability");
module.exports = (dependencies) => {

    const AvailabilityRepository = dependencies.DatabaseService.availabilityRepository;

    const getAvailability = async (req, res) => {
        const GetAvailabilityQuery = GetAvailability(AvailabilityRepository);
        let availability = await GetAvailabilityQuery.Execute(req.params.id);

        if (availability == 'error')
            res.status(400).send('Bad Request');
        else {
            if (availability != '' && availability != null)
                res.status(200).send(availability);
            else
                res.status(404).send("Availability does not exist yet");
        }

    };

    const getAvailabilityByDate = async (req, res) => {
        const GetAvailabilityByDateQuery = GetAvailabilityByDate(AvailabilityRepository);
        let availability = await GetAvailabilityByDateQuery.Execute(req.params.dateToFind);

        if (availability == 'error')
            res.status(400).send('Bad Request');
        else {
            if (availability != '' && availability != null)
                res.satus(200).send(availability);
            else
                res.status(400).send("Availability does not exist yet");
        }
    }

    const getAllAvailabilities = async (req, res) => {

        const GetAllAvailabilitiesQuery = GetAllAvailabilities(AvailabilityRepository);
        let availabilities = await GetAllAvailabilitiesQuery.Execute();
        if (availabilities != '' && availabilities != null)
            res.status(200).send(availabilities);
        else
            res.send("No upcoming availabilities yet");

    }

    const addAvailability = async (req, res) => {

        const GetAvailabilityByDateQuery = GetAvailabilityByDate(AvailabilityRepository);
        let availability = await GetAvailabilityByDateQuery.Execute(req.body.availableDate);

        if (availability == 'error')
            res.status(400).send('Bad Request');

        else if (availability == '' || availability == null) {
            const AddAvailabilityQuery = AddAvailability(AvailabilityRepository);
            let result = await AddAvailabilityQuery.Execute(req.body.availableDate, req.body.spots);

            if (result == 'error')
                res.status(400).send('An error happened, try again later');
            res.status(201).send(result);
        }
        else
            res.status(403).send("Availability already exists");
    }
    const updateAvailability = async (req, res) => {

        const GetAvailabilityQuery = GetAvailability(AvailabilityRepository);
        let availability = await GetAvailabilityQuery.Execute(req.params.id);

        if (availability == 'error') {
            res.status(400).send('Bad Request');
        }
        else if (availability !== '' && availability !== null) {
            const UpdateAvailabilityQuery = UpdateAvailability(AvailabilityRepository);
            let result = await UpdateAvailabilityQuery.Execute(req.params.id, req.body.availableDate, req.body.spots);
            if (result == 'error')
                res.status(400).send('An error happened, try again later');
            else
                res.status(200).send('Availability has been updated!');
        }
        else
            res.status(404).send("Availability does not exist");
    }

    const deleteAvailability = async (req, res) => {

        const GetAvailabilityQuery = GetAvailability(AvailabilityRepository);
        let availability = await GetAvailabilityQuery.Execute(req.params.id);

        if (availability == 'error') {
            res.status(400).send('Bad Request');
        }
        else if (availability !== '' && availability !== null) {
            const DeleteAvailabilityQuery = DeleteAvailability(AvailabilityRepository);
            let result = await DeleteAvailabilityQuery.Execute(req.params.id);
            if (result == 'error')
                res.status(500).send('An error happened, try again later');
            else
                res.status(200).send('Availability deleted');
        }
        else
            res.status(404).send("Availability does not exist");
    };


    return {
        getAvailability,
        getAvailabilityByDate,
        getAllAvailabilities,
        addAvailability,
        updateAvailability,
        deleteAvailability
    };




};