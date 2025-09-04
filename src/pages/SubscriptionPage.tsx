import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DashboardLayout from '../components/DashboardLayout';
import { Crown, Check, Zap, Mail, MessageSquare, Globe, Flag } from 'lucide-react';

interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function SubscriptionPage() {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [features, setFeatures] = useState<SubscriptionFeature[]>([
    {
      id: 'email_alerts',
      name: 'Email Alerts',
      description: 'Receive detailed email notifications for IPO updates and announcements',
      price: 9.99,
      icon: <Mail className="h-5 w-5" />,
      enabled: user?.emailNotifications || false
    },
    {
      id: 'sms_alerts',
      name: 'SMS Alerts',
      description: 'Get instant SMS notifications for time-sensitive IPO opportunities',
      price: 14.99,
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: user?.smsAlerts || false
    },
    {
      id: 'local_ipo',
      name: 'Local IPO Tracking',
      description: 'Track domestic IPOs with detailed market analysis and insights',
      price: 19.99,
      icon: <Flag className="h-5 w-5" />,
      enabled: user?.localIpoAccess || false
    },
    {
      id: 'foreign_ipo',
      name: 'Foreign IPO Tracking',
      description: 'Access international IPO markets and global investment opportunities',
      price: 24.99,
      icon: <Globe className="h-5 w-5" />,
      enabled: user?.foreignIpoAccess || false
    }
  ]);

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  const calculateTotal = () => {
    return features
      .filter(feature => feature.enabled)
      .reduce((total, feature) => total + feature.price, 0);
  };

  const handleSaveSubscription = async () => {
    setLoading(true);
    
    try {
      const subscriptionData = {
        emailNotifications: features.find(f => f.id === 'email_alerts')?.enabled || false,
        smsAlerts: features.find(f => f.id === 'sms_alerts')?.enabled || false,
        localIpoAccess: features.find(f => f.id === 'local_ipo')?.enabled || false,
        foreignIpoAccess: features.find(f => f.id === 'foreign_ipo')?.enabled || false,
        subscription: calculateTotal() > 0 ? 'custom' : 'free'
      };

      const success = await updateProfile(subscriptionData);
      if (success) {
        addNotification({
          type: 'success',
          title: 'Subscription Updated!',
          message: 'Your subscription preferences have been saved successfully.'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Unable to update subscription. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const predefinedPlans = [
    {
      id: 'starter',
      name: 'Starter Pack',
      description: 'Perfect for individual investors',
      features: ['email_alerts', 'local_ipo'],
      originalPrice: 29.98,
      discountedPrice: 24.99,
      savings: 4.99
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For serious traders and analysts',
      features: ['email_alerts', 'sms_alerts', 'local_ipo', 'foreign_ipo'],
      originalPrice: 69.96,
      discountedPrice: 59.99,
      savings: 9.97
    }
  ];

  const applyPredefinedPlan = (planFeatures: string[]) => {
    setFeatures(prev => prev.map(feature => ({
      ...feature,
      enabled: planFeatures.includes(feature.id)
    })));
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-sm lg:text-base text-gray-600 mt-2">
            Choose the features you need and pay only for what you use
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature Selection */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Quick Plans */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Quick Plans</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {predefinedPlans.map(plan => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-3 lg:p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-900">{plan.name}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Save ${plan.savings}
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-base lg:text-lg font-bold text-gray-900">${plan.discountedPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${plan.originalPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => applyPredefinedPlan(plan.features)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Features */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Choose Your Features</h2>
              <div className="space-y-4">
                {features.map(feature => (
                  <div
                    key={feature.id}
                    className={`border rounded-lg p-3 lg:p-4 transition-all duration-200 ${
                      feature.enabled 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-2">
                      <div className="flex items-center space-x-2 lg:space-x-4 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          feature.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm lg:text-base font-semibold text-gray-900">{feature.name}</h3>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-sm lg:text-lg font-bold text-gray-900">${feature.price}</p>
                          <p className="text-xs text-gray-500">per month</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={feature.enabled}
                            onChange={() => toggleFeature(feature.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <div className="flex items-center mb-4">
                <Crown className="h-5 w-5 lg:h-6 lg:w-6 text-amber-500 mr-2 lg:mr-3" />
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Subscription Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm lg:text-base font-medium text-gray-900 mb-2">Selected Features</h4>
                  {features.filter(f => f.enabled).length === 0 ? (
                    <p className="text-xs lg:text-sm text-gray-500">No features selected</p>
                  ) : (
                    <div className="space-y-2">
                      {features.filter(f => f.enabled).map(feature => (
                        <div key={feature.id} className="flex items-center justify-between text-xs lg:text-sm">
                          <span className="text-gray-600">{feature.name}</span>
                          <span className="font-medium text-gray-900">${feature.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-base lg:text-lg font-bold">
                  <span className="text-gray-900">Total Monthly</span>
                  <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="text-center text-sm text-gray-500">
                  {calculateTotal() === 0 ? (
                    <p>Free plan - No charges</p>
                  ) : (
                    <p>Billed monthly • Cancel anytime</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSaveSubscription}
                disabled={loading}
                className="w-full mt-4 lg:mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center text-sm lg:text-base"
              >
                {loading ? (
                  'Updating...'
                ) : calculateTotal() === 0 ? (
                  'Continue with Free Plan'
                ) : (
                  `Subscribe for $${calculateTotal().toFixed(2)}/month`
                )}
              </button>
            </div>

            {/* Current Status */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg lg:rounded-xl p-4 lg:p-6">
              <h4 className="text-sm lg:text-base font-semibold text-emerald-800 mb-2">💡 Smart Savings</h4>
              <p className="text-emerald-700 text-xs lg:text-sm mb-3">
                Bundle features together to save money with our predefined plans above.
              </p>
              {calculateTotal() > 50 && (
                <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-2 lg:p-3">
                  <p className="text-emerald-800 text-xs font-medium">
                    🎉 You qualify for enterprise pricing! Contact sales for better rates.
                  </p>
                </div>
              )}
            </div>

            {/* Feature Benefits */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">Why Choose Premium Features?</h4>
              <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
                <div className="flex items-start">
                  <Check className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Real-time notifications ensure you never miss opportunities</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">SMS alerts provide instant mobile updates</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Global market access opens more investment opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}