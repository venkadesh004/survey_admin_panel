import {Pie} from "react-chartjs-2";

export const PieChart = ({chartData}) => {
    return (
        <div className="chart-container"  style={{width: "30%"}}>
            <h2 style={{textAlign: "center", marginTop: "30px", marginBottom: "30px"}}>Lecture Rating</h2>
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