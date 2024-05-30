import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevsComponent } from './admin-devs.component';

describe('AdminDevsComponent', () => {
  let component: AdminDevsComponent;
  let fixture: ComponentFixture<AdminDevsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDevsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDevsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
