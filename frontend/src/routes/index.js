import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StudentList, StudentForm } from '../pages/Students';
import { ClassList, ClassForm } from '../pages/Classes';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ClassList} />
    <Route path="/classes/new" component={ClassForm} />
    <Route path="/classes/edit" component={ClassForm} />

    <Route path="/students" exact component={StudentList} />
    <Route path="/students/new" component={StudentForm} />
    <Route path="/students/edit" component={StudentForm} />
  </Switch>
);

export default Routes;
