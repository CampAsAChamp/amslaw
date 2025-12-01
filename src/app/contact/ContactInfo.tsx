import { CopyButton } from '@/app/components/ui';
import { icons, whatToExpect } from '@/app/constants';

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
              <a 
                href="https://www.google.com/maps/place/21250+Hawthorne+Blvd,+Torrance,+CA+90503/@33.8361803,-118.353406,18.81z/data=!4m6!3m5!1s0x80c2b4d35aa9c9b3:0x9718c991148def10!8m2!3d33.8361935!4d-118.3526581!16s%2Fg%2F11bw3fbbpr?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-primary-hover transition-colors hover:underline"
              >
                21250 Hawthorne Blvd.<br />
                Suite 500<br />
                Torrance, CA 90503
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Phone</div>
              <div className="text-body flex items-center gap-2">
                <a 
                  href="tel:3107927454" 
                  className="hover:text-primary-hover transition-colors hover:underline"
                >
                  (310) 792-7454
                </a>
                <CopyButton textToCopy="(310) 792-7454" label="Copy phone number" className="text-primary-hover hover:text-primary" />
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-6 h-6 text-primary-hover mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <div className="font-semibold text-heading">Email</div>
              <div className="text-body flex items-center gap-2">
                <a 
                  href="mailto:amschneiderlaw@gmail.com" 
                  className="hover:text-primary-hover transition-colors hover:underline"
                >
                  amschneiderlaw@gmail.com
                </a>
                <CopyButton textToCopy="amschneiderlaw@gmail.com" label="Copy email address" className="text-primary-hover hover:text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-heading mb-6">Office Hours</h3>
        <div className="space-y-2 text-body">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday - Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-heading mb-6">What to Expect</h3>
        <ul className="space-y-3 text-body">
          {whatToExpect.map((item, index) => (
            <li key={index} className="flex items-start">
              {icons.checkmarkSmall}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

