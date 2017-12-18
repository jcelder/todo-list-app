CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  task_content TEXT NOT NULL,
  task_time TIME(0) NOT NULL,
  task_complete BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hash TEXT NOT NULL
);

CREATE TABLE users_tasks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (user_id),
  task_id INT REFERENCES tasks (task_id)
);