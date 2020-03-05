/// <reference types ="cypress" />

class HotelDetails
{

    SelectDepartAndArrivalSliderTimeRange()
    {
        cy.get('#departureTimeRange > div > div:nth-child(1) > div').trigger('mouseover', { force: true }).trigger('mousedown', { force: true }).trigger('mousemove', 50, 10, { force: true }).trigger('mouseup', { force: true })
        cy.get('#departureTimeRange > div > div:nth-child(3) > div').trigger('mouseover', { force: true }).trigger('mousedown', { force: true }).trigger('mousemove', -20, -10, { force: true }).trigger('mouseup', { force: true })

        //  cy.get('#returnTimeRange > div > div:nth-child(1) > div').trigger('mouseover',{force: true}).trigger('mousedown').trigger('mousemove',  10, 10,{force: true}).trigger('mouseup', {force: true})
        cy.get('#returnTimeRange > div > div:nth-child(3) > div').trigger('mouseover', { force: true }).trigger('mousedown', { force: true }).trigger('mousemove', -110, -10, { force: true }).trigger('mouseup', { force: true })

        cy.get('#departureTimeFilterSkeleton > .time-footer > .time-min').should('be.visible', '04:00')
        cy.get('#departureTimeFilterSkeleton > .time-footer > .time-max').should('be.visible', '21:00')

        cy.get('#returnTimeFilterSkeleton > .time-footer > .time-min').should('be.visible', '00:00')
        cy.get('#returnTimeFilterSkeleton > .time-footer > .time-max').should('be.visible', '12:00')

        cy.wait(12000)
        return this
    }

    SelectOffer()
    {
       const offer = cy.get('#best-offers > .special-organizer > .content > .price > .price-check > .button-next')
       offer.should('be.visible')
       offer.click()
    }
    
    GetNumberOfDirectFlights()
    {
        
       
        cy.wait(5000)
        let count = 0
        cy.get('.duration').each((num, i, array) => {

            const text = num.text()


            if (text.includes('Direktflug')) {

                count++
                cy.log("Total number of direct flights " + count + ' :' + text)
            }


        })
        return this
    }


    SelecttArrivalDate(arrivalDate){
        cy.AddArrivalDate(arrivalDate)
        return this
    }

    submit() {
        const button = cy.get('#submit')
        button.click({ force: true })
        cy.wait(10000)
        return this
    }

    VerifyFlightTimeFallsWithinDepartureArrivalTimeRange()
    {
        let aaa
        let mmm
        cy.get('.flight-date').eq(0).then(DD => {

            aaa = DD.text()
            cy.log(aaa)
        })

        cy.get('.flight-date').eq(1).then(DDS => {

            mmm = DDS.text()
            cy.log(mmm)
        })
        cy.get('.flight-time>span:nth-child(1)').eq(0).then(timange => {
            const val = timange.text().split('-')
            const val2 = val[1].split(' ')

            var startTime1 = val[0] //14:50
            var EndTime1 = val2[1]  //20:55


            var startTime = '4:00'
            var endTime = '21:00'
            var checkTime1 = startTime1
            var checkTime2 = EndTime1

            let bbb = aaa.split('.')
            let ccc = bbb[0]
            let ddd = bbb[1]
            let eee = bbb[2]
            let fff = eee + '-' + ddd + '-' + ccc + 'T' + checkTime1.trim()
            let ggg = eee + '-' + ddd + '-' + ccc + 'T' + checkTime2.trim()

            var dt1 = new Date(fff)

            var dt2 = new Date(ggg)

            var s = startTime.split(':');
            var dt3 = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), parseInt(s[0]), parseInt(s[1]))

            var e = endTime.split(':');
            var dt4 = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), parseInt(e[0]), parseInt(e[1]))


            if (dt1 >= dt3 && dt1 <= dt4 && dt2 >= dt3 && dt2 <= dt4) {
                cy.log('Flight departue time ' + checkTime1 + '-' + checkTime2 + ' falls between ' + startTime + ' and ' + endTime)

            }
            else {
                cy.log('Flight departue time ' + checkTime1 + '-' + checkTime2 + ' not falls between ' + startTime + ' and ' + endTime)
                cy.contains("Sorry, something went wrong").should('exist')

            }
        })

        cy.get('.flight-time>span:nth-child(1)').eq(1).then(timevale => {
            const val = timevale.text().split('-')
            const val2 = val[1].split(' ')

            var ArrivalstartTime1 = val[0] //14:50
            var ArrivalEndTime1 = val2[1]  //20:55

            var startTime = '00:00'
            var endTime = '12:00'
            var checkTime1 = ArrivalstartTime1
            var checkTime2 = ArrivalEndTime1

            let bbb = mmm.split('.')
            let ccc = bbb[0]
            let ddd = bbb[1]
            let eee = bbb[2]
            let fff = eee + '-' + ddd + '-' + ccc + 'T' + checkTime1.trim()
            let ggg = eee + '-' + ddd + '-' + ccc + 'T' + checkTime2.trim()

            var dt1 = new Date(fff)

            var dt2 = new Date(ggg)

            var s = startTime.split(':');
            var dt3 = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), parseInt(s[0]), parseInt(s[1]))

            var e = endTime.split(':');
            var dt4 = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), parseInt(e[0]), parseInt(e[1]))


            if (dt1 >= dt3 && dt1 <= dt4 && dt2 >= dt3 && dt2 <= dt4) {
                cy.log('Flight arrival time ' + checkTime1 + '-' + checkTime2 + ' falls between ' + startTime + ' and ' + endTime)
            }
            else {
                cy.log('Flight arrival time ' + checkTime1 + '-' + checkTime2 + ' not falls between ' + startTime + ' and ' + endTime)
                cy.contains("Sorry, something went wrong").should('exist')

            }
        })
        return this
     
    }
    goToBookingForFirstFlight()
    {
        cy.get('#best-offers > article.success.top-offer.special-organizer.current > div > div.price.js-priceBlock > a')
            .invoke('attr', 'href')
            .then(href => {
                cy.visit(href)
            })
            return this
    }
}

export default HotelDetails