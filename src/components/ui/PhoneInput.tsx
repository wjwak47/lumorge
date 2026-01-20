"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
    { code: 'AF', name: 'Afghanistan', dial: '+93' },
    { code: 'AL', name: 'Albania', dial: '+355' },
    { code: 'DZ', name: 'Algeria', dial: '+213' },
    { code: 'AS', name: 'American Samoa', dial: '+1684' },
    { code: 'AD', name: 'Andorra', dial: '+376' },
    { code: 'AO', name: 'Angola', dial: '+244' },
    { code: 'AI', name: 'Anguilla', dial: '+1264' },
    { code: 'AG', name: 'Antigua and Barbuda', dial: '+1268' },
    { code: 'AR', name: 'Argentina', dial: '+54' },
    { code: 'AM', name: 'Armenia', dial: '+374' },
    { code: 'AW', name: 'Aruba', dial: '+297' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'AT', name: 'Austria', dial: '+43' },
    { code: 'AZ', name: 'Azerbaijan', dial: '+994' },
    { code: 'BS', name: 'Bahamas', dial: '+1242' },
    { code: 'BH', name: 'Bahrain', dial: '+973' },
    { code: 'BD', name: 'Bangladesh', dial: '+880' },
    { code: 'BB', name: 'Barbados', dial: '+1246' },
    { code: 'BY', name: 'Belarus', dial: '+375' },
    { code: 'BE', name: 'Belgium', dial: '+32' },
    { code: 'BZ', name: 'Belize', dial: '+501' },
    { code: 'BJ', name: 'Benin', dial: '+229' },
    { code: 'BM', name: 'Bermuda', dial: '+1441' },
    { code: 'BT', name: 'Bhutan', dial: '+975' },
    { code: 'BO', name: 'Bolivia', dial: '+591' },
    { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387' },
    { code: 'BW', name: 'Botswana', dial: '+267' },
    { code: 'BR', name: 'Brazil', dial: '+55' },
    { code: 'BN', name: 'Brunei', dial: '+673' },
    { code: 'BG', name: 'Bulgaria', dial: '+359' },
    { code: 'BF', name: 'Burkina Faso', dial: '+226' },
    { code: 'BI', name: 'Burundi', dial: '+257' },
    { code: 'KH', name: 'Cambodia', dial: '+855' },
    { code: 'CM', name: 'Cameroon', dial: '+237' },
    { code: 'CA', name: 'Canada', dial: '+1' },
    { code: 'CV', name: 'Cape Verde', dial: '+238' },
    { code: 'KY', name: 'Cayman Islands', dial: '+1345' },
    { code: 'CF', name: 'Central African Republic', dial: '+236' },
    { code: 'TD', name: 'Chad', dial: '+235' },
    { code: 'CL', name: 'Chile', dial: '+56' },
    { code: 'CN', name: 'China', dial: '+86' },
    { code: 'CO', name: 'Colombia', dial: '+57' },
    { code: 'KM', name: 'Comoros', dial: '+269' },
    { code: 'CG', name: 'Congo', dial: '+242' },
    { code: 'CD', name: 'Congo (DRC)', dial: '+243' },
    { code: 'CK', name: 'Cook Islands', dial: '+682' },
    { code: 'CR', name: 'Costa Rica', dial: '+506' },
    { code: 'CI', name: 'Côte d\'Ivoire', dial: '+225' },
    { code: 'HR', name: 'Croatia', dial: '+385' },
    { code: 'CU', name: 'Cuba', dial: '+53' },
    { code: 'CW', name: 'Curaçao', dial: '+599' },
    { code: 'CY', name: 'Cyprus', dial: '+357' },
    { code: 'CZ', name: 'Czech Republic', dial: '+420' },
    { code: 'DK', name: 'Denmark', dial: '+45' },
    { code: 'DJ', name: 'Djibouti', dial: '+253' },
    { code: 'DM', name: 'Dominica', dial: '+1767' },
    { code: 'DO', name: 'Dominican Republic', dial: '+1809' },
    { code: 'EC', name: 'Ecuador', dial: '+593' },
    { code: 'EG', name: 'Egypt', dial: '+20' },
    { code: 'SV', name: 'El Salvador', dial: '+503' },
    { code: 'GQ', name: 'Equatorial Guinea', dial: '+240' },
    { code: 'ER', name: 'Eritrea', dial: '+291' },
    { code: 'EE', name: 'Estonia', dial: '+372' },
    { code: 'SZ', name: 'Eswatini', dial: '+268' },
    { code: 'ET', name: 'Ethiopia', dial: '+251' },
    { code: 'FK', name: 'Falkland Islands', dial: '+500' },
    { code: 'FO', name: 'Faroe Islands', dial: '+298' },
    { code: 'FJ', name: 'Fiji', dial: '+679' },
    { code: 'FI', name: 'Finland', dial: '+358' },
    { code: 'FR', name: 'France', dial: '+33' },
    { code: 'GF', name: 'French Guiana', dial: '+594' },
    { code: 'PF', name: 'French Polynesia', dial: '+689' },
    { code: 'GA', name: 'Gabon', dial: '+241' },
    { code: 'GM', name: 'Gambia', dial: '+220' },
    { code: 'GE', name: 'Georgia', dial: '+995' },
    { code: 'DE', name: 'Germany', dial: '+49' },
    { code: 'GH', name: 'Ghana', dial: '+233' },
    { code: 'GI', name: 'Gibraltar', dial: '+350' },
    { code: 'GR', name: 'Greece', dial: '+30' },
    { code: 'GL', name: 'Greenland', dial: '+299' },
    { code: 'GD', name: 'Grenada', dial: '+1473' },
    { code: 'GP', name: 'Guadeloupe', dial: '+590' },
    { code: 'GU', name: 'Guam', dial: '+1671' },
    { code: 'GT', name: 'Guatemala', dial: '+502' },
    { code: 'GN', name: 'Guinea', dial: '+224' },
    { code: 'GW', name: 'Guinea-Bissau', dial: '+245' },
    { code: 'GY', name: 'Guyana', dial: '+592' },
    { code: 'HT', name: 'Haiti', dial: '+509' },
    { code: 'HN', name: 'Honduras', dial: '+504' },
    { code: 'HK', name: 'Hong Kong', dial: '+852' },
    { code: 'HU', name: 'Hungary', dial: '+36' },
    { code: 'IS', name: 'Iceland', dial: '+354' },
    { code: 'IN', name: 'India', dial: '+91' },
    { code: 'ID', name: 'Indonesia', dial: '+62' },
    { code: 'IR', name: 'Iran', dial: '+98' },
    { code: 'IQ', name: 'Iraq', dial: '+964' },
    { code: 'IE', name: 'Ireland', dial: '+353' },
    { code: 'IL', name: 'Israel', dial: '+972' },
    { code: 'IT', name: 'Italy', dial: '+39' },
    { code: 'JM', name: 'Jamaica', dial: '+1876' },
    { code: 'JP', name: 'Japan', dial: '+81' },
    { code: 'JO', name: 'Jordan', dial: '+962' },
    { code: 'KZ', name: 'Kazakhstan', dial: '+7' },
    { code: 'KE', name: 'Kenya', dial: '+254' },
    { code: 'KI', name: 'Kiribati', dial: '+686' },
    { code: 'KP', name: 'North Korea', dial: '+850' },
    { code: 'KR', name: 'South Korea', dial: '+82' },
    { code: 'KW', name: 'Kuwait', dial: '+965' },
    { code: 'KG', name: 'Kyrgyzstan', dial: '+996' },
    { code: 'LA', name: 'Laos', dial: '+856' },
    { code: 'LV', name: 'Latvia', dial: '+371' },
    { code: 'LB', name: 'Lebanon', dial: '+961' },
    { code: 'LS', name: 'Lesotho', dial: '+266' },
    { code: 'LR', name: 'Liberia', dial: '+231' },
    { code: 'LY', name: 'Libya', dial: '+218' },
    { code: 'LI', name: 'Liechtenstein', dial: '+423' },
    { code: 'LT', name: 'Lithuania', dial: '+370' },
    { code: 'LU', name: 'Luxembourg', dial: '+352' },
    { code: 'MO', name: 'Macau', dial: '+853' },
    { code: 'MG', name: 'Madagascar', dial: '+261' },
    { code: 'MW', name: 'Malawi', dial: '+265' },
    { code: 'MY', name: 'Malaysia', dial: '+60' },
    { code: 'MV', name: 'Maldives', dial: '+960' },
    { code: 'ML', name: 'Mali', dial: '+223' },
    { code: 'MT', name: 'Malta', dial: '+356' },
    { code: 'MH', name: 'Marshall Islands', dial: '+692' },
    { code: 'MQ', name: 'Martinique', dial: '+596' },
    { code: 'MR', name: 'Mauritania', dial: '+222' },
    { code: 'MU', name: 'Mauritius', dial: '+230' },
    { code: 'YT', name: 'Mayotte', dial: '+262' },
    { code: 'MX', name: 'Mexico', dial: '+52' },
    { code: 'FM', name: 'Micronesia', dial: '+691' },
    { code: 'MD', name: 'Moldova', dial: '+373' },
    { code: 'MC', name: 'Monaco', dial: '+377' },
    { code: 'MN', name: 'Mongolia', dial: '+976' },
    { code: 'ME', name: 'Montenegro', dial: '+382' },
    { code: 'MS', name: 'Montserrat', dial: '+1664' },
    { code: 'MA', name: 'Morocco', dial: '+212' },
    { code: 'MZ', name: 'Mozambique', dial: '+258' },
    { code: 'MM', name: 'Myanmar', dial: '+95' },
    { code: 'NA', name: 'Namibia', dial: '+264' },
    { code: 'NR', name: 'Nauru', dial: '+674' },
    { code: 'NP', name: 'Nepal', dial: '+977' },
    { code: 'NL', name: 'Netherlands', dial: '+31' },
    { code: 'NC', name: 'New Caledonia', dial: '+687' },
    { code: 'NZ', name: 'New Zealand', dial: '+64' },
    { code: 'NI', name: 'Nicaragua', dial: '+505' },
    { code: 'NE', name: 'Niger', dial: '+227' },
    { code: 'NG', name: 'Nigeria', dial: '+234' },
    { code: 'NU', name: 'Niue', dial: '+683' },
    { code: 'NF', name: 'Norfolk Island', dial: '+672' },
    { code: 'MK', name: 'North Macedonia', dial: '+389' },
    { code: 'MP', name: 'Northern Mariana Islands', dial: '+1670' },
    { code: 'NO', name: 'Norway', dial: '+47' },
    { code: 'OM', name: 'Oman', dial: '+968' },
    { code: 'PK', name: 'Pakistan', dial: '+92' },
    { code: 'PW', name: 'Palau', dial: '+680' },
    { code: 'PS', name: 'Palestine', dial: '+970' },
    { code: 'PA', name: 'Panama', dial: '+507' },
    { code: 'PG', name: 'Papua New Guinea', dial: '+675' },
    { code: 'PY', name: 'Paraguay', dial: '+595' },
    { code: 'PE', name: 'Peru', dial: '+51' },
    { code: 'PH', name: 'Philippines', dial: '+63' },
    { code: 'PL', name: 'Poland', dial: '+48' },
    { code: 'PT', name: 'Portugal', dial: '+351' },
    { code: 'PR', name: 'Puerto Rico', dial: '+1787' },
    { code: 'QA', name: 'Qatar', dial: '+974' },
    { code: 'RE', name: 'Réunion', dial: '+262' },
    { code: 'RO', name: 'Romania', dial: '+40' },
    { code: 'RU', name: 'Russia', dial: '+7' },
    { code: 'RW', name: 'Rwanda', dial: '+250' },
    { code: 'SH', name: 'Saint Helena', dial: '+290' },
    { code: 'KN', name: 'Saint Kitts and Nevis', dial: '+1869' },
    { code: 'LC', name: 'Saint Lucia', dial: '+1758' },
    { code: 'PM', name: 'Saint Pierre and Miquelon', dial: '+508' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', dial: '+1784' },
    { code: 'WS', name: 'Samoa', dial: '+685' },
    { code: 'SM', name: 'San Marino', dial: '+378' },
    { code: 'ST', name: 'São Tomé and Príncipe', dial: '+239' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
    { code: 'SN', name: 'Senegal', dial: '+221' },
    { code: 'RS', name: 'Serbia', dial: '+381' },
    { code: 'SC', name: 'Seychelles', dial: '+248' },
    { code: 'SL', name: 'Sierra Leone', dial: '+232' },
    { code: 'SG', name: 'Singapore', dial: '+65' },
    { code: 'SX', name: 'Sint Maarten', dial: '+1721' },
    { code: 'SK', name: 'Slovakia', dial: '+421' },
    { code: 'SI', name: 'Slovenia', dial: '+386' },
    { code: 'SB', name: 'Solomon Islands', dial: '+677' },
    { code: 'SO', name: 'Somalia', dial: '+252' },
    { code: 'ZA', name: 'South Africa', dial: '+27' },
    { code: 'SS', name: 'South Sudan', dial: '+211' },
    { code: 'ES', name: 'Spain', dial: '+34' },
    { code: 'LK', name: 'Sri Lanka', dial: '+94' },
    { code: 'SD', name: 'Sudan', dial: '+249' },
    { code: 'SR', name: 'Suriname', dial: '+597' },
    { code: 'SE', name: 'Sweden', dial: '+46' },
    { code: 'CH', name: 'Switzerland', dial: '+41' },
    { code: 'SY', name: 'Syria', dial: '+963' },
    { code: 'TW', name: 'Taiwan', dial: '+886' },
    { code: 'TJ', name: 'Tajikistan', dial: '+992' },
    { code: 'TZ', name: 'Tanzania', dial: '+255' },
    { code: 'TH', name: 'Thailand', dial: '+66' },
    { code: 'TL', name: 'Timor-Leste', dial: '+670' },
    { code: 'TG', name: 'Togo', dial: '+228' },
    { code: 'TK', name: 'Tokelau', dial: '+690' },
    { code: 'TO', name: 'Tonga', dial: '+676' },
    { code: 'TT', name: 'Trinidad and Tobago', dial: '+1868' },
    { code: 'TN', name: 'Tunisia', dial: '+216' },
    { code: 'TR', name: 'Turkey', dial: '+90' },
    { code: 'TM', name: 'Turkmenistan', dial: '+993' },
    { code: 'TC', name: 'Turks and Caicos Islands', dial: '+1649' },
    { code: 'TV', name: 'Tuvalu', dial: '+688' },
    { code: 'UG', name: 'Uganda', dial: '+256' },
    { code: 'UA', name: 'Ukraine', dial: '+380' },
    { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'UY', name: 'Uruguay', dial: '+598' },
    { code: 'UZ', name: 'Uzbekistan', dial: '+998' },
    { code: 'VU', name: 'Vanuatu', dial: '+678' },
    { code: 'VA', name: 'Vatican City', dial: '+39' },
    { code: 'VE', name: 'Venezuela', dial: '+58' },
    { code: 'VN', name: 'Vietnam', dial: '+84' },
    { code: 'VG', name: 'Virgin Islands (British)', dial: '+1284' },
    { code: 'VI', name: 'Virgin Islands (US)', dial: '+1340' },
    { code: 'WF', name: 'Wallis and Futuna', dial: '+681' },
    { code: 'YE', name: 'Yemen', dial: '+967' },
    { code: 'ZM', name: 'Zambia', dial: '+260' },
    { code: 'ZW', name: 'Zimbabwe', dial: '+263' },
];

const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function PhoneInput({ value, onChange, placeholder = '(555) 000-0000', className = '' }: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'US') || countries[0]);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(
        c => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search) || c.code.toLowerCase().includes(search.toLowerCase())
    );

    const handleCountrySelect = (country: typeof countries[0]) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className={`relative flex ${className}`} ref={dropdownRef}>
            {/* Country Selector */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <img
                    src={getFlagUrl(selectedCountry.code)}
                    alt={selectedCountry.name}
                    className="w-6 h-4 object-cover rounded-sm shadow-sm"
                />
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Phone Input */}
            <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                    {selectedCountry.dial}
                </span>
                <input
                    type="tel"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-16 pr-4 py-3 border border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-slate-100 sticky top-0 bg-white">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search countries..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            autoFocus
                        />
                    </div>

                    {/* Countries List */}
                    <div className="max-h-72 overflow-y-auto">
                        {filteredCountries.length === 0 ? (
                            <div className="px-4 py-8 text-center text-slate-400 text-sm">
                                No countries found
                            </div>
                        ) : (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left ${selectedCountry.code === country.code ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <img
                                        src={getFlagUrl(country.code)}
                                        alt={country.name}
                                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                                    />
                                    <span className="flex-1 text-sm text-slate-700 truncate">{country.name}</span>
                                    <span className="text-sm text-slate-400">{country.dial}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
