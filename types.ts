
export interface Choice {
  text: string;
  goToPage: number;
}

export interface Page {
  id: number;
  title: string;
  text: string;
  image: string;
  choices: Choice[];
  ending?: string;
}
