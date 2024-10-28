import { makeAutoObservable } from 'mobx';
import data from '../data.json';
class RootStore {

  constructor() {
    makeAutoObservable(this);
  }

  categories = data.categories;
  doctors = data.doctors;
  toprated = data.toprated;
  appointments = data.appointments;
  search = data.search;
  symptomMapping = data.symptomMapping;
  selectedCategory = null;
  selectedDoctor = null;

  userDetails = {
    pname: 'Advika',
    pemail: 'abcd@gmail.com',
    pnumber: '9884279923',
    dname: 'Dr. V. Susila Anand',
    demail: 'drsusila2000@gmail.com',
    dnumber: '9876543210',
    category: 'Dentist',
    speciality: 'Endodontist',
    qual: 'BDS, MDS, PhD (IIT-M)',
    experience: '30',
    clinic: 'Mangalam Dental Clinic',
    location: 'T. Nagar',
    days: 'Mon-Sat',
    timing: '5 PM - 8 PM',
  };
  
  updateUserDetails(newDetails) {
    this.userDetails = {...this.userDetails, ...newDetails};
  }

  editUserDetails(key, value) {
    this.userDetails[key] = value;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  setSelectedDoctor(doctor) {
    this.selectedDoctor = doctor;
  }

  getDoctorsbyCategory() {
    return this.selectedCategory 
    ? this.doctors.find(
      (category)=>category.category===this.selectedCategory)?.alldocs || [] : [];
  }

  get doctorDetails() {
    return {
      name: this.selectedDoctor.name,
      category: this.selectedDoctor.category,
      speciality: this.selectedDoctor.speciality,
      qual: this.selectedDoctor.qual,
      experience: this.selectedDoctor.experience,
      clinic: this.selectedDoctor.clinic,
      location: this.selectedDoctor.location,
      days: this.selectedDoctor.days,
      timing: this.selectedDoctor.timing
    }
  }
  
  addAppointment(appointment) {
    this.appointments.push(appointment);
  }

  acceptAppointment = (id) => {
    const appointmentIndex = this.appointments.findIndex(
      (appointment) => appointment.id==id
    );
    if (appointmentIndex !== -1){
      this.appointments[appointmentIndex].status = 'Confirmed'
    }
  }
}

const rootStore = new RootStore();
export default rootStore;