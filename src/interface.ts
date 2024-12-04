export interface childrenProp {
  children: React.ReactNode;
}

export interface themeInterface {
  theme: string;
  changeTheme?: (change: boolean) => void;
}
