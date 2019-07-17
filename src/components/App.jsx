import React from "react";
import Header from "./header";
import TicketList from "./ticketList";
import NewTicketControl from "./newTicketControl";
import Error404 from "./error404";
import { Switch, Route } from "react-router-dom";
import Admin from "./admin";
import Moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: []
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(
      this
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.waitTimeUpdateTimer);
  }

  // componentWillMount() {
  //   console.log("componentWillMount");
  // }

  // componentWillReceiveProps() {
  //   console.log("componentWillReceiveProps");
  // }

  // shouldComponentUpdate() {
  //   console.log("shouldComponentUpdate");
  //   return true;
  // }

  // componentWillUpdate() {
  //   console.log("componentWillUpdate");
  // }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  // }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach(
      ticket => (ticket.formattedWaitTime = ticket.timeOpen.fromNow(true))
    );
    this.setState({ masterTicketList: newMasterTicketList });
  }

  handleAddingNewTicketToList(newTicket) {
    var newMasterTicketList = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = newTicket.timeOpen.fromNow(true);
    newMasterTicketList.push(newTicket);
    this.setState({ masterTicketList: newMasterTicketList });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TicketList ticketList={this.state.masterTicketList} />
            )}
          />
          <Route
            path="/admin"
            render={props => (
              <Admin
                ticketList={this.state.masterTicketList}
                currentRouterPath={props.location.pathname}
              />
            )}
          />
          <Route
            path="/newticket"
            render={() => (
              <NewTicketControl
                onNewTicketCreation={this.handleAddingNewTicketToList}
              />
            )}
          />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;
