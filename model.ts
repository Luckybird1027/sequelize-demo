import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export const sequelizeInstance = new Sequelize("postgres://mimir:mimir-pwd@localhost:5432/test")

export interface UserPO extends Model<InferAttributes<UserPO>, InferCreationAttributes<UserPO>> {
    id: undefined;
    username: string;
    email: string | null;
    telephone: string | null;
};

export const UserModel = sequelizeInstance.define<UserPO>(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(64),
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING(32),
            allowNull: true,
        }
    },
    {
        tableName: "user",
    }
);
await UserModel.sync();