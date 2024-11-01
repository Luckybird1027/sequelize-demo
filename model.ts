import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export const sequelizeInstance = new Sequelize("postgres://mimir:mimir-pwd@localhost:5432/test")

/**
 * 用户PO
 */
export interface UserPO extends Model<InferAttributes<UserPO>> {
    id: number | undefined;
    username: string;
    password: string;
    email: string | null;
    telephone: string | null;
};

/**
 * 用户请求
 */
export interface UsercreateReq extends Model<InferCreationAttributes<UserPO>> {
    username: string;
    password: string;
    email: string | null;
    telephone: string | null;
}

/**
 * 用户请求
 */
export interface UserUpdateReq {
    username: string;
    email: string | null;
    telephone: string | null;
}

/**
 * 用户模型
 */
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
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING(32),
            allowNull: true,
        },
    },
    {
        tableName: "user",
        underscored: true,
        timestamps: true,
    }
);
await UserModel.sync();