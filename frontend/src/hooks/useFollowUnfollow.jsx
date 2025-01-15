import { useState } from "react";
import axios from "axios";

const useFollowUnfollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const followUnfollowUser = async (targetUserId, token) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `http://localhost:8000/api/v1/user/follow/${targetUserId}`,
        {}, // No payload needed for this API
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
          withCredentials: true, // Include cookies if required
        }
      );

      return response.data; // Return success response
    } catch (err) {
      console.error("Error in follow/unfollow:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to process the request";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { followUnfollowUser, loading, error };
};

export default useFollowUnfollow;
