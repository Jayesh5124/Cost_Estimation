import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaClipboardList, FaChartBar, FaHardHat, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { ThemeProvider } from 'react-bootstrap';

const AdminDashboard: React.FC = () => {
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
      <Container className="py-4">
        <h2 className="mb-4">Admin Dashboard</h2>
        
        <Row>
          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaUsers size={40} className="mb-3 text-primary" />
                <Card.Title>Users</Card.Title>
                <Card.Text>
                  <div>Total Users: 150</div>
                  <div>Active Users: 120</div>
                  <div>New Users (This Month): 25</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaHardHat size={40} className="mb-3 text-danger" />
                <Card.Title>Constructors</Card.Title>
                <Card.Text>
                  <div>Total Constructors: 45</div>
                  <div>Active Constructors: 38</div>
                  <div>Verified Constructors: 40</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaClipboardList size={40} className="mb-3 text-success" />
                <Card.Title>Requests</Card.Title>
                <Card.Text>
                  <div>Total Requests: 280</div>
                  <div>Pending Requests: 25</div>
                  <div>Completed Requests: 255</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaFileAlt size={40} className="mb-3 text-info" />
                <Card.Title>Reports</Card.Title>
                <Card.Text>
                  <div>Total Reports: 195</div>
                  <div>This Month: 45</div>
                  <div>Pending Review: 15</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaCheckCircle size={40} className="mb-3 text-secondary" />
                <Card.Title>Projects</Card.Title>
                <Card.Text>
                  <div>Active Projects: 75</div>
                  <div>Completed Projects: 120</div>
                  <div>On Hold: 10</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaChartBar size={40} className="mb-3 text-warning" />
                <Card.Title>Analytics</Card.Title>
                <Card.Text>
                  <div>Monthly Requests: 120</div>
                  <div>Average Response Time: 2.5 days</div>
                  <div>Customer Satisfaction: 4.5/5</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Recent Activity</Card.Title>
                <ul className="list-unstyled">
                  <li className="mb-2">New user registration - John Doe</li>
                  <li className="mb-2">Area request submitted - Project A</li>
                  <li className="mb-2">Request approved - Project B</li>
                  <li className="mb-2">Cost estimation updated - Project C</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default AdminDashboard;
