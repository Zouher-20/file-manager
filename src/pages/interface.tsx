export interface fileInterface {
  cards: Array<{ id: number; name: string; state: string; date: string }>;
  card: { id: number; name: string; state: string; date: string };

  table: Array<Array<string> | Array<{}>>;
}
