import React from 'react';
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import styled, { ThemeProvider } from 'styled-components';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import QueueList from './components/QueueList';
import Queue from './components/Queue';
import Jobs from './components/Jobs';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const theme = {
  flexboxgrid: {
    gutterWidth: 0,
    outerMargin: 0,
    container: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%',
    },
  }
}

const style = {
  height: '100%',
};

export default () => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router>
        <Grid fluid style={{ height: '100%' }}>
          <Row style={{ height: '100%', alignItems: 'stretch', alignContent: 'stretch' }}>
            <Col xs={12} sm={12} md={3}>
              <QueueList/>
            </Col>
            <Col xs={12} sm={12} md={9}>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/:hostId/:queueName" component={Queue} />
              <Route exact path="/:hostId/:queueName/jobs/:type" component={Jobs} />
            </Col>
          </Row>
        </Grid>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);
