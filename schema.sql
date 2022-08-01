CREATE TABLE IF NOT EXISTS questions(
  question_id bigserial PRIMARY KEY,
  product_id bigserial,
  question_body varchar,
  question_date bigint,
  asker_name varchar,
  asker_email varchar,
  reported BOOLEAN,
  question_helpfulness INTEGER
);

CREATE TABLE IF NOT EXISTS answers(
  answer_id bigserial PRIMARY KEY,
  question_id bigint,
  answer_body varchar,
  answer_date bigint,
  answerer_name varchar,
  answerer_email varchar,
  reported BOOLEAN,
  answer_helpfulness INTEGER,
  FOREIGN KEY(question_id)
	  REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS answer_photos(
photo_id bigserial PRIMARY KEY,
answer_id bigint,
url varchar,
FOREIGN KEY(answer_id)
	  REFERENCES answers(answer_id)
);

-- Filepaths will need to be corrected to relative path
COPY questions FROM '/Users/travisredden/Documents/Software Engineering/HackReactor/SDC/Questions_and_Answers/Assets/Raw_CSV/questions.csv' CSV
HEADER;

COPY answers FROM '/Users/travisredden/Documents/Software Engineering/HackReactor/SDC/Questions_and_Answers/Assets/Raw_CSV/answers.csv' CSV
HEADER;

COPY answer_photos FROM '/Users/travisredden/Documents/Software Engineering/HackReactor/SDC/Questions_and_Answers/Assets/Raw_CSV/answers_photos.csv' CSV
HEADER;

-- Templates

-- FOREIGN KEY(customer_id)
-- 	  REFERENCES customers(customer_id)

-- CREATE TABLE [IF NOT EXISTS] table_name (
--    column1 datatype(length) column_contraint,
--    column2 datatype(length) column_contraint,
--    column3 datatype(length) column_contraint,
--    table_constraints
-- );


-- id	product_id	body	date_written	asker_name	asker_email	reported	helpful

-- COPY table_name [ ( column_name [, ...] ) ]
--     FROM { 'filename' | PROGRAM 'command' | STDIN }
--     [ [ WITH ] ( option [, ...] ) ]
--     [ WHERE condition ]