/// <reference types ="cypress" />

import SearchPage from "../PageObjects/SearchPage"
import HotelSelection from "../PageObjects/HotelSelection"
import HotelDetails from "../PageObjects/HotelDetails"
import BookingPage from "../PageObjects/BookingPage"



describe('Test Suite Name', function () {
    before(function () {
        // cy.log("***************This is SETUP block********************")
        cy.fixture('profile').then(function (data) {

            this.data = data

        })

    })

    it('TestCase-01', function () {

        const search = new SearchPage()
        const HotelSelect = new HotelSelection()
        search.visit()
        //search.enterCity("Sizilien")
        search.enterCity(this.data.city)
        //search.selectDate("06/06/2020", "06/13/2020")
        search.selectDate(this.data.startDate, this.data.endDate)
        search.enterAdults(this.data.adultCount)
        search.submit()
        cy.url().should('include', 'depDate/06.06.2020/retDate/13.06.2020')
        HotelSelect.enterDateFromSecondPage(this.data.changeStartDate, this.data.changeEndDate)
        HotelSelect.submitSeachButton()

    })

    it('Testcase-02', function () {
        const HotelSelect = new HotelSelection()
        HotelSelect.filterStar(4)
        HotelSelect.filterBestRating(5)
        HotelSelect.verifyAppliedFilters()
    })

    it('Testcase-03', function () {
        const HotelSelect = new HotelSelection()
        HotelSelect.sortPriceDescenadingOrder()
        HotelSelect.verifyAmtSortedDescendingOrder()
    })

    it('Testcase-04', function () {
        const HotelSelect = new HotelSelection()
        HotelSelect.selectExpensiveHotel()
        HotelSelect.verifyExpensiveHotelSelected()
        cy.contains('Castello Di San Marco Charming Hotel & Spa').should('be.visible')  
    })

    it('Testcase-05', function () {

        const HotelDetail = new HotelDetails()
        HotelDetail.SelectDepartAndArrivalSliderTimeRange()

    })


    it('Testcase-06', function () {

        const HotelDetail = new HotelDetails()
        HotelDetail.SelecttArrivalDate("07/13/2020")
        HotelDetail.submit()
        cy.url().should('include', 'retDate/13.07.2020')

    })


    it('Testcase-07', function () {

        const HotelDetail = new HotelDetails()
        HotelDetail.SelectOffer()
        HotelDetail.GetNumberOfDirectFlights()

    })

    it('Testcase-08', function () {

        const HotelDetail = new HotelDetails()
        HotelDetail.VerifyFlightTimeFallsWithinDepartureArrivalTimeRange()


    })

    it('Testcase-09', function () {

        const HotelDetail = new HotelDetails()
        HotelDetail.goToBookingForFirstFlight()
        

    })

    it('Testcase-10', function () {
        const BookPage = new BookingPage() 
        BookPage.VerifyHotelName()  

    })



})