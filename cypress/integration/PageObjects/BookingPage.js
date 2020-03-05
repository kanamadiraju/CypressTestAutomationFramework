/// <reference types ="cypress" />

class BookingPage
{

 

 VerifyHotelName()
 {
    cy.url().should('include', 'booking/key')
    cy.contains('Castello Di San Marco Charming Hotel & Spa').should('be.visible')  
    return this
 }

 
}

export default BookingPage