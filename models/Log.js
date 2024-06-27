import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Mentor} from './Mentor.js';

export const Log = sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  });

  Log.belongsTo(Mentor, {
    foreignKey: {
      name: 'mentor_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Mentor.hasMany(Log, {
    foreignKey: 'mentor_id'
  })