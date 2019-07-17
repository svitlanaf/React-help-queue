import React from "react";
import Header from "./header";
import TicketList from "./ticketList";
import NewTicketControl from "./newTicketControl";
import Error404 from "./error404";
import { Switch, Route } from "react-router-dom";
import Admin from "./admin";
import { v4 } from "uuid";
import Moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(
      this
    );
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(
      this
    );
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime() {
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = newMasterTicketList[
        ticketId
      ].timeOpen.fromNow(true);
    });
    this.setState({ masterTicketList: newMasterTicketList });
  }

  handleAddingNewTicketToList(newTicket) {
    var newTicketId = v4();
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicketId]: newTicket
    });
    newMasterTicketList[newTicketId].formattedWaitTime = newMasterTicketList[
      newTicketId
    ].timeOpen.fromNow(true);
    this.setState({ masterTicketList: newMasterTicketList });
  }

  handleChangingSelectedTicket(ticketId) {
    this.setState({ selectedTicket: ticketId });
  }

  render() {
    // console.log(this.state.masterTicketList);
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
                onTicketSelection={this.handleChangingSelectedTicket}
                selectedTicket={this.state.selectedTicket}
              />
            )}
          />
          )} />
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
