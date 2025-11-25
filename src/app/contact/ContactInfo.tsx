export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="card">
        <h3 className="text-xl font-bold text-heading mb-6">Office Information</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Address</div>
              <div className="text-body">
                123 Legal Street<br />
                Suite 100<br />
                Your City, ST 12345
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Phone</div>
              <div className="text-body">(555) 123-4567</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Email</div>
              <div className="text-body">info@amslaw.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-heading mb-6">Office Hours</h3>
        <div className="space-y-2 text-body">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>By Appointment</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
        <div className="mt-4 p-4 bg-primary-lighter rounded-lg">
          <div className="font-semibold text-primary-dark mb-2">Emergency Services</div>
          <div className="text-primary-hover text-sm">
            Available 24/7 for urgent estate planning matters
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-heading mb-6">Consultation Includes</h3>
        <ul className="space-y-3 text-body">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-hover mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Review of your current situation</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-hover mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Discussion of your goals and concerns</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-hover mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Explanation of available options</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-hover mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No obligation to proceed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

