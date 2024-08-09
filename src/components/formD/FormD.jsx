import Form from "../form/Form"
import petsForm from "../../assets/petsForm.svg"
import styles from "./FormD.module.css"


function FormD() {

  return (
    <div style={{ padding: "0 40px" }}>
      <div className={styles.FormD}>
        <h2>5% off on the first order</h2>
        <div className={styles.FormD_box}>
          <div className={styles.FormD_img}>
            <img src={petsForm} alt="pets" />
          </div>
          <div className={styles.FormD_form}>
          <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormD