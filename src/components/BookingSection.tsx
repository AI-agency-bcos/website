import React, { useState } from 'react';
import { Clock, User, CheckCircle, ChevronLeft, ChevronRight, Mail, Loader2 } from 'lucide-react';

const CalendarBookingSection = () => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [typedTime, setTypedTime] = useState<string>('09:00'); // Default time
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message state

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message
    setError(null);

    // Extract form data using FormData
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const date = selectedDate?.toLocaleDateString(); // Format the selected date
    const time = typedTime; // Use the typed time

    // Validate required fields
    if (!name || !email || !date || !time) {
      setError('All fields are required.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:4000/api/auth/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, date, time }),
      });

      if (response.ok) {
        setBookingConfirmed(true);
        setTimeout(() => setBookingConfirmed(false), 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to book consultation. Please try again.');
      }
    } catch (error) {
      console.error('Error booking consultation:', error);
      setError('An error occurred while booking the consultation. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Convert selected time to UCT
  const getUCTTime = () => {
    if (selectedDate) {
      const [hours, minutes] = typedTime.split(':');
      const date = new Date(selectedDate);
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toUTCString();
    }
    return null;
  };

  // Handle typed time change
  const handleTypedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid time format (HH:MM)
    if (/^\d{0,2}:\d{0,2}$/.test(value)) {
      setTypedTime(value);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#253b74] to-[#91be3f] dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Book a Consultation
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Select your preferred date and time for the consultation
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          {bookingConfirmed ? (
            <div className="text-center p-8">
              <CheckCircle className="w-16 h-16 text-[#91be3f] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#253b74] dark:text-white mb-4">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thank you for booking a consultation. We will contact you shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendar Section */}
              <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {formatDate(currentMonth)}
                  </h3>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-800 dark:text-white p-2">
                      {day}
                    </div>
                  ))}
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <button
                      key={index}
                      onClick={() => date && setSelectedDate(date)}
                      className={`
                        p-2 text-center rounded-lg transition-colors
                        ${!date ? 'invisible' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
                        ${selectedDate && date && selectedDate.toDateString() === date.toDateString() 
                          ? 'bg-[#253b74] text-white' 
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'}
                      `}
                      disabled={!date}
                    >
                      {date ? date.getDate() : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Form Section */}
              <div className="space-y-6">
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-800 dark:text-white">Select Time</label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <Clock className="w-5 h-5 text-[#253b74] dark:text-[#91be3f]" />
                      <input
                        type="text"
                        placeholder="HH:MM"
                        value={typedTime}
                        onChange={handleTypedTimeChange}
                        className="ml-4 bg-transparent flex-1 outline-none text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Selected Time (UCT): {getUCTTime()}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <User className="w-5 h-5 text-[#253b74] dark:text-[#91be3f]" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="ml-4 bg-transparent flex-1 outline-none text-gray-800 dark:text-white"
                        required
                      />
                    </div>

                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <Mail className="w-5 h-5 text-[#253b74] dark:text-[#91be3f]" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="ml-4 bg-transparent flex-1 outline-none text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Display error message */}
                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || loading} // Disable button when loading
                    className="w-full bg-[#253b74] hover:bg-[#91be3f] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:hover:bg-[#253b74] flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" /> // Show loading spinner
                    ) : (
                      'Book Now'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarBookingSection;