// import React, { useEffect, useRef } from 'react'

// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils'

// const MainChart = ({ data, labels }) => {
//   const chartRef = useRef(null)

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.options.scales.y.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.update()
//         })
//       }
//     })
//   }, [chartRef])
//   const chartData = data || defaultData;
//   const chartLabels = labels || defaultLabels;

//   // Calculate max value for y-axis
//   const maxValue = Math.max(...chartData, 50); // At least 50 for better visualization
//   const yAxisMax = Math.ceil(maxValue * 1.2);
//   const random = () => Math.round(Math.random() * 100)

//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '300px', marginTop: '40px' }}
//          data={{
//           labels: chartLabels,
//           datasets: [
//             {
//               label: 'Orders',
//               backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//               borderColor: getStyle('--cui-info'),
//               pointHoverBackgroundColor: getStyle('--cui-info'),
//               borderWidth: 2,
//               data: chartData,
//               fill: true,
//             },
//             // {
//             //   label: 'My Second dataset',
//             //   backgroundColor: 'transparent',
//             //   borderColor: getStyle('--cui-success'),
//             //   pointHoverBackgroundColor: getStyle('--cui-success'),
//             //   borderWidth: 2,
//             //   data: [
//             //     random(50, 200),
//             //     random(50, 200),
//             //     random(50, 200),
//             //     random(50, 200),
//             //     random(50, 200),
//             //     random(50, 200),
//             //     random(50, 200),
//             //   ],
//             // },
//             // {
//             //   label: 'My Third dataset',
//             //   backgroundColor: 'transparent',
//             //   borderColor: getStyle('--cui-danger'),
//             //   pointHoverBackgroundColor: getStyle('--cui-danger'),
//             //   borderWidth: 1,
//             //   borderDash: [8, 5],
//             //   data: [65, 65, 65, 65, 65, 65, 65],
//             // },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//                 drawOnChartArea: false,
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               border: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               max: yAxisMax,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(yAxisMax / 5),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 4,
//               hitRadius: 10,
//               hoverRadius: 6,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   )
// }

// export default MainChart
import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = ({ data, labels }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  // Use provided data or empty array
  const chartData = data || [];
  const chartLabels = labels || [];

  // Calculate max value for y-axis
  const maxValue = Math.max(...chartData, 50);
  const yAxisMax = Math.ceil(maxValue * 1.2);

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: chartLabels,
          datasets: [
            {
              label: 'Orders',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: chartData,
              fill: true,
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
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: yAxisMax,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(yAxisMax / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 6,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart