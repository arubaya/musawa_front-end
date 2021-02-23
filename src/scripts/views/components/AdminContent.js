import React from 'react';
import PropTypes from 'prop-types';

function AdminContent({ children }) {
  return (
    <main id="adminContent">
      {children}
    </main>
  );
}

AdminContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AdminContent;
