CREATE DATABASE eventease;
SHOW DATABASES;
USE eventease;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
SHOW TABLES;
INSERT INTO events (user_id, title, description, event_date) VALUES (1, 'Test Event', 'This is a test event', '2025-03-10');
select * from users;
select * from events;
DELETE FROM events WHERE user_id = 2;
USE eventease;

SET FOREIGN_KEY_CHECKS = 0;  -- Disable foreign key constraints
TRUNCATE TABLE events;       -- Truncate events first
TRUNCATE TABLE users;        -- Now truncate users
SET FOREIGN_KEY_CHECKS = 1;  -- Re-enable foreign key constraints

INSERT INTO users (name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword1'),
('Bob Smith', 'bob@example.com', 'hashedpassword2'),
('Charlie Brown', 'charlie@example.com', 'hashedpassword3'),
('Diana Prince', 'diana@example.com', 'hashedpassword4'),
('Ethan Hunt', 'ethan@example.com', 'hashedpassword5'),
('Fiona Bell', 'fiona@example.com', 'hashedpassword6'),
('George Lucas', 'george@example.com', 'hashedpassword7'),
('Hannah White', 'hannah@example.com', 'hashedpassword8'),
('Ian Fleming', 'ian@example.com', 'hashedpassword9'),
('Jane Doe', 'jane@example.com', 'hashedpassword10');

select * from users;

INSERT INTO events (user_id, title, description, event_date) VALUES
(1, 'Tech Conference', 'An annual conference on emerging technologies.', '2025-03-10'),
(2, 'Music Festival', 'A weekend-long festival featuring international artists.', '2025-04-15'),
(3, 'Art Expo', 'A showcase of modern and contemporary art.', '2025-05-20'),
(4, 'Startup Pitch Night', 'A competition where startups pitch their ideas to investors.', '2025-06-05'),
(5, 'Cybersecurity Summit', 'A conference on the latest threats and solutions in cybersecurity.', '2025-07-12'),
(6, 'Blockchain Meetup', 'A networking event for blockchain developers and enthusiasts.', '2025-08-18'),
(7, 'AI Hackathon', 'A 24-hour coding event focused on artificial intelligence.', '2025-09-22'),
(8, 'Business Networking Night', 'An evening event to connect entrepreneurs and industry leaders.', '2025-10-10'),
(9, 'Photography Workshop', 'A hands-on workshop for aspiring photographers.', '2025-11-05'),
(10, 'Fitness Bootcamp', 'A community-driven fitness bootcamp for all levels.', '2025-12-01');

select * from events;

CREATE TABLE user_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

select * from user_events;







