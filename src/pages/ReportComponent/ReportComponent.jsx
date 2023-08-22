import React, { Component } from "react";
import "./ReportComponent.css";
import { BarChart } from "../../components/BarChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { courseExitComponentAPIUrl } from "../../config/API";
import axios from "axios";
import Select from "react-dropdown-select";
import { PieChart } from "../../components/PieChart";

Chart.register(CategoryScale);

export default class ReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList: [],
      currentCourse: "18CS610",
      data: [],
      lectureRatingPie: [25, 25, 25, 25],
    };
  }

  componentDidMount = async () => {
    axios.get(courseExitComponentAPIUrl.getCourses).then((output) => {
      var l = [];

      output.data.forEach((element) => {
        l.push({ label: element, value: element });
      });

      this.setState({
        courseList: l,
      });
    });
  };

  handleChanges = async (values) => {
    this.setState({
      currentCourse: values[0].value,
    });

    console.log(values[0].value);

    var appropriatenessOfAssessmentToolsUsed = 0;
    var hostingTools = 0;
    var lectureRating = 0;
    var textBookAvailability = 0;

    var lectureRatingPie = [25, 25, 25, 25];

    await axios
      .get(courseExitComponentAPIUrl.getCourseReport + "/" + values[0].value)
      .then((output) => {
        console.log(output.data);

        output.data[0].forEach((element) => {
          if (element === "appropriate") {
            appropriatenessOfAssessmentToolsUsed += 2;
          } else if (element == "changesRequired") {
            appropriatenessOfAssessmentToolsUsed += 1;
          }
        });

        output.data[1].forEach((element) => {
          if (element === "excellent") {
            hostingTools += 3;
          } else if (element === "good") {
            hostingTools += 2;
          } else if (element === "average") {
            hostingTools += 3;
          }
        });

        output.data[2].forEach((element) => {
          if (element === "excellent") {
            lectureRating += 3;
            lectureRatingPie[0] += 1;
          } else if (element === "good") {
            lectureRating += 2;
            lectureRatingPie[1] += 1;
          } else if (element === "average") {
            lectureRating += 3;
            lectureRatingPie[2] += 1;
          } else {
            lectureRatingPie[3] += 1;
          }
        });

        output.data[3].forEach((element) => {
          if (element === "available") {
            textBookAvailability += 2;
          } else if (element === "moreCopiesRequired") {
            textBookAvailability += 1;
          }
        });

        this.setState({
          data: [
            appropriatenessOfAssessmentToolsUsed,
            hostingTools,
            lectureRating,
            textBookAvailability,
          ],
          lectureRatingPie: lectureRatingPie,
        });
      });
  };

  render() {
    var chartData = {
      labels: [
        "Appropriateness of Assessment Tools",
        "Hosting Tools",
        "Lecture Rating",
        "Text Book Availability",
      ],
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    };

    var pieData = {
      labels: ["Excellent", "Good", "Average", "Poor"],
      datasets: [
        {
          fill: true,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          data: this.state.lectureRatingPie,
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="RecruiterComponent">
        <h1 style={{ marginBottom: "40px" }}>Report Data</h1>
        <Select
          style={{ zIndex: 0 }}
          options={this.state.courseList}
          onChange={(values) => this.handleChanges(values)}
        />
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <PieChart chartData={pieData} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "500px",
              justifyContent: "space-between",
              height: "150px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                  borderColor: "rgb(255, 99, 132)",
                }}
              ></div>
              <p>Excellent: {this.state.lectureRatingPie[0]}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(255, 159, 64, 0.7)",
                  borderColor: "rgb(255, 159, 64)",
                }}
              ></div>
              <p>Good: {this.state.lectureRatingPie[1]}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(255, 205, 86, 0.7)",
                  borderColor: "rgb(255, 205, 86)",
                }}
              ></div>
              <p>Average: {this.state.lectureRatingPie[2]}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(75, 192, 192, 0.7)",
                  borderColor: "rgb(75, 192, 192)",
                }}
              ></div>
              <p>Poor: {this.state.lectureRatingPie[3]}</p>
            </div>
          </div>
        </div>
        <BarChart chartData={chartData} />
      </div>
    );
  }
}
