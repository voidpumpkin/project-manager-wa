import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import dotenv from 'dotenv';

dotenv.config();

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
