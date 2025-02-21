# Backend (API & Routes)

1. Authentication Routes

- POST /auth/signup – Register a new user (patient/doctor)
- POST /auth/login – Authenticate user and return JWT token
- GET /auth/profile – Get logged-in user profile

2. Doctor Routes

- GET /doctors – Get list of all doctors
- POST /doctors – Add new doctor (admin only)
- PUT /doctors/:id – Update doctor details
- DELETE /doctors/:id – Remove doctor

3. Appointment Routes

- POST /appointment – Book an appointment
- GET /appointment/:userId – View user appointments
- GET /doctor/appointments/:doctorId – View doctor’s appointments
- DELETE /appointment/:id – Cancel appointment

4. Medical Test Routes

- POST /tests/book – Book a medical test
- GET /tests/:userId – View booked tests
- PUT /tests/update/:testId – Update test status

5. Token Routes

- GET /token/appointment/:userId – Get token for doctor appointment
- GET /token/test/:userId – Get token for medical test
#   m e d i c a l _ b a c k e n d  
 