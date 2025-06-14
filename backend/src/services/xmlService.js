import sql from 'mssql';
import config from '../db/config.js'; 

class XmlService {

    async getAllXml() {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM XmlDocuments`;
        return result.recordset;
    }

    async saveXml(xmlData) {
        await sql.connect(config);
        const result = await sql.query`
            INSERT INTO XmlDocuments (XmlContent)
            OUTPUT INSERTED.Id, INSERTED.XmlContent
            VALUES (${xmlData.XmlContent})
        `;
        return result.recordset[0];
    }

    async deleteXml(id) {
        await sql.connect(config);
        const result = await sql.query`
            DELETE FROM XmlDocuments WHERE Id = ${id}
        `;
        return result.rowsAffected[0] > 0;
    }

    async searchXml(query) {
        await sql.connect(config);
        const result = await sql.query`
            SELECT * FROM XmlDocuments WHERE XmlContent LIKE ${'%' + query + '%'}
        `;
        return result.recordset;
    }

    async modifyXml(id, updatedData) {
        await sql.connect(config);
        const result = await sql.query`
            UPDATE XmlDocuments SET XmlContent = ${updatedData.XmlContent}
            OUTPUT INSERTED.*
            WHERE Id = ${id}
        `;
        return result.recordset[0];
    }
}

export default XmlService;