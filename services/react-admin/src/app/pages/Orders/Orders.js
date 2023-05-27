import React from 'react'
import { ContentBox } from '../../styles/AppStyles'


const Orders = () => {
    return (
        <ContentBox>
            <table class="table align-middle mb-0 bg-white">
                <thead class="bg-light">
                    <tr>
                        <th>Order ID</th>
                        <th>Restaurant</th>
                        <th>Active Status</th>
                        <th>Payment Status</th>
                        <th>Payment Mode</th>
                        <th>Sale Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">PED123456</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">LOREM IPSUM</p>
                        </td>
                        <td>
                            <span class="badge badge-success rounded-pill d-inline">Active</span>
                        </td>
                        <td>
                            <span class="badge badge-danger rounded-pill d-inline">Not Verified</span>
                        </td>
                        <td>Online-Razorpay</td>
                        <td>Rs, 423</td>
                        <td>
                            <button type="button" class="btn btn-link btn-sm btn-rounded">
                                Details
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ContentBox>
    )
}

export default Orders