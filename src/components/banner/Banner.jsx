import { Link } from "react-router-dom";
import styles from "./Banner.module.css"
function Banner() {
    return (
    <div className={styles.Banner}>
        <h1>Amazing Discounts on Pets Products!</h1>
       <Link style={{alignSelf: "start"}} to="/discounted-products"><div className={styles.Banner_bnt} style={{padding: "16px 56px"}}>Check out</div></Link>
    </div>
    )
}
export default Banner;