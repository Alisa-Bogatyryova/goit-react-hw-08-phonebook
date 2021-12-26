const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.user.name;

const getIsLogging = state => state.auth.isLogging;

const getIsLoading = state => state.auth.isLoading;

const getError = state => state.auth.error;

const getToken = state => state.auth.token;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getIsLogging,
  getError,
  getIsLoading,
  getToken,
};
export default authSelectors;