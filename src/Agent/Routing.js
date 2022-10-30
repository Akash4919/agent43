import React from "react";
import { Route, Routes } from "react-router-dom";
import AppliedJobs from "./AppliedJobs/AppliedJob";
import AddedCandidates from "./FindJobs/Components/AddedCandidates";
import CandidateList from "./FindJobs/Components/CandidateList";
import DescriptionCard from "./FindJobs/Components/DescriptionCard";
import FindJob from "./FindJobs/FindJobs";
import Drawer from "./CommonComponents/drawer";
import Home from "./Home";
import DescriptionCardApplied from "./AppliedJobs/Components/DescriptionCardApplied";
import CandidateListApplied from "./AppliedJobs/Components/CandidateListApplied";
import AddedCandidatesApplied from "./AppliedJobs/Components/AddedCandidatesApplied";
import SavedJob from "./SavedJobs/SavedJob";
import DescriptionCardSavedJob from "./SavedJobs/Components/DescriptionCardSavedJob";
import CandidateListSavedJob from "./SavedJobs/Components/CandidateListSavedJob";
import AddedCandidatesSavedJob from "./SavedJobs/Components/AddedCandidatesSavedJob";
import LandingPage from "./landingPage/landingPage";
import SignHome from "./AuthPages/siginHome/signHome";
import ForgotPass from "./AuthPages/forgotPass/forgotPass";
import VerifyOTP from "./AuthPages/verifyOtp/verifyOtp";
import CreatePassword from "./AuthPages/createPassword/createPassword";
import SignUp from "./AuthPages/signUp/signUp";
import Calender from "./CalenderPage/calender";
import VerifyEmail from "./AuthPages/verifyEmail/verifyEmail";
import MyApplicant from "./MyApplicants/MyApplicant";
import ProfileDetails from "./MyApplicants/ProfileDetails/CandidateProfileComponent";
import ViewDocuments from "./MyApplicants/ProfileDetails/DocumentComponent";
import JobsProfiles from "./MyApplicants/ProfileDetails/JobStatusCard";
import AgentProfile from "./AgentProfile/AgentProfile";
import SignUpCandidate from "./MyApplicants/ProfileDetails/AgentaddCandidate/CandidateLoginSignup/SignUp";
import AddProfile from "./MyApplicants/ProfileDetails/AgentaddCandidate/AddProfile";
import PersonalDetails from "./MyApplicants/ProfileDetails/AgentaddCandidate/PersonalDetails";
import EductionDetails from "./MyApplicants/ProfileDetails/AgentaddCandidate/EductionDetails";
import CandidateworkExp from "./MyApplicants/ProfileDetails/AgentaddCandidate/CandidateworkExp";
import DocumentUpload from "./MyApplicants/ProfileDetails/AgentaddCandidate/DocumentUpload";
import UploadVideo from "./MyApplicants/ProfileDetails/AgentaddCandidate/UploadVideo";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn" element={<SignHome />} />
      <Route path="/forgotPass" element={<ForgotPass />} />
      <Route path="/verifyOtp" element={<VerifyOTP />} />
      <Route path="/createPassword" element={<CreatePassword />} />
      <Route path="/signUp" element={<SignUp />} />
      {/* <Route path="/calender" element={<Calender />} /> */}
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/home" element={<Home />}>
        <Route
          path="/home/profile/personalDetails"
          element={<AgentProfile />}
        />
        <Route path="/home/findJob" element={<FindJob />}>
          <Route
            path="/home/findJob/descriptionComponent"
            element={<DescriptionCard />}
          />
          <Route
            path="/home/findJob/candidateList"
            element={<CandidateList />}
          />
          <Route
            path="/home/findJob/addedCandidates"
            element={<AddedCandidates />}
          />
        </Route>
        <Route path="/home/appliedJob" element={<AppliedJobs />}>
          <Route
            path="/home/appliedJob/descriptionComponent"
            element={<DescriptionCardApplied />}
          />
          <Route
            path="/home/appliedJob/candidateList"
            element={<CandidateListApplied />}
          />
          <Route
            path="/home/appliedJob/addedCandidates"
            element={<AddedCandidatesApplied />}
          />
        </Route>
        <Route path="/home/meetings" element={<Calender />} />
        <Route path="/home/savedJob" element={<SavedJob />}>
          <Route
            path="/home/savedJob/descriptionComponent"
            element={<DescriptionCardSavedJob />}
          />
          <Route
            path="/home/savedJob/candidateList"
            element={<CandidateListSavedJob />}
          />
          <Route
            path="/home/savedJob/addedCandidates"
            element={<AddedCandidatesSavedJob />}
          />
        </Route>
        <Route path="/home/myApplicant" element={<MyApplicant />}>
          <Route
            path="/home/myApplicant/CandidateProfile"
            element={<ProfileDetails />}
          />
          <Route
            path="/home/myApplicant/candidateDocuments"
            element={<ViewDocuments />}
          />
          <Route path="/home/myApplicant/jobsList" element={<JobsProfiles />} />
        </Route>
        <Route path="/home/myApplicant/newApplicant" element={<AddProfile />}>
          <Route
            path="/home/myApplicant/newApplicant/SignUP"
            element={<SignUpCandidate />}
          />
          <Route
            path="/home/myApplicant/newApplicant/personaldetails"
            element={<PersonalDetails />}
          />
          <Route
            path="/home/myApplicant/newApplicant/eductiondetails"
            element={<EductionDetails />}
          />
          <Route
            path="/home/myApplicant/newApplicant/candidateworkexp"
            element={<CandidateworkExp />}
          />
          <Route
            path="/home/myApplicant/newApplicant/documentupload"
            element={<DocumentUpload />}
          />
          <Route
            path="/home/myApplicant/newApplicant/uploadvideo"
            element={<UploadVideo />}
          />
        </Route>
      </Route>

      <Route path="/drawer" element={<Drawer />} />
    </Routes>
  );
};

export default Routing;
