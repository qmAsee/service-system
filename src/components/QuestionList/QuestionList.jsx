import React from 'react';
import { Edit, Trash2 } from "lucide-react";
import styles from './QuestionList.module.scss';

export const QuestionList = ({
	questions,
	onEdit,
	onDelete,
	onAddQuestion,
	showCorrectAnswers,
	isOpenQuestionType
}) => {


	return (
		<div className={styles.questions_list}>
			{questions.length > 0 ? (

				questions.map((question, index) => (
					<div key={question.id} className={styles.question_item}>
						<div className={styles.question_header}>
							<h3>{question.question}</h3>
							<div className={styles.question_actions}>
								<button
									onClick={() => onEdit(question.id)}
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
						<p className={styles.question_text}>{question.hint}</p>
						{question.image && (
							<div className={styles.question_image}>
								<img
									src={question.image instanceof Blob
										? URL.createObjectURL(question.image)
										: question.image}
									alt="Вопрос"
								/>
							</div>
						)}
						<p>Время: {question.totalTime} сек.</p>
						{isOpenQuestionType && (
						<div className={styles.answers_list}>
							{question.options.map((option, i) => (
								<div
									key={option.id}
									className={`${styles.answer} ${option.isCorrect && showCorrectAnswers ? styles.correct : ''}`}
								>
									{i + 1}. {option.text}
									{option.isCorrect && showCorrectAnswers && (
										<span className={styles.correct_marker}>✓</span>
									)}
								</div>
							))}
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