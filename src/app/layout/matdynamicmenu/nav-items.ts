export interface NavItem {
    formname: string;
    disabled?: boolean;
    iconName: string;
    formurl?: string;
    subMenuList?: NavItem[];
    moduleLevelList : []
  }
  