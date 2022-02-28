type ClassList = {
  results: Array<PlayerClasses>;
};

type WeaponList = {
  results: Array<WeaponDetails>;
};

type PlayerClasses = {
  name: string;
  hit_dice: string;
  hp_at_1st_level: string;
  prof_saving_throws: string;
  spellcasting_ability: string;
};

type WeaponDetails = {
  name: string;
  damage_dice: string;
  damage_type: string;
  properties: string;
  weight: string;
  category: string;
};

export { PlayerClasses, ClassList, WeaponDetails, WeaponList };
