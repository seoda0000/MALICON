import { useAppSelector } from "../redux/configStore.hooks";
import { removeToken } from "../redux/modules/user/token";

function useLogout() {
  const loggedUser = useAppSelector((state) => state.user.userData);

  // console.log("로그아웃??");

  removeToken();

  loggedUser.userId = "";
  loggedUser.nickName = "";
  loggedUser.email = "";
  loggedUser.phoneNumber = null;
  loggedUser.avatar = null;
  loggedUser.lightStick = null;
  loggedUser.isLoggedIn = false;

  // console.log("로그아웃됨");

  return;
}

export default useLogout;
