import Link from "next/link";

interface ServiceDetailProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  sections: {
    heading: string;
    items: string[];
  }[];
  buttonText: string;
  buttonLink: string;
}

export default function ServiceDetail({
  icon,
  title,
  description,
  sections,
  buttonText,
  buttonLink,
}: ServiceDetailProps) {
  return (
    <div className="card">
      <div className="text-primary-hover mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-heading mb-4">{title}</h2>
      <p className="text-body mb-6">{description}</p>
      
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-heading mb-3">{section.heading}</h3>
          <ul className="text-body space-y-2">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>• {item}</li>
            ))}
          </ul>
        </div>
      ))}

      <Link href={buttonLink} className="btn-cta">
        {buttonText}
      </Link>
    </div>
  );
}

