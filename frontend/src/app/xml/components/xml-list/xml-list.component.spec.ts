import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlListComponent } from './xml-list.component';

describe('XmlListComponent', () => {
  let component: XmlListComponent;
  let fixture: ComponentFixture<XmlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
