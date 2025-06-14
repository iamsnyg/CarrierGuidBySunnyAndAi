import React, { Suspense } from 'react'
import { HashLoader } from 'react-spinners'

const Layout = ({ children }) => {
return (
    <div className="px-5">
        <Suspense fallback={<HashLoader className='mt-4' width={100} color='purple' />}>{children}</Suspense>
    </div>
);
}

export default Layout