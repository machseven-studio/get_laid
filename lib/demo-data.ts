export type Person = {
  id: string; name: string; age: number; city: string; distance: string;
  bio: string; prompt: string; answer: string; tags: string[]; image: string;
  online?: boolean; voice?: string;
};

export const people: Person[] = [
  { id:"maya", name:"Maya", age:24, city:"Mumbai", distance:"3 km away", bio:"Collecting little moments, big playlists, and reasons to take the scenic route.", prompt:"A perfect Sunday looks like…", answer:"Coffee, sea breeze, and absolutely no plans.", tags:["Live music","Ocean walks","Film"], image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85", online:true, voice:"Warm, curious, and a little sarcastic. Tell me your most controversial food opinion." },
  { id:"aarav", name:"Aarav", age:26, city:"Mumbai", distance:"5 km away", bio:"Design by day. Searching for the city's best late-night food by night.", prompt:"Win me over with…", answer:"A great story and a better playlist.", tags:["Design","Food spots","Road trips"], image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85", voice:"I can plan a spontaneous trip in approximately twelve minutes." },
  { id:"isha", name:"Isha", age:23, city:"Mumbai", distance:"2 km away", bio:"Soft heart, sharp humour. Usually the friend who takes the photos.", prompt:"Green flags I notice…", answer:"Kindness when no one is watching.", tags:["Photography","Books","Dogs"], image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85", online:true, voice:"My ideal first date involves a bookstore and getting lost in conversation." },
  { id:"kabir", name:"Kabir", age:25, city:"Mumbai", distance:"7 km away", bio:"Runner, amateur cook, and enthusiastic dessert reviewer.", prompt:"Unpopular opinion…", answer:"The best conversations happen after midnight.", tags:["Running","Cooking","Comedy"], image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85", voice:"I'll make the pasta. You pick the film. Deal?" }
];

export const initialLikes = ["maya","isha"];
export const initialMatches = ["aarav","isha"];
export const byId = (id: string) => people.find(p => p.id === id) ?? people[0];
