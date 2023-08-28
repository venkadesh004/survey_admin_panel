import {Pie} from "react-chartjs-2";

export const PieChart = ({chartData, heading}) => {
    return (
        <div className="chart-container"  style={{width: "30%"}}>
            <h2 style={{textAlign: "center", marginTop: "30px", marginBottom: "30px"}}>{heading}</h2>
            <Pie
                data = {chartData}
                options = {{
                    plugins: {
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