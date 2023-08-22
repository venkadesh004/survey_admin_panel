import React, { Component } from "react";
import "./CourseExitComponent.css";

import axios from "axios";
import { courseExitComponentAPIUrl } from "../../config/API";

export default class CourseExitComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      context: [],
      editable: [],
      loader: true,
    };
  }

  componentDidMount = async () => {
    await axios.get(courseExitComponentAPIUrl.get).then((output) => {
      this.setState({
        data: output.data,
      });
      var l = [];
      var cont = [];
      for (var i = 0; i < output.data.length; i++) {
        l.push("non-editable");
        cont.push("Edit");
      }
      this.setState({
        editable: l,
        context: cont,
        loader: false,
      });
    });
  };

  handleUpdate = async (index) => {
    var l = this.state.editable;
    var cont = this.state.context;

    if (this.state.editable[index] !== "editable") {
      l[index] = "editable";
      cont[index] = "Update";

      this.setState({
        editing: l,
        context: cont,
      });
    } else {
      console.log("Records: ", index, this.state.data);
      console.log("New Record", this.state.data[index]);

      await axios
        .put(courseExitComponentAPIUrl.update, this.state.data[index])
        .then((result) => {
          console.log("Result: ", result.data);
          this.setState({
            data: result.data,
          });
          console.log(this.state.data);
        });

      l[index] = "non-editable";
      cont[index] = "Edit";

      this.setState({
        editing: l,
        context: cont,
      });
    }
  };

  handleChange = (e, index, place) => {
    var l = this.state.data;
    l[index][place] = e.target.value;

    this.setState({
      data: l,
    });
  };

  render() {
    const headings = [
      "S.No",
      "Course Code",
      "Course Name",
      "Year",
      "CO1",
      "CO2",
      "CO3",
      "CO4",
      "CO5",
      "CO6",
      "CO7",
      "CO8",
      "Like",
      "Dislike",
      "Availablility of text/referene book",
      "Rating",
      "Appropriateness of the assessment tools",
      "Content of Hosting Tools",
      "Suggestions",
    ];

    var splits = [
      "courseCode",
      "courseName",
      "year",
      "CO1",
      "CO2",
      "CO3",
      "CO4",
      "CO5",
      "CO6",
      "CO7",
      "CO8",
      "like",
      "dislike",
      "textBookAvailability",
      "lectureRating",
      "appropriatenessOfAssessmentToolsUsed",
      "hostingTools",
      "courseSuggestions",
    ];

    const body_items = (value, index) =>
      splits.map((newValue, newIndex) => {
        return (
          <input
            type="text"
            onChange={(e) => this.handleChange(e, index, newValue)}
            value={value[newValue]}
            className={this.state.editable[index]}
          />
        );
      });

    if (this.state.loader === true) {
      return (
        <svg
          version="1.1"
          id="L1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          width={"100px"}
        >
          <circle
            fill="#0000"
            stroke="#00000"
            stroke-width="6"
            stroke-miterlimit="15"
            stroke-dasharray="14.2472,14.2472"
            cx="50"
            cy="50"
            r="47"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="5s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            fill="#0000"
            stroke="#00000"
            stroke-width="1"
            stroke-miterlimit="10"
            stroke-dasharray="10,10"
            cx="50"
            cy="50"
            r="39"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="5s"
              from="0 50 50"
              to="-360 50 50"
              repeatCount="indefinite"
            />
          </circle>
          <g fill="#00000">
            <rect x="30" y="35" width="5" height="30">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.1"
              />
            </rect>
            <rect x="40" y="35" width="5" height="30">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.2"
              />
            </rect>
            <rect x="50" y="35" width="5" height="30">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.3"
              />
            </rect>
            <rect x="60" y="35" width="5" height="30">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.4"
              />
            </rect>
            <rect x="70" y="35" width="5" height="30">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.5"
              />
            </rect>
          </g>
        </svg>
      );
    } else {
      return (
        <div className="RecruiterComponent">
          <h1>Course Exit Survey</h1>
          <div className="rc-headings">
            {headings.map((value, index) => {
              return <h5>{value}</h5>;
            })}
          </div>
          <div>
            {this.state.data.map((value, index) => {
              return (
                <div className="rc-body-items">
                  <input
                    type="text"
                    value={index + 1}
                    className={this.state.editing}
                  />
                  {body_items(value, index)}
                  <button
                    onClick={async () => {
                      console.log(value.email);
                      this.handleUpdate(index);
                    }}
                  >
                    {this.state.context[index]}
                  </button>
                  <button
                    onClick={async () => {
                      console.log(value.email, value._id);
                      var send = {
                        _id: String(value._id),
                      };
                      console.log(send);
                      await axios
                        .delete(courseExitComponentAPIUrl.delete, {
                          data: send,
                        })
                        .then((result) => {
                          this.setState({
                            data: result.data,
                          });
                          console.log(this.state.data);
                        });
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div className="download-button">
            <a
              href={courseExitComponentAPIUrl.download}
              target="_blank"
              rel="noreferrer"
            >
              Download Data
            </a>
          </div>
          <div className="upload-data">
            <form
              action={courseExitComponentAPIUrl.upload}
              method="post"
              encType="multipart/form-data"
            >
              <input type="file" name="csvFile" accept=".csv" />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      );
    }
  }
}
