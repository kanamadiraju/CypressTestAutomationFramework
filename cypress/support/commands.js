// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
 Cypress.Commands.add("SelectNumberOfAdults", (AdultCount) => { 

    cy.get('.adultCount').then(($val)=>
      {
        const value = $val.text()
        cy.log(value)
        cy.get('#travellerSummary').click()
        for(let i=1;i<value;i++){
      
          cy.get('#adult > .minusButton').click()
         }
       //  cy.wait(5000)
         //const adultCount = 2
         
         for (let k=1;k<AdultCount;k++)
         {

             cy.get('#adult > .plusButton').click()
             cy.log(value)
         }
         
         const value1 = $val.text()
         cy.log(value1)
         //cy.log()
         cy.get('.adultCount').should('contain.text', AdultCount)

         cy.get('#submit').click({force: true})

        

      }) 
      

  })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("AddDate", (earliestArrivalDate, latestDepartureDate) => { 

    //cy.get('.datepicker-input-wrapper-start > .datepicker-trigger').click()
    const earliestArrival = earliestArrivalDate
    const latestDeparture = latestDepartureDate

    const monthNames = ["January", "Feb", "März", "April", "May", "Juni",
 "Juli", "August", "September", "Oktober", "November", "December"
];

     const d = new Date(earliestArrival)
     const year = d.getFullYear()
     const startdate = d.getDate()
     const ArrivalmonthNumber = d.getMonth()
     const Arrivalmonthandyear = monthNames[d.getMonth()] +' '+year
     cy.log("The current month is ***********" + Arrivalmonthandyear);
     cy.log("year***********"+year)
     cy.log("month number***********"+ArrivalmonthNumber)
     cy.log("Start Date is:"+startdate)


     const d1 = new Date(latestDeparture)
     const endDate = d1.getDate()
     const DepartureYear = d1.getFullYear()
     const Departuremonth = d1.getMonth()
     const Departuremonthandyear = monthNames[d1.getMonth()] +' '+DepartureYear
     cy.log("End Date is:"+endDate)

     cy.log("Departure month and year ***********" + Departuremonthandyear);
     cy.log("DepartureYear***********"+DepartureYear)
     cy.log("Departure month number***********"+Departuremonth)
    // const Departuremonth = '10'
    // const Departuremonthandyear = 'Oktober 2020'

    //cy.log(monthNeedToSelect)
    //cy.log(dd)
    //cy.log(year)
    //var ExpectedMonth = monthName + year
    //cy.log("curent month and year is*********"+ ExpectedMonth)

    var d2 = new Date();
     var n = d2.getMonth()+1;
    // cy.log("curent month is*********"+n)
    
   
    for (let step = n; step <= ArrivalmonthNumber; step++) {
     cy.get('[data-month='+ step +'][data-year='+year+']').then(function(bname){
       const txt = bname.text()
       cy.log(txt)
       cy.log(Arrivalmonthandyear)
       if(txt.includes(Arrivalmonthandyear))
       {
         //step++
         cy.log(step)
         // cy.get('.day-14').eq(1).click()
         //cy.get('.month-2.year-2020 > .days > tbody > :nth-child(4) > .day-14')
        //cy.wait(5000)
         cy.get('div.month.month-'+step+'.year-2020 > table > tbody > tr > td.day.day-'+startdate+'').click({force: true})
              //  'div.month.month-5.year-2020 > table > tbody > tr:nth-child(4) > td.day.day-13.selected'

         cy.get('.datepicker-input-wrapper-end > .datepicker-trigger').click({force: true})
         cy.get('.datepicker-input-wrapper-end > .datepicker-trigger').click({force: true})


         for (let k = step; k <= Departuremonth; k++) 
         {
             cy.get('[data-month='+ k +'][data-year='+year+']').then(function(bname){
             const txt = bname.text()
             cy.log(txt)
             cy.log(Departuremonthandyear)
             
             if(txt.includes(Departuremonthandyear))
             {
               cy.get('div.month.month-'+k+'.year-2020 > table > tbody > tr > td.day.day-'+endDate+'').click()

             }
             else
             {
               cy.get('.month-button-next').click({force: true})

             
             }
           })
         }
       }
    })
}

  })


  Cypress.Commands.add("AddArrivalDate", (earliestArrivalDate) => {

  cy.get('.datepicker-input-wrapper-end > .datepicker-trigger').click()
  const earliestArrival = earliestArrivalDate
  //const latestDeparture = latestDepartureDate

  const monthNames = ["January", "Feb", "März", "April", "May", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
  ];

  const d = new Date(earliestArrival)
  const year = d.getFullYear()
  const startdate = d.getDate()
  const ArrivalmonthNumber = d.getMonth()
  const Arrivalmonthandyear = monthNames[d.getMonth()] + ' ' + year
  cy.log("The current month is ***********" + Arrivalmonthandyear);
  cy.log("year***********" + year)
  cy.log("month number***********" + ArrivalmonthNumber)
  cy.log("Start Date is:" + startdate)


  /*  const d1 = new Date(latestDeparture)
   const endDate = d1.getDate()
   const DepartureYear = d1.getFullYear()
   const Departuremonth = d1.getMonth()
   const Departuremonthandyear = monthNames[d1.getMonth()] +' '+DepartureYear
   cy.log("End Date is:"+endDate) */

  /* cy.log("Departure month and year ***********" + Departuremonthandyear);
  cy.log("DepartureYear***********"+DepartureYear)
  cy.log("Departure month number***********"+Departuremonth) */
  // const Departuremonth = '10'
  // const Departuremonthandyear = 'Oktober 2020'

  //cy.log(monthNeedToSelect)
  //cy.log(dd)
  //cy.log(year)
  //var ExpectedMonth = monthName + year
  //cy.log("curent month and year is*********"+ ExpectedMonth)

  var d2 = new Date();
  var n = d2.getMonth() + 1;
  // cy.log("curent month is*********"+n)


  for (let step = n; step <= ArrivalmonthNumber; step++) {
    cy.get('[data-month=' + step + '][data-year=' + year + ']').then(function (bname) {
      const txt = bname.text()
      cy.log(txt)
      cy.log(Arrivalmonthandyear)
      if (txt.includes(Arrivalmonthandyear)) {
        cy.log(step)

        //cy.wait(5000)
        cy.get('div.month.month-' + step + '.year-2020 > table > tbody > tr > td.day.day-' + startdate + '').click({ force: true })

      }
      else {
        cy.get('.month-button-next').click({ force: true })


      }
    })
}

})



