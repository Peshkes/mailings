import React, {useEffect} from 'react';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";

import MailingsPage from "./pages/MailingsPage";
import ClientPage from "./pages/ClientPage";
import DashboardPage from "./pages/DashboardPage";
import {ChildWindowProvider} from "./components/context-providers/ChildWindowProvider";
import {TypesProvider} from "./components/context-providers/TypesProvider";
import {useQueryClient} from "react-query";
import {server} from "./api/server";
import SettingsPage from "./pages/SettingsPage";


const App = () => {

    const clientQuery = useQueryClient();

    useEffect(() => {
        const eventSource = new EventSource(`${server}/connect`);
        eventSource.onmessage = (event) => {
            console.log(event.data);
            clientQuery.invalidateQueries(event.data);
        }
        return () => {
            eventSource.close();
        }
    }, []);


    return (
        <div className={'App bg-cyan-800/5 h-screen h-max-screen flex flex-col overflow-hidde'}>
            <Header/>
            <TypesProvider>
                <ChildWindowProvider>
                    <Routes>
                        <Route path={"/"} element={<DashboardPage/>}/>
                        <Route path={"/messages"} element={<MailingsPage/>}/>
                        <Route path={"/clients"} element={<ClientPage/>}/>
                        <Route path={"/settings"} element={<SettingsPage/>}/>
                    </Routes>
                </ChildWindowProvider>
            </TypesProvider>
        </div>
    );
};

export default App;