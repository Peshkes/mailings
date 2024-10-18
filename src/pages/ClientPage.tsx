import React from 'react';
import ClientsComponent from "../components/clients/ClientsComponent";
import ClientsWithUselectedType from "../components/clients/ClientsWithUselectedType";

const ClientPage = () => {
    return (
        <div className="w-full h-full flex flex-wrap overflow-hidden">
            <ClientsWithUselectedType/>
            <ClientsComponent/>
        </div>
    );
};

export default ClientPage;