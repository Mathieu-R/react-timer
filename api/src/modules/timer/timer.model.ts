import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	DataTypes,
} from "sequelize";

import sequelize from "../../sequelize";

export class Timer extends Model<
	InferAttributes<Timer>,
	InferCreationAttributes<Timer>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare duration: number;
}

Timer.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "timers",
	}
);
