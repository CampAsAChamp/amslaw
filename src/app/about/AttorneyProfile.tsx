import Link from "next/link";
import Image from "next/image";

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
                With over 15 years of experience in estate planning and probate law, 
                I am dedicated to helping families protect their assets and ensure their 
                wishes are carried out exactly as intended.
              </p>
              <p>
                My practice focuses exclusively on wills, trusts, and estate planning, 
                allowing me to provide specialized expertise that larger firms often lack. 
                I believe that every family deserves personalized attention and comprehensive 
                legal protection.
              </p>
              <p>
                I understand that discussing estate planning can be difficult, which is why 
                I approach every client relationship with compassion, patience, and clear 
                communication. My goal is to make the process as straightforward as possible 
                while ensuring your family&apos;s future is secure.
              </p>
            </div>
            
            <div className="card-info">
              <h3 className="text-xl font-semibold text-heading mb-4">Education & Credentials</h3>
              <ul className="space-y-2 text-body">
                <li>• Juris Doctor, [Law School Name]</li>
                <li>• Bachelor of Arts, [University Name]</li>
                <li>• Licensed to practice in [State]</li>
                <li>• Member, [State] Bar Association</li>
                <li>• Member, Estate Planning Council</li>
                <li>• Certified Estate Planning Specialist</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
              <Image 
                src="/attorney-headshot.jpg" 
                alt="Attorney Amy Schneider"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-heading mb-2">Amy Schneider</h3>
              <p className="text-primary-hover font-semibold mb-4">Principal Attorney</p>
              <p className="text-body mb-6">
                Specializing in Estate Planning, Wills, Trusts, and Probate Administration
              </p>
              <Link
                href="/contact"
                className="btn-cta"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

