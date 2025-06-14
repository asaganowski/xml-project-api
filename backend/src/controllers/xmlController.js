class XmlController {
    constructor(xmlService) {
        this.xmlService = xmlService;
    }

    async getAllXml(req, res) {
        try {
            const xmls = await this.xmlService.getAllXml();
            res.json(xmls);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async saveXml(req, res) {
        try {
            const xmlData = req.body;
            const result = await this.xmlService.saveXml(xmlData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteXml(req, res) {
        try {
            const { id } = req.params;
            await this.xmlService.deleteXml(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchXml(req, res) {
        try {
            const { query } = req.query;
            const results = await this.xmlService.searchXml(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async modifyXml(req, res) {
        try {
            const { id } = req.params;
            const xmlData = req.body;
            const result = await this.xmlService.modifyXml(id, xmlData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default XmlController;