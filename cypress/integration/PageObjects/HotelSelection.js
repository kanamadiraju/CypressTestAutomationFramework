/// <reference types ="cypress" />

class HotelSelection
{

 enterDateFromSecondPage(startDate, endDate)
 {
    const datePicker = cy.get('.datepicker-input-wrapper-start > .datepicker-trigger')
    datePicker.click({force: true})
    cy.AddDate(startDate, endDate)
    return this

 }

 submitSeachButton()
 {
    const searchButton = cy.get('.postPop[name=submit]')
    searchButton.click()
    cy.url().should('include', 'depDate/13.06.2020/retDate/20.06.2020')
    return this
 }

 filterStar(star)
 {
    //const path = '.filter-checkbox[data-name="ab "'+star+' " Sternen"]'
    //[data-name="ab "3 " Sternen"]
    //[data-name="ab 3 "Sternen"]
    //cy.log(path)
    const defaultFourStarOption = cy.get('.filter-checkbox[data-name="ab '+star+' Sternen"]')
    defaultFourStarOption.should('be.visible').should('not.be.checked')
    cy.get('.filter-checkbox[data-name="ab '+star+' Sternen"]').click()
    //cy.get('.filter-checkbox[data-name="ab 4 Sternen"]').click()
    cy.get('.filter-checkbox[data-name="ab '+star+' Sternen"]').should('be.checked')
    return this
 }

 filterBestRating(rating)
 {
   // const path = '#hotelFilter > div.filter.filter-kundenbewertung > label:nth-child('+rating+') > svg'
    //const bestFilter = cy.get('#hotelFilter > div.filter.filter-kundenbewertung > label:nth-child(5) > svg')
    const bestFilter = cy.get('#hotelFilter > div.filter.filter-kundenbewertung > label:nth-child('+rating+') > svg')
    bestFilter.should('be.visible').click()
    cy.wait(5000)
    return this
 }

 verifyAppliedFilters()
 {
    const filter4Star = cy.get('[data-id="5 Punkte"]')
    filter4Star.should('be.visible')
    const filterBestRating = cy.get('[data-id="optCategory2"]')
    filterBestRating.should('be.visible')
    return this

 }

 sortPriceDescenadingOrder()
 {
    const priceDescOrder = cy.get('#hotelsorting')
    priceDescOrder.select('Höchster Preis').should('have.value', 'price_desc')
    cy.wait(10000)
    return this
 }

 verifyAmtSortedDescendingOrder()
 {
    cy.get('div >.price').should('have.length.gt', 0).then($prices =>{
        const prices = $prices.toArray()
        expect(prices).to.be.sorted({descending: true})
        cy.log("prices are sorted in descending order")
        
     })
     return this
 }

 selectExpensiveHotel()
 {
    cy.get('.hotel-name-wrapper').eq(0).then($value =>{
        const text = $value.text()
        cy.log(text+ " is listed as expensive hotel")
     })

     cy.get('#hotelList > div.skeleton-wrapper > article:nth-child(1) > div.content > div.priceBox > a').then($valueLink =>{
        const linkText = $valueLink.prop('href')
         cy.log(linkText)
         cy.visit(linkText).wait(5000)
    })
    return this
 }

 verifyExpensiveHotelSelected()
 {
   // cy.contains('.hotel-name-wrapper', "Castello Di San Marco Charming Hotel & Spa").should('be.visible')
   // cy.get('.go-back-button').should('be.visible')
   //.hotel-name-wrapper
    cy.get('.hotel-name > div').then($value =>{
       const text = $value.text()
       cy.log("Most expensive hotel "+text+" is selected")
    })
    return this
 } 
}

export default HotelSelection