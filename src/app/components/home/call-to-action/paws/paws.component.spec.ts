import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PawsComponent } from './paws.component';

describe('PawsComponent', () => {
  let component: PawsComponent;
  let fixture: ComponentFixture<PawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PawsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
