import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import SidebarComponents from "./SidebarComponents";
export const Sidebar = () => {
 
  const authUser = useAuthStore((state) => state.user);
  return (
    <SidebarComponents/>
  );
};

export default Sidebar;
