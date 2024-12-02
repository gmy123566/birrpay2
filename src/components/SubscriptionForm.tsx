import React, { useState } from 'react';
import { ArrowLeft, Plus, ShoppingCart, UserPlus } from 'lucide-react';
import { PaymentUpload } from './PaymentUpload';
import { CustomSubscriptionForm } from './CustomSubscriptionForm';
import { useSubscriptionPrices } from '../hooks/useSubscriptionPrices';
import { useCart } from '../contexts/CartContext';
import { SubscriptionCart } from './SubscriptionCart';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  isRenewal: boolean;
  onBack: () => void;
}

export function SubscriptionForm({ isRenewal, onBack }: Props) {
  const services = useSubscriptionPrices();
  const { addItem } = useCart();
  const { user, login } = useAuth();
  const [selectedService, setSelectedService] = useState('');
  const [duration, setDuration] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const selectedOption = services.find(opt => opt.id === selectedService);
  const isCustomPriceService = selectedOption?.id === 'ai' || selectedOption?.id === 'application';

  const handleAddToCart = () => {
    if (!user && !showRegistration) {
      setShowRegistration(true);
      return;
    }

    if (selectedService && duration) {
      addItem({
        serviceId: selectedService,
        duration,
        customPrice: isCustomPriceService ? customPrice : undefined,
        description
      });
      
      // Reset form
      setSelectedService('');
      setDuration(0);
      setCustomPrice(0);
      setDescription('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    login(email, 'user');
    handleAddToCart();
    setShowRegistration(false);
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  if (showCustomForm) {
    return (
      <div>
        <button
          onClick={() => setShowCustomForm(false)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Services
        </button>
        <CustomSubscriptionForm onClose={() => setShowCustomForm(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-green-600">
        {isRenewal ? 'Renew Your Subscription' : 'Start New Subscription'}
      </h2>

      {showRegistration ? (
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <UserPlus className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-6">Create Your Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowRegistration(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Account & Continue
            </button>
          </div>
        </form>
      ) : !showPayment && (
        <div className="space-y-6">
          {user && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Service
              </label>
              <button
                onClick={() => setShowCustomForm(true)}
                className="group flex items-center px-4 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-orange-600 font-medium group-hover:text-orange-700">
                  Custom Subscription
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedService(option.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
                    selectedService === option.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-200'
                  }`}
                >
                  <h3 className="font-semibold mb-1">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedService && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Duration
              </label>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                {selectedOption?.durations.map((d) => (
                  <button
                    key={d.months}
                    onClick={() => setDuration(d.months)}
                    className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-lg ${
                      duration === d.months
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="font-semibold">{d.months} Month{d.months > 1 ? 's' : ''}</div>
                    <div className="text-sm text-gray-600">
                      {isCustomPriceService ? 'Custom Price' : `${d.price} ETB`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isCustomPriceService && selectedService && duration > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Custom Price (ETB)
              </label>
              <input
                type="number"
                required
                value={customPrice}
                onChange={(e) => setCustomPrice(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter price in ETB"
              />
            </div>
          )}

          {selectedService && duration > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Please provide any specific requirements or details about your subscription..."
              />
            </div>
          )}

          {selectedService && duration > 0 && (
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          )}

          <SubscriptionCart
            email={email}
            username={username}
            onCheckout={handleCheckout}
          />
        </div>
      )}

      {showPayment && (
        <PaymentUpload 
          total={0}
          email={email}
          username={username}
          description="Multiple Subscriptions"
        />
      )}
    </div>
  );
}