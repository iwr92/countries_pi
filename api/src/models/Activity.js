const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
          isAlpha: true,
        },
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    difficulty: {
        type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
      defaultValue: 0,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    season: {
        type: DataTypes.ENUM('Summer','Autumn', 'Winter', 'Spring'),
        allowNull: true
    }
  });
};