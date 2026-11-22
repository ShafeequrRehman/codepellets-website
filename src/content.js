// Saari website ki likhai yahan hai — Urdu (ur) aur English (en).
// Koi text badalna ho to sirf is file mein badlein.

export const CONTACT = {
  company: 'Codepellets Technologies',
  ceo: 'Shafeeq Ur Rehman',
  phone: '0340-0586000',
  phoneLink: 'tel:+923400586000',
  whatsapp: '923400586000',
  address1: 'B-17, Islamabad',
  address2: 'Arain Brothers & Co., Jhang',
}

export const content = {
  ur: {
    dir: 'rtl',
    switchLabel: 'English',
    nav: { features: 'سہولیات', products: 'سافٹ ویئر', why: 'ہم کیوں', contact: 'رابطہ' },
    hero: {
      badge: 'ہر کاروبار کے لیے سافٹ ویئر — آن لائن اور آف لائن',
      title1: 'اپنی دکان کا کاروبار',
      title2: 'بنائیں',
      highlight: 'آسان!',
      sub: 'پرچی پرنٹ، اسٹاک کا حساب، روزانہ سیل رپورٹ اور ادھار کھاتہ — سب ایک سافٹ ویئر میں۔ آن لائن بھی، آف لائن بھی۔',
      whatsapp: 'واٹس ایپ کریں',
      call: 'کال کریں',
      waMessage: 'السلام علیکم! مجھے سافٹ ویئر کا ڈیمو چاہیے۔',
    },
    features: {
      title: 'سافٹ ویئر کی سہولیات',
      sub: 'وہ سب کچھ جو ایک دکان کو روزانہ چاہیے',
      items: [
        { icon: 'receipt', title: 'پرچی پرنٹ', desc: 'ہر سیل پر گاہک کو صاف اور پروفیشنل پرچی دیں۔' },
        { icon: 'boxes', title: 'اسٹاک کا حساب', desc: 'کون سا مال کتنا باقی ہے، ہر وقت سامنے۔' },
        { icon: 'chart', title: 'روزانہ سیل رپورٹ', desc: 'دن، ہفتے اور مہینے کی سیل ایک نظر میں۔' },
        { icon: 'book', title: 'ادھار کھاتہ', desc: 'گاہکوں کا ادھار اور وصولی کا مکمل ریکارڈ۔' },
      ],
    },
    products: {
      title: 'ہمارے تیار کردہ سافٹ ویئر',
      sub: 'مختلف کاروبار، ہر ایک کے لیے الگ حل',
      items: [
        { icon: 'tooth', title: 'ڈینٹل کلینک', tag: 'Denti Desk', desc: 'مریضوں کی اپائنٹمنٹ اور ریکارڈ کا آسان نظام۔' },
        { icon: 'utensils', title: 'ریسٹورنٹ', tag: 'Web POS', desc: 'آرڈر، بل اور کچن کا حساب — ویب پر مبنی POS۔' },
        { icon: 'cart', title: 'کریانہ / جنرل اسٹور', tag: 'POS', desc: 'سیل، پرچی اور اسٹاک — دکان کا مکمل سافٹ ویئر۔' },
        { icon: 'leaf', title: 'فرٹیلائزر ڈیلر', tag: 'POS', desc: 'کھاد اور بیج کی سیل، اسٹاک اور کھاتہ۔' },
      ],
    },
    why: {
      title: 'Codepellets ہی کیوں؟',
      items: [
        { icon: 'cloud', title: 'آن لائن + آف لائن', desc: 'انٹرنیٹ نہ ہو تب بھی سافٹ ویئر چلتا رہے۔' },
        { icon: 'pin', title: 'مکمل سپورٹ', desc: 'جب بھی ضرورت ہو، فوری سپورٹ اور ٹریننگ۔' },
        { icon: 'code', title: 'آپ کی ضرورت کے مطابق', desc: 'آپ کے کاروبار کے حساب سے سافٹ ویئر تیار کیا جاتا ہے۔' },
      ],
    },
    banner: 'ڈیمو کے لیے آج ہی رابطہ کریں',
    contact: {
      title: 'رابطہ کریں',
      sub: 'کال یا واٹس ایپ پر بات کریں — ہم آپ کو سافٹ ویئر چلا کر دکھائیں گے۔',
      phone: 'فون / واٹس ایپ',
      address1: 'ایڈریس 1',
      address2: 'ایڈریس 2',
      ceo: 'سی ای او',
    },
    footer: 'تمام حقوق محفوظ ہیں۔',
  },

  en: {
    dir: 'ltr',
    switchLabel: 'اردو',
    nav: { features: 'Features', products: 'Software', why: 'Why us', contact: 'Contact' },
    hero: {
      badge: 'Software for every business — online & offline',
      title1: 'Run your shop',
      title2: 'the',
      highlight: 'easy way!',
      sub: 'Slip printing, stock management, daily sales reports and customer credit — all in one software. Works online and offline.',
      whatsapp: 'WhatsApp us',
      call: 'Call now',
      waMessage: 'Assalam o Alaikum! I would like a software demo.',
    },
    features: {
      title: 'Software features',
      sub: 'Everything a shop needs, every day',
      items: [
        { icon: 'receipt', title: 'Slip printing', desc: 'Give every customer a clean, professional receipt.' },
        { icon: 'boxes', title: 'Stock management', desc: 'Always know how much of each item is left.' },
        { icon: 'chart', title: 'Daily sales report', desc: 'Daily, weekly and monthly sales at a glance.' },
        { icon: 'book', title: 'Credit ledger', desc: 'A full record of customer credit and payments.' },
      ],
    },
    products: {
      title: 'Software we have built',
      sub: 'A dedicated solution for each kind of business',
      items: [
        { icon: 'tooth', title: 'Dental clinic', tag: 'Denti Desk', desc: 'Simple patient appointments and records.' },
        { icon: 'utensils', title: 'Restaurant', tag: 'Web POS', desc: 'Orders, bills and kitchen flow on a web POS.' },
        { icon: 'cart', title: 'Karyana / General store', tag: 'POS', desc: 'Sales, slips and stock — complete shop software.' },
        { icon: 'leaf', title: 'Fertilizer dealer', tag: 'POS', desc: 'Fertilizer and seed sales, stock and ledger.' },
      ],
    },
    why: {
      title: 'Why Codepellets?',
      items: [
        { icon: 'cloud', title: 'Online + Offline', desc: 'Keeps working even without internet.' },
        { icon: 'pin', title: 'Full support', desc: 'Quick support and training whenever you need it.' },
        { icon: 'code', title: 'Built for your needs', desc: 'Software shaped around how your business works.' },
      ],
    },
    banner: 'Contact us today for a demo',
    contact: {
      title: 'Contact us',
      sub: 'Call or WhatsApp — we will show you the software running.',
      phone: 'Phone / WhatsApp',
      address1: 'Address 1',
      address2: 'Address 2',
      ceo: 'CEO',
    },
    footer: 'All rights reserved.',
  },
}
