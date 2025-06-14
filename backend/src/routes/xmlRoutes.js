import express from 'express';
import XmlController from '../controllers/xmlController.js';
import XmlService from '../services/xmlService.js';

const router = express.Router();
const xmlService = new XmlService();
const xmlController = new XmlController(xmlService);

router.post('/save', xmlController.saveXml.bind(xmlController));
router.delete('/delete/:id', xmlController.deleteXml.bind(xmlController));
router.get('/search', xmlController.searchXml.bind(xmlController));
router.put('/modify/:id', xmlController.modifyXml.bind(xmlController));
router.get('/all', xmlController.getAllXml.bind(xmlController));

export default router;