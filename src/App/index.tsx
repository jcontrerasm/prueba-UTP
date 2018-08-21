import * as React from 'react';
import { Map } from '@app/src/App/Components/Map';
import { PeopleList } from '@app/src/App/Components/PeopleList';

export class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <React.Fragment>
        <Map />
        <PeopleList />
      </React.Fragment>
    );
  }
}
