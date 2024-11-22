import React from 'react';
import Header from './header';
import Footer from './footer';
import Doctor from "./Doctor";



function DoctorList() {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="main-content">
                


                    <Doctor />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DoctorList;