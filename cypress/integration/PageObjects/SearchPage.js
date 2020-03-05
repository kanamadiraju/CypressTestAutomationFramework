/// <reference types ="cypress" />

class SearchPage
{

 visit()
 {
     cy.visit('https://www.ab-in-den-urlaub.de')
 }

 enterCity(cityName)
 {
     const field = cy.get('.standard-version > #idestflat')
     field.type(cityName)
     cy.get('[data-name='+cityName+']').eq(1).click()
     return this
 }

 selectDate(startDate, endDate)
 {
    const sDate = cy.get('.datepicker-input-wrapper-start > .datepicker-trigger')
    sDate.click()
    cy.AddDate(startDate, endDate)
    return this
 }

 enterAdults(adultCount)
 {
    cy.SelectNumberOfAdults(adultCount)
    return this
 }

 submit()
 {
     const button = cy.get('#submit')
     button.click({force: true})
     return this
 }
}

export default SearchPage