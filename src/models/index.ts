import { Sequelize, Model } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "src/config/db";

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const models: { [key: string]: typeof Model } = {};

type InitFunction = (sequelize: Sequelize) => typeof Model;

(async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file !== basename &&
      file.endsWith(".ts") &&
      !file.endsWith(".d.ts")
    );
  });

  for (const file of files) {
    const modelModule = await import(path.join(__dirname, file));

    const modelInitFn = Object.values(modelModule).find(
      (fn) => typeof fn === "function" && fn.name.startsWith("init")
    ) as InitFunction | undefined;

    if (modelInitFn) {
      const modelClass = modelInitFn(sequelize);
      const modelName = modelClass.name;
      models[modelName] = modelClass;
    }
  }

  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(models);
    }
  });
})();

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
