import React, { Fragment, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { showSnackBar } from '../../redux/actions/snackBarActions';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import { getUserData } from '../../services/Common';
import { createUserRestaurant } from '../../services/Restaurant/Restaurant';
import { ContentBox } from '../../styles/AppStyles';
import TopSpinner from '../../components/Spinner/TopSpinner';

const Restaurant = () => {
    const [loadComponentData, setloadComponentData] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const openModalHandler = () => {
        setopenModal(!openModal)
    }

    return (
        <ContentBox>
            <button className='btn btn-sm bg-blue' onClick={openModalHandler}> <AddIcon fontSize='small' /> Create Restaurant</button>
            <Modal open={openModal}>
                <CreatRestauranForm openModalHandler={openModalHandler} />
            </Modal>
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
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img
                                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                    alt=""
                                    style={{ "width": "45px", "height": "45px" }}
                                    class="rounded-circle"
                                />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">John Doe</p>
                                    <p class="text-muted mb-0">john.doe@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">+91650199999</p>
                        </td>
                        <td>
                            <span class="badge badge-success rounded-pill d-inline">Active</span>
                        </td>
                        <td>
                            <span class="badge badge-danger rounded-pill d-inline">Not Verified</span>
                        </td>
                        <td>Senior</td>
                        <td>
                            <button type="button" class="btn btn-link btn-sm btn-rounded">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ContentBox>
    )
}

const addRestaurantBody = {
    "user": "",
    "name": "",
    "rating": "0",
    "avg_cost": "0",
    "avg_time": "0",
    "img_url": "someurl",
    "cuisines": [],
    "veg": false,
    "geometry": {},
    "categories": [],
    "items": []
}


const CreatRestauranForm = ({ openModalHandler }) => {
    const dispatch = useDispatch()
    const [restauratPayload, setrestaurantPayload] = useState(addRestaurantBody)
    const [loading, setloading] = useState(false)

    const onChangeForm = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(e.target.name === 'cuisines')
        if (e.target.name === 'categories' || e.target.name === 'cuisines') {
            let stringlist = e.target.value
            setrestaurantPayload({ ...restauratPayload, [e.target.name]: stringlist.split(',') })
        } else {
            setrestaurantPayload({ ...restauratPayload, [e.target.name]: e.target.value })
        }
        console.log(restauratPayload)
    }

    const handleCreateRestaurant = async () => {
        setloading(true)
        let coordinate = {
            latitude: '',
            longitude: ''
        }
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position.coords)
            coordinate.latitude = position.coords.latitude
            coordinate.longitude = position.coords.longitude
            restauratPayload.geometry = coordinate
        })
        const user = getUserData()
        console.log(user)
        restauratPayload.user = user.email
        console.log(restauratPayload)
        const data = await createUserRestaurant(restauratPayload)
        console.log(data)
        if (data.success && data.exception_reason == null && data.data === 'Restaurant Created Successfully') {
            dispatch(showSnackBar({ msg: "Create Restaurant Success", type: "success" }))
        } else {
            dispatch(showSnackBar({ msg: `Create Restaurant Fail ${data.exception_reason}`, type: "error" }))
        }
        setloading(false)
    }

    return (
        <Fragment>
            <TopSpinner open={loading} />
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create Restaurant</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" onClick={openModalHandler}></button>
                    </div>
                    <div class="modal-body">
                        <div className="row" style={{ "width": '400px' }}>
                            <div className='col-12'>
                                <label htmlFor="title" className="small">Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='name'
                                    onChange={(e) => onChangeForm(e)}
                                    id="name"
                                    placeholder="Your Restaurant Name Come Here"
                                    required="required" />

                                <label htmlFor="desc" className="small mt-3">Cuisines</label>
                                <textarea
                                    className="form-control form-control-sm"
                                    name='cuisines'
                                    onChange={(e) => onChangeForm(e)}
                                    id='cuisines'
                                    placeholder="Your Restaurant Cuisines"
                                ></textarea>
                                <label className="small">Veg Only</label>
                                <select
                                    name='veg'
                                    className="form-control form-control-sm"
                                    id="area-of-specialization"
                                    onChange={(e) => onChangeForm(e)}
                                    required="required">
                                    <option key={"true"} selected="selected" value={false}>{"No"}</option>
                                    <option key={"false"} value={true}>{"Yes"}</option>

                                </select>
                                <label htmlFor="title" className="small">Categories</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name='categories'
                                    onChange={(e) => onChangeForm(e)}
                                    id="name"
                                    placeholder="List of Categories"
                                    required="required" />
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm bg-blue" onClick={handleCreateRestaurant}>Create Restaurant</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Restaurant