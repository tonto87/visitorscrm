import React from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./dashboardStyle.scss";
import { AppPaths } from "../../constants/appPaths";

const Dashboard = () => {
  const { data: offices } = useSelector((state) => state.offices);
  const departments = useSelector(
    (state) => state.departments.departmentsData || [],
  );
  const visitors = useSelector((state) => state.visitors);
  const navigate = useNavigate();

  const handleViewAllOffices = () => navigate(AppPaths.offices.all);
  const handleViewAllDepartments = () => navigate(AppPaths.departments.all);

  const handleViewAllVisitors = () => navigate(AppPaths.visitors.all);

  return (
    <Container fluid>
      <div className="visitors">
        <h4>Visitors Overview</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(visitors) && visitors.length > 0 ? (
              visitors.slice(-3).map((visitor, index) => (
                <tr key={visitor.id}>
                  <td>{visitors.length - 3 + index + 1}</td>
                  <td>{visitor.name}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.email}</td>
                  <td>{visitor.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No visitors available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <Button type="button" onClick={handleViewAllVisitors}>
            Open Full List
          </Button>
        </div>
      </div>
      <hr />
      <div className="offices">
        <h4>Offices Overview</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Office Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(offices) && offices.length > 0 ? (
              offices.slice(-3).map((office, index) => (
                <tr key={office.id}>
                  <td>{offices.length - 3 + index + 1}</td>
                  <td>{office.name}</td>
                  <td>{office.address}</td>
                  <td>{office.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No offices available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <Button type=" button" onClick={handleViewAllOffices}>
            Open Full List
          </Button>
        </div>
      </div>
      <hr />
      <div className="departments">
        <h4>Departments Overview</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Phone</th>
              <th>Office</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(departments) && departments.length > 0 ? (
              departments.slice(-3).map((department, index) => (
                <tr key={department.id}>
                  <td>{departments.length - 3 + index + 1}</td>
                  <td>{department.name}</td>
                  <td>{department.phone}</td>
                  <td>{department.office}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No departments available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-center">
          <Button type="button" onClick={handleViewAllDepartments}>
            Open Full List
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
