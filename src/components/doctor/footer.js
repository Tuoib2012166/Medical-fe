import React from 'react';

const DoctorFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p>&copy; {new Date().getFullYear()} Doctor Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default DoctorFooter;
