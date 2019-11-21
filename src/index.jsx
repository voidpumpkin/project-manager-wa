import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import dotenv from 'dotenv';

import styles from './styles.css';

dotenv.config();

const root = document.getElementById('root');
root.className = styles.root;
ReactDOM.render(<App />, root);
