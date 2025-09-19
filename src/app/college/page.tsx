'use client';

import React, { useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { dashboardItems } from '@/constants/CollegeDashboardInfo';
import { useCollegeStore } from '@/store/College.store';
import Image from 'next/image';
import CollegeUpdate from '@/components/college/CollegeUpdate';

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

// Dashboard card using shadcn
const DashboardCard = ({
  title,
  description,
  icon: Icon,
  url
}: {
  title: string;
  description: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement>
  >;
}) => {
   const navigate = useRouter()
  return (
    <Card onClick={() =>navigate.push(url)} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <CardHeader className="flex flex-col items-center">
        <div className="p-4 bg-indigo-600 text-white rounded-full mb-4">
          <Icon className="h-10 w-10" />
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400 text-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}


// Profile section using shadcn
const CollegeProfileSection = ({
  ownerName,
  collegeName,
}: {
  ownerName: string;
  collegeName: string;
}) => {
  const { college } = useCollegeStore();
  const [isUpdate, setIsUpdate] = useState(false);

  const handelUpdate = () => setIsUpdate((prev) => !prev);

  return (
    <Card className="bg-gray-800 border-gray-700 row-span-2">
      <CardHeader className="flex flex-col items-center text-center">
        <div className="p-4 bg-indigo-600 text-white rounded-full mb-2">
          {college?.logo ? (
            <Image
              src={college?.logo as string}
              alt="Logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl"
            />
          ) : (
            <AcademicCapIcon className="h-12 w-12" />
          )}
        </div>
        <CardTitle className="text-2xl text-white">
          {collegeName}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Managed by: {ownerName}
        </CardDescription>
      </CardHeader>

      <Separator className="bg-gray-700 my-4" />

      <CardContent className="flex flex-col gap-3">
        <Button
          onClick={handelUpdate}
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Update Details
        </Button>

        <Button
          onClick={() => alert('Change password functionality')}
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          <KeyIcon className="h-5 w-5 mr-2" />
          Change Password
        </Button>

        <Button
          onClick={() => alert('Logout functionality')}
          className="bg-red-500 hover:bg-red-600"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </Button>

        <Button
          onClick={() => alert('Change email functionality')}
          className="bg-green-500 hover:bg-green-600"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Change Email
        </Button>
      </CardContent>

      {isUpdate && <CollegeUpdate onCancel={handelUpdate} />}
    </Card>
  );
};

// Main page
function CollegePage() {
  const { getCollege, college } = useCollegeStore();

  useEffect(() => {
    getCollege();
  }, [getCollege]);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <AcademicCapIcon className="h-10 w-10 text-indigo-600" />
          College Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        <CollegeProfileSection
          ownerName={college?.owner_name as string}
          collegeName={college?.title as string}
        />

        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}

export default CollegePage;
