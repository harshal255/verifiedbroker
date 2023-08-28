import Chart from 'react-apexcharts';

const BarChart = () => {
    const options = {
        chart: {
            id: 'stacked-bar'
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
          ],
        plotOptions: {
            bar: {

                dataLabels: {
                    position: 'top' // Adjust the position of the data labels
                }
            }
        },
        colors: ['#475BE8', '#CFC8FF'], // Set the colors for the columns

    };

    const series = [
        {
            name: 'Sales',
            data: [30, 40, 25, 50, 49, 21, 70, 51, 42, 60, 45, 30]
        },
        {
            name: 'Expenses',
            data: [20, 10, 15, 30, 20, 25, 35, 30, 25, 40, 30, 20]
        }
    ];

    return (
        <div>
            <Chart options={options} series={series} type="bar" width="700" />
        </div>
    );
}
export default BarChart;
