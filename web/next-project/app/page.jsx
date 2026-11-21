import Link from 'next/link';

export default function Page() {
    return (
        <main>
            <h1>首页</h1>
            <Link href="/test">打开测试页</Link>
        </main>
    );
}
