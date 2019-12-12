import styled from 'styled-components';
import styles from '../../styles/theme';
import splash from '../../assets/splash.png';

const StyledSignIn = styled.div`
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${styles.darkJungleGreen};
  background: url(${splash}) no-repeat;
  background-position: top 0px left 0px;
  background-size: contain;
  background-size: 115%;
  color: white;

  .form-wrapper {
    background: white;
    padding: 43px 17px;
    padding-top: 10px;
  }

  h2 {
    color: white;
    font-weight: 600;
    font-size: 28px;
    padding-left: 7px;
    margin-top: 100px;
    margin-left: 45px;
    line-height: 1.2;
  }

  p {
    color: ${styles.tealGreen};
    text-align: right;
    font-size: 12px;
    line-height: 1.5;
    margin-top: 5px;
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
  }

  .login {
    background: ${styles.tealGreen};
    color: white;
  }
`;

export default StyledSignIn;
