import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import { sequelize } from "../databases/conecta.js";

export const Mentor = sequelize.define('Mentor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING(60),
        allowNull: false
      }, 
         
    }, {
        tableName: 'mentores'
    });


// Hook (gancho) do Sequelize que é executado antes 
// da inserção de um registro.
// Faz a criptografia da senha e atribui o hash ao campo senha
Mentor.beforeCreate(mentor => {
    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(mentor.senha, salt)
    mentor.senha = hash  
  });