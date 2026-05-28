import SidebarAdmin from "../components/SidebarAdmin";
import NavbarAdmin from "../components/NavbarAdmin";

function AdminLayout({ children }) {

  return (

    <div className="flex bg-gray-100">

      <SidebarAdmin />

      <div className="flex-1">

        <NavbarAdmin />

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;