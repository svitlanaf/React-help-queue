import React from "react";
import PropTypes from "prop-types";
import TicketList from "./ticketList";
import TicketDetail from "./ticketDetail";

function Admin(props) {
  let optionalSelectedTicketContent = null;
  if (props.selectedTicket != null) {
    optionalSelectedTicketContent = (
      <TicketDetail selectedTicket={props.ticketList[props.selectedTicket]} />
    );
  }
  return (
    <div>
      <h2>Admin</h2>
      {optionalSelectedTicketContent}
      <TicketList
        ticketList={props.ticketList}
        currentRouterPath={props.currentRouterPath}
        onTicketSelection={props.onTicketSelection}
      />
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string.isRequired,
  onTicketSelection: PropTypes.func.isRequired,
  selectedTicket: PropTypes.string
};

export default Admin;
