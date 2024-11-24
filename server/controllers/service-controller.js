const Service = require('../models/service-model');

const services = async (req, res, next) => {
    try {
        const response = await Service.find({});
        if (!response){

            res.status(404).json({msg:"No service found"})
        }
    } catch (error) {
        console.log(`Error from services route: ${error}`);
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
}
module.exports = services
