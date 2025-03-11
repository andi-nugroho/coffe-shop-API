import { DataTypes } from "sequelize";
import database from '../database/database.js'


const Users = database.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Ensure that the email field is a valid email address
          },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, 
{
    freezeTableName:true
});

export default Users;
