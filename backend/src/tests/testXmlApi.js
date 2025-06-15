import axios from 'axios';
import assert from 'assert';

const BASE_URL = 'http://localhost:5000/api/xml';

async function runTests() {
  try {
    // Dodaj dokument
    const newDoc = { name: 'TestDoc', xmlContent: '<library><book id="1"/></library>' };
    const addRes = await axios.post(`${BASE_URL}/save`, newDoc);
    assert.strictEqual(addRes.status, 201, 'Dodanie dokumentu nie zwróciło statusu 201');
    const docId = addRes.data.Id;

    // Szukaj po XPath
    const searchRes = await axios.get(`${BASE_URL}/searchByXPath`, { params: { xpath: '(//book)[1]' } });
    assert(searchRes.data.length > 0, 'Brak wyników wyszukiwania XPath');

    //  Modyfikacja wartości węzła <title>
    const insertNodeRes = await axios.post(`${BASE_URL}/insert-node`, {
      id: docId,
      xpath: '(/library)[1]',
      newNodeXml: '<book id="b2"><title>Nowa książka</title></book>',
      position: 'before'
    });
    assert.strictEqual(insertNodeRes.status, 200);
    console.log('Wstawiono nowy węzeł');

    // Wstawienie nowego atrybutu
    const insertAttrRes = await axios.post(`${BASE_URL}/insert-attribute`, {
      id: docId,
      xpath: '(/library/book)[1]',
      attributeName: 'genre',
      value: 'fiction'
    });
    assert.strictEqual(insertAttrRes.status, 200);
    console.log('Dodano atrybut');

    // Usunięcie atrybutu
    const deleteAttrRes = await axios.post(`${BASE_URL}/delete-attribute`, {
      id: docId,
      xpath: '(/library/book)[1]',
      attributeName: 'genre'
    });
    assert.strictEqual(deleteAttrRes.status, 200);
    console.log('Usunięto atrybut');

    // Usunięcie węzła
    const deleteNodeRes = await axios.post(`${BASE_URL}/delete-node`, {
      id: docId,
      xpath: '(/library/book)[1]'
    });
    assert.strictEqual(deleteNodeRes.status, 200);
    console.log('Usunięto węzeł');

    // Usuń dokument
    const delRes = await axios.delete(`${BASE_URL}/delete/${docId}`);
    assert.strictEqual(delRes.status, 204, 'Usuwanie nie zwróciło statusu 204');

    console.log('Wszystkie testy przeszły pomyślnie');
  } catch (err) {
    console.error('Błąd testu:', err);
  }
}

runTests();
