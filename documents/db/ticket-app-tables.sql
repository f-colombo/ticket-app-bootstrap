
CREATE TABLE IF NOT EXISTS tipo_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT,
    id_tipo INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id , id_tipo),
    FOREIGN KEY (id_tipo)
        REFERENCES tipo_usuario (id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS ticket (
    id INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    descripcion VARCHAR(512) NOT NULL,
    pedido BOOLEAN NOT NULL DEFAULT FALSE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, id_usuario),
    FOREIGN KEY (id_usuario)
        REFERENCES usuario (id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB;

INSERT INTO `tipo_usuario`(`nombre`) VALUES ("Administrator");
INSERT INTO `tipo_usuario`(`nombre`) VALUES ("User");

INSERT INTO `usuario`(`id_tipo`, `nombre`, `email`, `pass`) VALUES (1, "Usr Admin", "admin@ticketapp.com", "adminP$1");
INSERT INTO `usuario`(`id_tipo`, `nombre`, `email`, `pass`) VALUES (2, "Usr User", "user@ticketapp.com", "userP$1");
