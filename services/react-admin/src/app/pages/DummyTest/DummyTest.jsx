import React, { useState } from 'react'
import { ContentBox } from '../../styles/AppStyles'
import AppLoading from '../../components/Common/MatxComponents/MatxLoading'
import GoogleIcon from '../../components/Icons/GoogleIcon'
import Spinner from '../../components/Spinner/Spinner'
import ShoppingCart from '../../components/Common/MatxComponents/ShoppingCart'
import TopSpinner from '../../components/Spinner/TopSpinner'
import { MatxLoading } from '../../components/Common/MatxComponents'

const DummyTest = () => {
    const [openLoader, setopenLoader] = useState(false)
    const handleOpenLoader = ()=>{
        console.log(openLoader)
        setopenLoader(!openLoader)
    }
    return (
        <ContentBox>
            {/* <Spinner /> */}
            <GoogleIcon/>
            <TopSpinner open={openLoader}/>
            <button className='btn btn-primary' onClick={handleOpenLoader}>Open Modal</button>
            <MatxLoading/>
        </ContentBox>
    )
}

export default DummyTest