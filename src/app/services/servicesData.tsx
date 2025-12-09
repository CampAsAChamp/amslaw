import { icons } from '@/app/data/icons';

export const servicesData = [
  {
    icon: icons.willLarge,
    title: "Wills & Testaments",
    description:
      "A will is the foundation of any estate plan. It ensures your assets are distributed according to your wishes and provides for your loved ones after you're gone.",
    sections: [
      {
        heading: "What I Include:",
        items: [
          "Last Will and Testament",
          "Asset Inventory and Planning",
        ],
      },
      {
        heading: "Why You Need a Will:",
        items: [
          "Control asset distribution",
          "Name guardians for minor children",
          "Minimize family disputes",
          "Ensure your wishes are legally binding",
        ],
      },
    ],
  },
  {
    icon: icons.trustLarge,
    title: "Trust Planning",
    description:
      "Trusts offer advanced estate planning benefits including asset protection, tax minimization, and avoiding probate while maintaining control over your assets. Unlike a will, which must go through probate, a living trust allows for a seamless transfer of assets without court involvement.",
    sections: [
      {
        heading: "Trust Benefits:",
        items: [
          "Avoid probate proceedings",
          "Maintain privacy",
          "Maintain control over your assets during your lifetime",
          "Protect assets from creditors",
          "Transfer of assets after your passing",
          "Control distribution timing",
        ],
      },
    ],
  },
  {
    icon: icons.healthcareLarge,
    title: "Advance Healthcare Directive & Durable Power of Attorney",
    description:
      "Both are legal documents that allow an agent to make decisions for you during your lifetime.",
    sections: [
      {
        heading: "Advance Healthcare Directive",
        items: [
          <span key="healthcare">This is a legal document that allows you to appoint an agent to make <strong><em>healthcare</em></strong> decisions for you if you are unable to do so yourself.</span>,
        ],
      },
      {
        heading: "Durable Power of Attorney",
        items: [
          <span key="financial">This is a legal document that allows you to appoint an agent to make <strong><em>financial</em></strong> decisions for you if you are unable to do so yourself.</span>,
        ],
      },
    ],
  },
  {
    icon: icons.trustAdminLarge,
    title: "Trust Administration",
    description:
      "After the passing of a person, who has created a Living Trust, the successor trustee is responsible for administering the Trust and distributing the assets to the beneficiaries.",
    sections: [
      {
        items: [
          "Gather and inventory trust assets",
          "Pay any debts and taxes",
          "Transfer assets to beneficiaries",
          "Follow the instructions in the Trust",
        ],
      },
    ],
  },
  {
    icon: icons.probateLarge,
    title: "Probate",
    description:
      "When a loved one passes away, navigating the probate process can be overwhelming. I guide you through every step with compassion and expertise.",
    sections: [
      {
        heading: "My Probate Services:",
        items: [
          "Probate Court Filings",
          "Estate Administration",
          "Asset Inventory and Valuation",
          "Creditor Notification",
          "Final Distribution to Beneficiaries",
        ],
      },
    ],
  },
  {
    icon: icons.comprehensiveLarge,
    title: "Comprehensive Estate Planning",
    description:
      "A complete estate plan protects your family and assets while minimizing taxes and ensuring your wishes are carried out exactly as you intend.",
    sections: [
      {
        heading: "Estate Planning Includes:",
        items: [
          "Will and Trust Creation",
          "Beneficiary Designations",
          "Regular Plan Reviews",
        ],
      },
      {
        heading: "Planning Benefits:",
        items: [
          "Protect your family's future",
          "Avoid probate delays",
          "Maintain asset control",
          "Plan for incapacity",
        ],
      },
    ],
  },
];

