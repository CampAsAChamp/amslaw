'use client';

import { useState } from 'react';
import FAQItem from '@/app/faq/FAQItem';
import { icons } from '@/app/data/icons';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Living Trusts',
    icon: icons.faqTrust,
    faqs: [
      {
        id: '1',
        question: 'What is a Living Trust?',
        answer: 'A Revocable Living Trust ("Living Trust") is a legal arrangement allowing you to manage your assets during your lifetime and instructs how the assets are to be distributed after your passing. A living trust is one of the most effective estate planning tools to ensure that your assets are smoothly transferred to your heirs. A living trust allows for a smooth transfer of assets without court involvement. Additionally, a living trust can help protect you and your estate in the event of incapacity, ensuring that your financial matters are managed according to your wishes.',
      },
      {
        id: '2',
        question: 'How does a Revocable Living Trust work?',
        answer: 'While you are alive, you maintain full control over your Trust and property. You can add and/or remove property, change the beneficiaries, and change the Successor Trustees. If you should become incapacitated, a Successor Trustee you\'ve named will step in to manage your affairs. Upon your passing, the Trust will become "irrevocable." Your Successor Trustee will distribute your assets according to the provisions in your Trust. The Trust process will not go through the probate process.',
      },
      {
        id: '3',
        question: 'Who needs a Living Trust?',
        answer: 'You may benefit from a Living Trust if you: (1) own a home or real estate in California, (2) want to avoid probate and unnecessary legal fees, (3) have minor children and want to control inheritance distribution, (4) want to minimize or avoid family conflict, or (5) want to plan for potential incapacity and appoint someone to manage your finances if needed.',
      },
      {
        id: '9',
        question: 'What happens if I become incapacitated?',
        answer: 'If you have a Living Trust and become incapacitated, a Successor Trustee you\'ve named will step in to manage your affairs according to your wishes. A living trust can help protect you and your estate in the event of incapacity, ensuring that your financial matters are managed exactly as you specified. This is one of the key advantages of having a Living Trust over just a Will.',
      },
      {
        id: '10',
        question: 'How can I avoid probate in California?',
        answer: 'The most effective way to avoid probate in California is to create a Living Trust. A Living Trust allows your assets to be distributed without court involvement, keeping the process private and efficient. While a Will must go through probate (which can be expensive and time-consuming), a Living Trust bypasses this process entirely, saving your family both time and money.',
      },
    ],
  },
  {
    title: 'Wills',
    icon: icons.faqWill,
    faqs: [
      {
        id: '4',
        question: 'What is a Will?',
        answer: 'A Will, also known as a "Last Will and Testament," is a legal document that outlines how your assets will be distributed after you pass away. A Last Will and Testament allows you to: specify who will inherit your assets, including personal belongings, real property, and finances; name an executor to manage your estate assets; and appoint guardians for minor children.',
      },
      {
        id: '5',
        question: 'How does a Will work in California?',
        answer: 'In California, when a person passes away with a Will, their estate typically goes through a legal process through the court known as "probate." This court process ensures that debts are paid, assets are distributed correctly, and legal formalities are met. Because probate can be a lengthy and costly process, many individuals choose to create a Living Trust instead of relying solely on a Will. However, a Will is still a crucial estate planning tool for those who want to ensure their wishes are documented legally.',
      },
    ],
  },
  {
    title: 'Wills vs. Trusts',
    icon: icons.faqCompare,
    faqs: [
      {
        id: '6',
        question: 'What is the difference between a Will and a Trust?',
        answer: 'A "Will" only takes effect after you pass away, and must go through probate, which can be expensive and time-consuming, and is part of the public documents in a court. A "Living Trust" takes effect immediately upon signing and allows your assets to be distributed without court involvement, keeping the process private and efficient.',
      },
      {
        id: '7',
        question: 'Do I need a Will if I have a Living Trust?',
        answer: 'Answer is "Yes." A Will only takes effect after you pass away and must go through probate, which can be expensive and time-consuming. A living trust, on the other hand, takes effect immediately and allows your assets to be distributed without court involvement, keeping the process private and efficient. Even with a Living Trust, you still need a Will as a backup for any assets that weren\'t transferred into the trust and to name guardians for minor children.',
      },
      {
        id: '11',
        question: 'How do you help clients choose between a Will and a Trust?',
        answer: 'We assist clients to determine the best estate planning tools for their unique circumstances. Whether you need a Will, trust, or a combination of both, we will guide our clients through the process with care and expertise. We create estate plans customized to your family taking into consideration assets, family needs, and wishes.',
      },
    ],
  },
  {
    title: 'The Estate Planning Process',
    icon: icons.faqProcess,
    faqs: [
      {
        id: '8',
        question: 'What is the estate planning process?',
        answer: 'The estate planning process includes: (1) First Meeting to discuss your assets and goals, (2) Complete an Estate Plan Questionnaire, (3) Drafts are sent for review and approval, (4) Sign the Estate Plan, and (5) Estate Plan Maintenance and review at your request.',
      },
      {
        id: '12',
        question: 'How long does it take to create an estate plan?',
        answer: 'The timeline varies depending on the complexity of your estate and how quickly you can provide the necessary information. Typically, the process takes 2-4 weeks from the initial consultation to signing your documents. However, I work at your pace to ensure you\'re comfortable with every decision.',
      },
      {
        id: '15',
        question: 'Can I update my estate plan after it\'s created?',
        answer: 'Yes, absolutely. Life changes, and your estate plan should reflect those changes. While you are alive, you maintain full control over your Trust and property. You can add and/or remove property, change the beneficiaries, and change the Successor Trustees. I offer estate plan maintenance and review services at your request. I recommend reviewing your estate plan every few years or after major life events.',
      },
    ],
  },
  {
    title: 'Getting Started',
    icon: icons.faqStart,
    faqs: [
      {
        id: '13',
        question: 'What should I bring to my first consultation?',
        answer: 'For your first consultation, it\'s helpful to bring a list of your assets (real estate, bank accounts, investments, etc.), information about your beneficiaries, and any questions or concerns you have. However, don\'t worry if you don\'t have everything ready—we can work together to gather the necessary information during the estate planning process.',
      },
      {
        id: '14',
        question: 'How much does estate planning cost?',
        answer: 'Estate planning costs vary depending on the complexity of your needs and the documents required. During our initial consultation, I\'ll provide you with a clear quote based on your specific situation. I believe in transparent pricing with no hidden fees.',
      },
    ],
  },
];

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenIds(prevOpenIds => 
      prevOpenIds.includes(id)
        ? prevOpenIds.filter(openId => openId !== id)
        : [...prevOpenIds, id]
    );
  };

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-heading text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
                {category.icon}
                <span>{category.title}</span>
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIds.includes(faq.id)}
                    onToggle={() => toggleFAQ(faq.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

