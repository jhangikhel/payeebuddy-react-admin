import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { monthsName } from '../../assets/common'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const { allData } = props
  const { totalUsers, users, totalEarnFromAds, totaltranasction, totalVideos, top10Videos } =
    allData
  const userGraphMonthYear = users.map((u) => {
    return `${monthsName[u._id.month]} ${u._id.year}`
  })
  const userGraphTotal = users.map((u) => {
    return u.totalUserMonthWise
  })
  const rewardsGraphEarnYear = totalEarnFromAds.map((u) => {
    return `${monthsName[u._id.month]} ${u._id.year}`
  })
  const rewardsGraphEarnTotal = totalEarnFromAds.map((u) => {
    return u.totalTransactionAmountMonthWise
  })
  const totalEarnRewards = rewardsGraphEarnTotal.reduce((partialSum, a) => partialSum + a, 0)
  const tranactionGraphEarnTotal = totaltranasction.map((u) => {
    return u.totalTransactionAmountMonthWise
  })
  const totalTranasction = tranactionGraphEarnTotal.reduce((partialSum, a) => partialSum + a, 0)
  const top10VideosNames = top10Videos.map((u) => {
    return u.videoName
  })
  const top10VideosWatched = top10Videos.map((u) => {
    return u.arraySize
  })
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {totalUsers}{' '}
              {/* <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Total Users"
          /* action={
          <CDropdown alignment="end">
            <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
              <CIcon icon={cilOptions} />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        } */
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: userGraphMonthYear,
                datasets: [
                  {
                    label: 'Users',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: userGraphTotal,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: Math.min.apply(Math, userGraphTotal) - 5,
                    max: Math.max.apply(Math, userGraphTotal) + 5,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              ${totalEarnRewards}
              {/*  <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Earn Rewards"
          /* action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          } */
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: rewardsGraphEarnYear,
                datasets: [
                  {
                    label: 'Rewards',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: rewardsGraphEarnTotal,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: Math.min.apply(Math, rewardsGraphEarnTotal) - 5,
                    max: Math.max.apply(Math, rewardsGraphEarnTotal) + 5,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              ${totalTranasction}
              {/* <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Total Transaction"
          /*  action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          } */
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: rewardsGraphEarnYear,
                datasets: [
                  {
                    label: 'Transaction',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: tranactionGraphEarnTotal,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {totalVideos}
              {/* <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Total ADS"
          /*  action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          } */
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: top10VideosNames,
                datasets: [
                  {
                    label: 'No. of user Watched',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: top10VideosWatched,
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
