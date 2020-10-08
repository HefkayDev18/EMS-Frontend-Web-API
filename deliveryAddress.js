const LAGOS_MAINLAND = [
  'Alausa-Oregun',
  'Anthony Village',
  'Gbagada',
  'Ikeja',
  'Ilupeju',
  'Ketu',
  'Magodo',
  'Maryland',
  'Mushin',
  'Ogudu-Ojota',
  'Omole-Ojodu Berger',
  'Oshodi',
  'Somolu',
  'Surulere',
  'Yaba',
  'Bariga'
]

const LEKKI = [
  'Agungi-Osapa',
  'Ajah',
  'Chevron',
  'Elf-Nicon',
  'Ikate',
  'Ikota',
  'Lekki Phase 1',
  'VGC'
]

const ISLAND = [
  'Ikoyi',
  'Lagos Island',
  'Oniru Estate',
  'Victoria Island'
]

export const CITIES = [...ISLAND, ...LAGOS_MAINLAND, ...LEKKI].sort();

export const getDeliveryPrice = (city) => {
  if(ISLAND.includes(city)) return 1500
  else if(LEKKI.includes(city)) return 1600
  else if(LAGOS_MAINLAND.includes(city)) return 1200
  return 0
}