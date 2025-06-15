import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  private apiUrl = 'http://localhost:5000/api/xml';

  constructor(private http: HttpClient) {}

  getAllXml(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  saveXml(xmlData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, xmlData);
  }

  deleteXml(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  searchByXPath(xpath: string): Observable<any> {
    const params = new HttpParams().set('xpath', xpath);
    return this.http.get(`${this.apiUrl}/searchByXPath`, { params });
  }

  modifyNodeByXPath(id: number, xpath: string, newValue: string): Observable<any> {
    const body = { xpath, newValue };
    return this.http.put(`${this.apiUrl}/modify/${id}`, body);
  }

  insertNode(data: { id: number; xpath: string; newNodeXml: string; position: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert-node`, data);
  }

  deleteNode(data: { id: number; xpath: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-node`, data);
  }

  replaceValue(data: { id: number; xpath: string; newValue: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/replace-value`, data);
  }

  insertAttribute(data: { id: number; xpath: string; attributeName: string; value: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert-attribute`, data);
  }

  deleteAttribute(data: { id: number; xpath: string; attributeName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-attribute`, data);
  }
}