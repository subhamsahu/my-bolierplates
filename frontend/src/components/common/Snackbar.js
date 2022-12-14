import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { hideSnackBar } from '../../redux/actions/snackBarActions';

const Snackbar = (props) => {
    const dispatch = useDispatch()
    const snackBar = useSelector(state => state.snackBarStateData)

    if (snackBar.show) {
        setTimeout(() => {
            dispatch(hideSnackBar())
        }, 3000);
    }
    return (<>
        {
            snackBar.show
                ? <div className='snackbar'>
                    <div className={`${snackBar.type}`} role="alert">
                        <p className='text-white small'><i className={snackBar.type === 'alert-danger'?'fa fa-exclamation-triangle':'fa fa-check-circle'}></i>&nbsp;&nbsp;{snackBar.msg}</p>
                    </div>
                </div>
                : <></>
        }
    </>
    )
}

export default Snackbar