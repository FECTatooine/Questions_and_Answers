-- // Selects all from questions based on product_id
SELECT * FROM questions WHERE product_id = 2


-- // Selects all questions and answers where product id is = 2
SELECT * FROM questions a
  LEFT JOIN answers b ON a.question_id = b.question_id
WHERE a.product_id = 2

-- // Joins all questions, answers, and answer_photos based on product id
SELECT * FROM questions a
  LEFT JOIN answers b ON a.question_id = b.question_id
  LEFT JOIN answer_photos c ON b.answer_id = c.answer_id
WHERE a.product_id = 436323

-- // Creats JSON object for all questions from specified product id
SELECT array_to_json(array_agg(row_to_json(questions)))
  FROM (
    SELECT * from questions WHERE product_id = 66642
  ) questions

-- // EXAMPLE OUTPUT
-- [
--   {
--     "question_id": 234326,
--     "product_id": 66642,
--     "question_body": "Nostrum minus ut labore nemo libero nemo quisquam sed est.",
--     "question_date": 1613683389999,
--     "asker_name": "Filomena_Lynch",
--     "asker_email": "Baby_Pouros@gmail.com",
--     "reported": false,
--     "question_helpfulness": 12
--   },
--   ect...
-- ]


-- EXAMPLE
-- [
--   [
--     {
--       "question_id": 2,
--       "answer_id": 30,
--       "question_body": "Its a rubber sole",
--       "question_date": 1616293796317,
--       "answerer_name": "dschulman",
--       "question_helpfulness": 2
--     },
--     ect...
--   ]
-- ]

-- Selects Question, Answers, and Photos and returns a nested JSON Object
SELECT row_to_json(questions)
FROM (
	SELECT
	*,
	(
		SELECT jsonb_agg(answers)
		FROM (
		SELECT
			*,
			(
				SELECT jsonb_agg(answer_photos)
				FROM (
				SELECT
					*
					FROM answer_photos
					WHERE answers.answer_id = answer_id
				) as answer_photos
			) as answer_photos
			FROM answers
			WHERE questions.question_id = question_id
		) as answers
	) as answers
    FROM questions
	WHERE product_id = 1
) as questions

-- EXAMPLE
-- {
--   "question_id": 2,
--   "product_id": 1,
--   "question_body": "HEY THIS IS A WEIRD QUESTION!!!!?",
--   "question_date": 1613888219613,
--   "asker_name": "jbilas",
--   "asker_email": "first.last@gmail.com",
--   "reported": true,
--   "question_helpfulness": 4,
--   "answers": [
--     {
--       "reported": false,
--       "answer_id": 30,
--       "answer_body": "Its a rubber sole",
--       "answer_date": 1616293796317,
--       "question_id": 2,
--       "answer_photos": [
--         {
--           "url": "https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
--           "photo_id": 13,
--           "answer_id": 30
--         }
--       ],
--       "answerer_name": "dschulman",
--       "answerer_email": "first.last@gmail.com",
--       "answer_helpfulness": 2
--     },
--     ect...
--   ]
}