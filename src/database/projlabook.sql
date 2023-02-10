-- Active: 1675886489994@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT NOT NULL,
	createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, name, email, password, role)
VALUES 
("US01", "Marcelão", "iqscUSP@email.com", "Nth*iqsc5h", "ADMIN"),
("US02", "Leticia", "letsgo@email.com", "SClets342", "NORMAL"),
("US03", "MatheusR", "matR@email.com", "SCmath554", "NORMAL"),
("US04", "GiovannaC", "glcaleg@email.com", "SCglc4538", "ADMIN"),
("US05", "VFiochi", "vfiochi@email.com", "SCvitor178", "NORMAL"),
("US06", "GuiMacedo", "guimacedo@email.com", "SCgui4159", "NORMAL");

SELECT * FROM users;

CREATE TABLE posts (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	creator_id TEXT NOT NULL,
	content TEXT NOT NULL,
    likes INTEGER NOT NULL, 
	dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
("PO01", "US05", "Aula Terezinha - O cachorro é verde", 4, 0),
("PO02", "US02", "Projeto Integrador Hamburgueria", 6, 0),
("PO03", "US03", "Rep do cabaré", 5, 1),
("PO04", "US01", "Oxygen reduction reaction catalyzed by epsilon-MnO2: Influence of the crystalline structure on the reaction mechanism.", 4, 0),
("PO05", "US04", " O Grid Gerencial como ferramenta para avaliação de percepção dos estilos de liderança entre líderes e liderados", 5, 2);

SELECT * FROM posts;

CREATE TABLE likes_dislikes (
	user_id TEXT NOT NULL,
	post_id TEXT NOT NULL,
	like INTEGER NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
	FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES ("US04", "PO04", 2),
        ("US01", "PO04", 2),
        ("US03", "PO02", 1),
		("US02", "PO03", 2),
        ("US03", "PO01", 3),
        ("US06", "PO01", 1);

SELECT * from likes_dislikes;

SELECT * FROM users --TABELA users
INNER JOIN likes_dislikes --TABELA posts
ON likes_dislikes.user_id = users.id;

SELECT * FROM posts
INNER JOIN likes_dislikes
ON likes_dislikes.post_id = posts.id;

-- Removendo ambiguidade e aplicando camelCase com ALIAS
SELECT
 users.id AS usersIds,
 users.name,
 users.email,
 users.password,
 users.role,
 users.createdAt AS usersCreated,
 posts.id AS postsIds,
 posts.creator_id,
 posts.content,
 posts.likes,
 posts.dislikes,
 posts.created_at AS postsCreated,
 posts.updated_at
FROM users
LEFT JOIN posts --TABELA posts
ON posts.creator_id = users.id
INNER JOIN likes_dislikes
ON likes_dislikes.user_id = users.id;