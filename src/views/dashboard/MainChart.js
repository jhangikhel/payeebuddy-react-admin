import React, { useEffect, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
function getMonthFromString(monthNumber){
   // We use 2000 as a placeholder year and 1 as a placeholder day.
  // The month number needs to be passed directly as it's 0-indexed.
  const date = new Date(2000, monthNumber -1, 1);

  // Use toLocaleString to get the month name.
  // 'default' uses the user's default locale.
  // The options object specifies we want the 'long' form of the month name.
  const monthName = date.toLocaleString('default', { month: 'long' });

  return monthName;
}
const ChartBarExample = ({ totaltranasction }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current
      if (chartInstance) {
        const { options } = chartInstance

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color')
        }

        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color')
          }
        }

        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color')
          }
        }

        chartInstance.update()
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const data = () => {
    console.log("totaltranasction", totaltranasction)
    const label = totaltranasction.map(r=>{
      console.log(getMonthFromString(r._id.month))
      return `${getMonthFromString(r._id.month)} - ${r._id.year}`
    });
    const amount = totaltranasction.map(r=>{
      return r.totalTransactionAmountMonthWise
    })
    return {
      labels: label, // 9 labels
      datasets: [
        {
          label: 'Transaction Amount ($)',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: amount,
        },
      ],
    }
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        type: 'category',
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        beginAtZero: true,
      },
    },
  }

  return <CChart type="bar" data={data} options={options} ref={chartRef} />
}
export default ChartBarExample