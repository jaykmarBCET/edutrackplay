import React, { useState } from "react";
import { ParentInfo } from "../../../types/types";
import { useParentStore } from "@/store/Parent.store";
import TextInput from "../ui/TextInput";

interface Props {
  onCancel: () => void;
}

export const ParentUpdate = ({ onCancel }: Props): React.ReactElement => {
  const { parent, updateParent, isLoading } = useParentStore();
  
  const [data, setData] = useState<ParentInfo>({
    name:parent?.name as string,
    address:parent?.address as string,
    gender:parent?.gender,
    phone:parent?.phone as string,
    createdAt:parent?.createdAt,
    updatedAt:parent?.updatedAt,
    age:parent?.age as number,
    password:parent?.password as string,
    email:parent?.email as string
  });

 

  const handleUpdate = async () => {
    if (!data) return;
    await updateParent(data);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Update Parent Profile
        </h1>

        <div className="space-y-4">
          <TextInput
            type="text"
            value={data?.name}
            label="Name"
            placeholder="Enter Name"
            onChange={(e) => setData({...data,name:e.target.value })}
          />
          <TextInput
            type="number"
            value={data.age}
            label="Age"
            placeholder="Enter Age"
            min={12}
            max={70}
            onChange={(e) => setData({...data, age:Number(e.target.value)})}
          />
          <TextInput
            type="text"
            value={data.address}
            label="Address"
            placeholder="Enter Address"
            onChange={(e) => setData({...data, address:e.target.value})}
          />
          <TextInput
            type="text"
            value={data.gender}
            label="Gender"
            placeholder="Enter Gender"
            onChange={(e) => setData({...data, gender:e.target.value})}
          />
          <TextInput
            type="number"
            value={data.phone}
            label="Phone"
            placeholder="Enter Phone"
            onChange={(e) => setData({...data, phone:e.target.value})}
          />
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
