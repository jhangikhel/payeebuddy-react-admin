import React, { useEffect, useState } from 'react'
import {
  CButton,
  CFormSwitch,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilToggleOff, cilToggleOn } from '@coreui/icons'
import moment from 'moment'

const ManageVideo = () => {
  const [data, setData] = useState([])
  const [currentVideoPlaying, setCurrentPlaying] = useState(null)
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    setIsLoading(true)
    axios
      .get('https://payebuddy.xyz/api/videos')
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  const setSponsored = (id, type) => {
    setIsLoading(true)
    axios
      .put(`https://payebuddy.xyz/api/videos/${type}/` + id)
      .then((res) => {
        getData()
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <CSpinner />
        </div>
      )}
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Video Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Sponsored</CTableHeaderCell>
            <CTableHeaderCell scope="col">Creation Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Updation Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Original Video File Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Original Thumbnail File Name</CTableHeaderCell>
            <CTableHeaderCell align="center" scope="col">
              Thumbnail
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Video Url</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((d) => {
            return (
              <CTableRow>
                <CTableHeaderCell scope="row">{d.videoName}</CTableHeaderCell>
                <CTableDataCell>
                  <CTooltip content={d.sponsored ? 'Sponsored' : 'Not Sponsored'} placement="top">
                    <CFormSwitch
                      size="xl"
                      checked={d.sponsored}
                      onChange={(e) => {
                        setSponsored(d._id, 'sponsored')
                      }}
                      style={{ cursor: 'pointer' }}
                      disabled={isLoading}
                    />
                  </CTooltip>
                </CTableDataCell>
                <CTableDataCell>{moment(d.date).format('MM-DD-YYYY HH:mm')}</CTableDataCell>
                <CTableDataCell>{moment(d.updateDate).format('MM-DD-YYYY HH:mm')}</CTableDataCell>

                <CTableDataCell>{d.originalFileNameVideo}</CTableDataCell>
                <CTableDataCell>{d.originalFileNameThumbnail}</CTableDataCell>
                <CTableDataCell>
                  {' '}
                  <CImage align="start" rounded src={d.thumbnail} width={100} height={100} />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    onClick={() => {
                      setCurrentPlaying(d.videoUrl)
                      setVisible(!visible)
                    }}
                  >
                    Play Video
                  </CButton>
                </CTableDataCell>

                <CTableDataCell>
                  <CTooltip
                    content={d.deActivate ? 'Activate' : 'Deactivate'}
                    placement="top"
                    delay={{ show: 500, hide: 100 }}
                  >
                    <CFormSwitch
                      size="xl"
                      checked={d.deActivate}
                      onChange={(e) => {
                        setSponsored(d._id, 'deactivate')
                      }}
                      style={{ cursor: 'pointer' }}
                      disabled={isLoading}
                    />
                  </CTooltip>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Video</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {' '}
          <video controls style={{ marginLeft: '20px' }} height="240" width="440">
            <source src={currentVideoPlaying} type="video/mp4" />
          </video>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ManageVideo
