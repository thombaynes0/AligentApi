import express from 'express';
import controller from '../controllers/dates';
const router = express.Router();

router.post('/dates/daysBetween', controller.daysBetween);
router.post('/dates/completeWeeksBetween', controller.completeWeeksBetween);
router.post('/dates/businessDaysBetween', controller.businessDaysBetween);

export = router;