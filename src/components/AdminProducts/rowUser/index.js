import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { FaLock } from 'react-icons/fa'
function RowUser({
  user,
  onDelete,
  onLock
}) {
  const router = useRouter();

  return (
    <tr className="hover:bg-gray-100">

      <td className="border border-gray-300 px-4 py-2">
        {user && user.id}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user && user.username}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user && user.fullName}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user &&
          user.email
        }
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user && user.phoneNumber}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user &&
          user.address
        }
      </td>
      <td className="border border-gray-300 px-4 py-2">{user.role}</td>
      {user.status === 0 ?
        <td className="border border-gray-300 px-4 py-2 text-green-500">Đang hoạt động</td> :
        <td className="border border-gray-300 px-4 py-2 text-red-500">Tài khoản đã bị khóa</td>
      }
      <td className="border border-gray-300 text-center align-middle">
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            onClick={() => onLock(user.id)}
            className="focus:outline-none"
          // onClick={() => handleCancelOrder(cart.idCart)}
          >
            <FaLock className="cursor-pointer text-[##FFFF00] text-xl" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="focus:outline-none"
          >
            <FaTrash className="cursor-pointer text-[#FF0000] text-xl" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RowUser;
