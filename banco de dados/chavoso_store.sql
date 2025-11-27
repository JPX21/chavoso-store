CREATE DATABASE IF NOT EXISTS chavoso_store;
USE chavoso_store;

-- ============================
-- TABELA DE USUÁRIOS
-- ============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    cpf VARCHAR(14) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- SEED DE USUÁRIOS
INSERT INTO users (name, email, phone, cpf, password) VALUES
('João Silva', 'joao@store.com', '11999990000', '123.456.789-10', 'senha123'),
('Maria Souza', 'maria@store.com', '11988887777', '987.654.321-00', '123456'),
('Carlos Oliveira', 'carlos@store.com', '11977776666', '456.789.123-99', 'minhasenha'),
('Ana Lima', 'ana@store.com', '11911112222', '159.753.486-20', 'teste123');


-- ============================
-- TABELA DE JOGOS
-- ============================
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount VARCHAR(10),
    genre VARCHAR(50),
    description TEXT,
    gameplay TEXT,
    image VARCHAR(255)
);

-- SEED COM 20 JOGOS
INSERT INTO games (title, slug, price, original_price, discount, genre, description, gameplay, image) VALUES
('God of War Ragnarok', 'god-of-war-ragnarok', 299.90, 349.90, '15%', 'Ação', 'Kratos em nova jornada.', 'Combate frenético', 'gow.jpg'),
('The Last of Us Part I', 'the-last-of-us-1', 249.90, 299.90, '20%', 'Aventura', 'Joel e Ellie sobrevivendo.', 'Stealth e exploração', 'tlou1.jpg'),
('Spider-Man Miles Morales', 'spider-man-miles', 199.90, 249.90, '20%', 'Ação', 'Miles como Spider-Man.', 'Combate e parkour', 'spm.jpg'),
('Horizon Forbidden West', 'horizon-fw', 279.90, 329.90, '15%', 'RPG', 'Aloy enfrenta novas máquinas.', 'Mundo aberto', 'hfw.jpg'),
('Elden Ring', 'elden-ring', 239.90, 299.90, '25%', 'RPG', 'Novo soulslike da FromSoftware.', 'Alta dificuldade', 'er.jpg'),
('Red Dead Redemption 2', 'rdr2', 159.90, 219.90, '30%', 'Aventura', 'Velho oeste imersivo.', 'Exploração e narrativa', 'rdr2.jpg'),
('Cyberpunk 2077', 'cyberpunk-2077', 129.90, 199.90, '35%', 'RPG', 'Night City viva e intensa.', 'Combate e diálogos', 'cp77.jpg'),
('Resident Evil 4 Remake', 're4-remake', 229.90, 289.90, '20%', 'Terror', 'Leon enfrenta o culto.', 'Terror e ação', 're4.jpg'),
('FIFA 24', 'fifa-24', 299.90, 349.90, '15%', 'Esportes', 'Nova geração do futebol.', 'Jogabilidade realista', 'fifa24.jpg'),
('GTA V', 'gta-v', 59.90, 99.90, '40%', 'Ação', 'Clássico de mundo aberto.', 'Condução e tiroteios', 'gtav.jpg'),
('Assassin’s Creed Mirage', 'ac-mirage', 199.90, 249.90, '20%', 'Aventura', 'Retorno às origens.', 'Parkour e stealth', 'acm.jpg'),
('Final Fantasy XVI', 'ff16', 299.90, 349.90, '15%', 'RPG', 'Nova era de fantasia.', 'Combate dinâmico', 'ff16.jpg'),
('Minecraft', 'minecraft', 99.90, 129.90, '20%', 'Sandbox', 'Criatividade infinita.', 'Construção e sobrevivência', 'mc.jpg'),
('Fortnite', 'fortnite', 0.00, 0.00, '0%', 'Battle Royale', 'Jogo gratuito popular.', 'Construção e tiro', 'fn.jpg'),
('Call of Duty Modern Warfare II', 'cod-mw2', 249.90, 299.90, '15%', 'Tiro', 'Campanha intensa.', 'Multiplayer frenético', 'mw2.jpg'),
('Sekiro Shadows Die Twice', 'sekiro', 199.90, 249.90, '20%', 'Ação', 'Ninja shinobi vingativo.', 'Combate preciso', 'sekiro.jpg'),
('Bloodborne', 'bloodborne', 149.90, 199.90, '25%', 'Terror', 'Cidade amaldiçoada.', 'Rápido e difícil', 'bb.jpg'),
('Ghost of Tsushima', 'ghost-tsushima', 249.90, 299.90, '15%', 'Ação', 'Samurai libertador.', 'Exploração e lutas', 'got.jpg'),
('Death Stranding', 'death-stranding', 99.90, 199.90, '50%', 'Aventura', 'Conexões humanas.', 'Caminhada estratégica', 'ds.jpg'),
('The Witcher 3', 'the-witcher-3', 79.90, 149.90, '45%', 'RPG', 'Geralt em aventura.', 'Mundo aberto e quests', 'tw3.jpg');


-- ============================
-- TABELA DE REVIEWS
-- ============================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    rating FLOAT NOT NULL,
    comment TEXT,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SEED DE REVIEWS
INSERT INTO reviews (game_id, user_id, rating, comment) VALUES
(1, 1, 5.0, 'Perfeito, obra-prima!'),
(2, 2, 4.5, 'Muito bom, história incrível.'),
(3, 3, 4.0, 'Ótimo gameplay, mas curto.'),
(5, 4, 4.8, 'Difícil, mas viciante!'),
(7, 1, 3.5, 'Melhorou depois dos patches.'),
(10, 2, 5.0, 'Clássico eterno.');
