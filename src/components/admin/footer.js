import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
