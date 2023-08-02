import React, { Component } from 'react'
import "./MainContainer.css";

import {RecruiterComponent, EmployerComponent, CourseExitComponent, ParentsComponent} from "../../components";

export default class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0
        };
    }
  
    render() {
        const sidebarNav = [
            "Recruiter Feedback",
            "Employer Feedback",
            "Parents Feedback",
            "Course Exit Survey"
        ];

        const myList = sidebarNav.map((value, index) => {
            return <button onClick={() => this.setState({currentIndex: index})}>{value}</button>
        });

        const bodyComponent = () => {
            console.log(this.state.currentIndex);
            if (this.state.currentIndex === 0) {
                return <RecruiterComponent />
            } else if (this.state.currentIndex === 1) {
                return <EmployerComponent />
            } else if (this.state.currentIndex === 2) {
                return <ParentsComponent />
            } else {
                return <CourseExitComponent />
            }
        };

        return (
        <div className='MainContainer'>
            <div className="Sidebar">
                <h1>Admin Panel</h1>
                <div className="Sidebar-components">
                    {
                        myList
                    }
                </div>
            </div>
            <div className="MainBody">
                {bodyComponent()}
            </div>
        </div>
        );
    }
}