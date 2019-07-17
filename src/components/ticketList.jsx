import React from "react";
import Ticket from "./ticket";
import PropTypes from "prop-types";

function TicketList(props) {
  // console.log(props.ticketList);
  return (
    <div>
      <hr />
      {props.ticketList.map(ticket => (
        <Ticket
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          key={ticket.id}
        />
      ))}
    </div>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired
};

export default TicketList;
