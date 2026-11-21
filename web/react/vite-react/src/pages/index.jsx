import {Link} from 'react-router-dom';

export default function Index() {
    return (
        <main>
            <h1>首页</h1>
            <Link to="/test">打开测试页</Link>
        </main>
    );
}
