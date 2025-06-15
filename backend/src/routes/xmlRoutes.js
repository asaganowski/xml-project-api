import express from 'express';
import XmlController from '../controllers/xmlController.js';
import XmlService from '../services/xmlService.js';

const router = express.Router();
const xmlService = new XmlService();
const xmlController = new XmlController(xmlService);

router.post('/save', xmlController.saveXml.bind(xmlController));
router.delete('/delete/:id', xmlController.deleteXml.bind(xmlController));
router.get('/all', xmlController.getAllXml.bind(xmlController));
router.get('/searchByXPath', xmlController.searchByXPath.bind(xmlController));
router.post('/insert-node', xmlController.insertNode.bind(xmlController));
router.post('/delete-node', xmlController.deleteNode.bind(xmlController));
router.post('/replace-value', xmlController.replaceNodeValue.bind(xmlController));
router.post('/insert-attribute', xmlController.insertAttribute.bind(xmlController));
router.post('/delete-attribute', xmlController.deleteAttribute.bind(xmlController));


export default router;