'use client';

import { useState } from 'react';
import StepSelector from './components/StepSelector';
import UserInfoForm from './components/UserInfoForm';
import UserDietForm from './components/UserDietForm';
import RestaurateurInfoForm from './components/RestaurateurInfoForm';
import RestaurantDetailsForm from './components/RestaurantDetailsForm';
import RestaurantMediaForm from './components/RestaurantMediaForm';
import RestaurantSocialForm from './components/RestaurantSocialForm';

type Role = 'CLIENT' | 'RESTAURATEUR';

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

type RestaurantData = {
  phone: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  type: string;
  cuisine: string;
  diets: string[];
  openingHours: {
    monday: [string, string];
    tuesday: [string, string];
    wednesday: [string, string];
    thursday: [string, string];
    friday: [string, string];
    saturday: [string, string];
    sunday: [string, string];
  };
  logo: File | null;
  photos: File[];
  googleMapsUrl: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  linkedin: string;
  x: string;
};

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    phone: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    type: '',
    cuisine: '',
    diets: [],
    openingHours: {
      monday: ['', ''],
      tuesday: ['', ''],
      wednesday: ['', ''],
      thursday: ['', ''],
      friday: ['', ''],
      saturday: ['', ''],
      sunday: ['', ''],
    },
    logo: null,
    photos: [],
    googleMapsUrl: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    linkedin: '',
    x: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    nextStep();
  };

  return (
    <main>
      {step === 0 && <StepSelector onSelect={handleRoleSelect} role={role} />}
      
      {role === 'CLIENT' && step === 1 && (
        <UserInfoForm
          data={userData}
          onChange={setUserData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {role === 'CLIENT' && step === 2 && (
        <UserDietForm
          data={restaurantData.diets}
          onChange={(diets: string[]) =>
            setRestaurantData((prev) => ({ ...prev, diets }))
          }
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {role === 'RESTAURATEUR' && step === 1 && (
        <RestaurateurInfoForm
          data={userData}
          phone={restaurantData.phone}
          onChange={(newData: { userData: UserData; phone: string }) => {
            setUserData(newData.userData);
            setRestaurantData((prev) => ({
              ...prev,
              phone: newData.phone,
            }));
          }}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {role === 'RESTAURATEUR' && step === 2 && (
        <RestaurantDetailsForm
          data={restaurantData}
          onChange={setRestaurantData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {role === 'RESTAURATEUR' && step === 3 && (
        <RestaurantMediaForm
          data={restaurantData}
          onChange={setRestaurantData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {role === 'RESTAURATEUR' && step === 4 && (
        <RestaurantSocialForm
          data={restaurantData}
          onChange={setRestaurantData}
          onBack={prevStep}
        />
      )}
    </main>
  );
}
