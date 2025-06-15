
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
            const { name, xmlContent } = req.body;

            if (!name || !xmlContent) {
            return res.status(400).json({ message: "Nazwa i dokument XML są wymagane." });
            }

            const result = await this.xmlService.saveXml({ name, xmlContent });
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

    // Dodane: wyszukiwanie po XPath
    async searchByXPath(req, res) {
        try {
            const { xpath } = req.query;
            if (!xpath) {
                return res.status(400).json({ message: "XPath query is required" });
            }
            const results = await this.xmlService.searchByXPath(xpath);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

      async insertNode(req, res) {
        try {
            const result = await this.xmlService.insertNode(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteNode(req, res) {
        try {
            const result = await this.xmlService.deleteNode(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async replaceNodeValue(req, res) {
        try {
            const result = await this.xmlService.replaceNodeValue(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async insertAttribute(req, res) {
        try {
            const result = await this.xmlService.insertAttribute(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteAttribute(req, res) {
        try {
            const result = await this.xmlService.deleteAttribute(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default XmlController;