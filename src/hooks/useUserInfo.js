const useUserInfo = () => {
  if (!localStorage.getItem("auth")) {
    return { isAuth: false };
  } else {
    const { isAuth, profilePic, userId, userName } = JSON.parse(
      localStorage.getItem("auth")
    );
    return { isAuth, profilePic, userId, userName };
  }
};

export default useUserInfo;
