import Image from "next/image";
import TransitionLink from "@/app/components/layout/TransitionLink";

export default function AttorneyProfile() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
              Meet Your Attorney
            </h2>
            <div className="space-y-4 text-body mb-8">
              <p>
                I have been a practicing attorney for 32 years and focus on <strong>Estate Planning</strong>, <strong>Wills</strong>, <strong>Trusts</strong>, <strong>Trust Administration</strong>, and <strong>Probate</strong> matters.
                I am dedicated to helping families protect their assets and ensure their 
                wishes are carried out exactly as intended.
              </p>
              <p>
                Allowing me to provide extra care and tailored solutions to my clients for each family&apos;s unique situation. 
                I believe that every family deserves personalized attention
              </p>
              <p>
                I understand that discussing estate planning can be difficult, which is why 
                I approach every client relationship with compassion, patience, and clear 
                communication. My goal is to make the process as straightforward as possible 
                while ensuring your family&apos;s future is secure.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="card-info">
                <h3 className="text-xl font-semibold text-heading mb-4">Education</h3>
                <ul className="space-y-2 text-body">
                  <li>• Juris Doctor - Whittier Law School</li>
                  <li>• Bachelor of Science - California State University of Long Beach</li>
                </ul>
              </div>
              
              <div className="card-info">
                <h3 className="text-xl font-semibold text-heading mb-4">Credentials</h3>
                <ul className="space-y-2 text-body">
                  <li>• Licensed to practice in California</li>
                  <li>• California State Bar Association - Member</li>
                  <li>• U.S. District Court for the Eastern District - State of California</li>
                  <li>• U.S. District Court for the Central District - State of California</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
              <Image 
                src="/attorney-headshot.jpg" 
                alt="Attorney Anna Schneider"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-heading mb-2">Anna Schneider</h3>
              <p className="text-primary-hover font-semibold mb-4">Principal Attorney</p>
              <p className="text-body mb-6">
                Focus on Estate Planning, Wills, Trusts, Trust Administration, and Probate matters.
              </p>
              <TransitionLink
                href="/contact"
                className="btn-cta"
              >
                Contact
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

