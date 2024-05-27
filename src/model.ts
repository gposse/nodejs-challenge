import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_DATABASE ?? "", process.env.MYSQL_USER ?? "", process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

class Fabrica extends Model {
    Id!: number;
    Descripcion!: string | null;
}
Fabrica.init(
    {
        Id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        Descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Fabrica'
    }
);

class Producto extends Model {
    Id!: number;
    Descripcion!: string | null;
    Precio!: number | null;
    Existencias!: number | null;
    IdFab!: number;
}

Producto.init(
    {
        Id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        Descripcion: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        Precio: {
            type: DataTypes.DOUBLE, 
            allowNull: true
        },
        Existencias: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        IdFab: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Producto'
    }
);
Fabrica.hasMany(Producto, { foreignKey: 'IdFab' });
Producto.belongsTo(Fabrica, { foreignKey: 'IdFab' });

class Usuario extends Model {
    Id!: number;
    Nombre!: string;
    Contrasena!: string;
    Salt!: string;
}
Usuario.init({
    Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Usuario'
});

interface LoginData {
    nombre: string;
    contrasena: string;
}

export { sequelize, Fabrica, LoginData, Producto, Usuario };
