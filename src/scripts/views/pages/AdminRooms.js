import { Paper } from '@material-ui/core';
import React from 'react';
import '../../../styles/adminRooms.css';

import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import SingleBedOutlinedIcon from '@material-ui/icons/SingleBedOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import { NavLink } from 'react-router-dom';

function AdminRooms() {
  return (
    <section id="adminRooms">
      <div className="rooms-section-container">
        <h2 className="rooms-section-title">Rooms</h2>
        <div className="rooms-container">
          <NavLink className="room-link" to="/admin/rooms/1">
            <Paper className="room-item">
              <SingleBedOutlinedIcon />
              Single bed room
            </Paper>
          </NavLink>
          <NavLink className="room-link" to="/admin/rooms/2">
            <Paper className="room-item">
              <KingBedOutlinedIcon />
              Double bed room
            </Paper>
          </NavLink>
          <NavLink className="room-link" to="/admin/rooms/3">
            <Paper className="room-item">
              <MeetingRoomOutlinedIcon />
              Meet room
            </Paper>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default AdminRooms;
