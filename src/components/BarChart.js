import {Bar} from "react-chartjs-2";

export const BarChart = ({chartData}) => {
    return (
        <div className="chart-container"  style={{width: "100%"}}>
            <h2 style={{textAlign: "center", marginTop: "30px"}}>Course Report</h2>
            <Bar
                data = {chartData}
                options = {{
                    plugins: {
                        title: {
                            display: true,
                            text: "Survey report"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
                style={{width: "100%"}}
            />
        </div>
    );
}