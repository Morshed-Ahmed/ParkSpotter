import { auth } from '../../Utils/Firebase/firebase';
import { getUserType } from '../../Utils/Firebase/firebase'; // Import getUserType function
import { setUserType } from './user.reducer'; // Import setUserType action creator

export const fetchUserType = () => async (dispatch, getState) => {
  try {
    const fetchedUserType = await getUserType(auth); // Assuming 'auth' is accessible
    dispatch(setUserType(fetchedUserType));
    console.log(fetchedUserType);
  } catch (error) {
    console.error("Error fetching user type:", error.message);
  }
};