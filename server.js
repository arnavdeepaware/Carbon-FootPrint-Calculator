const express = require("express");
const cors = require("cors");

const port = 3001;
const  app = express();

var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json())


app.post('/calculate', (req, res)=> {
    
    try{
        const{
            electricityUsageKWh,
            transportationUsageGallonsPerMonth,
            shortFlight,
            mediumFlight,
            longFlight,
            dietaryChoice
    
        }=req.body
        
        const electricityFactor = 0.3978;
        const transportationFactor = 9.087;
        const shortFlightFactor = 100;
        const mediumFlightFactor = 200;
        const largeFactor = 300;
        const dietaryChoiceFactor = {
            Vegan: 200,
            Vegetarian: 400,
            Pescatarian: 600,
            MetaEater: 800
        }

        const year = 12;
        
        const electricityEmission = electricityUsageKWh * electricityFactor;
        const transportEmission = transportationUsageGallonsPerMonth * transportationFactor;
        
        const airTravelShortFlight = shortFlight * shortFlightFactor;
        const airTravelMediumFlight = mediumFlight * mediumFlightFactor;
        const airTravelLongFlight = longFlight * largeFactor;

        const dietaryChoiceEmission = dietaryChoiceFactor[dietaryChoice] || 0;

        const totalFlightEmission = airTravelShortFlight + airTravelMediumFlight + airTravelLongFlight;
        const totalElectricityUsage = electricityEmission * year;
        const totalTransportUsage = transportEmission * year;

        const totalYearlyEmissions = dietaryChoiceEmission + totalFlightEmission + totalElectricityUsage + totalTransportUsage;

        const result = {
            totalYearlyEmissions: {value: totalYearlyEmissions, unit: 'kgCO2/year'},
            totalTransportUsage: {value: totalTransportUsage, unit: 'kgCO2/year'},
            totalElectricityUsage: {value: totalElectricityUsage, unit: 'kgCO2/year'},
            totalFlightEmission: {value: totalFlightEmission, unit: 'kgCO2/year'},
            dietaryChoiceEmission: {value: dietaryChoiceEmission, unit: 'kgCO2/year'},
        }


        res.json(result);


    } catch (err){
        console.error('Error calculating CO2 Emissions: ', err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})