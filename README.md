![header](https://cantodobatuque.com.br/wordpress/wp-content/uploads/2019/11/o-papel-de-cada-instrumento-em-uma-banda.jpg)
# Projeto Lama 

### Projeto inspirado em um *Festival Musical Awards*, com várias bandas famosas para a formatura podendo eleger a banda que mais gostar! Este projeto foi desenvolvido de forma impecável que permite o gerenciamento completo desses shows. 

# Projeto realizado em 3 partes: utilizamos o banco de dados Workbanch para criação de 3 tabelas onde foram consumidas no código. 

1. **Tabela de Usuário**

CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
)

2. **Tabela de Bandas**

CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
)

3. **Tabela de Shows**

CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
  id VARCHAR(255) PRIMARY KEY,
  week_day VARCHAR(255) NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  band_id VARCHAR(255) NOT NULL,
  FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
)

### Foi possível criar os endpoints:  
<tr>

+ Cadastro de Usuário (POST) 
+ Login do Usuário (POST)
+ Registrar a banda (POST)
+ Detalhes da banda (GET) 
+ Adicionar um show à um dia (POST)
+ Pegar todos os shows de uma data ordenados por horário (GET)

### Tecnologias utilizadas: 
<tr>

+ Node.js
+ Typescritp
+ MySql 
+ Programação orientada à Objetos 
+ Request.Rest
+ Git

### Linguagens e libs utilizadas: 
<tr>

+ Typescript 
+ MySql 
+ dotenv 
+ express
+ knex 
+ bcryptjs 
+ uuid 
+ jsonwebtoken 

Este projeto foi realizado por 3 integrantes: Alessandra Sandeski Marmiroli, Graziela Queiroz e Maria Eduarda Pacheco Meireles. 



