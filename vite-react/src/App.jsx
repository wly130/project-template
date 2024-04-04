import './index.css';
import {useNavigate, useRoutes} from 'react-router-dom';
import styled from 'styled-components';
import routes from './routes/routes';

function App() {
    const navigate = useNavigate();
    const Elements = () => useRoutes(routes);

    return (
        <div>
            <Elements/>
        </div>
    );
}

export default App;
