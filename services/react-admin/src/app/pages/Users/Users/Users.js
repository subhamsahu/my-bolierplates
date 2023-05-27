import React, { useState, useCallback, useEffect } from 'react'
import BaseDataTable from '../../../components/DataTables/BaseDataTable'
import { adminGetAllUsers } from '../../../services/Auth/AdminAuth'
import { getCurrentUserToken, getUserData } from '../../../services/Common'
import { showSnackBar } from '../../../redux/actions/snackBarActions'
import { useDispatch } from 'react-redux'
import Loader from '../../../components/Loader/Loader'
import Spinner from '../../../components/Spinner/Spinner'
import Modal from '../../../components/Modal/Modal'
import { createUserRestaurant } from '../../../services/Restaurant/Restaurant'
import { ContentBox } from '../../../styles/AppStyles'
import { DEV_MODE } from '../../../core/constants'
import { Button, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';

const Users = () => {
    const token = getCurrentUserToken()
    const [users, setusers] = useState([])
    const [openModal, setopenModal] = useState(false)
    const [currentUser, setcurrentUser] = useState(null)
    const openModalHandler = (user) => {
        setopenModal(!openModal)
        setcurrentUser(user)

    }
    const getAllUsers = async () => {
        const data = await adminGetAllUsers(token)
        if (data.success && data.data) {
            setusers(data.data)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    const openGoogle = () => {
        window.open("http://127.0.0.1:6080/api/auth/google", "_parent");
    };

    return (
        <ContentBox>
            {
                DEV_MODE ?
                    <Button className='bg-blue' onClick={openGoogle}><GoogleIcon fontSize='small' /> <Typography>  Sign In With Google</Typography></Button> : <></>
            }
            <Modal open={openModal}>
                <EditUserForm openModalHandler={openModalHandler} user={currentUser} />
            </Modal>
            <div style={{ 'overflowX': 'auto' }}>
                <table class="table align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Active Status</th>
                            <th>Verified Status</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img
                                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                            alt=""
                                            style={{ "width": "45px", "height": "45px" }}
                                            class="rounded-circle"
                                        />
                                        <div class="ms-3">
                                            <p class="fw-bold mb-1">{user.firstName}</p>
                                            <p class="text-muted mb-0">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{user.phoneNumber}</p>
                                </td>
                                <td>
                                    {
                                        user.active ? <span class="badge badge-success rounded-pill d-inline">Active</span> :
                                            <span class="badge badge-danger rounded-pill d-inline">Not Active</span>
                                    }
                                </td>
                                <td>
                                    {
                                        user.verified ? <span class="badge badge-success rounded-pill d-inline">Verified</span> :
                                            <span class="badge badge-danger rounded-pill d-inline">Not Verified</span>
                                    }
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={() => openModalHandler(user)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </ContentBox>
    )
}

const EditUserForm = ({ openModalHandler, user }) => {
    const dispatch = useDispatch()
    console.log(user)

    const onChangeForm = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
    }

    const handleCreateRestaurant = async () => {

    }

    return (
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit User {user.email}</h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" onClick={openModalHandler}></button>
                </div>
                <div class="modal-body">
                    <div className="row" style={{ "width": '400px' }}>
                        <div className='col-12'>
                            <label htmlFor="title" className="small">Email</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name='email'
                                id="email"
                                value={user.email}
                                disabled
                                required="required" />
                            <label htmlFor="title" className="small">Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name='name'
                                onChange={(e) => onChangeForm(e)}
                                id="name"
                                placeholder={user.firstName}
                                required="required" />

                            <label htmlFor="title" className="small">Phone</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name='phone'
                                id="phone"
                                value={user.phone}
                                disabled
                                required="required" />

                            <label className="small">Active</label>
                            <select
                                name='active'
                                className="form-control form-control-sm"
                                id="area-of-specialization"
                                onChange={(e) => onChangeForm(e)}
                                required="required">
                                {
                                    user.is_active ? <>
                                        <option key={"true"} value={false}>{"No"}</option>
                                        <option key={"false"} selected value={true}>{"Yes"}</option>
                                    </> : <>
                                        <option key={"true"} selected value={false}>{"No"}</option>
                                        <option key={"false"} value={true}>{"Yes"}</option>
                                    </>
                                }

                            </select>
                            <label className="small">Verified</label>
                            <select
                                name='active'
                                className="form-control form-control-sm"
                                id="area-of-specialization"
                                onChange={(e) => onChangeForm(e)}
                                required="required">
                                {
                                    user.is_verified ? <>
                                        <option key={"true"} value={false}>{"No"}</option>
                                        <option key={"false"} selected value={true}>{"Yes"}</option>
                                    </> : <>
                                        <option key={"true"} selected value={false}>{"No"}</option>
                                        <option key={"false"} value={true}>{"Yes"}</option>
                                    </>
                                }

                            </select>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm bg-blue" onClick={handleCreateRestaurant}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}


export default Users