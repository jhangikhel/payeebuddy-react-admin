import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import axios from 'axios'
import moment from 'moment'

const Dashboard = () => {
  const [allData, setAllData] = useState({
    users: [],
    totalUsers: 0,
    totalEarnFromAds: [],
    recentTransactions: [],
    recentUsers: [],
    totaltranasction: [],
    totalVideos: 0,
    top10Videos: [],
  })

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    axios
      .get('https://payebuddy.xyz/api/users/dashboarduser')
      .then((res) => {
        console.log('RES', res)
        setAllData(res.data)
      })
      .catch((err) => { })
  }


  return (
    <>
      <WidgetsDropdown allData={allData} className="mb-4" />
      <CCard className="mb-4">
       {/*  <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody> */}
        {/*   <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter> */}
      </CCard>
      {/*  <WidgetsBrand className="mb-4" withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Recent Users And Transaction</CCardHeader>
            <CCardBody>




              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Mobile No.</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Balance
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Reward Points
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allData.recentUsers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.profileImage ? item.profileImage : avatar1} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.phoneNumber}</div>
                        <div className="small text-body-secondary text-nowrap">
                          Email Verified:<span>{item.emailVerified ? 'Yes' : 'No'}</span>| DOJ:{' '}
                          {moment(item.creationDate).format('MM-DD-YYYY HH:mm')}
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">${item.balance}</CTableDataCell>
                      <CTableDataCell className="text-center">${item.rewardPoints}</CTableDataCell>

                      <CTableDataCell className="text-center">{item.email}</CTableDataCell>

                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">
                          {moment(item.lastLoginDate).format('MM-DD-YYYY HH:mm')}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Sender Detail</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Receiver Detail</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Amount
                    </CTableHeaderCell>
                    
                    <CTableHeaderCell className="bg-body-tertiary">Transaction Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allData.recentTransactions.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>

                      <CTableDataCell>
                        <div>{item.senderId?.phoneNumber}</div>
                        <div className="small text-body-secondary text-nowrap">
                          Email:<span>{item.senderId?.email}</span>| Name:{' '}
                          {`${item.senderId?.firstName} ${item.senderId?.lastName}`}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.receiverId?.phoneNumber}</div>
                        <div className="small text-body-secondary text-nowrap">
                          Email:<span>{item.receiverId?.email}</span>| Name:{' '}
                          {`${item.receiverId?.firstName} ${item.receiverId?.lastName}`}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">${item.amount}</CTableDataCell>


                      <CTableDataCell>

                        {moment(item.date).format('MM-DD-YYYY HH:mm')}

                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
