import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  private apiUrl = 'http://localhost:3000/api/xml';

  constructor(private http: HttpClient) {}

  getAllXml(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  saveXml(xmlData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, xmlData);
  }

  deleteXml(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchXml(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  modifyXml(id: string, xmlData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, xmlData);
  }

  searchByXPath(xpath: string): Observable<any> {
    const params = new HttpParams().set('xpath', xpath);
    return this.http.get(`${this.apiUrl}/xpath`, { params });
  }

  modifyNodeByXPath(id: string, xpath: string, newValue: string): Observable<any> {
    const body = { xpath, newValue };
    return this.http.put(`${this.apiUrl}/xpath/${id}`, body);
  }
}