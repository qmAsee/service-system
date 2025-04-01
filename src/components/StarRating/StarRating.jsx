import { useState } from "react";
import styles from "./StarRating.module.scss";

export const StarRating = ({ totalStars = 5, name = "rating" }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className={styles.starRating}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <span
                        key={index}
                        className={`${styles.star} ${
                            starValue <= (hover || rating) ? styles.filled : ""
                        }`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </span>
                );
            })}
            <input type="hidden" name={name} value={rating} />
        </div>
    );
};
