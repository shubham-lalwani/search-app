import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountriesService } from './countries.service';
import { of } from 'rxjs/internal/observable/of';
import { Country } from 'src/app/shared/interface/country.interface';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const mockData: Country[] = [{
  id: "1d94a565-23c3-4e36-acdf-8e4af7b0349c",
  name: "Cameroon",
  flag: "http://dummyimage.com/50x50.png/dddddd/000000",
  code: "CM",
  someWeirdServerFieldNameWithCount: 966
},
{
  id: "4d1bb10b-c950-468b-9a55-2c495cc0f17d",
  name: "Norway",
  flag: "http://dummyimage.com/50x50.png/5fa2dd/ffffff",
  code: "NO",
  someWeirdServerFieldNameWithCount: 56
}]

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let countryService:CountriesService;
  let coutryServiceStub:CountriesService;
  let router: Router;

  beforeEach(async () => {
    coutryServiceStub = jasmine.createSpyObj('CountriesService',{ getCountries: of(mockData)});
    await TestBed.configureTestingModule({
      imports: [CountriesComponent],
      providers: [HttpClientTestingModule , RouterTestingModule, { provide: CountriesService, useValue: coutryServiceStub}]
    }).compileComponents();

    countryService = TestBed.inject(CountriesService);
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CountriesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountry() method', () => {
    spyOn(component, 'getCountry');
    component.ngOnInit();
    expect(component.getCountry).toHaveBeenCalled();
  });

  it('should set loading flag when calling the Api method', () => {
    spyOn(component, 'getCountry');
    component.getCountry();
    expect(component.getCountry).toHaveBeenCalled();
    expect(component.loading).toBe(true);
  });

  it('should navigate to the "/countries"', () => {
    const navigateSpy = spyOn(router,'navigate');
    const mockRoute = {
        routeTo: 'countries',
        id:'1'
    }
    component.navToSelectedItem(mockRoute);
    expect(navigateSpy).toHaveBeenCalledWith(['/countries/1']);
  });


});
