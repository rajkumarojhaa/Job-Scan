// // src/redux/actions/jobActions.js
// import axios from 'axios';


// export const deleteJob = (jobId) => async (dispatch) => {
//   try {
//     await axios.delete(`/admin/jobs/${jobId}`); // adjust the endpoint if needed
//     // toast.success('Job deleted successfully');
//   } catch (error) {
//     console.error('Error deleting job:', error);
//     // toast.error('Failed to delete job');
//     throw error; // still throw so component can handle errors
//   }
// };


import axios from 'axios';
import { removeAdminJobById } from '../jobSlice';

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
    dispatch(removeAdminJobById(jobId));
  } catch (error) {
    console.error("Delete Job Failed:", error);
    throw error; // to allow error handling in component
  }
};