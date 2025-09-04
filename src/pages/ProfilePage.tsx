import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DashboardLayout from '../components/DashboardLayout';
import { User, Mail, Bell, Settings, Save, MessageSquare, Globe, Flag, Crown } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    emailNotifications: user?.emailNotifications || false,
    msAlerts: user?.msAlerts || false,
    smsAlerts: user?.smsAlerts || false,
    localIpoAccess: user?.localIpoAccess || false,
    foreignIpoAccess: user?.foreignIpoAccess || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await updateProfile(formData);
      if (success) {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
          message: 'Your profile settings have been saved successfully.'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Unable to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-sm lg:text-base text-gray-600 mt-2">
            Manage your account information and notification preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <div className="flex items-center mb-6">
                <User className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 mr-2 lg:mr-3" />
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Account Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm lg:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm lg:text-base"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 lg:pt-6">
                  <div className="flex items-center mb-6">
                    <Settings className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 mr-2 lg:mr-3" />
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 mr-2 lg:mr-3" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Receive email alerts for new IPOs and updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 mr-2 lg:mr-3" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900">SMS Alerts</h4>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Receive instant SMS notifications for urgent IPO updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="smsAlerts"
                          checked={formData.smsAlerts}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 mr-2 lg:mr-3" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900">Local IPO Access</h4>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Track domestic IPO opportunities and market data</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="localIpoAccess"
                          checked={formData.localIpoAccess}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 mr-2 lg:mr-3" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900">Foreign IPO Access</h4>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Access international IPO markets and global opportunities</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="foreignIpoAccess"
                          checked={formData.foreignIpoAccess}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 mr-2 lg:mr-3" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900">MS-Style Alerts</h4>
                          <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Enable Microsoft-style popup alerts for urgent updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="msAlerts"
                          checked={formData.msAlerts}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm lg:text-base"
                >
                  <Save className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>

          {/* Subscription Info Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-4 lg:p-6">
              <div className="flex items-center mb-4">
                <Crown className="h-5 w-5 lg:h-6 lg:w-6 text-amber-500 mr-2 lg:mr-3" />
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Current Plan</h3>
              </div>
              
              <div className="text-center py-4 lg:py-6">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize mb-2">
                  {user?.subscription}
                </div>
                <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                  {user?.subscription === 'free' ? 'Limited features' : 
                   user?.subscription === 'pro' ? '$29/month' : '$99/month'}
                </p>
                
                {user?.subscription === 'free' && (
                  <button
                    onClick={() => window.location.href = '/subscription'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm lg:text-base"
                  >
                    Upgrade Now
                  </button>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg lg:rounded-xl p-4 lg:p-6">
              <h4 className="text-sm lg:text-base font-semibold text-emerald-800 mb-2">💡 Pro Tip</h4>
              <p className="text-emerald-700 text-xs lg:text-sm">
                Enable both email and MS alerts to never miss important IPO opportunities. 
                Pro users get advanced filtering and real-time updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}