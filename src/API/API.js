const APIUrl = "https://tce-survey-backend.onrender.com/";

const courseExitComponentAPIUrl = {
    "get": APIUrl+"courseExitSurvey/getCourseExitSurvey",
    "post": APIUrl+"courseExitSurvey/addCourseExitSurvey",
    "update": APIUrl+"courseExitSurvey/updateCourseExitSurvey",
    "delete": APIUrl+"courseExitSurvey/deleteCourseExitSurvey"
};

const parentsComponentAPIUrl = {
    "get": APIUrl+"parentsFeedback/getParentsFeedback",
    "post": APIUrl+"parentsFeedback/addParentsFeedback",
    "update": APIUrl+"parentsFeedback/updateParentsFeedback",
    "delete": APIUrl+"parentsFeedback/deleteParentsFeedback"
};

const recruiterComponentAPIUrl = {
    "get": APIUrl+"recruiterFeedback/getRecruiterFeedback",
    "post": APIUrl+"recruiterFeedback/addRecruiterFeedback",
    "update": APIUrl+"recruiterFeedback/updateRecruiterFeedback",
    "delete": APIUrl+"recruiterFeedback/deleteRecruiterFeedback"
};

const _courseExitComponentAPIUrl = courseExitComponentAPIUrl;
export { _courseExitComponentAPIUrl as courseExitComponentAPIUrl };
const _parentsComponentAPIUrl = parentsComponentAPIUrl;
export { _parentsComponentAPIUrl as parentsComponentAPIUrl };
const _recruiterComponentAPIUrl = recruiterComponentAPIUrl;
export { _recruiterComponentAPIUrl as recruiterComponentAPIUrl };