import React, { useState, useEffect } from "react";
import SideNav from "../../Componet/navs/sideNav";
import HeaderNav from "../../Componet/HeaderNav";
import AuthApi from "./../../api/authApi";
import Pagination from "./Pagination";
function SuperAdmin() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setUsersList(null);
        setLoading(true);
        const response = await AuthApi.getalluserdata();
        console.log(response.data.Data);
        setUsersList(response.data.Data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = usersList?.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div>
      <div className="main_dashboard">
        <SideNav />
        <div>
          <div className="adjust_sidebar-manageStaff">
            <HeaderNav />
          </div>
        </div>
      </div>
      <div className="container mt-4 mr-1">
        <div className="table-responsive ">
          <table className=" table table-secondary table-striped " responsive>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">User Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Allow User</th>
                <th scope="col">Block User </th>
              </tr>
            </thead>
            <tbody>
              {usersList?.length > 0 &&
                currentPosts?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.mobile_number}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className="btn btn-success">Allow</button>
                      {/* <input type="checkbox" name="" id="" /> */}
                    </td>
                    <td>
                      {/* <input type="checkbox" name="" id="" /> */}

                      <button className="btn btn-danger">Block</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            totalPosts={usersList?.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;
