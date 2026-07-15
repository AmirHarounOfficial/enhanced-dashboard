// import React from 'react'

// function SectionOfMenuPage() {
//   return (
//     <div>SectionOfMenuPage</div>
//   )
// }

// export default SectionOfMenuPage

import React, { Suspense } from 'react'
import Terms_PoliciesPage from './Terms_Policies/page'
import WorkplacesPage from './Workplaces/page'
import WorkingHoursPage from './WorkingHours/page'
import LegalDocumentsPage from './LegalDocuments/page'
import ReviewsPage from './Reviews/page'
import Loader from '@/app/Components/Loader/Loader'

function SectionOfMenuPage({selectedMenu}) {

  const renderContent =()=>{
    switch(selectedMenu){
      case 1:
        return (
          <Suspense fallback={<Loader />}>
            <Terms_PoliciesPage/>
          </Suspense>
        )
      case 2:
        return (
          <Suspense fallback={<Loader />}>
            <WorkplacesPage/>
          </Suspense>
        )
      case 3:
        return(
          <Suspense fallback={<Loader />}>
            <WorkingHoursPage/>
          </Suspense>
        )
      case 4:
        return(
          <Suspense fallback={<Loader />}>
            <LegalDocumentsPage/>
          </Suspense>
        )
      case 5:
        return(
          <Suspense fallback={<Loader />}>
            <ReviewsPage/>
          </Suspense>
        )
    }
  }
  return (
    <>
    <Suspense fallback={<Loader />}>
      {renderContent()}
    </Suspense>
    </>
  )
}

export default SectionOfMenuPage