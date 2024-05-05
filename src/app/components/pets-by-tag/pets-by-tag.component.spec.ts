import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsByTagComponent } from './pets-by-tag.component';

describe('PetsByTagComponent', () => {
  let component: PetsByTagComponent;
  let fixture: ComponentFixture<PetsByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsByTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
