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
import QueuePage from './components/QueuePage';
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
  },
};

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

  justify-content: flex-start; /* align items in Main Axis */
  align-items: stretch; /* align items in Cross Axis */
  align-content: stretch; /* Extra space in Cross Axis */
`;

const MenuColumn = styled.div`
  width: 20%;
  overflow: auto;
`;

const ContentColumn = styled.div`
  width: 80%;
  overflow: auto;
`;

export default () => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router>
        <Content>
          <MenuColumn>
            <QueueList />
          </MenuColumn>
          <ContentColumn>
            <Grid fluid>
              <Row>
                <Col xs>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/:hostId/:queueName" component={QueuePage} />
                  <Route exact path="/:hostId/:queueName/jobs/:type" component={Jobs} />
                </Col>
              </Row>
            </Grid>
          </ContentColumn>
        </Content>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);
