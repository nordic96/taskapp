const config = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.ts"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: [
      "/node_modules/"
    ],
};

module.exports = config;
