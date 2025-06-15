CREATE DATABASE XmlDocuments;

USE XMLDocuments;
GO;

CREATE TABLE XMLDocuments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100),
    Content XML NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Wylistowanie wszystkich dokumentów
SELECT * FROM XmlDocuments

-- Zapisanie nowego 
INSERT INTO XmlDocuments (Name, Content)
    OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Content, INSERTED.CreatedAt
    VALUES (${name}, ${xmlContent})

-- Usuwanie dokumentu
DELETE FROM XmlDocuments WHERE Id = ${id}

-- Wyszukanie po XPath
SELECT 
            Id,
            Name,
            Content,
            CreatedAt,
            Content.query('${safeXPath}') AS MatchedFragment
            FROM XmlDocuments
            WHERE Content.exist('${safeXPath}') = 1

-- Wstawianie węzła
UPDATE XmlDocuments
            SET Content.modify('insert ${safeNode} ${position} ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id

-- Usuwanie węzła
UPDATE XmlDocuments
            SET Content.modify('delete ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id

-- Zmiana węzła/atrubutu
UPDATE XmlDocuments
            SET Content.modify('replace value of ${safeXPath} with ("${safeNewValue}")')
            OUTPUT INSERTED.*
            WHERE Id = @id

-- dodawanie atrybutu
UPDATE XmlDocuments
            SET Content.modify('insert attribute ${safeAttr} {"${safeValue}"} into ${safeXPath}')
            OUTPUT INSERTED.*
            WHERE Id = @id

-- Usuwanie węzła
UPDATE XmlDocuments
            SET Content.modify('delete ${safeXPath}/@${safeAttr}')
            OUTPUT INSERTED.*
            WHERE Id = @id