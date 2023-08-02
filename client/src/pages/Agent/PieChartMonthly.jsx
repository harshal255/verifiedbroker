import Chart from 'react-apexcharts';

const options = {
    labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
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
const series = [44, 55, 13, 43, 22];

const PieChartMonthly = () => {

    return (

        <> <Chart options={options} series={series} type="pie" width="700" /></>
    );
}
export default PieChartMonthly;