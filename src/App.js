import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from "react-query";

import './App.css';
import GamesPage from './pages/GamesPage/GamesPage';

const queryCache = new QueryCache();

function App() {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <GamesPage />
        </ReactQueryCacheProvider>
    );
}

export default App;
