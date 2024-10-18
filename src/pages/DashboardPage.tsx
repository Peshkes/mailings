import React from 'react';
import LatestMailings from "../components/latest-mailings/LatestMailings";
import DashBoardComponent from "../components/dashboard/DashBoardComponent";

const DashboardPage = () => {
    return (
        <div className="w-full h-full flex flex-wrap overflow-hidden">
            <LatestMailings/>
            <DashBoardComponent/>
        </div>
    );
};

export default DashboardPage;