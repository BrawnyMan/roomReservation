import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddingComponent } from './room-adding.component';

describe('RoomAddingComponent', () => {
  let component: RoomAddingComponent;
  let fixture: ComponentFixture<RoomAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
