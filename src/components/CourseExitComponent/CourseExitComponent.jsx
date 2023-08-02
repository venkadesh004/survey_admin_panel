import React, { Component } from 'react'
import "./CourseExitComponent.css";

import axios from 'axios';
import { courseExitComponentAPIUrl } from '../../API/API';

export default class CourseExitComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            context: [],
            editable: []
        };
    }

    componentDidMount = async () => {
        await axios.get(courseExitComponentAPIUrl.get).then((output) => {
            this.setState({
                data: output.data
            });
            var l = [];
            var cont = [];
            for (var i=0; i<output.data.length; i++) {
                l.push("non-editable");
                cont.push("Edit");
            }
            this.setState({
                editable: l,
                context: cont
            });
        });
        console.log(this.state.data);
        console.log(this.state.editable);
        console.log(this.state.context);
    }

    handleUpdate = async (index) => {
        var l = this.state.editable;
        var cont = this.state.context;
        
        if (this.state.editable[index] !== "editable") {
            l[index] = "editable";
            cont[index] = "Update";

            this.setState({
                editing: l,
                context: cont
            });
        } else {
            console.log("Records: ", index, this.state.data);
            console.log("New Record", this.state.data[index]);

            await axios.put(courseExitComponentAPIUrl.update, this.state.data[index]).then(result => {
                console.log("Result: ", result.data);
                this.setState({
                    data: result.data
                });
                console.log(this.state.data);
            });

            l[index] = "non-editable";
            cont[index] = "Edit";

            this.setState({
                editing: l,
                context: cont 
            });
        }
    }

    handleChange = (e, index, place) => {
        var l = this.state.data;
        l[index][place] = e.target.value;

        this.setState({
            data: l
        });
    }

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
        "Suggestions"
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
        "courseSuggestions"
    ];

    const body_items = (value, index) => splits.map((newValue, newIndex) => {
        return <input type="text" onChange={(e) => this.handleChange(e, index, newValue)} value={value[newValue]} className={this.state.editable[index]} />
    });

    return (
      <div className='RecruiterComponent'>
        <h1>Course Exit Survey</h1>
        <div className="rc-headings">
            {
                headings.map((value, index) => {
                    return <h5>{value}</h5>
                })
            }
        </div>
        {
            this.state.data.map((value, index) => {
                return (
                    <div className='rc-body-items'>
                        <input type="text" value={index+1} className={this.state.editing} />
                        {
                            body_items(value, index)
                        }
                        <button onClick={async () => {
                            console.log(value.email);   
                            this.handleUpdate(index);
                        }}>
                            {this.state.context[index]}
                        </button>
                        <button onClick={async () => {
                            console.log(value.email, value._id);
                            var send = {
                                "_id": String(value._id)
                            };
                            console.log(send);
                            await axios.delete(courseExitComponentAPIUrl.delete, {data: send}).then(result => {
                                this.setState({
                                    data: result.data
                                });
                                console.log(this.state.data);
                            });
                        }}>Delete</button>
                    </div>
                );
            })
        }
      </div>
    )
  }
}
