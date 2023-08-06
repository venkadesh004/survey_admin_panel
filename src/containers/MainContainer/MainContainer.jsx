import React, { Component } from 'react'
import "./MainContainer.css";

import {RecruiterComponent, EmployerComponent, CourseExitComponent, ParentsComponent} from "../../components";

export default class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            sidebar_class_state: 'sidebar-inactive',
            sidebar_component_class_state: 'sidebar-components-inactive',
            sidebar_img: 'sidebar-img-bars'
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
            return <button onClick={() => {
                this.setState({currentIndex: index});
                toggleSideBar();
            }}>{value}</button>
        });

        const toggleSideBar = () => {
            if (this.state.sidebar_class_state === 'sidebar-inactive') {
                this.setState({
                    sidebar_class_state: 'sidebar-active',
                    sidebar_component_class_state: 'sidebar-components-active',
                    sidebar_img: 'sidebar-img-cross'
                });
            } else {
                this.setState({
                    sidebar_class_state: 'sidebar-inactive',
                    sidebar_component_class_state: 'sidebar-components-inactive',
                    sidebar_img: 'sidebar-img-bars'
                });
            }
        }

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
            <div className={`Sidebar ${this.state.sidebar_class_state}`}>
                <div className="toggle-button">
                    <h1>Admin Panel</h1>
                    <button className='sidebar-button' onClick={toggleSideBar}><div className={`${this.state.sidebar_img}`}></div></button>                
                </div>
                <div className={`Sidebar-components ${this.state.sidebar_component_class_state}`}>
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