create table produtos_beleza(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome varchar(100) NOT NULL,
    categoria ENUM('maquiagem','acessorio','perfume','moda','cabelo'),
    descricao TEXT,
    preco DECIMAL(10,02) NOT NULL,
    marca varchar(100),
    data_lancamento DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--timestamp é a data atual em que o registro foi criado