import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import AdminLayout from '../../Layouts/Admin/AdminLayOut';

const AdminPage = () => {
  const { userInfo } = useSelector((state) => state.auth)
console.log(userInfo);
  if (userInfo.role === "user") return <Navigate to="/" />
  if (userInfo.role === "admin") return <AdminLayout />
}

export default AdminPage