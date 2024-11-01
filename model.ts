import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import bcrypt from "bcryptjs"

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

export interface UserCreateReq extends Model<InferCreationAttributes<UserPO>> {
    username: string;
    password: string;
    email: string | null;
    telephone: string | null;
 }

export interface UserVO {
    id: number;
    username: string;
    email?: string | null;
    telephone?: string | null;
}

export function toVO(po: UserPO): UserVO {
    return {
        id: po.id!,
        username: po.username,
        email: po.email,
        telephone: po.telephone,
    };
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
            set(val: string) {
                this.setDataValue("password", bcrypt.hashSync(val));
            },
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
        underscored: true,
    }
);
await UserModel.sync();