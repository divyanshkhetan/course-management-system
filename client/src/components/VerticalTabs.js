import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Courses from './Courses';
import Button from '@mui/material/Button';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import NewCourseFaculty from './NewCourseFaculty';
import NewCourseStudent from './NewCourseStudent';
import NewAssignmentFaculty from './NewAssignmentFaculty';
import Assignments from './Assignments';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const VerticalTabs = () => {
  const [value, setValue] = React.useState(0);
  const [newCourse, setNewCourse] = useState(false);
  const [newAssignment, setNewAssignment] = useState(false);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewCourse = (e) => {
    setNewCourse(true);
  }

  const handleNewAssignment = (e) => {
    setNewAssignment(true);
  }

  const newAssignmentState = (assignmentState) => {
    setNewAssignment(assignmentState);
  }

  useEffect(() => {
  }, [newAssignment]);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '90vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: "10vw" }}
      >
        <Tab label="Courses" {...a11yProps(0)} />
        <Tab label="Assignments" {...a11yProps(1)} />
        <Tab label="Quizes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div style={{ width: '85vw', textAlign: 'right', padding: '0.5rem' }}>
          {newCourse === false && decode.userType === 'faculty' && <Button onClick={handleNewCourse} variant="contained" >Add a new Course</Button>}
          {newCourse === true && decode.userType === 'faculty' && < NewCourseFaculty />}
          {newCourse === false && decode.userType === 'student' && <Button onClick={handleNewCourse} variant="contained" >Add a new Course</Button>}
          {newCourse === true && decode.userType === 'student' && < NewCourseStudent />}
        </div>
        <Courses />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ width: '85vw', textAlign: 'right', padding: '0.5rem' }}>
          {newAssignment === false && decode.userType === 'faculty' && <Button onClick={handleNewAssignment} variant="contained" >Add a New Assignment</Button>}
          {newAssignment === true && decode.userType === 'faculty' && < NewAssignmentFaculty newAssignmentState={newAssignmentState} />}
        </div>
        < Assignments />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default VerticalTabs