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
