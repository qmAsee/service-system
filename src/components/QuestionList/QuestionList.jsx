import React from 'react';
import { Edit, Trash2 } from "lucide-react";
import styles from './QuestionList.module.scss';

export const QuestionList = ({
	questions,
	onEdit,
	onDelete,
	onAddQuestion,
	showCorrectAnswers,
	isOpenQuestionType = false
}) => {
	return (
		<div className={styles.questions_list}>
			{questions.length > 0 ? (
				questions.map((question, index) => (
					<div key={question.id} className={styles.question_item}>
						<div className={styles.question_header}>
							<h3>Вопрос {index + 1}: {question.question}</h3>
							<div className={styles.question_actions}>
								<button
									onClick={() => {
										onAddQuestion();
										onEdit(question.id);
									}}
									aria-label="Редактировать"
								>
									<Edit size={16} />
								</button>
								<button
									onClick={() => onDelete(question.id)}
									aria-label="Удалить"
								>
									<Trash2 size={16} />
								</button>
							</div>
						</div>

						{question.image && (
							<div className={styles.question_image}>
								<img
									src={question.image instanceof Blob
										? URL.createObjectURL(question.image)
										: question.image}
									alt="Иллюстрация к вопросу"
								/>
							</div>
						)}

						<p className={styles.question_time}>Время на ответ: {question.totalTime} сек.</p>

						{question.hint && (
							<p className={styles.question_hint}>
								<strong>Подсказка:</strong> {question.hint}
							</p>
						)}

						{!isOpenQuestionType ? (
							<div className={styles.answers_list}>
								<h4>Варианты ответов:</h4>
								{question.options?.map((option, i) => (
									<div
										key={i}
										className={`${styles.answer} ${option.isCorrect && showCorrectAnswers ? styles.correct : ''
											}`}
									>
										{i + 1}. {option.text}
										{option.isCorrect && showCorrectAnswers && (
											<span className={styles.correct_marker}> ✓ Верный ответ</span>
										)}
									</div>
								))}
							</div>
						) : (
							<div className={styles.open_answer}>
								<h4>Правильный ответ:</h4>
								<div className={styles.correct_answer_text}>
									{question.correctAnswers}
								</div>
							</div>
						)}
					</div>
				))
			) : (
				<div
					className={styles.create_test_add_question_block}
					onClick={onAddQuestion}
				>
					<span>Добавьте вопросы</span>
				</div>
			)}
		</div>
	);
};