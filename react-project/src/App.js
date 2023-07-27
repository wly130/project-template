import './index.css';
import { useNavigate, useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import routes from './routes/routes';

//样式
const Box = styled.div`
    width: 100%;
    height: auto;
`;

function App() {
    const navigate = useNavigate(); //路由跳转
    const elements = useRoutes(routes); //遍历路由
    return (
        <Box>
            <RouterBox>
                {elements}
            </RouterBox>
        </Box>
    );
}

export default App;
