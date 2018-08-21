import * as React from 'react';

type Person = {
  name: string;
  craft: string;
};

export class PeopleList extends React.Component<any, any> {

  private uri: string;

  constructor(props: any) {
    super(props);
    this.uri = 'http://api.open-notify.org/astros.json';
    this.state = {
      people: [],
      quantity: 0,
    }
  }

  private init() {
    this.getData().then((data) => {
      this.setState({
        people: data.people,
        quantity: data.number,
      });
    });
  }

  async getData() {
    const response = await fetch(this.uri);
    return response.json();
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const { people } = this.state;

    return (
      <div style={{ height: '50vh', width: '100%' }}>
      { this.state.quantity > 0 &&
        <div>
          Cantidad de personar:
          <span>{this.state.quantity}</span>
          <ul>
            { people.map((person: Person) => <li key={person.name}>{person.name}</li>) }
          </ul>
        </div>
      }
      </div>
    );
  }
}
