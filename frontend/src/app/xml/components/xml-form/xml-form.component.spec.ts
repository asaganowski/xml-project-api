import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlFormComponent } from './xml-form.component';

describe('XmlFormComponent', () => {
  let component: XmlFormComponent;
  let fixture: ComponentFixture<XmlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
