import React, { useEffect, useState } from 'react'
import { CAvatar, CBadge, CButton, CCollapse, CFormSwitch, CSmartTable, CTooltip } from '@coreui/react-pro'
import axios from 'axios'
import { UserTabs } from './UserTabs'
import moment from 'moment'

const ManageUsers = () => {
    const [details, setDetails] = useState([])
    const [data, setData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getUsers()
    }, []);
    const getUsers = () => {
        axios.get(`https://payebuddy.xyz/api/users/allusers?limit=20&page=1`).then((res) => {
            setData(res.data);
            setIsLoading(false);
        })
    }
    const setActivation = (userId) => {
        setIsLoading(true);
        axios
            .put(`https://payebuddy.xyz/api/users/activate/${userId}`)
            .then((res) => {
                getUsers();
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false);
            })
    }
    const columns = [
        {
            key: 'phoneNumber',
            _style: { width: '20%' },
        },
        {
            key: 'name',
            _style: { width: '20%' },
        },
        {
            key: 'dob',
            _style: { width: '20%' },
        },
        {
            key: 'email',
            _style: { width: '20%' },
        },
        {
            key: 'emailVerified',
            _style: { width: '20%' },
        },

        'balance',

        {
            key: 'rewardPoints',
            label: 'Rewards',

            filter: false,
            sorter: false,
        },
        {
            key: 'activate',
            label: 'Activate',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },

        {
            key: 'show_details',
            label: 'Action',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },
    ]

    const toggleDetails = (id) => {
        const position = details.indexOf(id)
        let newDetails = [...details]
        if (position === -1) {
            newDetails = [id]
            setSelectedUserId(id);
        } else {
            newDetails.splice(position, 1)
        }
        setDetails(newDetails)

    }

    return (
        <CSmartTable
            activePage={2}

            clickableRows
            columns={columns}

            items={data}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            onFilteredItemsChange={(items) => {
                console.log('onFilteredItemsChange')
                console.table(items)
            }}
            onSelectedItemsChange={(items) => {
                console.log('onSelectedItemsChange')
                console.table(items)
            }}
            scopedColumns={{
                registered: (item) => {
                    const date = new Date(item.registered)
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }
                    return <td>{date.toLocaleDateString('en-US', options)}</td>
                },
                name: (item) => <td>{`${item.firstName} ${item.lastName}`}</td>,
                emailVerified: (item) => <td>{item.emailVerified ? "Yes" : "No"}</td>,
                balance: (item) => <td>${item.balance}</td>,
                dob: (item) => <td>{moment(item.dob).format('MM-DD-YYYY')}</td>,
                rewardPoints: (item) => <td>${item.rewardPoints}</td>,
                show_details: (item) => {
                    return (
                        <td className="py-2">
                            <CButton
                                disabled={isLoading}
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => {
                                    toggleDetails(item._id)
                                }}
                            >
                                {details.includes(item._id) ? 'Hide Details' : 'Show Details'}
                            </CButton>
                        </td>
                    )
                },
                details: (item) => {
                    return (
                        <CCollapse visible={details.includes(item._id)}>
                            {details.includes(item._id) &&
                                <UserTabs userId={selectedUserId} />
                            }
                        </CCollapse>
                    )
                },
                activate: (item) => {
                    return (
                        <td className="py-2">
                            <CTooltip
                            delay={{ show: 500, hide: 100 }}
                                content={item.activate ? "Activate" : "Deactivate"}
                                placement="top"

                            >
                                <CFormSwitch
                                    size="xl"
                                    checked={item.activate}
                                    onChange={(e) => {
                                        setActivation(item._id)
                                    }}
                                    style={{ cursor: "pointer" }}
                                    disabled={isLoading}
                                />
                            </CTooltip>
                        </td>
                    )
                },

            }}
            sorterValue={{ column: 'status', state: 'asc' }}

            tableProps={{
                className: 'add-this-custom-class',
                responsive: true,
                striped: true,
                hover: true,
            }}
            tableBodyProps={{
                className: 'align-middle',
            }}
        />
    )
}
export default ManageUsers
