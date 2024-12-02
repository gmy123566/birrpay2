import React, { useState } from 'react';
import { Upload, Smartphone, X } from 'lucide-react';

interface Props {
  total: number;
  email: string;
  username: string;
  description: string;
}

export function PaymentUpload({ total, email, username, description }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cbe' | 'telebirr'>('cbe');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload to a server
    // For demo, we'll simulate adding to admin view
    const subscription = {
      id: Date.now(),
      user: username,
      email: email,
      service: description.split(' - ')[0],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending' as const,
      paymentProof: preview,
      amount: total,
      date: new Date().toISOString().split('T')[0]
    };

    // Store in localStorage for demo
    const existingSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    localStorage.setItem('subscriptions', JSON.stringify([...existingSubscriptions, subscription]));

    alert('Payment submitted successfully! Awaiting admin approval.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
        <h3 className="text-xl font-semibold mb-4 text-green-600">Payment Information</h3>
        
        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('cbe')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                paymentMethod === 'cbe'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              CBE Bank Transfer
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('telebirr')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                paymentMethod === 'telebirr'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              TeleBirr
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500 mb-6">
          {paymentMethod === 'cbe' ? (
            <>
              <h4 className="font-medium mb-2 text-green-600">Bank Account Details:</h4>
              <p className="text-gray-700">Bank: Commercial Bank of Ethiopia (CBE)</p>
              <p className="text-gray-700 font-medium">Account Number: 1000459166177</p>
              <p className="text-gray-700">Account Holder: Girma Tegene Erko</p>
            </>
          ) : (
            <>
              <h4 className="font-medium mb-2 text-green-600">TeleBirr Details:</h4>
              <div className="flex items-center text-gray-700">
                <Smartphone className="h-5 w-5 mr-2 text-orange-500" />
                <span>+251 922 276 538</span>
              </div>
            </>
          )}
          <p className="text-green-600 font-semibold mt-2">Total Amount: {total} ETB</p>
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Payment Screenshot
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-orange-300 border-dashed rounded-lg hover:border-green-400 transition-colors">
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Payment Screenshot" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-orange-500" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-4 rounded-lg font-semibold transition-colors ${
          preview
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!preview}
      >
        {preview ? 'Submit Payment' : 'Please upload payment screenshot'}
      </button>
    </form>
  );
}