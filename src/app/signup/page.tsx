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

  const handleSubmit = async () => {
    try {
      // const response = await fetch('http://localhost:4000/signup', {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          username: userData.username,
          password: userData.password,
          role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: restaurantData.phone,
          restaurant: {
            name: restaurantData.name,
            description: '',
            address: `${restaurantData.address}, ${restaurantData.city} ${restaurantData.zipCode}`,
            latitude: 0,
            longitude: 0,
            openingHours: JSON.stringify(restaurantData.openingHours),
            googleMapsUrl: restaurantData.googleMapsUrl,
            mainImageUrl: '', 
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur serveur');
      }

      console.log('Inscription réussie ! Token :', result.token);
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
    }
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
          data={{
            name: restaurantData.name,
            address: restaurantData.address,
            city: restaurantData.city,
            zipCode: restaurantData.zipCode,
            type: restaurantData.type,
            cuisine: restaurantData.cuisine,
            openingHours: restaurantData.openingHours,
          }}
          onChange={(newData) =>
            setRestaurantData((prev) => ({ ...prev, ...newData }))
          }
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {role === 'RESTAURATEUR' && step === 3 && (
        <RestaurantMediaForm
          mainImageUrl={restaurantData.googleMapsUrl}
          onChange={(url: string) =>
            setRestaurantData((prev) => ({ ...prev, googleMapsUrl: url }))
          }
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {role === 'RESTAURATEUR' && step === 4 && (
        <RestaurantSocialForm
          data={{
            instagram: restaurantData.instagram,
            facebook: restaurantData.facebook,
            linkedin: restaurantData.linkedin,
            tiktok: restaurantData.tiktok,
            x: restaurantData.x,
          }}
          onChange={(newLinks) =>
            setRestaurantData((prev) => ({ ...prev, ...newLinks }))
          }
          onBack={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
