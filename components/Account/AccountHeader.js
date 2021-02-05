import { Header, Icon, Segment, Label } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";

function AccountHeader({ role, email, name, createdAt }) {
  return (
    <>
      <div class="accountSectionHeader">
        <p> PROFILE </p>
      </div>
      <div class="accountSection">
        <p style={{ fontSize: "20px", fontWeight: "bold", margin: "4px 0" }}> {name} </p>
        <p> {email} </p>
      </div>
    </>
  );
}

export default AccountHeader;
