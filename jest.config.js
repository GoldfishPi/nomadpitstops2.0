module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.js$': 'babel-jest',
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.ts?$": "ts-jest",
    },
    "setupFilesAfterEnv": ['./jest.setup.js'],
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}
