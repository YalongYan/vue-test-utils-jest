const path = require('path');

module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@\/(.*?\.?(js|vue)?|)$': '<rootDir>/src/$1',   // @路径转换，例如：@/components/Main.vue -> rootDir/src/components/Main.vue
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/fileMock.js', // 模拟加载静态文件
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'　　// 模拟加载样式文件   
    },
    testMatch: [ //匹配测试用例的文件
        '<rootDir>/test/unit/specs/*.spec.js'
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
        // ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    testPathIgnorePatterns: [
        '<rootDir>/test/e2e'
    ],
    // setupFiles: ['<rootDir>/test/unit/setup'],
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    coverageDirectory: '<rootDir>/test/unit/coverage', // 覆盖率报告的目录
    collectCoverageFrom: [ // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件
        // 'src/components/**/*.(js|vue)',
        'src/components/*.(vue)',
        '!src/main.js',
        '!src/router/index.js',
        '!**/node_modules/**'
    ]
}
