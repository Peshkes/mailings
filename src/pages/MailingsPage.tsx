import React from 'react';
import LatestMailings from "../components/latest-mailings/LatestMailings";
import MailingsComponent from "../components/mailings/MailingsComponent";

const MailingsPage = () => {
    return (
        <div className="w-full h-full flex flex-wrap overflow-hidden">
            <LatestMailings/>
            <MailingsComponent/>
        </div>
    );
};

export default MailingsPage;
