import React from "react";
import { IUserInfoProps } from "../../src/lib/types";

const UserInfo = React.memo(
  ({ user }: IUserInfoProps): JSX.Element => {
    if (!user) {
      return <p>No user data</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    );
  }
);

export default UserInfo;
