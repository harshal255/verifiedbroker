import Chart from 'react-apexcharts';

const AreaChartWeekly = () => {
  const options = {
    chart: {
      id: 'basic-area'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    responsive: [
      {
        breakpoint: 480, // Define the breakpoint at which the configuration will be overridden
        options: {
          // Configure options for screens with a max-width of 480px
          chart: {
            width: '100%' // Adjust the width of the chart
          }
        }
      }
    ]

  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 25, 50, 49, 21, 70, 51, 42, 60, 45, 30]
    }
  ];

  return (
    <div>
      <Chart options={options} series={series} type="area" width="700"/>
    </div>
  );
}

export default AreaChartWeekly;