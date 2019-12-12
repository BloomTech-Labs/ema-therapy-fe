import styled from 'styled-components';
import styles from '../../styles/theme';
import splash from '../../assets/splash-image.png';

const StyledSignIn = styled.div`
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: ${styles.darkJungleGreen};
  /* background: url(${splash}) no-repeat;
  background-position: top 0px left 0px;
  background-size: contain; */
  color: white;

  .form-wrapper {
    background: white;
    padding: 10px 17px 43px 17px;
    height: 100%;
  }

  h2 {
    color: white;
    font-weight: 600;
    font-size: 28px;
    padding-left: 7px;
    margin-top: 20%;
    margin-left: 45px;
    line-height: 1.2;
  }



  .btn {
    height: 48px;
    width: 100%;
    margin-bottom: 13px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    color: #595959;
    background-color: #f5f5f5;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &.login, &.signup {
      background: ${styles.tealGreen};
      color: white;
    }

    &.google {

      background: white;
      border: 1px solid ${styles.tealGreen};
      color: ${styles.tealGreen};
    }
  }

  .forgot-password {
    color: ${styles.tealGreen};
    text-align: right;
    font-size: 12px;
    line-height: 1.5;
    margin-top: 5px;
    margin-bottom:30px;
  }

  .account {
    font-size: 12px;
    color: #BFBFBF;
    justify-content: center;
    display: flex;

    a {
      margin-left: 4px;
    }
  }

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 37px;
  }
`;

export default StyledSignIn;
