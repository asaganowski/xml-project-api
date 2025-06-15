import sql from 'mssql';
import config from '../db/config.js'; 

class XmlService {

    async getAllXml() {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM XmlDocuments`;
        return result.recordset;
    }

    async saveXml({ name, xmlContent }) {
        await sql.connect(config);
        const result = await sql.query`
            INSERT INTO XmlDocuments (Name, Content)
            OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Content, INSERTED.CreatedAt
            VALUES (${name}, ${xmlContent})
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

    async searchByXPath(xpath) {
        await sql.connect(config);
          const safeXPath = xpath.replace(/'/g, "''");

        const query = `
            SELECT 
            Id,
            Name,
            Content,
            CreatedAt,
            Content.query('${safeXPath}') AS MatchedFragment
            FROM XmlDocuments
            WHERE Content.exist('${safeXPath}') = 1
        `;


        const result = await sql.query(query);
        return result.recordset;
    }

    async insertNode({ id, xpath, newNodeXml, position }) {
        console.log(id, xpath, newNodeXml, position)
        await sql.connect(config);
        const safeXPath = xpath.replace(/'/g, "''");
        const safeNode = newNodeXml.replace(/'/g, "''");
        const query = `
            UPDATE XmlDocuments
            SET Content.modify('insert ${safeNode} ${position} ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id
        `;
        console.log(query)
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(query);
        return result.recordset[0];
    }

    async deleteNode({ id, xpath }) {
        await sql.connect(config);
        const safeXPath = xpath.replace(/'/g, "''");
        const query = `
            UPDATE XmlDocuments
            SET Content.modify('delete ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id
        `;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(query);
        return result.recordset[0];
    }

    async replaceNodeValue({ id, xpath, newValue }) {
        await sql.connect(config);
        const safeXPath = xpath.replace(/'/g, "''");
        const safeNewValue = newValue.replace(/"/g, '\\"').replace(/'/g, "''");
        const query = `
            UPDATE XmlDocuments
            SET Content.modify('replace value of ${safeXPath} with ("${safeNewValue}")')
            OUTPUT INSERTED.*
            WHERE Id = @id
        `;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(query);
        return result.recordset[0];
    }

    async insertAttribute({ id, xpath, attributeName, value }) {
        await sql.connect(config);
        const safeXPath = xpath.replace(/'/g, "''");
        const safeAttr = attributeName.replace(/'/g, "''");
        const safeValue = value.replace(/'/g, "''");
        const query = `
            UPDATE XmlDocuments
            SET Content.modify('insert attribute ${safeAttr} {"${safeValue}"} into ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id
        `;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(query);
        return result.recordset[0];
    }

    async deleteAttribute({ id, xpath, attributeName }) {
        await sql.connect(config);
        const safeXPath = xpath.replace(/'/g, "''");
        const safeAttr = attributeName.replace(/'/g, "''");
        const query = `
            UPDATE XmlDocuments
            SET Content.modify('delete ${safeXPath}/@${safeAttr}')
            OUTPUT INSERTED.*
            WHERE Id = @id
        `;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.query(query);
        return result.recordset[0];
    }

}

export default XmlService;