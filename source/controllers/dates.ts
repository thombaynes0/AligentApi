import { Request, Response, NextFunction } from 'express';
const { Interval } = require("luxon");
const { DateTime } = require("luxon-business-days");

const processDateTime = (date: string, time: string, timeZone: string = "") => DateTime.fromISO(date + 'T' + time, { zone: timeZone ?? "local"});

// 1. Find out the number of days between two datetime parameters.
const daysBetween = async (req: Request, res: Response, next: NextFunction) => {
    var dateOneReq = req.body.dateOne;
    var dateTwoReq = req.body.dateTwo;

    if (!dateOneReq || !dateTwoReq) return res.status(400).json({message: 'Empty Date Parameter.'});
    
    var dateTimeOne = processDateTime(dateOneReq, req.body.timeOne ?? "00:00", req.body.timeZoneOne ?? "");
    var dateTimeTwo = processDateTime(dateTwoReq, req.body.timeTwo ?? "00:00", req.body.timeZoneTwo ?? "");

    var interval = convertTo(req.body.convertTo ?? "days", dateTimeOne, dateTimeTwo);
    if (interval == false) return res.status(500).json({message: 'Error in conversion.'});

    return res.status(200).json({
        message: interval
    });
};

//2. Find out the number of weekdays between two datetime parameters.
const businessDaysBetween = async (req: Request, res: Response, next: NextFunction) => {
    var dateOneReq = req.body.dateOne;
    var dateTwoReq = req.body.dateTwo;

    if (!dateOneReq || !dateTwoReq) return res.status(400).json({message: 'Empty Date Parameter.'});
    
    var dateTimeOne = processDateTime(dateOneReq, "00:00", req.body.timeZoneOne ?? "");
    var dateTimeTwo = processDateTime(dateTwoReq, "00:00", req.body.timeZoneTwo ?? "");

    var businessDays = countBusinessDays(dateTimeOne, dateTimeTwo)

    return res.status(200).json({
        message: businessDays
    });
};

const countBusinessDays = (dateOne: any, dateTwo: any) => {
    var start = dateOne < dateTwo ? dateOne : dateTwo;
    var end = dateTwo > dateOne ? dateTwo : dateOne;
    var daysBetween = 0;

    //Check if the dates are the same
    if (start.hasSame(end, 'day')) {
        return daysBetween;
    }

    //Loop through the days, count each business day.
    while (start.startOf('day') < end.endOf('day')) {
        if (start.isBusinessDay()) {
        daysBetween += 1;
        }
        start = start.plus({ days: 1 })
    }

    return daysBetween;
};

// 3. Find out the number of complete weeks between two datetime parameters.
const completeWeeksBetween = async (req: Request, res: Response, next: NextFunction) => {
    var dateOneReq = req.body.dateOne;
    var dateTwoReq = req.body.dateTwo;

    if (!dateOneReq || !dateTwoReq) return res.status(400).json({message: 'Empty Date Parameter.'});
    
    var dateTimeOne = processDateTime(dateOneReq, req.body.timeOne ?? "00:00", req.body.timeZoneOne ?? "");
    var dateTimeTwo = processDateTime(dateTwoReq, req.body.timeTwo ?? "00:00", req.body.timeZoneTwo ?? "");

    var returnNumber = convertTo("weeks", dateTimeOne, dateTimeTwo);
    if (returnNumber == false) return res.status(500).json({message: 'Error in conversion.'});
    
    returnNumber = Math.trunc(returnNumber);

    return res.status(200).json({
        message: returnNumber
    });
};

// Converts two dates to an interval in the type chosen (seconds, minutes, hours, days, weeks, years)
const convertTo = (type: string, dateOne: any, dateTwo: any) => {
    if (!dateOne || !dateTwo || !type) return false;

    var interval = Interval.fromDateTimes(dateOne, dateTwo);

    // Switch only necessary to make sure the parameter passed is accepted by the length method.
    switch (type) {
        case 'seconds':
        case 'minutes':
        case 'hours':
        case 'days':
        case 'weeks':
        case 'years':
            return interval.length(type);
        default:
            return false;
    }
}

export default { daysBetween, completeWeeksBetween, businessDaysBetween };