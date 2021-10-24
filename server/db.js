const sqlite3 = require("sqlite3");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = async () => {
  let db = new sqlite3.Database("./test.db");

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./test.db",
  });

  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.dropTable("records");
  await queryInterface.dropTable("identifiers");

  await queryInterface.createTable("identifiers", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  await queryInterface.createTable("records", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identifierId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    timeStamp: DataTypes.DATE,
    type: DataTypes.STRING,
    kind: DataTypes.STRING,

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  const Identifier = sequelize.define("identifier", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  const Record = sequelize.define("record", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    timeStamp: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.STRING,
    },
    kind: {
      type: DataTypes.STRING,
    },
  });

  Identifier.hasMany(Record, { foreignKey: "identifierId" });
  Record.belongsTo(Identifier);

  return {
    db,
    sequelize,
    queryInterface,
    model: {
      Identifier,
      Record,
    },
  };
};
