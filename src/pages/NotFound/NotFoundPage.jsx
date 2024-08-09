import i404 from "../../assets/i404.svg"
import ButtonNew from "../../components/buttonNew/ButtonNew";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css"

export default function NotFoundPage() {
    return (
      <div className={styles.NotFoundPage}>
      <div className={styles.NotFoundPage_top}>
        <img src={i404} alt="issue 404" />
      </div>
      <div className={styles.NotFoundPage_bottom}>
        <h2>Page Not Found</h2>
        <p>We’re sorry, the page you requested could not be found.
        Please go back to the homepage.</p>
       <Link to='/'> <ButtonNew>Go Home</ButtonNew> </Link>
      </div>
      </div>
    );
  }

  