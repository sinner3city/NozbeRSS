import { Config } from "jest"

const config: Config = {
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    transform: {
        ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.app.json" }]
    },
    coverageReporters: ["json-summary", "clover", "text"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "pnpm-lock.json",
        "yarn-lock.json", //remove lock file accoding to your package manager
        "jest.setup.ts"
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@public/(.*)$": "<rootDir>/public/$1",
        "^@components$": "<rootDir>/src/components/index.ts",
        "^@modules$": "<rootDir>/src/modules/index.ts",
        "^@pages$": "<rootDir>/src/pages/index.ts",
        "^@store$": "<rootDir>/src/store/index.ts",
        "^@practices$": "<rootDir>/src/pages/practices/index.ts",
        "^@challanges$": "<rootDir>/src/pages/challanges/index.ts",
        "^@libraries$": "<rootDir>/src/pages/libraries/index.ts",
        "^@types$": "<rootDir>/src/types/index.ts",
        "^@utils$": "<rootDir>/src/utils/index.ts",
        "^@hooks$": "<rootDir>/src/hooks/index.ts",
        "^@layouts$": "<rootDir>/src/layouts/index.ts",
        "^@contexts$": "<rootDir>/src/contexts/index.ts",
        "^@theme$": "<rootDir>/src/theme/index.ts",
        "^@icons$": "<rootDir>/src/theme/icons/Icons.tsx",
        "^@data/(.*)$": "<rootDir>/src/data/$1",
        "^@configs/(.*)$": "<rootDir>/src/configs/$1",
        // "^@css/(.*)$": "<rootDir>/src/css/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@workers/(.*)$": "<rootDir>/src/workers/$1",
        "^@css/(.*)$": "<rootDir>/src/__mocks__/styleMock.ts",
        "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.ts",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.ts"
    },
    testPathIgnorePatterns: ["<rootDir>/__tests__/"]
}

module.exports = config
