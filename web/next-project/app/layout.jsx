export const metadata = {title: 'Next.js 模板'};

export default function RootLayout({children}) {
    return (
        <html lang="zh-CN">
            <body>{children}</body>
        </html>
    );
}
