import React from "react";
import { Link } from "react-router";
import { Trash2, Edit } from "lucide-react";

const UserTable = ({ user }) => {
  return (
    <li className="flex items-center p-4 border-b border-base-content">
      <div>
        <img src="" alt="" />
      </div>
      <div className="grow">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.nim}</p>
      </div>
      <div>
        <Link to={`/edit-user/${user._id}`} className="btn btn-sm btn-secondary mr-2">
          <Edit />
        </Link>
        <button className="btn btn-sm btn-error">
          <Trash2 />
        </button>
      </div>
    </li>
  );
};

export default UserTable;
