const webpack = require('webpack');

module.exports = {
    // 빌드를 시작할 파일을 정의(일반적으로 다른 파일을 불러오는 메인 파일이다.)
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js', // 번들이 끝난 파일의 경로를 정의한다.
        path: __dirname + '/dist' // index.html에서 사용할 번들링이 끝난 파일의 파일 이름을 정의한다.
    },
    mode: 'development',
    // webpack-dev-server옵션 관련
    devServer: {
        inline: true,
        publicPath: '/dist/',
        host: 'localhost',
        port: 4200,
        open: true
    },
    // 컴파일된 소스 코드에서 원본
    // jsx소스 코드로 적절하게 연결되도록한다.
    // 개발자 도구를 통해 디버깅할 때 유요한 기능이다.
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            // JSX파일을 위한 로더
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            // 자바스크립트에서 css를 불러온 후
            // 웹페이지에 삽입할 수 있도록 로더를 정한다.
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};
