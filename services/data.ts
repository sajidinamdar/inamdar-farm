import { Farm } from '../types';

// Empty arrays - data will be loaded dynamically from API or user input
export const FARMS_DATA: Farm[] = [];

// Placeholder owner details - can be loaded from configuration or API
export const OWNER_DETAILS = {
  name: "इनामदार फार्म्स",
  established: "2004",
  totalFarms: 0,
  totalArea: "",
  mission: "शेतकऱ्याचा विश्वास हेच आमचे भांडवल",
  contact: {
    email: "bhiayyahuseninamadar@gmail.com",
    phone: "7798779332",
    address: "मु. पो. खारशिंदे, ता. संगमनेर, जि. अहमदनगर, पिन - 413738"
  }
};

// Functions to dynamically add/update farm data
export const addFarm = (farm: Farm) => {
  FARMS_DATA.push(farm);
};

export const updateFarm = (id: number, updatedFarm: Partial<Farm>) => {
  const index = FARMS_DATA.findIndex(farm => farm.id === id);
  if (index !== -1) {
    FARMS_DATA[index] = { ...FARMS_DATA[index], ...updatedFarm };
  }
};

export const getFarmById = (id: number): Farm | undefined => {
  return FARMS_DATA.find(farm => farm.id === id);
};

export const removeFarm = (id: number) => {
  const index = FARMS_DATA.findIndex(farm => farm.id === id);
  if (index !== -1) {
    FARMS_DATA.splice(index, 1);
  }
};
