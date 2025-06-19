import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from './Assets (login-signup)/LoginSignup/LoginSignup';
import FitnessHero from './Assets (login-signup)/homepage/homepage';
import Setup from './Assets (login-signup)/Setup/Setup';
import GoalSetting from './Assets (login-signup)/GoalSetting/GoalSetting';
import Profile from './Assets (login-signup)/userConfig/userConfig';
import UserPreference from './Assets (login-signup)/UserPreference/UserPreference';
import ExerciseInfo from './Assets (login-signup)/ExerciseInfo/ExerciseInfo';
import WorkoutProgress from './Assets (login-signup)/workout-progress/workout-progress';
import SearchPage from './Assets (login-signup)/SearchPage/SearchPage';
import DietPlan from './Assets (login-signup)/dietPlan/dietPlan.jsx';
import ForgotPassword from './Assets (login-signup)/ForgotPassword/ForgotPassword';
import VerifyEmail from './Assets (login-signup)/VerifyEmail/VerifyEmail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FitnessHero />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/setup/:userId" element={<Setup />} />  
        <Route path="/goal-setting" element={<GoalSetting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-preference" element={<UserPreference />} />
        <Route path="/exercise-info" element={<ExerciseInfo />} />
        <Route path="/workout-progress" element={<WorkoutProgress />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;