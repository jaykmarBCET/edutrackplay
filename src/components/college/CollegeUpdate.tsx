'use client';

import React, { useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { CollegeInfo } from '../../../types/types';
import Image from 'next/image';
import { useCollegeStore } from '@/store/College.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function CollegeUpdate({ onCancel }: { onCancel: () => void }) {

  const {isLoading} = useCollegeStore()
  const [college, setCollege] = useState<CollegeInfo>({
    title: useCollegeStore().college?.title!,
    name: useCollegeStore().college?.name!,
    address: useCollegeStore().college?.address!,
    field: useCollegeStore().college?.field!,
    owner_name: useCollegeStore().college?.owner_name!,
    owner_email: useCollegeStore().college?.owner_email!,
    password: '',
    logo: '',
    phone: useCollegeStore().college?.phone!,
    email:useCollegeStore().college?.email!,
    website: useCollegeStore().college?.website,
    description: useCollegeStore().college?.description,
  });

  const { updateCollege } = useCollegeStore();

  

  const handelUpdate = async () => {
    const formData = new FormData();
    formData.append('name', college.name);
    formData.append('title', college.title);
    formData.append('logo', college.logo as File);
    formData.append('address', college.address);
    formData.append('field', college.field);
    formData.append('owner_email', college.owner_email);
    formData.append('owner_name', college.owner_name);
    formData.append('owner_phone', college?.owner_phone as string);
    formData.append('description', college?.description as string);
    formData.append('phone', college.phone);
    formData.append('email', college.email);
    formData.append('website', college.website as string);

    await updateCollege(formData);
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-400">
            Update College
          </DialogTitle>
        </DialogHeader>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">College Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo Upload */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border-2 border-indigo-500 bg-gray-700 flex items-center justify-center overflow-hidden">
                {college.logo ? (
                  <Image
                    width={96}
                    height={96}
                    src={URL.createObjectURL(college.logo as File)}
                    alt="Logo Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AcademicCapIcon className="h-12 w-12 text-gray-400" />
                )}
                <label
                  htmlFor="logo-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                >
                  <PhotoIcon className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={(e) =>
                      setCollege((prev) => ({
                        ...prev,
                        logo: e.target.files ? e.target.files[0] : '',
                      }))
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>College Name</Label>
                <Input
                  value={college.name}
                  onChange={(e) => setCollege({ ...college, name: e.target.value })}
                  placeholder="Enter College Name"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={college.title}
                  onChange={(e) => setCollege({ ...college, title: e.target.value })}
                  placeholder="College Title"
                />
              </div>
              <div>
                <Label>Field</Label>
                <Input
                  value={college.field}
                  onChange={(e) => setCollege({ ...college, field: e.target.value })}
                  placeholder="Field of Study"
                />
              </div>
              <div>
                <Label>Owner Name</Label>
                <Input
                  value={college.owner_name}
                  onChange={(e) => setCollege({ ...college, owner_name: e.target.value })}
                  placeholder="Owner Name"
                />
              </div>
              <div>
                <Label>Owner Email</Label>
                <Input
                  type="email"
                  value={college.owner_email}
                  onChange={(e) => setCollege({ ...college, owner_email: e.target.value })}
                  placeholder="Owner Email"
                />
              </div>
              <div>
                <Label>Owner Phone</Label>
                <Input
                  type="tel"
                  value={college.owner_phone}
                  onChange={(e) => setCollege({ ...college, owner_phone: e.target.value })}
                  placeholder="Owner Phone"
                />
              </div>
              <div>
                <Label>College Phone</Label>
                <Input
                  type="tel"
                  value={college.phone}
                  onChange={(e) => setCollege({ ...college, phone: e.target.value })}
                  placeholder="College Phone"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={college.email}
                  onChange={(e) => setCollege({ ...college, email: e.target.value })}
                  placeholder="College Email"
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  value={college.website}
                  onChange={(e) => setCollege({ ...college, website: e.target.value })}
                  placeholder="College Website"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Input
                  value={college.address}
                  onChange={(e) => setCollege({ ...college, address: e.target.value })}
                  placeholder="College Address"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={college.description}
                  onChange={(e) => setCollege({ ...college, description: e.target.value })}
                  placeholder="Short description about the college..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <Button variant="destructive" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handelUpdate} className="bg-indigo-600 hover:bg-indigo-700">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default CollegeUpdate;
