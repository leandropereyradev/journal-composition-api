module.exports = {
  //Esta configuración se haría si estamos usando el Composition API en TODAAA la aplicación
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["/node_modules/(?!axios)"],
  setupFiles: ["dotenv/config"],
};
